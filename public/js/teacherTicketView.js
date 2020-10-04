function getTickets() {
    var options = {
        "method": "GET"
    }
    //fetch is api client
    fetch("/ticket", options).then(res => {
        res.json().then(tickets => {
        //json with ids to tickets
            for(var [key, ticket] of Object.entries(tickets)){
                var{id, author, body, parentTag, childTag, className, closed, response, viewed}= ticket;
                openTickets_teacher[className][parentTag][childTag].push(ticket);
            }

            console.log(tickets);
        });
    });
}

//createTicket("johnny", "woo this is a ticket", "math", "worksheet1", "q1");
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
    fetch("/ticket", options).then(res=>{
        if(res.status == 200){
            //remove locally here

        }
    });
}

window.onload = function () {
    getTickets();
};

var openTickets_teacher = {
    "math": {
        "worksheet1":{
            "q1":[],
            "q2":[],
            "q3":[],
            "q4":[],
            "q5":[]
        }
    },
    "science":{
        "worksheet1":{
            "q1":[],
            "q2":[],
            "q3":[],
            "q4":[],
            "q5":[]
        }
    },
    "geography":{
        "worksheet1":{
            "q1":[],
            "q2":[],
            "q3":[],
            "q4":[],
            "q5":[]
        },
        "unitTest1":{
            "clarifications":[],
            "reviewquestsions":[]
        }
    }
};