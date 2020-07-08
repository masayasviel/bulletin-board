const query = "http://localhost:3000";

const app = new Vue({
    el: "#app",
    data: {
        columns: null,
    },
    mounted() {
        fetch(query, {
            mode: "cors",
        })
        .then(res => res.json())
        .then(res => {
            this.columns = res.content;
        }, err => console.error("Error:", err));
    },
    methods: {
        insertNewMessage: function() {
            const fullname = document.getElementById("fullname").value;
            const username = document.getElementById("username").value;
            const message = document.getElementById("message").value;
            const parms = {
                fullname: fullname,
                username: username,
                message: message
            };
            fetch(query+"/add.json", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(parms),
                headers : {"Content-type" : "application/json"}
            })
            .then(res =>res.json())
            .then(res => {
                this.columns = res.content;
            }, err => console.error("Error:", err));
        }
    }
});