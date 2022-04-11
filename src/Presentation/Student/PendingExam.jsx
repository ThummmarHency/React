import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import { getToken } from "../../Container/DataLogic";
import { fetchDataPost } from "../../Container/DataLogic";
const PendingExam = () => {
  const [queAns, setQueAns] = useState([]);
  const [selected, setSelected] = useState(0);
  const [rwClr, setRowClr] = useState();
  let data1 = localStorage.getItem("pendingExam");
  let acData = JSON.parse(data1);
  let quesId = localStorage.getItem("idArray");
  const [data, setData] = useState(acData);
  const [tblData, setTblData] = useState(data);
  const [isDisable, setIsDisable] = useState(true);
  const [answer, setAnswer] = useState();
  const subId = localStorage.getItem("id");
  let idArray = JSON.parse(quesId);
  const ans = "Answer...";
  const subjectName = localStorage.getItem("subjectName");
  useEffect(() => {
    const AnswerInQue = () => {
      let clonedData = { ...data };
      Object.entries(data && data[selected]).map(([key]) => {
        switch (key) {
          case "answer":
            clonedData[selected].answer =
              answer === undefined ? acData[0].answer : answer;
            break;
          default:
            break;
        }
      });

      answer !== undefined && setData(clonedData);
    };
    AnswerInQue();
  }, [answer, selected]);

  const submitExam = () => {
    setIsDisable(true);
    let i = 0;
    Object.values(data).map((e) =>
      setQueAns((oldObj) => [
        ...oldObj,
        {
          question: idArray[i++],
          answer: e.answer === undefined ? ans : e.answer,
        },
      ])
    );
  };
  useEffect(() => {
    queAns.length !== 0 &&
      fetchDataPost(`/student/giveExam?id=${subId}`, getToken, queAns);
  }, [queAns]);
  const btnCell = (ind, i) => {
    return (
      <button
        disabled={ind === selected ? isDisable : true}
        style={i === answer && ind === selected ? rwClr : null}
        onClick={() => {
          setAnswer(i);
        }}
      >
        {i}
      </button>
    );
  };

  const clearAns = () => {
    setAnswer(ans);
    setRowClr();
    setIsDisable(true);
  };
  const columns = [
    {
      Header: "question",
      accessor: "question",
    },
    {
      Header: "Options",
      columns: [
        {
          Header: "Ans1",
          Cell: (props) => {
            return btnCell(props.index, props.original.options[0]);
          },
        },
        {
          Header: "Ans2",
          Cell: (props) => {
            return btnCell(props.index, props.original.options[1]);
          },
        },
        {
          Header: "Ans3",
          Cell: (props) => {
            return btnCell(props.index, props.original.options[2]);
          },
        },
        {
          Header: "Ans4",
          Cell: (props) => {
            return btnCell(props.index, props.original.options[3]);
          },
        },
      ],
    },
    {
      Header: "Answer",
      Cell: (props) => {
        return (
          <>
            {props.original?.answer === ans
              ? "-"
              : props.original?.answer === undefined
              ? "-"
              : props.original?.answer}
          </>
        );
      },
    },
    {
      Header: "Action",
      Cell: (props) => {
        return (
          <>
            <button
              onClick={() => {
                setRowClr({
                  border: "3px solid green",
                  background: "white",
                  color: "black",
                  borderRadius: "3px",
                });
                setIsDisable(false);
                setAnswer(
                  props.original?.answer !== ans ? props.original.answer : ans
                );
              }}
            >
              {props.original?.answer === ans
                ? "Attempt"
                : props.original?.answer === undefined
                ? "Attempt"
                : "Update"}
            </button>
            <button
              onClick={() => clearAns()}
              disabled={
                props.original?.answer === ans
                  ? true
                  : props.original?.answer === undefined
                  ? true
                  : false
              }
            >
              clear
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="renderData">
      {acData !== null && (
        <>
          <h2>Exam Preview</h2>
          <label>Subject : {subjectName} </label>
          <ReactTable
            getTrProps={(selected, rowInfo) => {
              return {
                onClick: () => {
                  setSelected(rowInfo.index);
                },
              };
            }}
            data={tblData}
            columns={columns}
            defaultPageSize={7}
            pageSizeOptions={[7]}
          ></ReactTable>
          <button onClick={() => submitExam()}>Submit Exam</button>
        </>
      )}
    </div>
  );
};

export default PendingExam;
