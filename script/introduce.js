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

//## main-content ##//
window.addEventListener('DOMContentLoaded', function(){

  //player 배열
  const players = [
    //## kia
    {id: 'kia', number: 47, teamLogo: "images/logo-kia.svg", playerImage: "images/card-kia47.png", position: "외야수", name: "나성범", birth: "1989-10-03", physique: "183cm, 100kg", school: "광주대성초-진흥중-진흥고-연세대-NC"},
    {id: 'kia', number: 58, teamLogo: "images/logo-kia.svg", playerImage: "images/card-kia58.png", position: "내야수", name: "서건창", birth: "1989-08-22", physique: "176cm, 84kg", school: "송정동초-충장중-광주제일고-LG-히어로즈-키움-LG"},
    {id: 'kia', number: 30, teamLogo: "images/logo-kia.svg", playerImage: "images/card-kia30.png", position: "외야수", name: "소크라테스", birth: "1992-09-06", physique: "188cm, 93kg", school: "도미니카 Liceo Cacique Enriquillo(고)"},
    {id: 'kia', number: 54, teamLogo: "images/logo-kia.svg", playerImage: "images/card-kia54.png", position: "투수", name: "양현종", birth: "1988-03-01", physique: "183cm, 91kg", school: "학강초-광주동성중-광주동성고-KIA-텍사스"},
    {id: 'kia', number: 26, teamLogo: "images/logo-kia.svg", playerImage: "images/card-kia26.png", position: "포수", name: "한승택", birth: "1994-06-21", physique: "174cm, 83kg", school: "잠전초(남양주리틀)-잠신중-덕수고-한화-경찰"},

    //## samsung
    {id: 'samsung', number: 47, teamLogo: "images/logo-samsung.svg", playerImage: "images/card-samsung47.png", position: "포수", name: "강민호", birth: "1985-08-18", physique: "185cm, 100kg", school: "제주신광초-포철중-포철공고-(국제디지털대)-롯데"},
    {id: 'samsung', number: 5, teamLogo: "images/logo-samsung.svg", playerImage: "images/card-samsung5.png", position: "외야수", name: "구자욱", birth: "1993-02-12", physique: "189cm, 75kg", school: "본리초-경복중-대구고-삼성-상무"},
    {id: 'samsung', number: 58, teamLogo: "images/logo-samsung.svg", playerImage: "images/card-samsung58.png", position: "외야수", name: "김지찬", birth: "2001-03-08", physique: "163cm, 64kg", school: "백사초(이천시리틀)-모가중-라온고"},
    {id: 'samsung', number: 18, teamLogo: "images/logo-samsung.svg", playerImage: "images/card-samsung18.png", position: "투수", name: "원태인", birth: "2000-04-06", physique: "183cm, 92kg", school: "율하초(중구리틀)-경복중-경북고"},
    {id: 'samsung', number: 7, teamLogo: "images/logo-samsung.svg", playerImage: "images/card-samsung7.png", position: "내야수", name: "이재현", birth: "2003-02-04", physique: "180cm, 82kg", school: "서울이수초-선린중-서울고"},

    //## lg
    {id: 'lg', number: 44, teamLogo: "images/logo-lg.svg", playerImage: "images/card-lg44.png", position: "포수", name: "김성우", birth: "2003-11-15", physique: "180cm, 85kg", school: "성동초-건대부중-배재고"},
    {id: 'lg', number: 17, teamLogo: "images/logo-lg.svg", playerImage: "images/card-lg17.png", position: "외야수", name: "박해민", birth: "1990-02-24", physique: "180cm, 75kg", school: "영중초-양천중-신일고-한양대-삼성"},
    {id: 'lg', number: 10, teamLogo: "images/logo-lg.svg", playerImage: "images/card-lg10.png", position: "내야수", name: "오지환", birth: "1990-03-12", physique: "185cm, 80kg", school: "군산초-자양중-경기고"},
    {id: 'lg', number: 1, teamLogo: "images/logo-lg.svg", playerImage: "images/card-lg1.png", position: "투수", name: "임찬규", birth: "1992-11-20", physique: "185cm, 80kg", school: "가동초-청원중-휘문고-LG-경찰"},
    {id: 'lg', number: 51, teamLogo: "images/logo-lg.svg", playerImage: "images/card-lg51.png", position: "외야수", name: "홍창기", birth: "1993-11-21", physique: "189cm, 94kg", school: "대일초-매송중-안산공고-건국대-LG-경찰"},

    //## doosan
    {id: 'doosan', number: 27, teamLogo: "images/logo-doosan.svg", playerImage: "images/card-doosan27.png", position: "투수", name: "김강률", birth: "1988-08-28", physique: "187cm, 95kg", school: "문촌초(일산리틀)-장성중-경기고-두산-상무"},
    {id: 'doosan', number: 32, teamLogo: "images/logo-doosan.svg", playerImage: "images/card-doosan32.png", position: "외야수", name: "김재환", birth: "1988-09-22", physique: "183cm, 90kg", school: "영랑초-상인천중-인천고-두산-상무"},
    {id: 'doosan', number: 25, teamLogo: "images/logo-doosan.svg", playerImage: "images/card-doosan25.png", position: "포수", name: "양의지", birth: "1987-06-05", physique: "180cm, 95kg", school: "송정동초-무등중-진흥고-두산-경찰-두산-NC"},
    {id: 'doosan', number: 13, teamLogo: "images/logo-doosan.svg", playerImage: "images/card-doosan13.png", position: "내야수", name: "이유찬", birth: "1998-08-05", physique: "175cm, 68kg", school: "동막초-천안북중-북일고-두산-상무"},
    {id: 'doosan', number: 31, teamLogo: "images/logo-doosan.svg", playerImage: "images/card-doosan31.png", position: "외야수", name: "정수빈", birth: "1990-10-07", physique: "175cm, 70kg", school: "수원신곡초-수원북중-유신고-두산-경찰"},
  

    //## kt
    {id: 'kt', number: 50, teamLogo: "images/logo-kt.svg", playerImage: "images/card-kt50.png", position: "내야수", name: "강백호", birth: "1999-07-29", physique: "184cm, 98kg", school: "부천북초-서울이수중-서울고"},
    {id: 'kt', number: 1, teamLogo: "images/logo-kt.svg", playerImage: "images/card-kt1.png", position: "투수", name: "고영표", birth: "1991-09-16", physique: "187cm, 88kg", school: "광주대성초-광주동성중-화순고-동국대"},
    {id: 'kt', number: 27, teamLogo: "images/logo-kt.svg", playerImage: "images/card-kt27.png", position: "외야수", name: "배정대", birth: "1995-06-12", physique: "185cm, 80kg", school: "도신초-성남중-성남고-(디지털문예대)-LG-KT-경찰"},
    {id: 'kt', number: 36, teamLogo: "images/logo-kt.svg", playerImage: "images/card-kt36.png", position: "내야수", name: "오재일", birth: "1986-10-29", physique: "187cm, 95kg", school: "인창초(구리리틀)-구리인창중-야탑고-현대-상무-히어로즈-두산-삼성"},
    {id: 'kt', number: 22, teamLogo: "images/logo-kt.svg", playerImage: "images/card-kt22.png", position: "포수", name: "장성우", birth: "1990-01-17", physique: "187cm, 100kg", school: "감천초-경남중-경남고-롯데-경찰-롯데"},
  

    //## ssg
    {id: 'ssg', number: 29, teamLogo: "images/logo-ssg.svg", playerImage: "images/card-ssg29.png", position: "투수", name: "김광현", birth: "1988-07-22", physique: "188cm, 88kg", school: "덕성초(안산리틀)-안산중앙중-안산공고-SK-세인트루이스"},
    {id: 'ssg', number: 24, teamLogo: "images/logo-ssg.svg", playerImage: "images/card-ssg24.png", position: "포수", name: "김민식", birth: "1989-06-28", physique: "180cm, 80kg", school: "양덕초-마산중-마산고-원광대-SK-상무-SK-KIA"},
    {id: 'ssg', number: 6, teamLogo: "images/logo-ssg.svg", playerImage: "images/card-ssg6.png", position: "내야수", name: "김성현", birth: "1987-03-09", physique: "172cm, 72kg", school: "송정동초-충장중-광주제일고-SK-상무-SK"},
    {id: 'ssg', number: 14, teamLogo: "images/logo-ssg.svg", playerImage: "images/card-ssg14.png", position: "내야수", name: "최정", birth: "1987-02-28", physique: "180cm, 90kg", school: "대일초-평촌중-유신고-SK"},
    {id: 'ssg', number: 35, teamLogo: "images/logo-ssg.svg", playerImage: "images/card-ssg35.png", position: "외야수", name: "한유섬", birth: "1989-08-09", physique: "190cm, 105kg", school: "중앙초(해운대리틀)-대천중-경남고-경성대-SK-상무-SK"},
  

    //## lotte
    {id: 'lotte', number: 34, teamLogo: "images/logo-lotte.svg", playerImage: "images/card-lotte34.png", position: "투수", name: "김원중", birth: "1993-06-14", physique: "192cm, 96kg", school: "학강초-광주동성중-광주동성고"},
    {id: 'lotte', number: 29, teamLogo: "images/logo-lotte.svg", playerImage: "images/card-lotte29.png", position: "외야수", name: "레이예스", birth: "1994-10-05", physique: "196cm, 87kg", school: "베네수엘라 Dr Felipe Guevara(고)"},
    {id: 'lotte', number: 55, teamLogo: "images/logo-lotte.svg", playerImage: "images/card-lotte55.png", position: "포수", name: "백두산", birth: "2001-05-20", physique: "180cm, 95kg", school: "부산수영초-대천중-개성고-동의대"},
    {id: 'lotte', number: 8, teamLogo: "images/logo-lotte.svg", playerImage: "images/card-lotte8.png", position: "외야수", name: "전준우", birth: "1986-02-25", physique: "184cm, 98kg", school: "흥무초-경주중-경주고-건국대-롯데-경찰"},
    {id: 'lotte', number: 9, teamLogo: "images/logo-lotte.svg", playerImage: "images/card-lotte9.png", position: "내야수", name: "정훈", birth: "1987-07-18", physique: "180cm, 85kg", school: "양덕초-마산동중-용마고"},
  

    //## hanwha
    {id: 'hanwha', number: 8, teamLogo: "images/logo-hanwha.svg", playerImage: "images/card-hanwha8.png", position: "내야수", name: "노시환", birth: "2000-12-03", physique: "185cm, 105kg", school: "부산수영초-경남중-경남고"},
    {id: 'hanwha', number: 99, teamLogo: "images/logo-hanwha.svg", playerImage: "images/card-hanwha99.png", position: "투수", name: "류현진", birth: "1987-03-25", physique: "190cm, 113kg", school: "창영초-동산중-동산고-(대전대)-한화-LA다저스-토론토"},
    {id: 'hanwha', number: 1, teamLogo: "images/logo-hanwha.svg", playerImage: "images/card-hanwha1.png", position: "투수", name: "문동주", birth: "2003-12-23", physique: "188cm, 97kg", school: "광주화정초-무등중-진흥고"},
    {id: 'hanwha', number: 22, teamLogo: "images/logo-hanwha.svg", playerImage: "images/card-hanwha22.png", position: "외야수", name: "채은성", birth: "1990-02-06", physique: "186cm, 92kg", school: "순천북초-순천이수중-효천고-LG"},
    {id: 'hanwha', number: 13, teamLogo: "images/logo-hanwha.svg", playerImage: "images/card-hanwha13.png", position: "포수", name: "최재훈", birth: "1989-08-27", physique: "178cm, 94kg", school: "화곡초-덕수중-덕수고-(방송통신대)-두산-경찰-두산"},


    //## nc
    {id : 'nc', number: 36, teamLogo: "images/logo-nc.svg", playerImage: "images/card-nc36.png", position: "외야수", name: "권희동"},
    {id : 'nc', number: 24, teamLogo: "images/logo-nc.svg", playerImage: "images/card-nc24.png", position: "내야수", name: "데이비슨"},
    {id : 'nc', number: 2, teamLogo: "images/logo-nc.svg", playerImage: "images/card-nc2.png", position: "내야수", name: "박민우"},
    {id : 'nc', number: 42, teamLogo: "images/logo-nc.svg", playerImage: "images/card-nc42.png", position: "포수", name: "신용석"},
    {id : 'nc', number: 30, teamLogo: "images/logo-nc.svg", playerImage: "images/card-nc30.png", position: "투수", name: "하트"},

    //##kiwoom
    {id: 'kiwoom', number: 0, teamLogo: "images/logo-kiwoom.svg", playerImage: "images/card-kiwoom0.png", position: "내야수", name: "김병휘", birth: "2001-02-16", physique: "177cm, 79kg", school: "효제초-홍은중-장충고"},
    {id: 'kiwoom', number: 32, teamLogo: "images/logo-kiwoom.svg", playerImage: "images/card-kiwoom32.png", position: "포수", name: "김재현", birth: "1993-03-18", physique: "178cm, 90kg", school: "진북초-전라중-대전고-히어로즈-상무"},
    {id: 'kiwoom', number: 21, teamLogo: "images/logo-kiwoom.svg", playerImage: "images/card-kiwoom21.png", position: "투수", name: "문성현", birth: "1991-11-09", physique: "182cm, 89kg", school: "남정초-선린중-충암고-히어로즈-상무-히어로즈"},
    {id: 'kiwoom', number: 14, teamLogo: "images/logo-kiwoom.svg", playerImage: "images/card-kiwoom14.png", position: "외야수", name: "박수종", birth: "1999-02-25", physique: "178cm, 82kg", school: "도신초-강남중-충암고-경성대"},
    {id: 'kiwoom', number: 24, teamLogo: "images/logo-kiwoom.svg", playerImage: "images/card-kiwoom24.png", position: "내야수", name: "송성문", birth: "1996-08-29", physique: "183cm, 88kg", school: "봉천초(용산구리틀)-홍은중-장충고-히어로즈-키움-상무"}
  ];

  //teamColor 배열
  const teamColor = {
    kia : '#B71733',
    samsung : '#184D75',
    lg : '#791E37',
    doosan : '#131230',
    kt : '#090B0C',
    ssg : '#543913',
    lotte : '#406781',
    hanwha : '#C55E3D',
    nc : '#C6805C',
    kiwoom : '#6B1547',
  }

  //option
  const teamOption = document.getElementById('team-option');
  const positionOption = document.getElementById('position-option');
  let teamOptionValue = document.getElementById("team-option-value");
  let positionOptionValue = document.getElementById("position-option-value");
  let teamOptionList = document.querySelectorAll('#team-option-value>div');
  let teamPositionList = document.querySelectorAll('#position-option-value>div');

  teamOption.addEventListener('click', function(){
    if(teamOptionValue.classList.contains('active')){
      teamOptionValue.classList.remove('active');
    }else{
      teamOptionValue.classList.add('active');
    }
  });

  positionOption.addEventListener('click', function(){
    if(positionOptionValue.classList.contains('active')){
      positionOptionValue.classList.remove('active');
    }else{
      positionOptionValue.classList.add('active');
    }
  });

  //HTML 요소에 카드넣기
  const cardWrap = document.getElementById("card-wrap");
  const searchPlayer = document.getElementById("search-player");
  const searchBtn = document.getElementById('search-btn');

  //초기 상태
  let itemsPerPage = 10; // 한 번에 보여줄 카드 개수
  let currentCount = 0; // 현재 보여준 카드 개수
  let filteredPlayers = players; // 검색 결과 저장용 (초기값은 전체)

  const mediaQueryPerPage = () => {
    if(window.matchMedia("(min-width: 769px)").matches){
      itemsPerPage = 10;
    }else if(window.matchMedia("(min-width: 421px)").matches){
      itemsPerPage = 9;
    }else if(window.matchMedia("(max-width: 420px)").matches){
      itemsPerPage = 4;
    }
  };

  mediaQueryPerPage();
  window.addEventListener('resize', mediaQueryPerPage);

  //더보기 버튼
  const moreButton = document.getElementById("more-btn");

  //초기 렌더링 함수
  function renderCards(){
    cardWrap.innerHTML = ""; //기존 카드 초기화

    const nextCount = Math.min(currentCount + itemsPerPage, filteredPlayers.length); // 보여줄 카드의 범위 설정

    for(let i = 0; i < nextCount; i++){
      const player = filteredPlayers[i];
      const card = document.createElement("div");
      card.className = `card ${player.id}`;
      card.style.backgroundColor = `${teamColor[player.id]}`;

      card.innerHTML = `
        <div class="card-front">
          <h1>${player.number}</h1>
          <img src="${player.teamLogo}" alt="" class="team-logo" id="team-logo">
          <img src="${player.playerImage}" alt="" class="player">
          <h5>${player.position}</h5>
          <h2>${player.name}</h2>
          <div class="gradiant-box"></div>
        </div>
        <div class="card-back">
          <div class="gradiant-box"></div>
          <div class="blur-background">
            <h2>${player.name}</h2>
            <h1>${player.number}</h1>
            <div class="text-box">
              <span><b>생년월일</b> ${player.birth}</span>
              <span><b>체<em></em>격</b> ${player.physique}</span>
              <span><b>출<em></em>신<em></em>교</b> ${player.school}</span>
            </div>
            <img src="${player.teamLogo}" alt="" class="team-mini-logo" id="team-logo">
          </div>
          <img src="${player.playerImage}" alt="" class="player">
          <img src="${player.teamLogo}" alt="" class="team-logo" id="team-logo">
        </div>
      `;

      cardWrap.appendChild(card);
    }

    currentCount = nextCount; //렌더링된 카드 수 업데이트

    //더 이상 카드가 없으면 버튼 숨기기
    if(currentCount >= filteredPlayers.length){
      moreButton.style.display = "none";
    }else{
      moreButton.style.display = "flex";
    }
  }
  /*
  //검색 기능
  function searchFilterCards(){
    const searchValue = searchPlayer.value.toLowerCase();
    currentCount = 0; //카드 초기화
    filteredPlayers = players.filter((player) => {
      return player.name.toLowerCase().includes(searchValue);
    });
    renderCards();
  }


  //option 기능
  teamOptionList.forEach(function(item){
    item.addEventListener('click', function(){
      teamOptionValue.classList.remove('active');
      teamOption.textContent = item.dataset.teamname;
      
      //선택된 팀에 맞는 선수들만 필터링
      filteredPlayers = players.filter(player => player.id === item.dataset.team);

      //카드 초기화 후 필터링된 카드들만 렌더링
      currentCount = 0; //현재 카운트 초기화
      renderCards(); //필터링된 카드들만 렌더링

      console.log(item.dataset.team);
    });
  });

  teamPositionList.forEach(function(item){
    item.addEventListener('click', function(){
      positionOptionValue.classList.remove('active');
      positionOption.textContent = item.dataset.position;

      //선택된 포지션 맞는 선수 필터링
      filteredPlayers = players.filter(player => player.position === item.dataset.position);

      //카드 초기화 후 필터링된 카드들만 렌더링
      currentCount = 0; //현재 카운트 초기화
      renderCards(); //필터링된 카드들만 렌더링
    });
  });

  searchBtn.addEventListener('click', searchFilterCards);
  */

  moreButton.addEventListener('click', renderCards);

  // 필터링 상태 변수
  let selectedTeam = null; // 현재 선택된 팀
  let selectedPosition = null; // 현재 선택된 포지션
  let searchKeyword = ""; // 현재 검색 키워드

  // 필터링 함수
  function applyFilters() {
    filteredPlayers = players.filter((player) => {
      const teamMatch = selectedTeam ? player.id === selectedTeam : true;
      const positionMatch = selectedPosition ? player.position === selectedPosition : true;
      const searchMatch = searchKeyword ? player.name.toLowerCase().includes(searchKeyword) : true;
      return teamMatch && positionMatch && searchMatch;
    });
    currentCount = 0; // 현재 카운트 초기화
    renderCards(); // 필터링된 카드들 렌더링
  }

  // 팀 옵션 선택 이벤트
  teamOptionList.forEach(function (item) {
    item.addEventListener("click", function () {
      if(item.dataset.team === 'all'){
        window.location.reload();
      }else{
        teamOptionValue.classList.remove("active");
        teamOption.textContent = item.dataset.teamname;
  
        // 선택된 팀 업데이트
        selectedTeam = item.dataset.team;
  
        // 필터링 함수 호출
        applyFilters();
      }
    });
  });

  // 포지션 옵션 선택 이벤트
  teamPositionList.forEach(function (item) {
    item.addEventListener("click", function () {
      if(item.dataset.position === '포지션 선택'){
        window.location.reload();
      }else{
        positionOptionValue.classList.remove("active");
        positionOption.textContent = item.dataset.position;
  
        // 선택된 포지션 업데이트
        selectedPosition = item.dataset.position;
  
        // 필터링 함수 호출
        applyFilters();
      }
    });
  });

  // 검색 이벤트
  searchBtn.addEventListener("click", function () {
    searchKeyword = searchPlayer.value.toLowerCase();

    // 필터링 함수 호출
    applyFilters();
  });

  // 초기 렌더링
  renderCards();
});

//## footer fetch ##//

fetch("html/footer.html")
.then(response => response.text())
.then(data => {
  document.getElementById('footer').innerHTML = data;
  let interImg = document.getElementById('change-white-black-inter');
  interImg.src = 'images/logo-black-inter.png';

  let hankookImg = document.getElementById('change-white-black-hankook');
  hankookImg.src = 'images/logo-black-hankook.png';
});