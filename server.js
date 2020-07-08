const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000;
const mysqlSetting = {
    host: "localhost",
    user: "root",
    password: "",
    database: "my-nodeapp-db"
};

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (request, response) => {
    const connection = mysql.createConnection(mysqlSetting);
    connection.connect();
    connection.query("SELECT * FROM mydata", (error, result)=>{
        if (error == null) {
            response.send(JSON.stringify({content: result}));
        }
    });
    connection.end();
});

app.post("/add.json", (request, response) => {
    const data = {
        "fullname": request.body.fullname,
        "username": request.body.username,
        "message": request.body.message
    };
    const connection = mysql.createConnection(mysqlSetting);
    connection.connect();
    connection.query("INSERT INTO mydata SET ?", data, (error, result)=>{
        response.redirect("/");
    });
    connection.end();
});

const server = app.listen(PORT, ()=>console.log("Server is running!"));