// 초기 상태
let itemsPerPage = 10; // 한 번에 보여줄 카드 개수
let currentCount = 0; // 현재 렌더링된 카드 수
let filteredPlayers = players; // 검색 결과 저장용 (초기값은 전체)

// HTML 요소 가져오기
const searchInput = document.getElementById("search-input");
const cardWrap = document.getElementById("card-wrap");
const loadMoreButton = document.getElementById("load-more");

// 카드 렌더링 함수
function renderCards() {
  cardWrap.innerHTML = ""; // 기존 카드 초기화

  const nextCount = Math.min(currentCount + itemsPerPage, filteredPlayers.length); // 렌더링 범위 계산
  for (let i = 0; i < nextCount; i++) {
    const player = filteredPlayers[i];
    const card = document.createElement("div");
    card.className = `card ${player.id}`;
    card.style.backgroundColor = `${teamColor[player.id]}`;

    card.innerHTML = `
      <h1>${player.number}</h1>
      <img src="${player.teamLogo}" alt="" class="team-logo" id="team-logo">
      <img src="${player.playerImage}" alt="" class="player">
      <h5>${player.position}</h5>
      <h2>${player.name}</h2>
      <div class="gradiant-box"></div>
    `;

    cardWrap.appendChild(card);
  }

  currentCount = nextCount; // 렌더링된 카드 수 업데이트

  // 더 이상 렌더링할 카드가 없으면 버튼 숨기기
  if (currentCount >= filteredPlayers.length) {
    loadMoreButton.style.display = "none";
  } else {
    loadMoreButton.style.display = "block";
  }
}

// 검색 기능
function filterCards() {
  const searchValue = searchInput.value.toLowerCase(); // 검색어 가져오기
  currentCount = 0; // 초기화
  filteredPlayers = players.filter((player) => {
    return player.name.toLowerCase().includes(searchValue); // 이름 검색
  });

  renderCards(); // 검색된 결과 렌더링
}

// 더보기 버튼 클릭 이벤트
loadMoreButton.addEventListener("click", renderCards);

// 검색창 입력 이벤트
searchInput.addEventListener("input", filterCards);

// 초기 카드 렌더링 (전체 카드)
renderCards();
