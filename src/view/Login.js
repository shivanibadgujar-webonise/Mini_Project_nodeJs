import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setuserPassword] = useState('');

  const [userEmailLog, setuserEmailLog] = useState('');
  const [userPasswordLog, setuserPasswordLog] = useState('');

  const [LoginStatus, setLoginStatus] = useState('');

  let history = useHistory();

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      email: userEmailLog,
      password: userPasswordLog,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].user_email);
        if (response.data[0].user_email === 'admin@gmail.com') {
          history.push('/App');
        } else {
          history.push('/Student_list');
        }
      }
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <>
      <div className="main-div">
        <div className="login-div">
          <div className="Title">
            <h2>Registeration </h2>
          </div>
          <label className="Label">Email</label> <br />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setuserEmail(e.target.value);
            }}
          />
          <br />
          <label className="Label">Password</label> <br />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => {
              setuserPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button onClick={register}>Register</button>
        </div>

        <div className="login-div">
          <div className="Title">
            <h2>LOGIN</h2>
          </div>
          <label className="Label">Email</label> <br />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setuserEmailLog(e.target.value);
            }}
          />
          <br />
          <label className="Label">Password</label> <br />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => {
              setuserPasswordLog(e.target.value);
            }}
          />
          <br />
          <br />
          <button onClick={login}>Login</button>
        </div>
      </div>

      <Link to="/App" className="redirectLink">
        Home Page
      </Link>

      <h1 className="errorMsg">{LoginStatus}</h1>
    </>
  );
}

export default Login;
