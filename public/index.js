// HTML 요소 가져오기
const searchForm = document.getElementById("searchForm");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const sidebar = document.querySelector(".nav_mobile");
const newChatButton = document.querySelector(".newchat");

searchButton.addEventListener("click", function () {
  data();
});

function data() {
  const message = searchInput.value;

  if (message) {
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

searchButton.addEventListener("click", function () {
  sendMessage();
});

function sendMessage() {
  const message = searchInput.value;

  if (message) {
    addMessageToSidebar(message);
    searchInput.value = "";
  }
}

function addMessageToSidebar(message) {
  if (message) {
    const li = document.createElement("li");
    li.textContent = message;
    sidebar.appendChild(li);
  }
}

// 대화창에 메세지를 추가하는 함수
function addMessageToConversation(type, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(type);
  messageDiv.classList.add('messageDiv');

  if (type === "user") {
    messageDiv.style.float = "left"; // USER 메세지를 좌측에 정렬
  } else {
    messageDiv.style.float = "right"; // AI 응답을 우측에 정렬
  }

  messageDiv.textContent = message;
  messageDiv.style.backgroundColor = "lightblue";
  messageDiv.style.width = "15vw";
  messageDiv.style.height = "5vh";
  messageDiv.style.lineHeight = "5vh";
  messageDiv.style.margin = "1vh";

  searchForm.appendChild(messageDiv);
  // 새로운 메세지가 searchInput 위에 쌓이게
  searchForm.insertBefore(messageDiv, searchInput);
}

function displayResults(data) {
  if (data.userMessage) {
    // 사용자 메세지를 대화 창에 추가
    addMessageToConversation("user", data.userMessage);

    // 사용자 메세지를 sidebar의 li 태그에 추가
    addMessageToSidebar("user", data.userMessage);
  }

  if (data.aiMessage) {
    // AI 응답을 대화 창에 추가
    addMessageToConversation("assistant", data.aiMessage);
  }
}

function addMessageToSidebar(message) {
  if (message && isFirstMessage) {
    const li = document.createElement('li');
    li.textContent = message;
    sidebar.appendChild(li);
    isFirstMessage = false; // 처음 메시지를 추가했으므로 더 이상 추가되지 않도록 설정
  }
}

newChatButton.addEventListener("click", function () {
  clearMessages(); // 채팅 메세지를 모두 지우는 함수를 호출합니다
  startNewChat();
});

function clearMessages() {
  const messageDivs = document.querySelectorAll('.messageDiv');

  messageDivs.forEach((messageDiv) => {
    searchForm.removeChild(messageDiv);
  });

  isFirstMessage = true; // 다음 채팅에서 첫 번째 메시지를 다시 추가할 수 있도록 설정
}

function startNewChat() {
  searchInput.value = ""; // 입력 창 초기화
}
