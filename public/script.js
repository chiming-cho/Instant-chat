const socket = io("http://localhost:3000");

const button = document.getElementById("send-btn");
button.addEventListener("click", () => {
    const msg = document.getElementById('msg').value;
    socket.emit('message', msg);
});

socket.on('message', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('chat').appendChild(li);
});