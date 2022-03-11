import React, { useState } from "react";
import CustomButton from "../../Shared/CustomButton";
import CustomInput from "../../Shared/CustomInput";

const question = {
  question: "",
  options: ["", "", "", ""],
  answer: "",
};

const Sample = () => {
  const [error, setError] = useState(null)
  const [questionPaper, setQuestionPaper] = useState({
    subjectName: "",
    questions: [question],
    notes: [],
  });

  const onChange = (event, index) => {
    const { name, value } = event.target;
    let clonedQuestionPaper = { ...questionPaper };
    if (name === "options") {
      clonedQuestionPaper.questions[questionPaper.questions.length - 1].options[
        index
      ] = value;
    } else if (name === "selectOpt") {
      clonedQuestionPaper.questions[questionPaper.questions.length - 1].answer =
        value;
    } else {
      clonedQuestionPaper.questions[questionPaper.questions.length - 1][name] =
        value;
    }

    setQuestionPaper(clonedQuestionPaper);
  };

  const addQuestion = () => {
  Object.values(question).some((e) => e==="")===false ? console.log("value") :setError("This field is Required");
  
    let newState = {...questionPaper};
    newState.questions.push({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
    setQuestionPaper(newState)
  };

  console.log('questionPaper :>> ', questionPaper);

  return (
    <div className="renderData">
      <h4>Question No:- {questionPaper.questions.length}</h4>

      {Object.entries(
        questionPaper.questions[questionPaper.questions.length - 1]
      ).map(([key, value], index) => {
        return (
          <div key={index}>
            {!Array.isArray(value) ? (
              <CustomInput
                name={key}
                type="text"
                value={value}
                onChange={(e) => onChange(e)}
                placeholder={key}
                requireField={error}
                readOnly={key === "answer"}
              />
            ) : (
              <>
                {value.map((v, i) => {
                  return (
                    <React.Fragment key={i}>
                      <CustomInput
                        label={
                          <CustomInput
                            type="radio"
                            name="selectOpt"
                            isChecked={
                              questionPaper.questions[
                                questionPaper.questions.length - 1
                              ].answer === v
                            }
                            onChange={(e) => onChange(e)}
                            value={v}
                          />
                        }
                        value={v}
                        placeholder={`Option${i + 1}`}
                        name={key}
                        requireField={error}
                        onChange={(e) => onChange(e, i)}
                      />
                      <br />
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </div>
        );
      })}
      <CustomButton value="add" onClick={addQuestion} />
    </div>
  );
};

export default Sample;
