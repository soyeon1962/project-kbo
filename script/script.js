//## section1 - header fetch ##//
fetch("html/header.html")
.then(response => response.text())
.then(data =>{
  document.getElementById('header').innerHTML = data;

  let navMenu = document.querySelectorAll('.web-nav .nav-menu');
  let navSubBackground = document.querySelector('.web-nav .nav-sub-background');

  navMenu.forEach(function(nav){
    nav.addEventListener('mouseenter', function(){
      nav.classList.add('on');
      nav.querySelector('a').style.color = "#B19F77";
      navSubBackground.classList.add('on');
      let sub = document.getElementById(nav.dataset.nav);
      sub.classList.add('on');
    });
  });

  navMenu.forEach(function(nav){
    nav.addEventListener('mouseleave', function(){
      nav.classList.remove('on');
      nav.querySelector('a').style.color = "#ffffff";
      navSubBackground.classList.remove('on');
      let sub = document.getElementById(nav.dataset.nav);
      sub.classList.remove('on');
    });
  });
  
  let mobileNav = document.querySelectorAll('.mobile-nav .nav-menu');

  mobileNav.forEach(function(trigger){
    trigger.addEventListener('click', function(){
      mobileNav.forEach(function(otherTrigger){
        if(otherTrigger !== trigger){
          otherTrigger.classList.remove('on');
          let otherNavSub = otherTrigger.querySelector('.nav-sub');
          if(otherNavSub){
            otherNavSub.classList.remove('on');
          };
        };
      });
      let mobileNavSub = trigger.querySelector('.nav-sub');
      let isExpanded = mobileNavSub.classList.contains('on');
      if(isExpanded){
        trigger.classList.remove('on');
        mobileNavSub.classList.remove('on');
      }else{
        trigger.classList.add('on');
        mobileNavSub.classList.add('on');
      };
    });
  });

  let openMobileNavBtn = document.querySelector('.hamburger-btn');
  let closeMobileNavBtn = document.querySelector('.close-btn');
  openMobileNavBtn.addEventListener('click', function(){
    this.style.display = 'none';
    let mobileNav = document.querySelector('.mobile-nav');
    mobileNav.style.left = 0; 
    document.body.style.overflow = 'hidden';
  });

  closeMobileNavBtn.addEventListener('click', function(){
    openMobileNavBtn.style.display = 'block';
    let mobileNav = document.querySelector('.mobile-nav');
    mobileNav.style.left = "100%"; 
    document.body.style.overflow = 'unset';
  });
})
.catch(error => console.log("header is wrong", error));

/* 화면 사이즈 768이하부터 비디오 소스 변경 */
let tableVideo = window.matchMedia("(max-width: 768px)");
let videoSource = document.getElementById('video-source');

function videoResize(e){
if(e.matches){
  videoSource.setAttribute('src', 'images/video/main_tablet.mp4');
  window.location.reload();
}else{
  videoSource.setAttribute('src', 'images/video/main.mp4');
  window.location.reload();
}  
}
tableVideo.addEventListener('change', videoResize);

//## section2 - match ##//

//탭 기능 구현
let matchTab = document.querySelectorAll('.match-tab li');

matchTab.forEach((tab) => {
  tab.addEventListener('click', () => {
    matchTab.forEach((m) => {
      m.classList.remove('active');
    })
    tab.classList.add('active');
    matchTabData = tab.getAttribute('data-match');
    let matchTabContent = document.querySelectorAll('.match-inner > div');
    matchTabContent.forEach((content) => {
      content.classList.remove('active');
    })

    document.getElementById(matchTabData).classList.add('active');
  })
})


/* ##################### regular-season 전체 함수 ##################### */
    const regularMatches = [
      {id: 1, match: 0, team1: "KIA", team2: "NC", score1: 7, score2: 2, date: "2025-05-18", time:"17:00:00", park:"NC 파크", win: "황동하", lose: "이재학", save: "-"},
      {id: 2, match: 0, team1: "한화", team2: "삼성", score1: 8, score2: 9, date: "2024-05-18", time:"17:00:00", park:"라이온즈 파크", win: "김재윤", lose: "주현상", save: "-"},
      {id: 3, match: 0, team1: "LG", team2: "KT", score1: 7, score2: 6, date: "2024-05-18", time:"17:00:00", park:"위즈 파크", win: "최원태", lose: "주권", save: "김진성"},
      {id: 4, match: 0, team1: "SSG", team2: "키움", score1: 3, score2: 0, date: "2024-05-18", time:"17:00:00", park:"고척 스카이돔", win: "박민호", lose: "이종민", save: "문승원"},
      {id: 5, match: 0, team1: "롯데", team2: "두산", score1: 3, score2: 8, date: "2024-05-18", time:"17:00:00", park:"잠실야구장", win: "곽빈", lose: "나균안", save: "-"},
      {id: 6, match: 1, team1: "롯데", team2: "두산", score1: 3, score2: 3, date: "2024-05-18", time:"17:00:00", park:"잠실야구장", win: "-", lose: "-", save: "-"},
      {id: 7, match: 1, team1: "SSG", team2: "키움", score1: 3, score2: 10, date: "2024-05-19", time:"14:00:00", park:"고척 스카이돔", win: "김인범", lose: "오원석", save: "-"},
      {id: 8, match: 1, team1: "LG", team2: "KT", score1: 4, score2: 10, date: "2024-05-19", time:"14:00:00", park:"위즈 파크", win: "김민수", lose: "손주영", save: "-"},
      {id: 9, match: 1, team1: "한화", team2: "삼성", score1: 12, score2: 2, date: "2024-05-19", time:"14:00:00", park:"라이온즈 파크", win: "류현진", lose: "이호성", save: "-"},
      {id: 10, match: 1, team1: "KIA", team2: "NC", score1: 2, score2: 1, date: "2024-05-19", time:"14:00:00", park:"NC 파크", win: "장현식", lose: "이용찬", save: "정해영"},
      {id: 11, match: 2, team1: "NC", team2: "두산", score1: 2, score2: 6, date: "2024-06-18", time:"18:30:00", park:"잠실야구장", win: "브랜든", lose: "임상현", save: "김택연"},
      {id: 12, match: 2, team1: "롯데", team2: "KT", score1: 4, score2: 6, date: "2024-06-18", time:"18:30:00", park:"위즈 파크", win: "엄상백", lose: "한현희", save: "박영현"},
      {id: 13, match: 2, team1: "키움", team2: "한화", score1: 0, score2: 3, date: "2024-06-18", time:"18:30:00", park:"이글스파크", win: "류현진", lose: "김인범", save: "주현상"},
      {id: 14, match: 2, team1: "SSG", team2: "삼성", score1: 8, score2: 3, date: "2024-06-18", time:"18:30:00", park:"라이온즈 파크", win: "앤더슨", lose: "이승민", save: "-"},
      {id: 15, match: 2, team1: "LG", team2: "KIA", score1: 4, score2: 11, date: "2024-06-18", time:"18:30:00", park:"챔피언스 필드", win: "양현종", lose: "손주영", save: "-"},
      {id: 16, match: 3, team1: "LG", team2: "KIA", score1: 7, score2: 5, date: "2024-06-19", time:"18:30:00", park:"챔피언스 필드", win: "백승현", lose: "최지민", save: "유영찬"},
      {id: 17, match: 3, team1: "SSG", team2: "삼성", score1: 2, score2: 13, date: "2024-06-19", time:"18:30:00", park:"라이온즈 파크", win: "원태인", lose: "오원석", save: "-"},
      {id: 18, match: 3, team1: "키움", team2: "한화", score1: 11, score2: 14, date: "2024-06-19", time:"18:30:00", park:"이글스파크", win: "한승혁", lose: "정찬헌", save: "주현상"},
      {id: 19, match: 3, team1: "롯데", team2: "KT", score1: 13, score2: 5, date: "2024-06-19", time:"18:30:00", park:"위즈 파크", win: "나균안", lose: "고영표", save: "-"},
      {id: 20, match: 3, team1: "NC", team2: "두산", score1: 7, score2: 5, date: "2024-06-19", time:"18:30:00", park:"잠실야구장", win: "카스타노", lose: "최원준", save: "이용찬"},
      {id: 21, match: 4, team1: "두산", team2: "KIA", score1: 12, score2: 7, date: "2024-07-30", time:"18:30:00", park:"챔피언스 필드", win: "곽빈", lose: "알드레드", save: "-"},
      {id: 22, match: 4, team1: "한화", team2: "KT", score1: 6, score2: 4, date: "2024-07-30", time:"18:30:00", park:"위즈 파크", win: "바리아", lose: "쿠에바스", save: "주현상"},
      {id: 23, match: 4, team1: "롯데", team2: "SSG", score1: 5, score2: 11, date: "2024-07-30", time:"18:30:00", park:"랜더스필드", win: "김광현", lose: "윤성빈", save: "-"},
      {id: 24, match: 4, team1: "NC", team2: "키움", score1: 2, score2: 6, date: "2024-07-30", time:"18:30:00", park:"고척 스카이돔", win: "하영민", lose: "이용준", save: "-"},
      {id: 25, match: 4, team1: "삼성", team2: "LG", score1: 7, score2: 1, date: "2024-07-30", time:"18:30:00", park:"잠실야구장", win: "코너", lose: "엔스", save: "-"},
      {id: 26, match: 5, team1: "삼성", team2: "LG", score1: 5, score2: 11, date: "2024-07-31", time:"18:30:00", park:"잠실야구장", win: "손주영", lose: "이승현", save: "-"},
      {id: 27, match: 5, team1: "NC", team2: "키움", score1: 9, score2: 0, date: "2024-07-31", time:"18:30:00", park:"고척 스카이돔", win: "하트", lose: "정찬헌", save: "-"},
      {id: 28, match: 5, team1: "롯데", team2: "SSG", score1: 11, score2: 12, date: "2024-07-31", time:"18:30:00", park:"랜더스필드", win: "문승원", lose: "현도훈", save: "-"},
      {id: 29, match: 5, team1: "한화", team2: "KT", score1: 18, score2: 7, date: "2024-07-31", time:"18:30:00", park:"위즈 파크", win: "류현진", lose: "고영표", save: "-"},
      {id: 30, match: 5, team1: "두산", team2: "KIA", score1: 30, score2: 6, date: "2024-07-31", time:"18:30:00", park:"챔피언스 필드", win: "시라카와", lose: "김도현", save: "-"},
      {id: 31, match: 6, team1: "LG", team2: "두산", score1: 6, score2: 7, date: "2024-08-06", time:"18:30:00", park:"잠실야구장", win: "이병헌", lose: "손주영", save: "김택연"},
      {id: 32, match: 6, team1: "SSG", team2: "키움", score1: 6, score2: 2, date: "2024-08-06", time:"18:30:00", park:"고척 스카이돔", win: "문승원", lose: "김성민", save: "-"},
      {id: 33, match: 6, team1: "한화", team2: "삼성", score1: 8, score2: 5, date: "2024-08-06", time:"18:30:00", park:"라이온즈 파크", win: "박상원", lose: "황동재", save: "주현상"},
      {id: 34, match: 6, team1: "KT", team2: "KIA", score1: 0, score2: 2, date: "2024-08-06", time:"18:30:00", park:"챔피언스 필드", win: "김도현", lose: "고영표", save: "전상현"},
      {id: 35, match: 6, team1: "NC", team2: "롯데", score1: 5, score2: 6, date: "2024-08-06", time:"18:30:00", park:"사직 야구장", win: "김상수", lose: "김재열", save: "김원중"},
      {id: 36, match: 7, team1: "NC", team2: "롯데", score1: 7, score2: 14, date: "2024-08-07", time:"18:30:00", park:"사직 야구장", win: "박진", lose: "이재학", save: "-"},
      {id: 37, match: 7, team1: "KT", team2: "KIA", score1: 13, score2: 2, date: "2024-08-07", time:"18:30:00", park:"챔피언스 필드", win: "엄상백", lose: "네일", save: "-"},
      {id: 38, match: 7, team1: "한화", team2: "삼성", score1: 6, score2: 10, date: "2024-08-07", time:"18:30:00", park:"라이온즈 파크", win: "백정현", lose: "류현진", save: "-"},
      {id: 39, match: 7, team1: "SSG", team2: "키움", score1: 6, score2: 2, date: "2024-08-07", time:"18:30:00", park:"고척 스카이돔", win: "앤더슨", lose: "김윤하", save: "-"},
      {id: 40, match: 7, team1: "LG", team2: "두산", score1: 4, score2: 8, date: "2024-08-07", time:"18:30:00", park:"잠실야구장", win: "발라조빅", lose: "엔스", save: "김강률"},
      {id: 41, match: 8, team1: "두산", team2: "한화", score1: 1, score2: 7, date: "2024-09-03", time:"18:30:00", park:"이글스파크", win: "문동주", lose: "최원준", save: "-"},
      {id: 42, match: 8, team1: "롯데", team2: "삼성", score1: 1, score2: 5, date: "2024-09-03", time:"18:30:00", park:"라이온즈 파크", win: "코너", lose: "반즈", save: "김재윤"},
      {id: 43, match: 8, team1: "LG", team2: "KIA", score1: 5, score2: 7, date: "2024-09-03", time:"18:30:00", park:"챔피언스 필드", win: "양현종", lose: "에르난데스", save: "정해영"},
      {id: 44, match: 8, team1: "키움", team2: "NC", score1: 5, score2: 11, date: "2024-09-03", time:"18:30:00", park:"NC 파크", win: "이용준", lose: "후라도", save: "-"},
      {id: 45, match: 9, team1: "두산", team2: "삼성", score1: 3, score2: 7, date: "2024-09-04", time:"18:30:00", park:"라이온즈 파크", win: "황동재", lose: "이영하", save: "김재윤"},
      {id: 46, match: 9, team1: "키움", team2: "NC", score1: 6, score2: 13, date: "2024-09-04", time:"18:30:00", park:"NC 파크", win: "하트", lose: "헤이수스", save: "-"},
      {id: 47, match: 9, team1: "KT", team2: "롯데", score1: 5, score2: 7, date: "2024-09-04", time:"18:30:00", park:"사직 야구장", win: "김상수", lose: "김민", save: "김원중"},
      {id: 48, match: 9, team1: "한화", team2: "KIA", score1: 5, score2: 4, date: "2024-09-04", time:"18:30:00", park:"챔피언스 필드", win: "주현상", lose: "장현식", save: "-"},
      {id: 49, match: 9, team1: "SSG", team2: "LG", score1: 0, score2: 5, date: "2024-09-04", time:"18:30:00", park:"잠실야구장", win: "임찬규", lose: "오원석", save: "-"},
    ]
  function UpdateRegularMatches(filteredData) {
  let rightBox = document.querySelector('.right-box');

  // 현재 match에 해당하는 데이터 렌더링
  filteredData.forEach(item => {
    let today = new Date(item.date);

    /* 일~토 바꾸는 함수 */
    function setDayLabel(day) {
      let week = ["일", "월", "화", "수", "목", "금", "토"];
      return week[day];
    }

    let setToday = `${today.getFullYear()}.${(today.getMonth() + 1)}.${today.getDate()} (${setDayLabel(today.getDay())})`;

    // match에 해당하는 div 생성
    let createDiv = document.createElement('div');
    createDiv.classList.add(`match-teams`);
    createDiv.classList.add(`match${item.match}`);
    createDiv.setAttribute('onclick', `showMatchDetails(${item.id})`);
    createDiv.setAttribute('id', `match-${item.id}`)
    createDiv.innerHTML = `
    <div class="team1-name">
              <img class="team1-logo">
              <span>${item.team1}</span>
            </div>
            <div class="match-summary">
              <span class="match-alert">
                <!-- match-alert 공통, match-end 등 따로, 내부 글자는 innerText 쓰기 -->
              </span>
              <div class="match-score">
                <span class="team1-score">${item.score1}</span>
                <span class="team2-score">${item.score2}</span>
              </div>
              <span class="match-park">${item.park}</span>
            </div>
            <div class="team2-name">
              <span>${item.team2}</span>
              <img class="team2-logo">
            </div>
    `;
    
    if(item.score1 > item.score2){
      createDiv.querySelector('.team1-score').style.color = '#EA1E23';
    }else if(item.score1 < item.score2){
      createDiv.querySelector('.team2-score').style.color = '#EA1E23';
    }

    // 날짜 비교해서 경기 예정, 경기 중, 경기 종료 띄우기 (시간 빼고 날짜만 기준 - setHours(0, 0, 0, 0))
    if(today.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)){
      createDiv.querySelector('.match-alert').classList.add('match-expected');
      createDiv.querySelector('.match-alert').innerHTML = '경기 예정';
    }else if(today.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)){
      createDiv.querySelector('.match-alert').classList.add('match-running');
      createDiv.querySelector('.match-alert').innerHTML = '경기 중';
    }else if(today.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)){
      createDiv.querySelector('.match-alert').classList.add('match-end');
      createDiv.querySelector('.match-alert').innerHTML = '경기 종료';
    }

    rightBox.appendChild(createDiv);

    // 날짜 업데이트
    let updateRegularDate = document.getElementById('update-regular-date');
    updateRegularDate.innerHTML = `${setToday}`;

/* ############### 이미지 등 삽입 요소 ############## */

let teamLogos = {
  "KIA": "images/logo-kia.svg",
  "삼성": "images/logo-samsung.svg",
  "두산": "images/logo-doosan.svg",
  "NC": "images/logo-nc.svg",
  "LG": "images/logo-lg.svg",
  "SSG": "images/logo-ssg.svg",
  "한화": "images/logo-hanwha.svg",
  "키움": "images/logo-kiwoom.svg",
  "롯데": "images/logo-lotte.svg",
  "KT": "images/logo-kt.svg"
};

// team1과 team2의 로고 설정
let team1Logo = createDiv.querySelector('.team1-logo');
let team2Logo = createDiv.querySelector('.team2-logo');

// team1 이미지 설정
if (teamLogos[item.team1]) {
  team1Logo.setAttribute("src", teamLogos[item.team1]);
}
// team2 이미지 설정
if (teamLogos[item.team2]) {
  team2Logo.setAttribute("src", teamLogos[item.team2]);
}
});
}


// 초기 설정: match가 0인 항목 표시
let currentMatchIndex = 0;
UpdateRegularMatches(regularMatches.filter(item => item.match === currentMatchIndex));

function UpdateRegularNextDate() {
  let previousMatches = document.querySelectorAll(`.match${currentMatchIndex}`);
  previousMatches.forEach(matchDiv => matchDiv.remove());
  const maxMatchIndex = Math.max(...regularMatches.map(item => item.match)); // 최대 match 값 계산
  if (currentMatchIndex < maxMatchIndex) {
    currentMatchIndex++; // 다음 matchIndex로 이동
  } else {
    currentMatchIndex = 0; // 0으로 순환
  }
  const filteredMatches = regularMatches.filter(item => item.match === currentMatchIndex);
  UpdateRegularMatches(filteredMatches);
}

function UpdateRegularPrevDate() {
  let previousMatches = document.querySelectorAll(`.match${currentMatchIndex}`);
  previousMatches.forEach(matchDiv => matchDiv.remove());
  if (currentMatchIndex > 0) {
    currentMatchIndex--; // 이전 matchIndex로 이동
  } else {
    currentMatchIndex = Math.max(...regularMatches.map(item => item.match)); // 마지막 matchIndex로 이동
  }
  const filteredMatches = regularMatches.filter(item => item.match === currentMatchIndex);
  UpdateRegularMatches(filteredMatches);
}


//leftbox에 디테일 넣기
//타이머 초기화용
let interval; 

function showMatchDetails(matchId) {
  // matchId에 맞는 경기 찾기 -> regularMatches 배열을 순회
  const matchData = regularMatches.find(item => item.id === matchId);

  if (matchData) {
    // 날짜 시간 합치기
    let dateTimeString = `${matchData.date}T${matchData.time}`;
    let matchDate = new Date(dateTimeString);
/*  // 시간만 추출하려면
    let matchTimeString = matchDate.toLocaleTimeString('ko-KR', { hour12: false }); */

    let matchDetail = document.querySelector('.match-detail');
    let createDiv = document.createElement('div');
    createDiv.classList.add('match-detail-content');
    createDiv.innerHTML = `
      <div class="match-detail-score">
        <img class="detail-team1-logo" height="100px">
        <div class="match-score-all">
          <span class="team1-score">${matchData.score1}</span>
          <span class="score-of">:</span>
          <span class="team2-score">${matchData.score2}</span>
        </div>
          <img class="detail-team2-logo" height="100px">
      </div>
      <div class="match-detail-text">
        <div class="team1-bowler">
        </div>
        <div class="match-detail-schedule">
          <span class="schedule-date">${matchData.date} ${matchDate.getHours()}:${String(matchDate.getMinutes()).padStart(2, '0')}</span>
          <span class="schedule-park">${matchData.park}</span>
        </div>
        <div class="team2-bowler">
        </div>
      </div>
      <div class="match-detail-button">
        <a href="#none" class="commonBtn matchBtn">
          <span>구장 정보</span>
        </a>
        <a href="#none" class="commonBtn matchBtn">
          <span>결과 보기</span>
        </a>
      </div>
      <div class="match-detail-Dday">
        <span id="match-day" class="time-count">-</span>
        <span id="match-hour" class="time-count">-</span>
        <span id="match-min" class="time-count">-</span>
        <span id="match-sec" class="time-count">-</span>
      </div>
    `;

    // leftBox에 내용 추가
    matchDetail.innerHTML = '';
    matchDetail.appendChild(createDiv); // 새로 추가된 div 삽입

    /* ############### team1 team2 점수 비교해서 투수 넣기 ############## */
    if(matchData.score1 > matchData.score2){
      document.querySelector('.team1-bowler').innerHTML = `
        <span><em style="color: #06ACED">승</em>${matchData.win}</span>
        <span><em style="color: #55AE20">세</em>${matchData.save}</span>
      `;
      document.querySelector('.team2-bowler').innerHTML = `
        <span><em style="color: #EA1E23">패</em>${matchData.lose}</span>
      `;
      matchDetail.querySelector('.team2-score').style.color = '#757575';
    } else if(matchData.score1 < matchData.score2){
      document.querySelector('.team2-bowler').innerHTML = `
        <span><em style="color: #06ACED">승</em>${matchData.win}</span>
        <span><em style="color: #55AE20">세</em>${matchData.save}</span>
      `;
      document.querySelector('.team1-bowler').innerHTML = `
        <span><em style="color: #EA1E23">패</em>${matchData.lose}</span>
      `;
      matchDetail.querySelector('.team1-score').style.color = '#757575';
    }

    /* ############### 이미지 등 삽입 요소 ############## */
let teamLogos = {
  "KIA": "images/logo-kia.svg",
  "삼성": "images/logo-samsung.svg",
  "두산": "images/logo-doosan.svg",
  "NC": "images/logo-nc.svg",
  "LG": "images/logo-lg.svg",
  "SSG": "images/logo-ssg.svg",
  "한화": "images/logo-hanwha.svg",
  "키움": "images/logo-kiwoom.svg",
  "롯데": "images/logo-lotte.svg",
  "KT": "images/logo-kt.svg"
};

// team1과 team2의 로고 설정
let team1Logo = createDiv.querySelector('.detail-team1-logo');
let team2Logo = createDiv.querySelector('.detail-team2-logo');

// team1 이미지 설정
if (teamLogos[matchData.team1]) {
  team1Logo.setAttribute("src", teamLogos[matchData.team1]);
}
// team2 이미지 설정
if (teamLogos[matchData.team2]) {
  team2Logo.setAttribute("src", teamLogos[matchData.team2]);
}

// 타이머 초기화
clearInterval(interval);
// 시간 움직이도록 하기(match-1만)
function countdownTime() {
    let now = new Date().getTime();
    let target = matchDate.getTime();
    let subtract = target - now;
    const day = Math.floor(subtract / (1000 * 60 * 60 * 24));
    const hour = Math.floor((subtract % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min = Math.floor((subtract % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((subtract % (1000 * 60)) / 1000);

    document.getElementById('match-day').textContent = day;
    document.getElementById('match-hour').textContent = hour;
    document.getElementById('match-min').textContent = min;
    document.getElementById('match-sec').textContent = sec;

    if (subtract < 0) {
      clearInterval(interval);
      document.getElementById('match-day').textContent = "-";
      document.getElementById('match-hour').textContent = "-";
      document.getElementById('match-min').textContent = "-";
      document.getElementById('match-sec').textContent = "-";
    }
  }
  interval = setInterval(countdownTime, 1000); // 새로운 타이머 시작
}
}

// 제일 처음 id=1인 경기의 디테일 불러오기
showMatchDetails(1);

//오른쪽박스에 클릭이벤트 active 클래스 추가
let rightBox = document.querySelector('.right-box');

rightBox.addEventListener('click', function (event) {
  let match = event.target.closest('.match-teams');
  if (match) {
    let matchTeams = document.querySelectorAll('.match-teams');
    matchTeams.forEach(function (otherMatch) {
      otherMatch.classList.remove('active'); // 모든 요소에서 active 클래스 제거
    });
    match.classList.add('active'); // 클릭된 요소에 active 클래스 추가
  }
});
//첫 match-teams에 항상 active
document.getElementById('match-1').classList.add('active');

/* ##################### regular-season 전체 함수 끝 ##################### */

/* ##################### post-season 전체 함수 ##################### */
const postMatches = [
      {id: 1, team1: "롯데", team2: "NC", score1: 5, score2: 1, date: "2024-10-01", time:"17:00:00", park:"NC 파크", win: "윌커슨", lose: "이재학", save: "-"},
      {id: 2, team1: "KT", team2: "두산", score1: 4, score2: 0, date: "2024-10-02", time:"18:30:00", park:"잠실야구장", win: "쿠에바스", lose: "곽빈", save: "-"},
      {id: 3, team1: "KT", team2: "두산", score1: 1, score2: 0, date: "2024-10-03", time:"14:00:00", park:"잠실야구장", win: "벤자민", lose: "이병헌", save: "박영현"},
      {id: 4, team1: "KT", team2: "LG", score1: 3, score2: 2, date: "2024-10-05", time:"14:00:00", park:"잠실야구장", win: "김민수", lose: "엔스", save: "박영현"},
      {id: 5, team1: "KT", team2: "LG", score1: 2, score2: 7, date: "2024-10-06", time:"14:00:00", park:"잠실야구장", win: "임찬규", lose: "엄상백", save: "-"},
      {id: 6, team1: "LG", team2: "KT", score1: 6, score2: 5, date: "2024-10-08", time:"18:30:00", park:"위즈 파크", win: "손주영", lose: "벤자민", save: "에르난데스"},
      {id: 7, team1: "LG", team2: "KT", score1: 5, score2: 6, date: "2024-10-09", time:"14:00:00", park:"위즈 파크", win: "박영현", lose: "백승현", save: "-"},
      {id: 8, team1: "KT", team2: "LG", score1: 1, score2: 4, date: "2024-10-11", time:"18:30:00", park:"잠실야구장", win: "임찬규", lose: "엄상백", save: "에르난데스"},
      {id: 9, team1: "LG", team2: "삼성", score1: 4, score2: 10, date: "2024-10-13", time:"14:00:00", park:"라이온즈 파크", win: "레예스", lose: "최원태", save: "-"},
      {id: 10, team1: "LG", team2: "삼성", score1: 5, score2: 10, date: "2024-10-15", time:"18:30:00", park:"라이온즈 파크", win: "원태인", lose: "손주영", save: "-"},
      {id: 11, team1: "삼성", team2: "LG", score1: 0, score2: 1, date: "2024-10-17", time:"18:30:00", park:"위즈 파크", win: "임찬규", lose: "이승현", save: "에르난데스"},
      {id: 12, team1: "삼성", team2: "LG", score1: 1, score2: 0, date: "2024-10-19", time:"14:00:00", park:"위즈 파크", win: "레예스", lose: "손주영", save: "김재윤"},
      {id: 13, team1: "삼성", team2: "KIA", score1: 1, score2: 5, date: "2024-10-21", time:"18:30:00", park:"챔피언스 필드", win: "곽도규", lose: "김태훈", save: "-"},
      {id: 14, team1: "삼성", team2: "KIA", score1: 3, score2: 8, date: "2024-10-23", time:"18:30:00", park:"챔피언스 필드", win: "양현종", lose: "황동재", save: "-"},
      {id: 15, team1: "KIA", team2: "삼성", score1: 2, score2: 4, date: "2024-10-25", time:"18:30:00", park:"라이온즈 파크", win: "레예스", lose: "라우어", save: "김재윤"},
      {id: 16, team1: "KIA", team2: "삼성", score1: 9, score2: 2, date: "2024-10-26", time:"14:00:00", park:"라이온즈 파크", win: "네일", lose: "원태인", save: "-"},
      {id: 17, team1: "삼성", team2: "KIA", score1: 5, score2: 7, date: "2024-10-28", time:"18:30:00", park:"챔피언스 필드", win: "곽도규", lose: "이상민", save: "정해영"}

    ]

// 현재 표시 중인 경기의 ID를 저장하는 변수
let currentId = 1; // 초기 값 설정 (첫 번째 경기)

// postMatches 배열의 최대 및 최소 ID를 계산
const minId = Math.min(...postMatches.map(item => item.id));
const maxId = Math.max(...postMatches.map(item => item.id));

function UpdatePostMatches(matchId) {
  const matchData = postMatches.find(item => item.id === matchId); // 해당 id의 경기 데이터 찾기

  // 경기가 존재하지 않을 경우 경고창 출력
  if (!matchData) {
    alert("경기 데이터를 찾을 수 없습니다.");
    return;
  }

  // 경기 데이터를 렌더링
  const postSeasonBox = document.querySelector('.post-season-match');
  const dateTimeString = `${matchData.date}T${matchData.time}`;
  const matchDate = new Date(dateTimeString);

  // 경기 내용 생성
  postSeasonBox.innerHTML = `
    <div class="match-detail-content" data-id="${matchId}">
      <div class="match-detail-score">
        <img class="detail-team1-logo" height="200px" src="${getTeamLogo(matchData.team1)}">
        <div class="match-detail-schedule">
          <span class="schedule-date">${matchData.date} (${setDayLabel(matchDate.getDay())}) ${matchDate.getHours()}:${String(matchDate.getMinutes()).padStart(2, '0')}</span>
          <span class="schedule-park">${matchData.park}</span>
          <div class="match-detail-button">
              <a href="#none" class="commonBtn postMatchBtn">
                <span>구장 정보</span>
              </a>
              <a href="#none" class="commonBtn postMatchBtn">
                <span>결과 보기</span>
              </a>
            </div>
        </div>
        <img class="detail-team2-logo" height="200px" src="${getTeamLogo(matchData.team2)}">
      </div>
      <div class="match-detail-score-time">
        <div class="team1-detail">
          <span class="team1-score">${matchData.score1}</span>
          <div class="team1-bowler">${getBowlerInfo(matchData, 'team1')}</div>
        </div>
        <div class="match-detail-Dday">
            <span id="today-match-day" class="time-count">-</span>
            <span id="today-match-hour" class="time-count">-</span>
            <span id="today-match-min" class="time-count">-</span>
            <span id="today-match-sec" class="time-count">-</span>
          </div>
        <div class="team2-detail">
          <span class="team2-score">${matchData.score2}</span>
          <div class="team2-bowler">${getBowlerInfo(matchData, 'team2')}</div>
        </div>
      </div>
    </div>
  `;
    /* ############### team1 team2 점수 비교해서 투수 넣기 ############## */
    if(matchData.score1 > matchData.score2){
      postSeasonBox.querySelector('.team2-score').style.color = '#757575';
    } else if(matchData.score1 < matchData.score2){
      postSeasonBox.querySelector('.team1-score').style.color = '#757575';
    }
    
  // 현재 경기 ID 업데이트
  currentId = matchId;
}

function UpdatePostPrevDate() {
  if (currentId > minId) {
    UpdatePostMatches(currentId - 1);
  } else {
    alert("이전 경기가 없습니다."); // 첫 번째 경기에서 경고 표시
  }
}

function UpdatePostNextDate() {
  if (currentId < maxId) {
    UpdatePostMatches(currentId + 1);
  } else {
    alert("다음 경기가 없습니다."); // 마지막 경기에서 경고 표시
  }
}

// 팀 로고 가져오기 함수
function getTeamLogo(teamName) {
  const teamLogos = {
    KIA: "images/logo-kia.svg",
    삼성: "images/logo-samsung.svg",
    두산: "images/logo-doosan.svg",
    NC: "images/logo-nc.svg",
    LG: "images/logo-lg.svg",
    SSG: "images/logo-ssg.svg",
    한화: "images/logo-hanwha.svg",
    키움: "images/logo-kiwoom.svg",
    롯데: "images/logo-lotte.svg",
    KT: "images/logo-kt.svg",
  };
  return teamLogos[teamName] || ""; // 로고가 없을 경우 기본 로고 반환
}

// 승/패/세이브 정보를 가져오는 함수
function getBowlerInfo(matchData, team) {
  if (team === 'team1') {
    if (matchData.score1 > matchData.score2) {
      return `<span><em style="color: #06ACED">승</em>${matchData.win}</span>
              <span><em style="color: #55AE20">세</em>${matchData.save}</span>`;
    } else {
      return `<span><em style="color: #EA1E23">패</em>${matchData.lose}</span>`;
    }
  } else if (team === 'team2') {
    if (matchData.score2 > matchData.score1) {
      return `<span><em style="color: #06ACED">승</em>${matchData.win}</span>
              <span><em style="color: #55AE20">세</em>${matchData.save}</span>`;
    } else {
      return `<span><em style="color: #EA1E23">패</em>${matchData.lose}</span>`;
    }
  }
  return "";
}

// 요일 이름 가져오기 함수
function setDayLabel(day) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[day];
}

// 초기 경기를 첫 번째 경기로 설정
UpdatePostMatches(minId);
  //처음에 아이디 1번만 보여주기
  UpdatePostMatches(1);

  //이전 다음 버튼
  function UpdatePostPrevDate() {
  const currentMatchElement = document.querySelector('.post-season-match .match-detail-content');
  const currentId = Number(currentMatchElement?.getAttribute('data-id')) || 1; // 현재 id 가져오기 (기본값: 1)
  const prevPostMatch = currentId - 1;

  // 이전 경기 데이터 존재 여부 확인 후 업데이트
  const prevPostMatchData = postMatches.find(item => item.id === prevPostMatch);
  if (prevPostMatch > 0 && prevPostMatchData) {
    UpdatePostMatches(prevPostMatch);
  } else {
    alert("이전 경기가 없습니다.");
  }
}

function UpdatePostNextDate() {
  const currentMatchElement = document.querySelector('.post-season-match .match-detail-content');
  const currentId = Number(currentMatchElement?.getAttribute('data-id')) || 1; // 현재 id 가져오기 (기본값: 1)
  const nextPostMatch = currentId + 1;

  // 다음 경기 데이터 존재 여부 확인 후 업데이트
  const nextPostMatchData = postMatches.find(item => item.id === nextPostMatch);
  if (nextPostMatch <= postMatches.length && nextPostMatchData) {
    UpdatePostMatches(nextPostMatch);
  } else {
    alert("다음 경기가 없습니다.");
  }
}

//## section3 - news ##//

document.addEventListener('DOMContentLoaded', function(){
  //ul box 복제하기
  let roller = document.querySelector('.news-img-wrap');
  roller.id = 'roller1'; //아이디부여

  //cloneNode : 노드 복제. 기본값은 false. 자식 노드까지 복제를 원하면 true 사용
  let clone = roller.cloneNode(true)

  clone.id = 'roller2'; //아이디부여
  document.querySelector('.news-inner').appendChild(clone);

  document.querySelector('#roller1').style.left = '0px';
  document.querySelector('#roller2').style.left = document.querySelector('.news-img-wrap ul').offsetWidth + 'px';

  roller.classList.add('roller');
  clone.classList.add('clone');

  //hover 효과

  //##변수##//
  let newsCard = document.querySelectorAll('li');
  let tabletWidth = window.matchMedia("(max-width:768px)");

  function hoverEvent(e){
    if(e.matches){
      newsCard.forEach(function(card){
        card.addEventListener('touchstart', function(){
          let newsImg = card.querySelector('img');
          let newsSpan = card.querySelector('span');
          roller.style.animationPlayState = 'paused';
          clone.style.animationPlayState = 'paused';
          newsImg.style.opacity = .2;
          newsSpan.style.opacity = 1;
          newsSpan.style.bottom = '5.2vw';
          setTimeout(() => {
          roller.style.animationPlayState = 'running';
          clone.style.animationPlayState = 'running';
          newsImg.style.opacity = 1;
          newsSpan.style.opacity = 0;
          newsSpan.style.bottom = '5px';
          }, 1000);
        });
      });
    }else{
      newsCard.forEach(function(card){
        card.addEventListener('mouseover', function(){
          let newsImg = card.querySelector('img');
          let newsSpan = card.querySelector('span');
          roller.style.animationPlayState = 'paused';
          clone.style.animationPlayState = 'paused';
          newsImg.style.opacity = .2;
          newsSpan.style.opacity = 1;
          newsSpan.style.bottom = '50px';
        });
        card.addEventListener('mouseleave', function(){
          let newsImg = card.querySelector('img');
          let newsSpan = card.querySelector('span');
          roller.style.animationPlayState = 'running';
          clone.style.animationPlayState = 'running';
          newsImg.style.opacity = 1;
          newsSpan.style.opacity = 0;
          newsSpan.style.bottom = '10px';
        });
      });
    };
  };

  tabletWidth.addEventListener('change', hoverEvent);
  hoverEvent(tabletWidth);
});

//## section4 - highlight ##//

document.addEventListener('DOMContentLoaded', function(){
  
  //##변수 설정##//
  const cards = document.querySelectorAll('.card'); //slide
  const leftButton = document.querySelector('#left'); //전 버튼
  const rightButton = document.querySelector('#right'); //후 버튼
  let clickEvent = false;

  const stopVideo = document.querySelectorAll('.VideoHighlight'); //스와이퍼 시 정지

  //##id 변수##//
  const cardSequnce = [
    'first-card',
    'second-card',
    'third-card',
    'fourth-card',
    'fifth-card',
    'sixth-card',
  ];

  //##아이디 값 변경##//
  class RotateCards {
    constructor(cards, cardSequnce) {
      this.cards = cards;
      this.cardSequnce = cardSequnce;
    }
  
    shuffle() {
      this.cards.forEach((item, index) => {
        const card = item;
        card.id = this.cardSequnce[index];
      });
    }
    
    moveLeft() {
      const value = this.cardSequnce.pop();
      this.cardSequnce.unshift(value);
      this.shuffle();

      //스와이퍼 시 정지
      stopVideo.forEach(function(e){
        e.contentWindow.postMessage(
          '{"event":"command","func":"' + 'stopVideo' + '","args":""}',
          '*',
        )
      });
    }
  
    moveRight() {
      const value = this.cardSequnce.shift();
      this.cardSequnce.push(value);
      this.shuffle();

      //스와이퍼 시 정지
      stopVideo.forEach(function(e){
        e.contentWindow.postMessage(
          '{"event":"command","func":"' + 'stopVideo' + '","args":""}',
          '*',
        )
      });
    }
  }
  
  //##클릭이벤트##//  
  const rotateCards = new RotateCards([...cards], cardSequnce);

  
  leftButton.addEventListener('click', () => {
    rotateCards.moveLeft();
  });
  
  rightButton.addEventListener('click', () => {
    rotateCards.moveRight();
  });
});

//## section5 - Team&SNS 와 풀페이지 ##//

document.addEventListener('DOMContentLoaded', function(){
  
  let mediaQuerySectionFive = window.matchMedia("(min-width:769px)");

  function sectionFiveMatchMedia(e){
    if(e.matches){
      
      //##변수설정##//

      //메인 section 변수
      let fullpageSlideContainer = document.getElementById('slider');
      let currentLocaiton = 0; //현재 section 번호
      let scrolling = false; //스크롤 제어
  
      //soori영역 card 변수
      let sooriSlideContainer = document.getElementById('soori-box');
      let sooriLocation = 0; //활성화된 soori박스 번호
      let sooriSection = document.getElementById('slide5-back-img');
      let teamNameChange = document.getElementById('team-name');
      let teamLogoChange = document.getElementById('team-logo');
      let teamHomepageBtn = document.getElementById('team-homepage');
      let teamSnsBtn = document.getElementById('team-sns');
      let snsBox = document.getElementById('box11');
      let slideShop = document.getElementById('slide6');
      let changeBlack = document.querySelectorAll('.change-black');
      let changeGold = document.querySelectorAll('.change-gold');
      let shopBtn = document.getElementById('shop-btn');
  
      //soori section 배경색
      const sooriBG = [
        'images/team-kia-background-img.png',
        'images/team-samsung-background-img.png',
        'images/team-lg-background-img.png',
        'images/team-doosan-background-img.png',
        'images/team-kt-background-img.png',
        'images/team-ssg-background-img.png',
        'images/team-lotte-background-img.png',
        'images/team-hanwha-background-img.png',
        'images/team-nc-background-img.png',
        'images/team-kiwoom-background-img.png',
        'images/sns-kbo.png',
      ];
  
      //soori section 구단 이름
      const TeamName = [
        'KIA 타이거즈',
        '삼성 라이온즈',
        'LG 트윈즈',
        '두산 베어스',
        'KT 위즈',
        'SSG 랜더스',
        '롯데 자이언츠',
        '한화 이글스',
        'NC 다이노스',
        '키움 히어로즈',
        '공식 SNS',
      ];

      //soori section 구단 로고
      const TeamLogo = [
        'images/logo-kia.svg', 
        'images/logo-samsung.svg',
        'images/logo-lg.svg',
        'images/logo-doosan.svg',
        'images/logo-kt.svg',
        'images/logo-ssg.svg',
        'images/logo-lotte.svg',
        'images/logo-hanwha.svg',
        'images/logo-nc.svg',
        'images/logo-kiwoom.svg',
        'images/logo-kbo.png',
      ]


      //##soori 영역 전, soori 영역, soori 영역 후 3단계로 나눠서 이벤트 주기##//

      window.addEventListener('wheel', (e) => {
        if(scrolling) return; //스크롤 중복 방지
        scrolling = true; //스크롤 중일 때

        setTimeout(() => {
          scrolling = false;
        }, 800); //스크롤 이벤트 사이 쉬는시간

      if(e.deltaY >= 0){ //마우스 휠 내릴때 (값이 양수일 때)
        if(currentLocaiton < 4){ //soori영역 전 전체 페이지 이동
          currentLocaiton++;
          fullpageSlideContainer.style.top = currentLocaiton * -100 + "dvh";
        }else{
          if(currentLocaiton >= 4 && currentLocaiton < 14){ //soori영역일때 전체 페이지 위치고정, soori  카드만 이동
            currentLocaiton++;
            fullpageSlideContainer.style.top = '-400dvh';
              if(sooriLocation < 10){
                sooriLocation++;
                sooriSlideContainer.style.top = `calc(30dvh - ${sooriLocation*230}px)`;

                //일단 숨기기
                sooriSection.classList.add('hidden');
                teamNameChange.classList.add('hidden');
                teamLogoChange.classList.add('hidden');
                teamHomepageBtn.classList.add('hidden');
                teamSnsBtn.classList.add('hidden');
                //다시 보여주기
                setTimeout(() => {
                  sooriSection.src = sooriBG[sooriLocation];
                  teamLogoChange.src = TeamLogo[sooriLocation];
                  teamNameChange.textContent = TeamName[sooriLocation];
                  sooriSection.classList.remove('hidden');
                  teamNameChange.classList.remove('hidden');
                  teamLogoChange.classList.remove('hidden');
                  teamHomepageBtn.classList.remove('hidden');
                  teamSnsBtn.classList.remove('hidden');
                }, 300);

                if(sooriLocation === 10){
                  sooriSection.style.width = '100vw';
                  snsBox.classList.add('active');
                }else{
                  sooriSection.style.width = 'unset';
                  snsBox.classList.remove('active');
                }
              }else{
                sooriLocation = 10;
              }
            }else{
              if(currentLocaiton <= 14){ //soori영역 이후 전체 페이지 다시 이동
                currentLocaiton += 1;
                fullpageSlideContainer.style.top = '-500dvh';
                setTimeout(() => {
                  slideShop.style.backgroundColor = '#FFFFFF';
                  changeBlack.forEach(function(b){
                    b.style.color = '#000000';
                  });
                  changeGold.forEach(function(g){
                    g.style.color = '#B19F77';
                  });
                  shopBtn.style.color = '#000000';
                  shopBtn.style.border = 'none';
                }, 500);
              }else{
                if(currentLocaiton >= 15 && currentLocaiton < 16){ //마지막 푸터영역
                currentLocaiton++;
                fullpageSlideContainer.style.top = 'calc(-500dvh - 626px)';
                }
              }
            }
          }
        }else{ //마우스 휠 올릴때 (값이 음수일 때)
          if(currentLocaiton >= 16){ //푸터에서 마지막 section으로 이동
            currentLocaiton--;
            fullpageSlideContainer.style.top = '-500dvh';
          }else{
            if(currentLocaiton >= 15){ //soori영역 전까지 전체 페이지 이동
              currentLocaiton--;
              fullpageSlideContainer.style.top = '-400dvh';

              slideShop.style.backgroundColor = '#000000';
              changeBlack.forEach(function(b){
                b.style.color = '#FFFFFF';
              });
              changeGold.forEach(function(g){
                g.style.color = '#A5A7AA';
              });
              shopBtn.style.color = '#FFFFFF';
              shopBtn.style.border = '2px solid #FFFFFF';

            }else{
              if(currentLocaiton > 4 && currentLocaiton <= 14){ //soori영역 전체 페이지 고정, soori 카드 이동
                currentLocaiton--;
                fullpageSlideContainer.style.top = '-400dvh';
                if(sooriLocation > 0){
                  sooriLocation--;
                  sooriSlideContainer.style.top = `calc(30dvh - ${sooriLocation*230}px)`;

                //일단 숨기기
                sooriSection.classList.add('hidden');
                teamNameChange.classList.add('hidden');
                teamLogoChange.classList.add('hidden');
                teamHomepageBtn.classList.add('hidden');
                teamSnsBtn.classList.add('hidden');
                //다시 보여주기
                setTimeout(() => {
                  sooriSection.src = sooriBG[sooriLocation];
                  teamLogoChange.src = TeamLogo[sooriLocation];
                  teamNameChange.textContent = TeamName[sooriLocation];
                  sooriSection.classList.remove('hidden');
                  teamNameChange.classList.remove('hidden');
                  teamLogoChange.classList.remove('hidden');
                  teamHomepageBtn.classList.remove('hidden');
                  teamSnsBtn.classList.remove('hidden');
                }, 300);

                  if(sooriLocation === 10){
                    sooriSection.style.width = '100vw';
                    snsBox.classList.add('active');
                  }else{
                    sooriSection.style.width = 'unset';
                    snsBox.classList.remove('active');
                  }
                }
              }else{
                if(currentLocaiton <= 4 && currentLocaiton > 0){ //soori영역 전 전체 페이지 이동
                currentLocaiton--;
                fullpageSlideContainer.style.top = currentLocaiton * -100 + "dvh";
                }
              }
            }
          }
        }
      });
    }else{
      fetch("/html/responsiveSoori.html").then((response)=> response.text()).then((data) => {
        document.querySelector('.team').innerHTML = data;

        let responseBox = document.getElementById('responsive-box');

        let startTouchX;
        let currentTouchX;
        let touchIndex = 0;

        responseBox.addEventListener('touchstart', function(){
          startTouchX = event.touches[0].pageX;
        });

        responseBox.addEventListener('touchmove', function(){
          currentTouchX = event.touches[0].pageX - startTouchX;
        });

        responseBox.addEventListener('touchend', function(){
          
          if(currentTouchX > 150){
            if(touchIndex > 0){
              touchIndex--;
              responseBox.style.left = touchIndex * -85.9523809 + 'vw';
            }
          }else if(currentTouchX < -150){
            if(touchIndex < 10){
              touchIndex++;
              responseBox.style.left = touchIndex * -85.9523809 + 'vw';
            }
          }
        });
      });
    };
  };
  sectionFiveMatchMedia(mediaQuerySectionFive);
  sectionFiveMatchMedia.addEventListener('change', mediaQuerySectionFive);
});

//## section6 - shop ##//

document.addEventListener('DOMContentLoaded', function(){
  let item01 = document.getElementById('item01');
  let item02 = document.getElementById('item02');
  let item03 = document.getElementById('item03');
  let item04 = document.getElementById('item04');
  let content = document.getElementById('item-content');
  let img = document.getElementById('img-wrap');
    
  if(matchMedia("screen and (min-width : 769px)").matches){
    item01.addEventListener('mouseenter', function(){
      content.style.top = '0px';
      img.style.left = 'calc(50% - 203px)';
    });
  
    item02.addEventListener('mouseenter', function(){
      content.style.top = '-144px';
      img.style.left = 'calc(50% - 1253px)';
    });
  
    item03.addEventListener('mouseenter', function(){
      content.style.top = '-288px';
      img.style.left = 'calc(50% - 2353px)';
    });
  
    item04.addEventListener('mouseenter', function(){
      content.style.top = '-432px';
      img.style.left = 'calc(50% - 3473px)';
    });
  }else{
    if(matchMedia("screen and (min-width : 421px)").matches){
      item01.addEventListener('mouseenter', function(){
        content.style.top = '0px';
        img.style.left = 'calc(50% - 25vw)';
      });
    
      item02.addEventListener('mouseenter', function(){
        content.style.top = '-18.75vw';
        img.style.left = 'calc(50% - 130.859375vw)';
      });
    
      item03.addEventListener('mouseenter', function(){
        content.style.top = '-37.5vw';
        img.style.left = 'calc(50% - 242.578125vw)';
      });
    
      item04.addEventListener('mouseenter', function(){
        content.style.top = '-56.25vw';
        img.style.left = 'calc(50% - 356.901041666vw)';
      });
    }else{
      item01.addEventListener('mouseenter', function(){
        content.style.top = '0px';
        img.style.left = 'calc(50% - 27.3809523vw)';
      });
    
      item02.addEventListener('mouseenter', function(){
        content.style.top = '-21.9047619vw';
        img.style.left = 'calc(50% - 137.619047vw)';
      });
    
      item03.addEventListener('mouseenter', function(){
        content.style.top = '-43.8095238vw';
        img.style.left = 'calc(50% - 255.9523809vw)';
      });
    
      item04.addEventListener('mouseenter', function(){
        content.style.top = '-65.7142857vw';
        img.style.left = 'calc(50% - 371.428571vw)';
      });
    }
  }
  
});


//## footer fetch ##//

fetch("html/footer.html")
.then(response => response.text())
.then(data => {
  document.getElementById('footer').innerHTML = data;
});