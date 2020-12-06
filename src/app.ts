import express from "express";
const app = express();

import bodyParser from "body-parser";
import cors from "cors";
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

import Orm from "./orm";
const orm = new Orm();

app.get("/", async (req: express.Request, res: express.Response) => {
    res.send("hello world");
    const tableByStringJSON = await orm.append({name: "masayasviel", message: "test"});
});

app.get("/end", async (req: express.Request, res: express.Response) => {
    orm.destructor();
});

app.listen(3000, () => console.log("Server is running!\nplz access http://localhost:3000/"));