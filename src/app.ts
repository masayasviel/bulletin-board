import express from "express";
const app = express();
import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    database: "test_database",
    username: "docker",
    password: "docker",
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

app.get("/", async (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
    await sequelize.authenticate().then(()=> {
        console.log('Connection has been established successfully.');
    }).catch(err=> {
        console.error('Unable to connect to the database:', err);
    })
    await sequelize.close();
});

const server = app.listen(3000, ()=>console.log("Server is running!\nplz access http://localhost:3000/"));