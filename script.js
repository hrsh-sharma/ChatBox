document.addEventListener('DOMContentLoaded', () => {
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');

    function createMessage(content, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + (isUser ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = content;

        if (isUser) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'message-actions';
            actionsDiv.innerHTML = `
                <button onclick="editMessage(this)">Edit</button>
                <button onclick="deleteMessage(this)">Delete</button>
            `;
            messageDiv.appendChild(actionsDiv);
        }

        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    window.sendMessage = function() {
        const message = userInput.value.trim();
        if (message) {
            createMessage(message, true);
            userInput.value = '';
            setTimeout(() => {
                createMessage('How can I help you?', false);
            }, 500);
        }
    }

    window.editMessage = function(button) {
        const messageDiv = button.parentNode.parentNode;
        const originalContent = messageDiv.firstChild.textContent;
        const newContent = prompt('Edit your message:', originalContent);
        if (newContent !== null && newContent.trim() !== '') {
            messageDiv.firstChild.textContent = newContent.trim();
        }
    }

    window.deleteMessage = function(button) {
        const messageDiv = button.parentNode.parentNode;
        chatbox.removeChild(messageDiv);
    }

    window.deleteAllMessages = function() {
        chatbox.innerHTML = '';
    }
});
