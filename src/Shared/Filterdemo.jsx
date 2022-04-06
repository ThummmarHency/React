import React, { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const Filter = ({ attribute }) => {
  const [filter1, setFilter] = useState([]);
  const [data, setData] = useState(attribute);
  const [header, setHead] = useState([]);
  const keyName = "name";
   useEffect(()=>{
      attribute.map((e) => Object.keys(e).map((key) => setHead(old=>[...old,key])));
    },[])
    const rmvDupObj=header
    .filter((item, i, ar) => ar.indexOf(item) === i)
  const Thead = () => {
    return (
      <tr>
        {rmvDupObj
          .map((h1, index) => (
            <th key={index}>{h1}</th>
          ))}
      </tr>
    );
  };
  const Tbody = () => {
    return data.length !== 0 ? (
      Object.values(data).map((trow, index) => (
        <tr key={index}>
          {rmvDupObj
            .map((h1, index1) => (
              <td key={index1}>
                {trow[h1] === (undefined || "") ? "-" : trow[h1]}
              </td>
            ))}
        </tr>
      ))
    ) : (
      <tr>
        <td>No data found</td>
      </tr>
    );
  };

  const getUniqueObj = (arr, comp) => {
    const uniqueObj = arr
      .map((e) => e[comp])
      .map((e, i, arr) => arr.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return uniqueObj;
  };

  useEffect(() => {
    const result = attribute.filter((item) => {
      for (let key in filter1) {
        if (item[key] !== undefined) {
          if (filter1[key].length !== 0) {
            if (
              !item[key].includes(filter1[keyName]) &&
              !filter1[key].includes(item[key])
            ) {
              return false;
            }
          }
          if (
            filter1[keyName] &&
            filter1[keyName].length === 0 &&
            filter1[key].length !== 0
          ) {
            if (!filter1[key].includes(item[key])) {
              return false;
            }
          }
        } else {
          if (filter1[key].length !== 0) return false;
        }
      }
      return true;
    });
    console.log("result :>> ", result);
    setData(result);
  }, [filter1]);
  console.log("filter1 :>> ", filter1);
  const handleChange = (e, key) => {
    if (key === keyName) {
      setFilter({
        ...filter1,
        [key]: e.target.value === "" ? [] : [e.target.value],
      });
    } else {
      if (e.target.checked) {
        setFilter(
          filter1[key]
            ? { ...filter1, [key]: [e.target.value, ...filter1[key]] }
            : { ...filter1, [key]: [e.target.value] }
        );
      } else {
        setFilter({
          ...filter1,
          [key]: filter1[key].filter((value) => value !== e.target.value),
        });
      }
    }
  };
  
  return (
    <div>
      <div style={{ display: "flex" }}>
        {rmvDupObj
          .map((h1, index) => {
            return (
              <div key={index}>
                <h5 style={{ padding: "5px" }}>
                  {h1 === "id" ? (
                    ""
                  ) : h1 === keyName ? (
                    <input
                      type="text"
                      placeholder={h1}
                      onChange={(e) => handleChange(e, h1)}
                    />
                  ) : (
                    h1
                  )}
                </h5>
                {getUniqueObj(attribute, h1).map((trow, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        padding: "5px",
                        borderRight: "1px solid rgb(170, 167, 167)",
                      }}
                    >
                      {trow[h1] && h1 !== "id" && h1 !== keyName && (
                        <>
                          <label className="switch">
                            <input
                              type="checkbox"
                              name={h1}
                              value={trow[h1]}
                              onChange={(e) => {
                                handleChange(e, h1);
                              }}
                            />
                            <span className="slider round"></span>
                          </label>
                          <div style={{ padding: "2px" }}>{trow[h1]}</div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <br />
      <table className="table table-striped table-bordered">
        <thead><Thead/></thead>
        <tbody><Tbody/></tbody>
      </table>
    </div>
  );
};

export default Filter;
