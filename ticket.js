class Ticket{
    //author name
    //ticket body
    //tags, tags are for an array
    //className
    constructor(id, author, body, className, parentTag, childTag){
        this.id = id;
        this.author = author;
        this.body = body;
        this.parentTag = parentTag;
        this.childTag = childTag;
        this.className = className;
        this.closed = false;
        this.response = "";
        this.viewed = false;
    }

    close(response){
        this.response = response;
        this.closed = true;
    }
}

module.exports = {
    "Ticket": Ticket
}