const socket = io("http://localhost:3000");
const button = document.getElementById("send-btn");

button.addEventListener("click", () => {
    const input = document.getElementById('msg');
    const msg = input.value.trim();

    if (msg.length == 0) {
        alert('Please enter a message before sending.');
        return;
    }

    socket.emit('message', msg);
    input.value = "";
});

socket.on('message', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('chat').appendChild(li);
});

socket.on('ConnectionError', (msg) => {
    alert(msg);
});

// document .getElementById('send-btn').addEventListener('click', () => {
//     const input = document.getElementById('msg');
//     const msg = input.value.trim();

//     if (msg.length == 0) {
//         alert('Please enter a message before sending.');
//         return;
//     }

//     socket.emit('message', msg);
//     input.value='';
// });
