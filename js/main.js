
  // Chatbot functionality
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotSpinner = document.getElementById('chatbot-spinner');

  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close chatbot on close button click
  chatbotClose.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
  });

  // Close chatbot when clicking outside the chatbot frame
  document.addEventListener('click', (event) => {
    if (!chatbotContainer.contains(event.target) && event.target !== chatbotToggle) {
      chatbotContainer.style.display = 'none';
    }
  });

  // Send message on button click or Enter key press
  const sendMessage = async () => {
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;

    // Display user message
    const userMessageElement = document.createElement('div');
    userMessageElement.textContent = `You: ${userMessage}`;
    chatbotMessages.appendChild(userMessageElement);

    // Clear input
    chatbotInput.value = '';

    // Show spinner
    chatbotSpinner.style.display = 'block';

    // Call chatbot API
    try {
        const response = await fetch('https://backend-portfolio-mclb.onrender.com/chat_bot_api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userMessage })
});
const data = await response.json();

// Hide spinner
chatbotSpinner.style.display = 'none';

// Display chatbot response
const parsedMarkdown = marked.parse(data.response);

// Create bot message element
const botMessageElement = document.createElement('div');
botMessageElement.classList.add('chatbot-message');
botMessageElement.innerHTML = `<strong>Ramy:</strong> ${parsedMarkdown}`;
chatbotMessages.appendChild(botMessageElement);

// Auto scroll to bottom
chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      } catch (error) {
      // Hide spinner
      chatbotSpinner.style.display = 'none';

      const errorMessageElement = document.createElement('div');
      errorMessageElement.textContent = 'Ramy: Sorry, something went wrong.';
      chatbotMessages.appendChild(errorMessageElement);
    }

    // Scroll to the latest message
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') sendMessage();
  });


function generatePDF() {
    fetch("https://backend-portfolio-mclb.onrender.com/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Hello from frontend!" })
    })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.pdf";
      a.click();
    })
    .catch(err => console.error("Error:", err));
  }