// HTML 요소 가져오기
const searchForm = document.getElementById('searchForm');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
// const resultsDiv = document.querySelector('li');

searchButton.addEventListener('click', function () {
  data();
});

function data() {
  const message = searchInput.value;

  if (message) {
    fetch('/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    .then((response) => response.json())
    .then((data) => {
      searchInput.value = '';
      displayResults(data);
    });
  }
}


// 대화창에 메세지를 추가하는 함수
function addMessageToConversation(type, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(type);
  messageDiv.textContent = message;
  messageDiv.style.width = "10vw";
  messageDiv.style.height = "5vh";
  messageDiv.style.lineHeight = "5vh";
  messageDiv.style.backgroundColor = "white";
  searchForm.appendChild(messageDiv);
}

function displayResults(data) {
  if (data.userMessage) {
    // 사용자 메세지를 대화 창에 추가
    addMessageToConversation('user', data.userMessage);

    // 사용자 메세지를 sidebar의 li 태그에 추가
    addMessageToSidebar('user', data.userMessage);
  }

  if (data.aiMessage) {
    // AI 응답을 대화 창에 추가
    addMessageToConversation('assistant', data.aiMessage);
  }
}

function addMessageToSidebar(type, message) {
  const ul = document.querySelector('.nav_mobile'); // sidebar 요소를 선택합니다.

  if (ul) {
    const li = document.createElement('li'); // 새로운 li 엘리먼트를 생성합니다.
    li.classList.add(type); // 'user' 클래스를 추가합니다.
    li.textContent = message; // 메세지를 li 엘리먼트에 추가합니다.
    ul.appendChild(li); // ul에 li 엘리먼트를 추가합니다.
  }
}

