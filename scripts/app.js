//DOM Queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms')


//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();

    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
})

//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName)
    newNameForm.reset();
    //show then hide the udpate message
    updateMsg.innerHTML = `Your name was updated to ${newName}.`;
    updateMsg.classList.add('alert','alert-success');
    setTimeout(() => {
        updateMsg.innerHTML = "";
        updateMsg.classList.remove('alert','alert-success')
    }, 3000);
})

//update the chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

//check local storage for username
const username = localStorage.username ? localStorage.username : 'anon'

//class instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('gaming', username);

//get chats and render
chatroom.getChats(data => chatUI.render(data));

