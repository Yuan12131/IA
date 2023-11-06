// HTML 요소 가져오기
const searchForm = document.getElementById("searchForm");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const sidebar = document.querySelector(".nav_mobile");
const newChatButton = document.querySelector(".newchat");
const chat = document.querySelector(".chat");

let isFirstMessage = true;

// 검색 버튼 클릭 이벤트 리스너 추가
searchButton.addEventListener("click", function () {
  data();
});

// 메시지를 서버에 전송하는 함수
function data() {
  const message = searchInput.value;

  if (typeof message === "string") {
    fetch("/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        searchInput.value = "";
        displayResults(data);
      });
  }
}

// JSON 데이터를 가져오는 함수
async function jsonData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

const dataURL = "/json-data"; // 첫 번째 URL
const styleURL = "/json-style"; // 두 번째 URL

// JSON 데이터에서 HTML 요소 업데이트
jsonData(dataURL).then((data) => {
  if (data) {
    document.querySelector(".title").innerHTML = data.header.logo;

    const promptInputPlaceholder = data.header.promptInputPlaceholder;
    searchInput.setAttribute("placeholder", promptInputPlaceholder);
  } else {
    console.log("Failed to fetch data");
  }
});

// JSON 스타일 데이터에서 HTML 요소 업데이트
jsonData(styleURL).then((style) => {
  if (style) {
    document.querySelector(".user").innerHTML =
      style.icons.logo + style.icons.userAvatar;
  } else {
    console.log("Failed to fetch style");
  }
});

// 검색 버튼 클릭 이벤트 리스너 추가
searchButton.addEventListener("click", function () {
  const message = searchInput.value;
  addMessageToSidebar(message);
  searchInput.value = "";
});

// 대화창에 메시지를 추가하는 함수
function addMessageToConversation(type, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(type);
  messageDiv.classList.add("messageDiv");

  if (type === "user") {
    messageDiv.style.float = "left"; // USER 메시지를 좌측에 정렬
    messageDiv.style.position = "relative";
    messageDiv.style.top = "0";
    messageDiv.style.fontSize = "1rem";
  } else {
    messageDiv.style.float = "right"; // AI 응답을 우측에 정렬
  }

  messageDiv.textContent = message;
  messageDiv.style.backgroundColor = "lightblue";
  messageDiv.style.width = "15vw";
  messageDiv.style.height = "5vh";
  messageDiv.style.lineHeight = "5vh";
  messageDiv.style.margin = "0.5vh";
  messageDiv.style.textAlign = "center";

  chat.appendChild(messageDiv);
}

// 서버에서 받아온 데이터를 화면에 표시
function displayResults(data) {
  if (data.userMessage) {
    // 사용자 메시지를 대화 창에 추가
    addMessageToConversation("user", data.userMessage);

    // 사용자 메시지를 사이드바의 li 태그에 추가
    addMessageToSidebar(data.userMessage);
  }

  if (data.aiMessage) {
    // AI 응답을 대화 창에 추가
    addMessageToConversation("assistant", data.aiMessage);
  }
}

// 사이드바에 메시지를 추가하는 함수
function addMessageToSidebar(message) {
  if (message && isFirstMessage) {
    const li = document.createElement("li");
    li.textContent = message;
    sidebar.appendChild(li);
    isFirstMessage = false; // 처음 메시지를 추가했으므로 더 이상 추가되지 않도록 설정
  }
}

// "New Chat" 버튼 클릭 이벤트 리스너 추가
newChatButton.addEventListener("click", function () {
  clearMessages(); // 채팅 메시지를 모두 지우는 함수 호출
  startNewChat();
});

// 대화창의 메시지를 모두 지우는 함수
function clearMessages() {
  const messageDivs = document.querySelectorAll(".messageDiv");

  messageDivs.forEach((messageDiv) => {
    chat.removeChild(messageDiv);
  });

  isFirstMessage = true; // 다음 채팅에서 첫 번째 메시지를 다시 추가할 수 있도록 설정
}

// "New Chat" 버튼 클릭 시 초기화 함수
function startNewChat() {
  searchInput.value = ""; // 입력 창 초기화
}
