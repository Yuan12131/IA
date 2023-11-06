// HTML 요소 가져오기
const searchForm = document.getElementById("searchForm");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const sidebar = document.querySelector(".nav_mobile");
const newChatButton = document.querySelector(".newchat");

let isFirstMessage = true;


searchButton.addEventListener("click", function () {
  data();
  jsonData();
});

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

// fetch를 사용하여 지정한 URL에서 JSON 데이터를 가져오는 함수 -> 비동기 처리
async function jsonData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const dataURL = '/json-data'; // 첫 번째 URL
const styleURL = '/json-style'; // 두 번째 URL

// json-data에서 GET 요청을 통한 HTML 요소 업데이트
jsonData(dataURL)
  .then(data => {
    if (data) {
      document.querySelector(".title").innerHTML = data.header.logo;

      const promptInputPlaceholder = data.header.promptInputPlaceholder;
      searchInput.setAttribute('placeholder', promptInputPlaceholder);
    } else {
      console.log('Failed to fetch data');
    }
  });

// json-style에서 GET 요청을 통한 HTML 요소 업데이트
  // 
  jsonData(styleURL)
  .then(style => {
    if (style) {
      document.querySelector(".user").innerHTML = style.icons.logo + style.icons.userAvatar;
    } else {
      console.log('Failed to fetch style');
    }
  });


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
    let li = document.createElement("li");
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

// // JSON 파일의 URL (실제 서버 URL로 수정 필요)
// const jsonFileURL = 'http://127.0.0.1:8080/json-data.json';

// // GET 요청을 사용하여 JSON 데이터 가져오기
// fetch(jsonFileURL)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('JSON 데이터를 가져오는 데 실패했습니다.');
//     }
//   })
//   .then((data) => {
//     // JSON 데이터에서 정보 추출
//     const logo = data.logo;
//     const promptInputPlaceholder = data.promptInputPlaceholder;

//     const logoIconElement = document.querySelector('.title');
//     logoIconElement.textContent = logo;

//     searchInput.setAttribute('placeholder', promptInputPlaceholder);
//   })
//   .catch((error) => {
//     console.error('JSON 데이터 가져오기 오류:', error);
//   });
