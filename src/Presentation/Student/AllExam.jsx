import React from 'react'
import ShowData from '../../Shared/ShowData'

const Allexam = () => {
  return (
      <ShowData api="/student/studentExam" h1="Id" a1="_id" h2="Notes" a2="notes" h3="Email" a3="email" h4="SubjectName" a4="subjectName" h5="hdjh" navigate="../exam-detail" Header="View Exam" btnText="View"/>
  )
}

export default Allexam




import React, { useState ,useEffect} from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const DisplayTbl = ({ Attribute }) => {
  const [filter1,setFilter]=useState([])
  const [data, setData] = useState([]);

  let header = [];
  Attribute.map((e) => Object.keys(e).map((key) => header.push(key)));

  const thead = () => {
    return  <div className="row bg-dark text-white"> 
    {header.filter((item, i, ar) => ar.indexOf(item) === i)
      .map((h1, index) => (
        <div className={`col-1`} key={index}>
          {h1}
        </div>
      ))}
      </div>
  };
  const tbody = () => {
    return Object.values(data).map((trow, index) => (
      <div className="row" key={index}>
        {header
          .filter((item, i, ar) => ar.indexOf(item) === i)
          .map((h1, index1) => (
            <div className={`col-1 border`} key={index1}>
              {trow[h1] === undefined ? "-" : trow[h1]}
            </div>
          ))}
      </div>
    ));
  };
 
  const getUniqueObj=(arr, comp)=>{
    const uniqueObj =  arr.map(e => e[comp]).map((e, i, arr) => arr.indexOf(e) === i && i).filter((e) => arr[e]).map(e => arr[e])
    return uniqueObj;
  }
  
useEffect(()=>{
  const result = Attribute.filter((item) => {
      for (let key in filter1) {
        console.log('item :>> ', key);
        if (filter1[key].length === 0 || !filter1[key].includes(item[key])) {
          return false;
        }
      }
    return true;
  });
  console.log('result :>> ', result);
  setData(result);
},[filter1])
console.log('filter1 :>> ', filter1);

const handleChange=(e,key)=>{  
  if (e.target.checked || key==="name") 
  { setFilter(filter1[key]?{...filter1,[key]:[e.target.value,...filter1[key]]}:{...filter1,[key]:[e.target.value]})
  } 
  else { 
    // setFilter({...filter1,[key]:filter1[key].filter((value)=>value !==e.target.value)})
    // console.log('filter1.filter((e)=>e!==key) :>> ',Object.keys(filter1).filter((a)=>a!==key));
    setFilter([key].length===1?"":{...filter1,[key]:filter1[key].filter((value)=>value !==e.target.value)})
  }  
}

  return (
    <div>
      <div style={{display:"flex"}}>
        {header
          .filter((item, i, ar) => ar.indexOf(item) === i)
          .map((h1, index) => {
            return (
              <div key={index}>
                <h5 style={{padding:"5px"}}>{h1 === "id" ? "" : h1==="name" ? <input type="text" placeholder={h1} onChange={(e)=>handleChange(e,h1)} />: h1}</h5>
                {getUniqueObj(Attribute, h1).map((trow, index) => {
                  return (
                    <div key={index} style={{display:"flex",padding:"5px",borderRight:"1px solid rgb(170, 167, 167)"}}>
                      {trow[h1] && h1!=="id" && h1!=="name" && (
                          <>
                           <label className="switch">
                            <input
                              type="checkbox"
                              name={h1}
                              value={trow[h1]}
                              onChange={(e)=>{handleChange(e,h1)}}
                            />
                            <span className="slider round"></span>
                          </label>
                          <div style={{padding:"2px"}}>{trow[h1]}</div>
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
      <div className="container">
       {thead()}
       {tbody()}
      </div>
    </div>
  );
};

export default DisplayTbl;


//css
.switch {
  position: relative;
  display: inline-block;
  width: 25px;
  height: 12px;
  top: 6px;
  margin: 2px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(170, 167, 167);
  -webkit-transition: .4s;
  transition: .3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  background-color: rgb(241, 239, 239);
  -webkit-transition: .4s;
  transition: .3s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(16px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}