function getTickets(className) {
    var options = {
        "method": "GET"
    }
    //fetch is api client
    fetch("/ticket", options).then(res => {
        res.json().then(tickets => {
            //json with ids to tickets
            for (var [key, ticket] of Object.entries(tickets)) {
                var { id, author, body, parentTag, childTag, className, closed, response, viewed } = ticket;
                openTickets_teacher[className][parentTag][childTag].push(ticket);
                unpooled_tickets.push(ticket);
            }
            renderTickets(className);
        });
    });
}

//createTicket("johnny", "woo this is a ticket", "math", "worksheet1", "q1");
function createTicket(author, body, className, parentTag, childTag) {
    var jsonParams = {
        "author": author,
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
        
    });
}

function respondToTicket(id, response) {
    var jsonParams = {
        "id": id,
        "response": response
    };
    var options = {
        "method": "PUT",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(jsonParams)
    };
    // console.log(id, response);
    fetch("/ticket", options).then(res => {
        if (res.status == 200) {
            //remove locally here

        }
    });
}


function createTicketElement(ticket) {
    var { parentTag, childTag } = ticket;
    var ul = document.querySelector(`#${parentTag}-list`);
    var ticketLi = createElement("li", "ticket");
    var ticket_subject = createElement("p", "ticket-subject", childTag);
    ticketLi.append(ticket_subject);

    ticketLi.addEventListener("click", function (event) {
        openReplyModal(ticket, ticketLi);
    });

    ul.append(ticketLi);
} 

function renderTickets(className) {
    console.log(unpooled_tickets);
    for (var [key, value] of Object.entries(openTickets_teacher[className])) {
        for (var [k1, v1] of Object.entries(value)) {
            if (v1.legnth != 0) createTicketElement(v1[0]);
        }
    }
}

function createElement(type, clas, text = '') {
    var temp = document.createElement(type);
    temp.classList.add(clas);
    if (text) temp.innerText = text;
    return temp;
}

window.onload = function () {
    console.log("onload");
    getTickets("math");
};

var openTickets_teacher = {
    "math": {
        "worksheet1": {
            "q1": [],
            "q2": [],
            "q3": [],
            "q4": [],
            "q5": []
        },
        "worksheet2": {
            "q1": [],
            "q2": [],
            "q3": [],
            "q4": [],
            "q5": []
        }
    },
    "science": {
        "worksheet1": {
            "q1": [],
            "q2": [],
            "q3": [],
            "q4": [],
            "q5": []
        }
    },
    "geography": {
        "worksheet1": {
            "q1": [],
            "q2": [],
            "q3": [],
            "q4": [],
            "q5": []
        },
        "unitTest1": {
            "clarifications": [],
            "reviewquestsions": []
        }
    }
};
var unpooled_tickets = [];
var popup = document.querySelector(".popup");

function openReplyModal(ticket, ticketLi) {
    // var popup = document.querySelector(".popup");
    popup.style.display = "flex";
    document.querySelector(".ticket-subject").innerText = ticket.subject;
    document.querySelector(".ticket-body").innerText = ticket.body;

    document.querySelector(".positive").onclick = function () {
        //do something with the ticket
        respondToTicket(ticket.id, document.querySelector("textarea[name=body]").value);
        document.querySelector("textarea[name=body]").value = "";
        ticketLi.remove();
        closeReplyModal();
    };

}
window.onclick = function (event) {
    if (event.target == popup) {
        closeReplyModal();
    }
}
function closeReplyModal() {
    // var popup = document.querySelector(".popup");
    popup.style.display = "none";
}
