import React, { useState, useEffect } from "react";
import axios from "axios";
const AxiosFetch = () => {
  const [loading, setLoadingg] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchDataGet() {
      const res = await axios.get("http://localhost:4000/data");
      setLoadingg(false);   
      setData(res.data);
    }
    fetchDataGet();
  }, []);

  if (loading) {
    return (
      <h2 className="renderData">
        <div>Loading...</div>
      </h2>
    );
  }
  return (
    <div className="renderData">
      <div>
        <h2>using axios</h2>
        {data &&
          data?.map((dt) => {
            return (
              <div key={dt.id}>
                <div>{dt.name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AxiosFetch;
