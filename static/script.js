const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const responseBox = document.getElementById("responseBox");

function createChatCard(userMsg, botMsg) {
  const card = document.createElement("div");
  card.className = "chat-card";

  const userBubble = document.createElement("div");
  userBubble.className = "user-message";
  userBubble.textContent = userMsg;

  const botBubble = document.createElement("div");
  botBubble.className = "bot-message";
  botBubble.textContent = botMsg;

  card.appendChild(userBubble);
  card.appendChild(botBubble);
  responseBox.appendChild(card);
  responseBox.scrollTop = responseBox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  createChatCard(message, "...");
  userInput.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    const lastCard = responseBox.lastElementChild;
    lastCard.querySelector(".bot-message").textContent = data.response;
  } catch (error) {
    console.error("Error:", error);
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
