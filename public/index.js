// HTML 요소 가져오기
const searchForm = document.getElementById('searchForm');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.querySelector('li');

searchButton.addEventListener('click', function () {
  data();
});

function data() {
  const query = searchInput.value;
  if (query) {
  fetch('/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      searchInput.value = '';
      displayResults(data);
    });
}
}

// fetch("./data.json")//json파일 읽어오기
//   .then((response) => response.json())
//   .then((json) => {
//       data = json.items;

//       let html = '';
//       data.forEach(element => {
//           console.log(element)
//       html+=`<li>
//                   ${element.message}
//               </li>`
    
//       });
//       $('.list1').html(html)//화면에 출력
//   });

// 검색 결과를 화면에 표시하는 함수
// function displayResults(data) {
//   resultsDiv.innerHTML = ''; 

//   if (data.items) {
//     data.items.forEach(item => {
//       const newRecoding = document.createElement('li');
//       newRecoding.innerHTML = `<a href="${item.link}" target="_blank">${item.type}</a><p>${item.message}</p>`;
//       resultsDiv.appendChild(newRecoding); // 결과 영역에 추가
//     });
//   } else {
//     resultsDiv.innerHTML = '검색 결과가 없습니다.';
//   }
// }
