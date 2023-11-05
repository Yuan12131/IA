// HTML 요소 가져오기
const searchForm = document.getElementById('searchForm');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.querySelector('li');

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

