const DEAF_SIGN_DATA_URL = "js/data.json";
const DEAF_SIGN_MEDIA = "images/signDeaf.png";
const DEAF_SIGN_TITLE = "Absher sign language assistant";

const ChatBoatComponent = `
<div class="card deafSignChatcard" style="display:block">
  <div id="header">
    <div id="logo">
      <div class="deafchatIcn"></div>
    </div>
    <div id="title">
      <div>
        <span id="title" style="width: 100%; color: rgb(106, 106, 106); padding-left: 20px; font-size: 15px;">${DEAF_SIGN_TITLE}</span>
      </div>
    </div>
    <div id="close-button">
      <div id="hide-chatbot" class="closedeafchatbtn"></div>
    </div>
  </div>
  <div id="message-section" dir="ltr">
    <div id="intro-bot">
      <img src="${DEAF_SIGN_MEDIA}" id="GapFillerGif" width="100%">
      <p>Hello, I am your Absher sign language assistant. Please choose one of the available options.</p>
    </div>
    <div id="bot-timestamp" class="message"></div>
  </div>
</div>
`;

const fallbackData = [
  {
    label: "Sign language support",
    gifSrc: DEAF_SIGN_MEDIA,
    children: [
      { label: "You can browse the homepage sections in local preview mode.", gifSrc: DEAF_SIGN_MEDIA, children: [] },
      { label: "Use the contact area for the available support channels.", gifSrc: DEAF_SIGN_MEDIA, children: [] },
    ],
  },
  {
    label: "General support",
    gifSrc: DEAF_SIGN_MEDIA,
    children: [
      { label: "Authentication is disabled locally because it needs the original backend.", gifSrc: DEAF_SIGN_MEDIA, children: [] },
      { label: "Portal-dependent modules have been replaced with local-safe fallbacks.", gifSrc: DEAF_SIGN_MEDIA, children: [] },
    ],
  },
];

const showButton = document.querySelector("#show-chatbot");

function createTimestamp(label) {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${label} - ${hours}:${minutes}`;
}

function createMessageCard(label, imageSrc, options = {}) {
  const item = document.createElement(options.tagName || "a");
  item.className = "message";
  item.id = options.id || "bot";
  if (item.tagName === "A") {
    item.href = "#chatdown";
  }

  const image = document.createElement("img");
  image.src = imageSrc || DEAF_SIGN_MEDIA;

  const text = document.createElement("p");
  text.textContent = label;

  item.appendChild(image);
  item.appendChild(text);
  return item;
}

function updateBotTimestamp() {
  const timeStampBot = document.getElementById("bot-timestamp");
  if (!timeStampBot) {
    return;
  }

  timeStampBot.innerHTML = `<div class="deafchatIcn"></div>${createTimestamp(DEAF_SIGN_TITLE)}`;
}

function renderChildOptions(host, currentItem, children) {
  const chatBody = document.querySelector("#main-chat > div");
  if (!chatBody) {
    return;
  }

  const userMessage = createMessageCard(currentItem.label, currentItem.gifSrc, {
    tagName: "div",
    id: "user",
  });
  chatBody.appendChild(userMessage);

  const userTimestamp = document.createElement("div");
  userTimestamp.id = "user-timestamp";
  userTimestamp.className = "message";
  userTimestamp.textContent = createTimestamp("You");
  chatBody.appendChild(userTimestamp);

  const wrapper = document.createElement("div");
  wrapper.id = "bot-stamp-element";
  wrapper.className = "chatgrid";

  children.forEach((child) => {
    const childElement = createMessageCard(child.label, child.gifSrc);
    childElement.addEventListener("click", () => {
      if (child.children && child.children.length > 0) {
        renderChildOptions(childElement, child, child.children);
      }
    });
    wrapper.appendChild(childElement);
  });

  chatBody.appendChild(wrapper);
  updateBotTimestamp();
  host.scrollIntoView({ behavior: "smooth", block: "end" });
}

function mountChatbot(data) {
  document.querySelector(".deafSignChatcard")?.remove();
  document.body.insertAdjacentHTML("beforeend", ChatBoatComponent);

  const messageSection = document.getElementById("message-section");
  const chatHost = document.createElement("div");
  chatHost.id = "main-chat";
  const chatBody = document.createElement("div");
  const chatAnchor = document.createElement("a");
  chatAnchor.id = "chatdown";

  chatHost.appendChild(chatBody);
  chatHost.appendChild(chatAnchor);
  messageSection.appendChild(chatHost);

  const closeButton = document.getElementById("hide-chatbot");
  closeButton?.addEventListener("click", () => {
    document.querySelector(".deafSignChatcard")?.remove();
  });

  const initialWrapper = document.createElement("div");
  initialWrapper.id = "first-bot-stamp-element";
  initialWrapper.className = "chatgrid";

  data.slice(0, 2).forEach((item) => {
    const entry = createMessageCard(item.label, item.gifSrc);
    entry.addEventListener("click", () => {
      if (item.children && item.children.length > 0) {
        renderChildOptions(chatAnchor, item, item.children);
      }
    });
    initialWrapper.appendChild(entry);
  });

  chatBody.appendChild(initialWrapper);
  updateBotTimestamp();
}

async function openChatbot() {
  try {
    const response = await fetch(DEAF_SIGN_DATA_URL);
    const data = response.ok ? await response.json() : fallbackData;
    mountChatbot(Array.isArray(data) && data.length ? data : fallbackData);
  } catch (error) {
    console.error("Error reading data from JSON file:", error);
    mountChatbot(fallbackData);
  }
}

showButton?.addEventListener("click", () => {
  openChatbot();
});
