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

app.get("/chat", function (req, res) {
    res.render("chat.html");
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
    var { author, body, parentTag, childTag, className } = req.body;
    tickets[idCounter] = new Ticket(idCounter, author, body, parentTag, childTag, className);

    idCounter++;
    res.sendStatus(200);
});

app.put("/ticket", function (req, res) {
    //response to ticket
    var { response } = req.body;
    //get id of ticket
    var { id } = req.body;


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

//ticket id to actual ticket so we can access it better
var tickets = {};

app.listen(3000, function () {
    console.log("listening on http://localhost:3000");
});