const functions = require("firebase-functions");
const admin = require("firebase-admin");

class Store {
    constructor() {
        admin.initializeApp(functions.config().firebase);
        this.firestore = admin.firestore();
    }
}

module.exports = Store;