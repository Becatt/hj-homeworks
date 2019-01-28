'use strict';

const chat = document.querySelector('.chat');
const messagesTemplates = document.querySelector('.messages-templates');
const chatStatus = chat.querySelector('.chat-status');
const messageStatus = messagesTemplates.querySelector('.message-status');
const messages = chat.querySelector('.messages-content')
const submit = chat.querySelector('.message-submit');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

function addNode(node, text = '', selector = '.message-text') {
  const clone = node.cloneNode(true);
  messages.appendChild(clone);
  const lastChild = messages.children[messages.children.length - 1];
  if (text !== '') {
    lastChild.querySelector(selector).textContent = text;
  }
  if(lastChild.querySelector('.timestamp')) {
    const now = new Date();
    lastChild.querySelector('.timestamp').textContent = now.toLocaleTimeString().slice(0, 5);
  }
}

connection.onopen = () => {
  chatStatus.textContent = chatStatus.getAttribute('data-online');
  addNode(messageStatus, 'Пользователь появился в сети')
  submit.removeAttribute('disabled');
}

connection.onmessage = (event) => {
  const data = event.data;
  if(data === '...') {
    addNode(messagesTemplates.querySelector('.loading'));

  } else {
    if(messages.querySelector('.loading')) {
      messages.removeChild(messages.querySelector('.loading'));
    }
    addNode(messagesTemplates.querySelectorAll('.message')[1], data);
  }

}

submit.addEventListener('click', sendMessage);

function sendMessage(event) {
  event.preventDefault();
  const text = chat.querySelector('.message-input').value;
  addNode(messagesTemplates.querySelector('.message-personal'), text);
  connection.send(text);
  chat.querySelector('.message-input').value = '';
}

connection.onclose = () => {
  chatStatus.textContent = chatStatus.getAttribute('data-offline');
  addNode(messageStatus);
  submit.setAttribute('disabled', '');
}

// Разрыв соединения сочетание клавиш ctrl+Q
document.addEventListener('keydown', closeConnection);
function closeConnection(event) {
  if (!event.ctrlKey) {
    return;
  }
  if(event.code === 'KeyQ') {
    connection.close();
  }
}
