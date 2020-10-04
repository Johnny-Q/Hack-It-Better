const socket = io("http://localhost:4000");
const messageContainer = document.querySelector('.texts-container');
const messageForm = document.querySelector('.sendMessageButton');
const messageInput = document.querySelector('.message-input');

var urlParams = new URLSearchParams(window.location.search);
const groupID = urlParams.get("id");
console.log(groupID);
const name = prompt('What is your name?');



appendMessage('You joined', "");

socket.emit('join-group', groupID, name);

socket.on('chat-message', data => {
  console.log(data);
  appendMessage(data.name, data.message);
})

socket.on('user-connected', name => {
  appendMessage(name + " connected", "");
})

socket.on('user-disconnected', name => {
  appendMessage(name + " disconnected", "");
})

messageForm.addEventListener('click', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage("You", message);
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(name, message) {
  var messageElement = document.createElement('div');
  var img = document.createElement("img");
  var textInfo = document.createElement("div");
  var user = document.createElement("h3");
  var msg = document.createElement("p");
  messageElement.classList.add("text");
  img.classList.add("classmatePFP");
  img.src = "img/iconfinder_discord_3069758.png";

  user.innerText = name;
  msg.innerText = message;

  textInfo.append(user); textInfo.append(msg);

  messageElement.append(img); messageElement.append(textInfo);
  messageContainer.append(messageElement)
}