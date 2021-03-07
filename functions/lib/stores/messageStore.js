const Store = require("./store");

class MessageStore extends Store {
    constructor() {
        super();
        this.messageTable = this.firestore.collection("messages");
    }
}

module.exports = MessageStore;