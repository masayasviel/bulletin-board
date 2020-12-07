import express from "express";
const app = express();

import bodyParser from "body-parser";
import cors from "cors";
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

import { close, findAll, append } from "./table"

app.get("/", async (req: express.Request, res: express.Response) => {
    res.send("hello world");
    await findAll();
});

app.get("/end", async (req: express.Request, res: express.Response) => {
    close();
});

app.post("/add.json", async (req: express.Request, res: express.Response) => {
    const data = {
        "name": req.body.name,
        "message": req.body.message
    };
    append(data);
});

app.listen(3000, () => console.log("Server is running!\nplz access http://localhost:3000/"));