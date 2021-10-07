import { io } from "socket.io-client";

const PORT = process.env.PORT || 5000;
const socket = io("https://app-chat12.herokuapp.com/");
const chatInput = document.querySelector(".chat-input");
const chatBtn = document.querySelector(".chat-btn");
const messages = document.querySelector(".messages");
let lastId = null;

if (!localStorage.getItem("username")) {
  const username = prompt("Enter your name");
  localStorage.setItem("username", username ? username : "");
}

console.log(localStorage.getItem("username"));

socket.on("message-server", (message, id, username) => {
  renderMessageFriend(message, id, username);
  scrollLastestMessage();
  lastId = id;
});

chatInput.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    sendMessage();
  }
});

chatBtn.addEventListener("click", () => {
  sendMessage();
});

function renderMessageMe(message) {
  messages.insertAdjacentHTML(
    "beforeend",
    `<div class="message__item message__item--me">
    <span class="message__content">${message}</span>
  </div>`
  );
}

function renderMessageFriend(message, id, username) {
  messages.insertAdjacentHTML(
    "beforeend",
    `<div class="message__item message__item--friend ${
      id === lastId ? "mt-4" : "mt-12"
    }">
        ${
          id === lastId
            ? ""
            : `<span class="message__author">${
                username ? username : "Anonymous"
              }</span>`
        }
        <span class="message__content">${message}</span>
      </div>`
  );
}

function scrollLastestMessage() {
  messages.scrollTo(0, messages.scrollHeight);
}

function sendMessage() {
  lastId = socket.id;
  const message = chatInput.value;
  if (message) {
    socket.emit("message-client", message, localStorage.getItem("username"));
    renderMessageMe(message);
    chatInput.value = ""; //clear input
    scrollLastestMessage();
  }
}
