function getTickets(className) {
    var options = {
        "method": "GET"
    }
    //fetch is api client
    fetch("/ticket", options).then(res => {
        res.json().then(tickets => {
            for (var [key, ticket] of Object.entries(tickets)) {
                unpooled_tickets.push(ticket);
            }
            renderTickets(className);
        });
    });
}

function createTicket(author, subject, body, className, parentTag, childTag) {
    var jsonParams = {
        "author": author,
        "subject": subject,
        "body": body,
        "className": className,
        "parentTag": parentTag,
        "childTag": childTag
    };
    var options = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(jsonParams)
    };
    fetch("/ticket", options).then(res => {
        res.json().then(ticket => {
            createTicketElement(ticket);
        });
    });
}

function createTicketElement(ticket) {
    var { closed, subject } = ticket;
    var ul = document.querySelector(`#${closed ? "returnedTickets" : "submittedTickets"}-list`);
    var ticketLi = createElement("li", "ticket");
    var ticket_subject = createElement("p", "ticket-subject", subject);
    ticketLi.append(ticket_subject);

    if (closed) {
        ticketLi.addEventListener("click", () => {
            showResponse(ticket);
        });
    }

    ul.append(ticketLi);
}

function renderTickets(className) {
    console.log(unpooled_tickets);
    unpooled_tickets.forEach(ticket => {
        console.log(ticket);
        createTicketElement(ticket);
    });
}

function createElement(type, clas, text = '') {
    var temp = document.createElement(type);
    temp.classList.add(clas);
    if (text) temp.innerText = text;
    return temp;
}

window.onload = function () {
    getTickets("math");
}

var unpooled_tickets = [];
var selected_tags = [];
function showResponse(ticket) {
    document.querySelector(".show-response").style.display = "flex";
    document.querySelector(".ticket-subject").innerText = ticket.subject;
    document.querySelector(".ticket-body").innerText = ticket.body;
    document.querySelector(".ticket-response").value = "Teacher's Response\n\n" + ticket.response;
}
function showCreate() {
    document.querySelector(".create-ticket").style.display = "flex";
}
function showCreateGroup() {
    document.querySelector(".create-group").style.display = "flex";
}
document.querySelectorAll(".negative").forEach(btn => {
    btn.addEventListener("click", hideModals);
});
document.querySelector(".createTicket").addEventListener("click", showCreate);

document.querySelector(".createGroup").addEventListener("click", showCreateGroup);
document.querySelector(".sendTicket").onclick = function () {

    createTicket("johnny", document.querySelector("input[name=title]").value, document.querySelector("textarea[name=body]").value, "math", "worksheet1", "q3");
    hideModals();

};

document.querySelector(".addGroup").addEventListener("click", function(){
    addGroupElement(document.querySelector(".group-name").value, document.querySelector(".group-desc").value);
    hideModals();
});

function addGroupElement(name, desc){
    var scroller  = document.querySelector(".scroller");
    var element = document.createElement("div");
    element.classList.add("studyGroup");
    element.innerText = name;
    element.onclick = function(){
        window.location.assign(`/chat?id=${name}`);
    }
    scroller.append(element);
}
function hideModals() {
    document.querySelectorAll(".popup").forEach(popup => {
        popup.style.display = "none";
    });
}