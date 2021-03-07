const express = require("express");

const UserStore = require("../stores/userStore");

const router = express.Router();
let userTable = new UserStore();;

router
    .get("/", async (request, response) => {
        const users = await userTable.readAll();
        response.send(users);
    })
    .get("/:id", async (request, response) => {
        const user = await userTable.read(request.params.id);
        response.send(user);
    })
    .get("/add/:id/:name", async (request, response) => {
        const message = await userTable.create({
            userName: request.params.id,
            displayName: request.params.name
        })
        response.send(message);
    });

module.exports = router;