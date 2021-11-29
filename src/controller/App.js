import React, { useState, useEffect } from "react";
import "../view/css/app.css";
import Axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentLocation, setStudentLocation] = useState("");
  const [deptName, setDeptName] = useState("");
  const [hodName, setHodName] = useState("");
  const [updateData, setUpdateData] = useState("");

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setStudentList(response.data);
    });
  }, []);

  const submitEntry = () => {
    Axios.post("http://localhost:3001/api/insert", {
      studentName: studentName,
      studentEmail: studentEmail,
      studentPassword: studentPassword,
      studentLocation: studentLocation,
      deptName: deptName,
      hodName: hodName,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          studentName: studentName,
          studentEmail: studentEmail,
          studentPassword: studentPassword,
          studentLocation: studentLocation,
          deptName: deptName,
          hodName: hodName,
        },
      ]);
    });
  };

  const deleteEntry = (sname) => {
    Axios.delete(`http://localhost:3001/api/delete/${sname}`);
  };

  const updateEntry = (sname) => {
    Axios.put("http://localhost:3001/api/update", {
      studentName: sname,
      studentLocation: updateData,
    });

    setUpdateData("");
  };
  return (
    <div className="App">
      <div className="redirectLink">
        <Link to="/">Logout </Link>
      </div>
      <h1 className="title">STUDENT PORTAL</h1>

      <div className="form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="insert_input"
          onChange={(e) => {
            setStudentName(e.target.value);
          }}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="insert_input"
          onChange={(e) => {
            setStudentEmail(e.target.value);
          }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          className="insert_input"
          onChange={(e) => {
            setStudentPassword(e.target.value);
          }}
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          className="insert_input"
          onChange={(e) => {
            setStudentLocation(e.target.value);
          }}
        />

        <br />
        <br />

        <button className="btn" onClick={submitEntry}>
          Submit
        </button>

        <br />
        <br />
        <br />

        <Link to="/List" className="show_table_link">
          Show Table
        </Link>
      </div>
    </div>
  );
}

export default App;
