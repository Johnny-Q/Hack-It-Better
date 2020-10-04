const express = require("express");
const bodyParser = require("body-parser");
const io = require("socket.io")(4000);

const { Ticket } = require("./ticket");
const app = express();
app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));

app.use(bodyParser.json());

var idCounter = 0;

//views
app.get("/", function (req, res) {
    res.render("test.html");
});
app.get("/teacher", function (req, res) {
    res.render("teacher_ticket.html");
});
app.get("/student", function (req, res) {
    res.render("student_dashboard.html");
});
app.get("/teacher", function (req, res) {
    res.render("teacher_ticket.html");
});

app.get("/chat", function (req, res) {
    res.render("studyGroup.html");
});

//api endpoints RESTful
//ticketing
app.get("/ticket", function (req, res) {
    console.log(tickets);
    res.send(JSON.stringify(tickets));
    // res.sendStatus(200);
});

app.post("/ticket", function (req, res) {
    //json params: author, body, tags, className
    var { author, body, subject, parentTag, childTag, className } = req.body;
    tickets[idCounter] = new Ticket(idCounter, author, subject, body, className, parentTag, childTag);
    console.log("create ticket", subject, body);
    idCounter++;
    res.send(tickets[idCounter-1]);
});

app.put("/ticket", function (req, res) {
    //response to ticket
    var { response } = req.body;
    //get id of ticket
    var { id } = req.body;
    console.log(response, id);

    tickets[id].close(response);

    res.sendStatus(200);
});

app.delete("/ticket", function (req, res) {

});


//realtime chatting
const groups = {};
const users = {}

io.on('connection', socket => {
    socket.on("join-group", (groupID, name) => {
        console.log("join-group", groupID, name);
        socket.join(groupID);
        socket.to(groupID).broadcast.emit("user-connected", name);
        
        // socket.on('new-user', name => {
        //     users[socket.id] = name
        //     console.log("new user", name);
        //     socket.broadcast.emit('user-connected', name)
        // })

        socket.on('send-chat-message', message => {
            socket.to(groupID).broadcast.emit('chat-message', { "message": message, "name": name });
        });

        // socket.on('disconnect', () => {
        //     socket.to(groupID).broadcast.emit('user-disconnected', users[socket.id]);
        //     delete users[socket.id];
        // })
    })
});

//keys would be class
//key to array of tickets
//parent tags
//  ->child tags
// openTickets.Math.worksheet1
//openTickets["Math"]["worksheet1"][q1].push;
var classes = {
    "science":{
        "assignments":[],
        "chats":[]
    },
    "math":{
        "assignments":["worksheet1", "worksheet2", "test"],
        "chats":[]
    },
    "english":{
        "assignments":[],
        "chats":[]
    },
    "economics":{
        "assignments":[],
        "chats":[]
    }
};


//ticket id to actual ticket so we can access it better
var tickets = {};
tickets[0] = new Ticket(0, "johnny", "subject", "alskdjfaslkdjf", "math", "worksheet1", "q1");
tickets[1] = new Ticket(1, "johnny", "subject", "alskdjfaslkdjf", "math", "worksheet1", "q1");
tickets[2] = new Ticket(2, "johnny", "subject", "alskdjfaslkdjf", "math", "worksheet2", "q1");
tickets[3] = new Ticket(3, "johnny", "subject", "alskdjfaslkdjf", "math", "worksheet1", "q1");
tickets[4] = new Ticket(4, "johnny", "subject", "alskdjfaslkdjf", "math", "worksheet2", "q1");
tickets[5] = new Ticket(5, "johnny", "subject", "alskdjfaslkdjf", "math", "worksheet1", "q1");

for(var i = 0;i < 6; i++){
    tickets[i].close("reeeeee");
}
app.listen(3000, function () {
    console.log("listening on http://localhost:3000");
});