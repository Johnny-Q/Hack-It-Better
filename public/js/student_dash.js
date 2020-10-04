function getTickets(className) {
    var options = {
        "method": "GET"
    }
    //fetch is api client
    fetch("/ticket", options).then(res => {
        res.json().then(tickets => {
            for(var [key, ticket] of Object.entries(tickets)){
                unpooled_tickets.push(ticket);
            }
            renderTickets(className);
        });
    });
}

function createTicket(author, body, className, parentTag, childTag) {
    var jsonParams = {
        "author":author,
        "body":body,
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

function createTicketElement(ticket){
    var {closed, childTag} = ticket;
    var ul = document.querySelector(`#${closed?"returnedTickets":"submittedTickets"}-list`);
    var ticketLi = createElement("li", "ticket");
    var ticket_subject = createElement("p", "ticket-subject", childTag);
    ticketLi.append(ticket_subject);

    ul.append(ticketLi);
}

function renderTickets(className){
    console.log(unpooled_tickets);
    unpooled_tickets.forEach(ticket=>{
        console.log(ticket);
        createTicketElement(ticket);
    });
}

function createElement(type, clas, text=''){
    var temp = document.createElement(type);
    temp.classList.add(clas);
    if(text) temp.innerText = text;
    return temp;
}

window.onload = function(){
    getTickets("math");
}

var unpooled_tickets = [];