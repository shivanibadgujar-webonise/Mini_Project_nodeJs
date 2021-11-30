const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const jwt = require("jsonwebtoken");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Pass@123",
  database: "StudentDataBase",
});

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);


//  app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

//Initializing session
app.use(
  session({
    key: "userId",
    secret: "anything",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

//insert users into database
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (user_email,user_password) VALUES (?,?);",
      [email, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

/*
//JWT middleware
const verifyJWT = (req, res, next) => {
  const token =  req.headers["x-access-token"]

  if(!token)
  {
    res.send("token not available.");
  }else{
    jwt.verify(token,"jwtSecret", (err, decoded) => {
      if(err)
      {
        res.json({auth: false, message: "Authentication failed"});
      }else{
        req.userId = decoded.id;
        next();
      }
    })
  }
}

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Authentication successful !")
})

*/

app.get("/login",(req,res) => {
  if(req.session.user){
    res.send({loggedIn: true, user: req.session.user});
  }else{
    res.send({loggedIn:false});
  }
});


app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * from users WHERE user_email = ? ;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].user_password, (error, response) => {
          if (response) {
            
          /*
            //JWT  creating token

            const id = result[0].user_id
            const token = jwt.sign({id}, "jwtSecret",  {
              expiresIn: 300,
            })*/
            req.session.user = result; 

           // res.json({auth: true, token: token, result: result});
            res.send(result);
          } else {
            res.send({ message: "wrong email /password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

//queries for student table
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * from students";
  //const deptSelect = "SELECT department_name from departments";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

/*
app.get("/api/get", (req, res) => {
  const sqlSelectdept = "SELECT * from departments";
  //const deptSelect = "SELECT department_name from departments";
  db.query(sqlSelectdept, (err, result) => {
    res.send(result);
  }); 
});

*/

app.post("/api/insert", (req, res) => {
  const studentName = req.body.studentName;
  const studentEmail = req.body.studentEmail;
  const studentPassword = req.body.studentPassword;
  const studentLocation = req.body.studentLocation;

  const sqlInsert =
    "INSERT INTO students (student_name,student_email,student_password,student_location) VALUES (?,?,?,?)";
  db.query(
    sqlInsert,
    [studentName, studentEmail, studentPassword, studentLocation],
    (err, result) => {
      console.log(result);
    }
  );
});

/*
app.post("/api/insert", (req, res) => {
  const deptName = req.body.deptName;
  const hodName = req.body.hodName;
 

  const sqlInsertdept =
    "INSERT INTO departments (department_name,hod_name) VALUES (?,?)";
  db.query(
    sqlInsertdept,
    [deptName, hodName],
    (err, result) => {
      console.log(result);
    }
  );
});
*/

app.delete("/api/delete/:studentName", (req, res) => {
  const name = req.params.studentName;

  const sqlDelete = "DELETE FROM students WHERE student_name = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.studentName;
  const location = req.body.studentLocation;

  const sqlUpdate =
    "UPDATE students SET student_location=? WHERE student_name = ?";
  db.query(sqlUpdate, [location, name], (err, result) => {
    if (err) console.log(err);
  });
});
app.listen(3001, () => {
  console.log("running on port 3001");
});
