document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (message) {
        displayMessage('You: ' + message);
        userInput.value = '';
        getBotResponse(message);
    }
});

function displayMessage(message) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += '<div>' + message + '</div>';
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
}

async function getBotResponse(userMessage) {
    try {
        const response = await fetch('AIzaSyA0S1DSNhy2LozAIg-xsTdmhAtfnnscKy0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer AIzaSyA0S1DSNhy2LozAIg-xsTdmhAtfnnscKy0`
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 150 // Adjust as needed
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Assuming the API returns a 'response' field
        const botResponse = data.response || "MindMesh: I'm here to help! Tell me more about how you feel.";
        
        setTimeout(() => {
            displayMessage('MindMesh: ' + botResponse);
        }, 1000);
        
    } catch (error) {
        console.error('Error fetching response from API:', error);
        displayMessage("MindMesh: Sorry, I'm having trouble understanding you right now.");
    }
}

