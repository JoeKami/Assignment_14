'use strict';

var usernamePage : Element = document.querySelector(selectors: "#username-page");
var chatPage : Element = document.querySelector(selectors: "#chat-page");
var usernameForm : Element = document.querySelector(selectors: '#usernameForm');
var messageForm : Element = document.querySelector(selectors: '#messageForm');
var messageInput : Element = document.querySelector(selectors: '#message');
var messageArea : Element = document.querySelector(selectors: '#messageArea');
var connectingElement : Element = document.querySelector(selectors: '.connecting');

var stompClient : null = null;
var username : null = null;

var colors: string[] = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect (event) : void {
    username = document.querySelector(selectors: '#name').value.trim();
    if (username) {
    usernamePage.classList.add('hidden');
        usernamePage.classList.add('hidden');
        chatPage.classList.remove(tokens: 'hidden');

        var socket : SocketJS = new SocketJS ('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnect, onError);
    }
    event.preventDefault();
}

function onConnected(){
    //subscribe to the public topic
    stompClient.subscribe('/topic/public', onMessageRecieved);

    // tell username to the server
    stompClient.send('/app/chat.addUser',{}, JSON.stringify())
}

function onError() {
    connectingElement.textContent = 'Could not connect to Websocket server. Please refresh this page and try again.';
    connectingElement.style.color = 'red';
}

function onMessageRecieved(payload) {
    

}

function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
        var chatMessage : {content: ..., sender:null, type: string} = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };
        stompClient.send(
            '/app/chat.sendMessage',
            {},
            JSON.stringify(chatMessage)
        );
        messageInput.content = '';
    }
    event.preventDefault();
}

usernameForm.addEventListener(type: 'submit', connect, options: true);
messageForm.addEventListener(type: 'submit', sendMessage, options: true);