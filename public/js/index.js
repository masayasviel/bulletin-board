"use strict";

const appendChat = data => {
    let element;
    if (data["message"]) {
        element = document.createElement("div");
        element.textContent = data["message"];
    } else if(data["image"]) {
        element = document.createElement("img");
        element.src = data["image"];
    }
    document.getElementById("message").appendChild(element);
};

const getMessage = () => {
    const textBox = document.getElementById("textBox");
    const message = textBox.value.trim();
    textBox.value = "";
    return message;
};

const main = e => {
    const socket = io();
    socket.on("server_to_client", appendChat);
    const canvas = new Canvas();

    const sendMessageButton = document.getElementById("sendMessageButton");
    sendMessageButton.addEventListener("click", () => {
        const message = getMessage();
        if(message != "") {
            appendChat({"message": message});
            socket.emit("server_to_client", {"message": message});
        }
    });

    const sendImageButton = document.getElementById("sendImageButton");
    sendImageButton.addEventListener("click", () => {
        const canvasImage = canvas.exportImage();
        appendChat({"image": canvasImage});
        socket.emit("server_to_client", {"image": canvasImage});
    });

    const colorPallet = document.getElementById("colorPallet");
    colorPallet.addEventListener("change", e => {
        canvas.changeColor(e.target.value);
    });

    const clearCanvasButton = document.getElementById("clearCanvasButton");
    clearCanvasButton.addEventListener("click", () => canvas.clear());
}

window.addEventListener("load", main);