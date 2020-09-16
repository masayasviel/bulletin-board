"use strict";

const appendMessage = (data) => {
    const div = document.createElement("div");
    div.textContent = data;
    document.getElementById("message").appendChild(div);
};

const getMessage = () => {
    const textBox = document.getElementById("textBox");
    const message = textBox.value.trim();
    textBox.value = "";
    return message;
};

const main = e => {
    const socket = io();
    socket.on("server_to_client", appendMessage);
    const sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", () => {
        const message = getMessage();
        if(message != "") {
            appendMessage(message);
            socket.emit("server_to_client", message);
        }
    });
}

window.addEventListener("load", main);