import React, { useState, useEffect } from "react";
import './css/app.css';
import Axios from "axios";
import { Link } from "react-router-dom";
import App from "../controller/App";



function Student_list()
 {

 App();

  const [updateData, setUpdateData] = useState("");

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setStudentList(response.data);
      });
  }, []);

  const submitEntry = () => {

    Axios.post("http://localhost:3001/api/insert", {
      studentName: StudentName,
      studentEmail: StudentEmail,
      studentPassword: StudentPassword,
      studentLocation: StudentLocation,
      deptName: DeptName,
      hodName: HodName,
    });
  
    setStudentList([ 
        ...studentList,
        {
          studentName: StudentName,
          studentEmail: StudentEmail,
          studentPassword: StudentPassword,
          studentLocation: StudentLocation,
          deptName: DeptName,
          hodName: HodName,
        },
      ]);
    };

    const deleteEntry = (sname) => {
      Axios.delete(`http://localhost:3001/api/delete/${sname}`);
    }

    const updateEntry = (sname) => {
      Axios.put("http://localhost:3001/api/update", {
                studentName: sname,
                studentLocation: updateData
      })
    
           setUpdateData("")

    };
  return (
    <div className="App"> 
    <div className="redirectLink">
      <Link to="/" >Logout </Link>
      </div>

      <div className="form">        
        
    
        <h1>Student List</h1>
        
        {studentList.map((value) => {
          return (
            <>

           <table className="dataTable">
             <tbody>
              <tr>
                <td><b>Name:  </b> {value.student_name}</td>
                <td><b>Email:  </b> {value.student_email}</td>
                <td><b>Password:  </b> {value.student_password}</td>
                <td><b>Location:  </b> {value.student_location}</td>               
             </tr>
              </tbody>
            </table>
             </> 
          );
        })}
      </div>
      </div>
    
  );
}

export default Student_list;
