import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
    const [data, setData] = useState(null);
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:56733/home");
          setData(response.data);
          console.log("success")
        } catch (error) {
          console.error("There was an error fetching the data!", error);
        }
      };
    
      fetchData();
    
      // Polling interval to fetch data every 5 seconds
      const intervalId = setInterval(fetchData, 5000);
    
      return () => clearInterval(intervalId);
    }, []);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      //เป็นการยิง API(axios) ไปหลังบ้านว่าเราจะเอา get or post  
      axios
        .post("http://localhost:56733/sent/data", { Fname ,Lname})
        //เมื่อทำการ response จะเข้า then ถ้าไม่ก็จะไปเข้าcatch 
        .then((response) => {
          console.log(response.data);
          console.log("ตัวมอมมากกกก")
          alert("Data sent successfully");
        })
        .catch((error) => {
          console.error("There was an error sending the data!", error);
        });
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Data from Flask</h1>
          {data ? (
            <div>
              <p>Key: {data.key}</p>
              <p>Number: {data.number}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </header>
        {/* onSubmit={handleSubmit} คือการระบุว่าจะส่งไปที่ไหนเมื่อsubmit */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <br/>
          <input
            type="text"
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <button type="submit">Send Data</button>
        </form>
      </div>
    );
  };