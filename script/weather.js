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


//좌측 탭 클릭 시 active 추가
// box-index 1번 - weather-inner
// box-index 2번 - map-inner
// box-index 3번 - detail-inner

let boxIndex = document.querySelectorAll('.box-index');
let boxInfo = document.querySelectorAll('.box-info');

boxIndex.forEach((target, index) => {
  target.addEventListener('click', () => {
    // 모든 boxIndex에서 active 클래스 제거
    boxIndex.forEach(box => box.classList.remove('active'));
    // 클릭한 boxIndex에 active 클래스 추가
    target.classList.add('active');

    // 모든 boxInfo에서 active 클래스 제거
    boxInfo.forEach(info => info.classList.remove('active'));
    // 클릭된 index에 해당하는 boxInfo에 active 클래스 추가
    boxInfo[index].classList.add('active');
  });
});

// 날씨 가져오는 함수

let teams = [
  {id: 1, team: 'kia', park: '광주-기아 챔피언스 필드', address: '광주광역시 북구 서림로 10', lat: 35.168140, lon: 126.889106},
  {id: 2, team: 'samsung', park: '대구 삼성 라이온즈 파크', address: '대구광역시 수성구 야구전설로 1', lat: 35.841186, lon: 128.681522},
  {id: 3, team: 'lg', park: '잠실야구장', address: '서울특별시 송파구 올림픽로 25', lat: 37.516644, lon: 127.072988},
  {id: 4, team: 'doosan', park: '잠실야구장', address: '서울특별시 송파구 올림픽로 25', lat: 37.516644, lon: 127.072988},
  {id: 5, team: 'kt', park: '수원 KT 위즈 파크', address: '경기도 수원시 장안구 경수대로 893', lat: 37.299917, lon: 127.009636},
  {id: 6, team: 'ssg', park: '인천 SSG 랜더스 필드', address: '인천광역시 미추홀구 매소홀로 618', lat: 37.437078, lon: 126.693257},
  {id: 7, team: 'lotte', park: '사직야구장', address: '부산광역시 동래구 사직로 45', lat: 
35.194057, lon: 129.061525},
  {id: 8, team: 'hanwha', park: '한화생명 이글스파크', address: '대전광역시 중구 대종로 373', lat: 36.317118, lon: 127.429115},
  {id: 9, team: 'nc', park: '창원 NC 파크', address: '경상남도 창원시 마산회원구 삼호로 63', lat: 35.222613, lon: 128.582226},
  {id: 10, team: 'kiwoom', park: '고척 스카이돔', address: '서울특별시 구로구 경인로 430', lat: 37.498941, lon: 126.867082}
];

// 날씨용 전역 변수 선언
const apiKey = "de9fb9286b8c0295445f16b49f8d46b9";
const weatherDescKo = [
  { 201: '가벼운 비를 동반한 천둥구름' },
  { 200: '비를 동반한 천둥구름' },
  { 202: '폭우를 동반한 천둥구름' },
  { 210: '약한 천둥구름' },
  { 211: '천둥구름' },
  { 212: '강한 천둥구름' },
  { 221: '불규칙적 천둥구름' },
  { 230: '약한 연무를 동반한 천둥구름' },
  { 231: '연무를 동반한 천둥구름' },
  { 232: '강한 안개비를 동반한 천둥구름' },
  { 300: '가벼운 안개비' },
  { 301: '안개비' },
  { 302: '강한 안개비' },
  { 310: '가벼운 적은비' },
  { 311: '적은비' },
  { 312: '강한 적은비' },
  { 313: '소나기와 안개비' },
  { 314: '강한 소나기와 안개비' },
  { 321: '소나기' },
  { 500: '악한 비' },
  { 501: '중간 비' },
  { 502: '강한 비' },
  { 503: '매우 강한 비' },
  { 504: '극심한 비' },
  { 511: '우박' },
  { 520: '약한 소나기 비' },
  { 521: '소나기 비' },
  { 522: '강한 소나기 비' },
  { 531: '불규칙적 소나기 비' },
  { 600: '가벼운 눈' },
  { 601: '눈' },
  { 602: '강한 눈' },
  { 611: '진눈깨비' },
  { 612: '소나기 진눈깨비' },
  { 615: '약한 비와 눈' },
  { 616: '비와 눈' },
  { 620: '약한 소나기 눈' },
  { 621: '소나기 눈' },
  { 622: '강한 소나기 눈' },
  { 701: '박무' },
  { 711: '연기' },
  { 721: '연무' },
  { 731: '모래 먼지' },
  { 741: '안개' },
  { 751: '모래' },
  { 761: '먼지' },
  { 762: '화산재' },
  { 771: '돌풍' },
  { 781: '토네이도' },
  { 800: '구름 한 점 없는 맑은 하늘' },
  { 801: '약간의 구름이 낀 하늘' },
  { 802: '드문드문 구름이 낀 하늘' },
  { 803: '구름이 거의 없는 하늘' },
  { 804: '구름으로 뒤덮인 흐린 하늘' },
  { 900: '토네이도' },
  { 901: '태풍' },
  { 902: '허리케인' },
  { 903: '한랭' },
  { 904: '고온' },
  { 905: '바람부는' },
  { 906: '우박' },
  { 951: '바람이 거의 없는' },
  { 952: '약한 바람' },
  { 953: '부드러운 바람' },
  { 954: '중간 세기 바람' },
  { 955: '신선한 바람' },
  { 956: '센 바람' },
  { 957: '돌풍에 가까운 센 바람' },
  { 958: '돌풍' },
  { 959: '심각한 돌풍' },
  { 960: '폭풍' },
  { 961: '강한 폭풍' },
  { 962: '허리케인' },
]
//날씨별 이미지 넣는 함수
function weatherImage(icon){
  const weatherIcon = {
    '01d': "images/weather-clear-sky.png",
    '01n': "images/weather-clear-sky.png",
    '02d': "images/weather-few-clouds.png",
    '02n': "images/weather-few-clouds.png",
    '03d': "images/weather-scattered-clouds.png",
    '03n': "images/weather-scattered-clouds.png",
    '04d': "images/weather-broken-clouds.png",
    '04n': "images/weather-broken-clouds.png",
    '09d': "images/weather-shower-rain.png",
    '09n': "images/weather-shower-rain.png",
    '10d': "images/weather-rain.png",
    '10n': "images/weather-rain.png",
    '11d': "images/weather-thunderstorm.png",
    '11n': "images/weather-thunderstorm.png",
    '13d': "images/weather-snow.png",
    '13n': "images/weather-snow.png",
    '50d': "images/weather-mist.png",
    '50n': "images/weather-mist.png",
  };
  return weatherIcon[icon] || '';
}
//월을 영어로 표기하기
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//현 시간 기준 5개 날씨 보여주기
function getTodayWeather(lat, lon){
let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    let hourlyData = data.hourly.slice(0, 5); // 0~4시간의 데이터 추출
    let weatherToday = document.getElementById('today');
    let weatherInfo = document.querySelector('.weather-info');
    weatherToday.innerHTML = '';
    weatherInfo.innerHTML = '';

    hourlyData.forEach((hour, index) => {
      //날씨 설명 받아오는 함수
      function getDescription(code) {
      let result = weatherDescKo.find(item => Object.keys(item)[0] == code);
      return result ? Object.values(result)[0] : '잘못된 값입니다';
      };

      let time = new Date(hour.dt * 1000);
      let temp = hour.temp;
      let description = hour.weather[0].id;
      let times = time.getHours();
      let ampm = times < 12 ? 'AM' : 'PM'; //AM PM 변환
      let formattedHour = times % 12 === 0 ? 12 : times % 12; //12시간제
      let icon = hour.weather[0].icon;
      let weatherCode = hour.weather[0].id;
      //현재 시간과 비교
      let currentTime = new Date();
      let currentHour = currentTime.getHours();

      //현재 시간의 기온, 값, 날짜 받아서 삽입하기
      if(times === currentHour && index === 0){
        let creatDiv = document.createElement('div');
        creatDiv.classList.add('date-temperature');
        creatDiv.innerHTML = `
        <span class="weather-date">${monthNames[currentTime.getMonth()]} ${currentTime.getDate()}</span>
        <span class="weather-temperature">${Math.floor(temp)}&#8451;</span>
        <span class="weather-description">${getDescription(description)}</span>
        `

        weatherInfo.appendChild(creatDiv);
      };


    //현재 시간과 일치하는 경우 now 표시
    let timeLabel = times === currentHour ? 'NOW' : `${formattedHour}${ampm}`;

    let createDiv = document.createElement('div');
      createDiv.classList.add('weather-each');
      createDiv.innerHTML = `
      <span class="weather-each-time">${timeLabel}</span>
            <img class="weather-icon" src="${weatherImage(icon)}">
            <span class="weather-each-temp">${Math.floor(temp)}&#8451;</span>
      `
      weatherToday.appendChild(createDiv);
    });
  })
  .catch(error => console.error("오늘 날씨 로딩 에러 발생", error));
}


//현 날짜 기준 5일 날씨 보여주기
function getWeeklyWeather(lat, lon){
  let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    let dailyData = data.daily.slice(0, 5);
    let weatherWeekly = document.getElementById('weekly');
    console.log(dailyData); 
    weatherWeekly.innerHTML = '';
    dailyData.forEach(day => {
      //날씨 설명 받아오는 함수
      function getDescription(code) {
      let result = weatherDescKo.find(item => Object.keys(item)[0] == code);
      return result ? Object.values(result)[0] : '잘못된 값입니다';
      };
      let date = new Date(day.dt * 1000);
      let dayName = date.getDate();
      let tempMin = Math.floor(day.temp.min);
      let tempMax = Math.floor(day.temp.max);
      let icon = day.weather[0].icon;
      let today = new Date();

      // 오늘 날짜면 today 표기
      let dateLabel = dayName === today.getDate() ? 'TODAY' : `${date.getDate()}일`;

      let createDiv = document.createElement('div');
      createDiv.classList.add('weather-each');
      createDiv.innerHTML = `
      <span class="weather-each-time">${dateLabel}</span>
            <img class="weather-icon" src="${weatherImage(icon)}">
            <span class="weather-each-temp">${Math.floor(tempMin)}&#8451; / ${Math.floor(tempMax)}&#8451;</span>
      `;
      weatherWeekly.appendChild(createDiv);
    })
  })
  .catch(error => console.error("주간 날씨 로딩 에러 발생", error));
}

// 상세 안내 내용 작성 함수
function updateDetail(team){
  let detailInner = document.querySelector('.detail-inner');
  if(team){
    if(team.team === 'kia'){
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌광천동 유스퀘어 광주종합버스터미널 → 광주-기아 챔피언스 필드 정문(시외버스 및 고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 매월26, 일곡38, 송암47, 상무64번 승차 → 제2광천교 정류장 하차 → 도보로 6분 이동(총 13분 소요)
              <br>
              2) 매월16 승차 → 광주-기아 챔피언스 필드 정문 정류장 하차 → 도보로 3분 이동(총 12분 소요)
              <br>
              3) 용전84 승차 → 임동주공아파트 정류장 하차 → 도보로 5분 이동(총 12분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              유스퀘어 택시 승강장 승차 → 챔피언스필드 정문 하차(5분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄광주송정역 → 광주-기아 챔피언스 필드 정문(KTX 및 SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              광주송정역 정류장 송정98 승차 → 무등야구장 정류장 하차(챔피언스필드 후문쪽) → 도보로 5분 이동(정문)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 광주송정역 4번 출구까지 도보 이동(3분 소요) → 광주송정역 1호선 녹동방면 지하철 승차 → 화정역 하차 → 4번 출구로 나와서 화정현대아파트 정류장까지 도보 이동(5분 소요) → 매월 26 승차 → 제2광천교 정류장 하차 → 도보 6분 이동(총 37분 소요)
              <br>
              2) 광주송정역 4번 출구까지 도보 이동(3분 소요) → 광주송정역 1호선 녹동방면 지하철 승차 → 쌍촌역 하차 → 4번 출구로 나와서 상무1동행정복지센터 정류장까지 도보 이동(4분 소요) → 송암47 승차 → 제2광천교 정류장 하차 → 도보 6분 이동(총 36분 소요)
              광주송정역 → 농성역 하차 → 택시 이용
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              광주송정역 택시 승강장 승차 → 챔피언스필드 정문 하차(30분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫광주공항 → 광주-기아 챔피언스 필드 정문(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              공항역 정류장 일곡38 승차 → 제2광천교 정류장 하차 → 도보 6분 이동(총 50분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              공항역 승차 후 KTX 및 SRT 이용 시와 같음
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              광주공항 택시 승강장 승차 → 챔피언스필드 정문 하차(25분 소요)
            </p>
          </div>
        </div>
      `;
    }else if(team.team === 'samsung'){
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌동대구터미널, 🚄동대구역 → 대구 삼성 라이온즈 파크(고속버스, KTX 및 SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              동대구역복합환승센터에서 399/909/937번 승차 → 수성알파시티역(5번출구) 하차(총 26분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 동대구역 승차 → 2호선 반월당역 환승 → 수성알파시티역 하차(총 27분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌서대구고속버스터미널 → 대구 삼성 라이온즈 파크(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              3호선 만평역 승차 → 2호선 청라언덕역 환승 → 수성알파시티역 하차(총 31분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌북부정류장 → 대구 삼성 라이온즈 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              북부정류장에서 356/순환3-1번 승차 → 2호선 두류역 환승 → 수성알파시티역 하차(총 40분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌서부정류장 → 대구 삼성 라이온즈 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 서부정류장역 승차 → 2호선 반월당역 환승 → 수성알파시티역 하차(총 30분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌경산시외버스터미널 → 대구 삼성 라이온즈 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              경산시장건너(대구은행)에서 100/309/399/509/840/909번 승차 → 수성알파시티역(1번출구) 하차(총 25분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌영남대정류소 → 대구 삼성 라이온즈 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              2호선 영남대역 승차 → 수성알파시티역 하차(총 12분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄서대구역 → 대구 삼성 라이온즈 파크(KTX 및 SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              서대구역(남측)1에서 서구1-1번 승차 → 2호선 죽전역 환승 → 수성알파시티역 하차(총 48분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄대구역 → 대구 삼성 라이온즈 파크(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 대구역 승차 → 2호선 반월당역 환승 → 수성알파시티역 하차(총 22분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄경산역 → 대구 삼성 라이온즈 파크(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              국민건강보험공단(경산역)에서 100/309/399/509/840/909번 승차 → 수성알파시티역(1번출구) 하차(총 22분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫대구국제공항 → 대구 삼성 라이온즈 파크(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              대구국제공항건너에서 719번 승차 → 율하역(4번출구) 하차 → 율하역(2번출구)에서 수성3번 환승 → 수성알파시티역(5번출구) 하차(총 34분 소요)
            </p>
          </div>
        </div>
      `;
    }else if(team.team === 'lg' || team.team === 'doosan'){
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌서울고속버스터미널, 🚌센트럴시티터미널 → 잠실야구장(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              9호선 고속터미널역 급행 승차 → 종합운동장역 하차(총 10분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌동서울터미널 → 잠실야구장(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              2호선 강변역 승차 → 종합운동장역 하차(총 9분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌서울남부터미널 → 잠실야구장(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 3호선 남부터미널역 → 2호선 교대역 환승 → 종합운동장역 하차(총 15분 소요)
              <br>
              2) 3호선 남부터미널역 → 9호선 고속터미널역 급행 환승 → 종합운동장역 하차(총 19분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄서울역 → 잠실야구장(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1)4호선 서울역 승차 → 9호선 동작역 급행 환승 → 종합운동장역 하차(총 30분 소요)
              <br>
              2) 1호선 서울역 승차 → 9호선 노량진역 급행 환승 → 종합운동장역 하차(총 32분 소요)
              <br>
              3) 4호선 서울역 승차 → 2호선 동대문역사문화공원역 환승 → 종합운동장역 하차(총 36분 소요)
              <br>
              4) 1호선 서울역 승차 → 2호선 시청역 환승 → 종합운동장역 하차(총 38분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄용산역 → 잠실야구장(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 1호선 용산역 승차 → 9호선 노량진역 급행 환승 → 종합운동장역 하차(총 26분 소요)
              <br>
              2) 4호선 신용산역 승차 → 9호선 동작역 급행 환승 → 종합운동장역 하차(총 25분 소요)
              <br>
              3) 4호선 신용산역 승차 → 2호선 사당역 환승 → 종합운동장역 하차(총 31분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄영등포역 → 잠실야구장(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 영등포역 승차 → 9호선 노량진역 급행 환승 → 종합운동장역 하차(총 29분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄청량리역 → 잠실야구장(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 경의중앙선 청량리역 승차 → 2호선 왕십리역 환승 → 종합운동장역 하차(총 27분 소요)
              <br>
              2) 수인분당선 청량리역 승차 → 2호선 선릉역 환승 → 종합운동장역 하차(총 23분 소요)
              <br>
              3) 수인분당선 청량리역 승차 → 9호선 선정릉역 급행 환승 → 종합운동장역 하차(총 23분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄상봉역 → 잠실야구장(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 7호선 상봉역 승차 → 2호선 건대입구역 환승 → 종합운동장역 하차(총 29분 소요)
              <br>
              2) 경의중앙선 상봉역 승차 → 2호선 왕십리역 환승 → 종합운동장역 하차(총 35분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄수서역 → 잠실야구장(SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 수인분당선 수서역 승차 → 2호선 선릉역 환승 → 종합운동장역 하차(총 19분 소요)
              <br>
              2) 수인분당선 수서역 승차 → 9호선 선정릉역 급행 환승 → 종합운동장역 하차(총 23분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫김포국제공항 → 잠실야구장(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              9호선 김포공항역 급행 승차 → 종합운동장역 하차(총 40분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫인천국제공항 → 잠실야구장(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              공항열차 인천공항T2역/인천공항T1역 승차 → 9호선 김포공항역 급행 환승 → 종합운동장역 하차(T1 총 81분, T2 총 87분 소요)
            </p>
          </div>
        </div>
      `;
    }else if(team.team === 'kt'){
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌수원버스터미널 → 수원 KT 위즈 파크(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 수원버스터미널에서 7-1A/7-2/64/310/900번 승차 → 수원KT위즈파크.경기도청소년활동진흥상담복지센터 하차(총 32분 소요)
              <br>
              2) 수원버스터미널에서 300/300-1번 승차 → 조원시장.수원종합운동장 하차(총 28분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌서수원시외버스터미널 → 수원 KT 위즈 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              서수원터미널.이마트에서 62-1/99/99-2번 승차 → 장안지하차도.수원KT위즈파크 하차(총 27분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌우만동시외버스정류소 → 수원 KT 위즈 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              우만주공4단지에서 19번 승차 → 수원KT위즈파크.행정동우회관.경기도남부자치경찰위원회 하차
(총 14분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌아주대시외버스정류소 → 수원 KT 위즈 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              아주대입구.우리은행에서 27/62-1번 승차 → 수원KT위즈파크.경기도청소년활동진흥상담복지센터 하차
(총 27분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌영통입구시외버스정류소 → 수원 KT 위즈 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 영통입구에서 3/66/66-4번 승차 → 팔달구청.화성행궁.수원성지에서 25/25-2/25-5/62-1/64번 환승 → 수원KT위즈파크.경기도청소년활동진흥상담복지센터 하차(총 43분 소요)
              <br>
              2) 영통입구에서 27번 승차 → 수원KT위즈파크.경기도청소년활동진흥상담복지센터 하차(총 43분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄수원역 → 수원 KT 위즈 파크(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 수원역.AK플라자에서 7-1A/7-2/310/777/900번 승차 → 수원KT위즈파크.경기도청소년활동진흥상담복지센터 하차(총 21분 소요)
              <br>
              2) 수원역.AK플라자에서 16-2번 승차 → 조원시장.수원종합운동장 하차(총 24분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄광명역 → 수원 KT 위즈 파크(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              KTX광명역7번출구에서 3번 승차 → 비산힐스테이트에서 900번 환승 → 장안지하차도.수원KT위즈파크 하차(총 74분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄판교역 → 수원 KT 위즈 파크(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              신분당선 판교역 승차 → 광교중앙역에서 19번 환승 → 수원KT위즈파크.행정동우회관.경기도남부자치경찰위원회 하차(총 48분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄동탄역 → 수원 KT 위즈 파크(SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              동탄역(동측)에서 G6010번 승차 → 수인분당선 상갈역 환승 → 매교역에서 25/25-2/25-5/64번 환승 → 수원KT위즈파크.경기도청소년활동진흥상담복지센터 하차(총 69분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚆화서역 → 수원 KT 위즈 파크(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              1) 화서역.화서2동주민센터에서 19번 승차 → 수원KT위즈파크.경기도청소년활동진흥상담복지센터 하차(총 15분 소요)
              <br>
              2) 화서역에서 16-2번 승차 → 조원시장.수원종합운동장 하차(총 17분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚆매교역 → 수원 KT 위즈 파크(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              매교역7번출구.푸르지오SK뷰G4에서 25/25-2/25-5/64번 승차 → 수원KT위즈파크.경기도청소년활동진흥상담복지센터 하차(총 19분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚆광교중앙역 → 수원 KT 위즈 파크(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              광교중앙.경기도청.아주대역환승센터에서 19번 승차 → 수원KT위즈파크.행정동우회관.경기도남부자치경찰위원회 하차(총 25분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫김포국제공항 → 수원 KT 위즈 파크(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              9호선 김포공항역 급행 승차 → 1호선 노량진역 급행 환승 → 성균관대역에서 62-1/99/99-2번 환승 → 장안지하차도.수원KT위즈파크 하차(총 88분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫인천국제공항 → 수원 KT 위즈 파크(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              공항철도 인천공항T1역/인천공항T2역 승차 → 2호선 홍대입구역 환승 → 사당역에서 7770번 환승 → 장안지하차도.수원KT위즈파크 하차(T1 총 129분, T2 총 134분 소요)
            </p>
          </div>
        </div>
      `;
    }else if(team.team === 'ssg'){  
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌인천종합터미널 → 인천 SSG 랜더스 필드(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">도보</span>
            <p>
              인천종합터미널에서 왼쪽 방향 → 종합터미널입구교차로에서 우회전 → 인천 SSG 랜더스필드(총 10분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌서울고속버스터미널, 🚌센트럴시티 → 인천 SSG 랜더스 필드(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              9호선 고속터미널역 급행 승차 → 1호선 노량진역 급행 환승 → 인천1호선 부평역 환승 → 문학경기장역 하차(총 59분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌동서울터미널 → 인천 SSG 랜더스 필드(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              동서울터미널에서 1801번 승차 → 인천터미널 하차(총 80분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              2호선 강변역 승차 → 1호선 신도림역 급행 환승 → 인천1호선 부평역 환승 → 문학경기장역 하차(총 85분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌서울남부터미널 → 인천 SSG 랜더스 필드(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              3호선 남부터미널역 승차 → 7호선 고속터미널역 환승 → 인천1호선 부평구청역 환승 → 문학경기장역 하차(총 80분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌부천종합터미널 → 인천 SSG 랜더스 필드(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              7호선 상동역 승차 → 인천1호선 부평구청역 환승 → 문학경기장역 하차(총 25분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌시흥종합버스터미널 → 인천 SSG 랜더스 필드(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              이마트에서 11-A/20-1/33번 승차 → 수인분당선 정왕역 환승 → 인천1호선 원인재역 환승 → 문학경기장역 하차(총 37분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄광명역 → 인천 SSG 랜더스 필드(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              KTX광명역6번출구에서 3001번 승차 → 신동아3차아파트 하차 → 문학초등학교에서 46/82/111-2/515번 환승 → 문학경기장(야구장) 하차(총 52분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 광명역 승차 → 1호선 구로역 급행 환승 → 인천1호선 부평역 환승 → 문학경기장역 하차(총 51분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄서울역 → 인천 SSG 랜더스 필드(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 서울역 승차 → 1호선 용산역 급행 환승 → 인천1호선 부평역 환승 → 문학경기장역 하차(총 56분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄용산역 → 인천 SSG 랜더스 필드(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 용산역 급행 승차 → 인천1호선 부평역 환승 → 문학경기장역 하차(총 51분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄영등포역 → 인천 SSG 랜더스 필드(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 영등포역 급행 승차 → 인천1호선 부평역 환승 → 문학경기장역 하차(총 41분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄청량리역 → 인천 SSG 랜더스 필드(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              경의중앙선 청량리역 승차 → 1호선 용산역 급행 환승 → 인천1호선 부평역 환승 → 문학경기장역 하차(총 75분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄수서역 → 인천 SSG 랜더스 필드(SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              수서역1번출구에서 M5333번 승차 → 석수역(중)에서 3001번 환승 → 신동아3차아파트 하차 → 문학초등학교에서 46/82/111-2/515번 환승 → 문학경기장(야구장) 하차(총 63분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫김포국제공항 → 인천 SSG 랜더스 필드(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              공항철도 김포공항역 승차 → 인천1호선 계양역 환승 → 문학경기장역 하차(총 43분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫인천국제공항 → 인천 SSG 랜더스 필드(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              T1) 인천공항T1(1층)에서 303/303-1/330번 승차 → 더프라우 하차 → 이안송도에서 82번 환승 → 문학경기장(야구장) 하차(총 50분 소요)
              <br>
              T2) 인천공항T2(1층)에서 307번 승차 → 풍림1차205동에서 304번 환승 → 문학경기장(박태환수영장) 하차(총 53분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚢인천항(연안) → 인천 SSG 랜더스 필드(선박 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              연안여객터미널에서 14/24/36번 승차 → 신선초등학교에서 46번 환승 → 문학경기장(야구장) 하차(총 44분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚢인천항(국제) → 인천 SSG 랜더스 필드(선박 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              인천항신국제여객터미널에서 82번 승차 → 인천1호선 송도달빛축제공원역 환승 → 문학경기장역 하차(총 40분 소요)
            </p>
          </div>
        </div>
      `;
    }else if(team.team === 'lotte'){
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌부산종합버스터미널 → 사직야구장(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 노포역 승차 (3번 출구로 진입) → 3호선 연산역 환승 → 사직역 하차(총 28분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              중앙대로 - 동래역 - 부산교육대학교(총 28분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌부산서부시외버스터미널 → 사직야구장(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              2호선 사상역 승차 (지하 연결 통로 이용) → 3호선 덕천역 환승 → 사직역 하차(총 25분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              1) 강변대로 - 만덕1터널/2터널 - 사직산복도로/미남로터리(총 23분 소요)
              <br>
              2) 가야대로 - 부암교차로 - 연제공용차고지(총 25분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌동래시외버스정류소 → 사직야구장(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              4호선 동래역 승차 (5번 출구로 진입) → 3호선 미남역 환승 → 사직역 하차(총 5분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌해운대시외버스정류소 → 사직야구장(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              2호선 해운대역 승차 (2번 출구로 진입) → 3호선 수영역 환승 → 사직역 하차(총 25분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              올림픽교차로 - 수영교차로 - 연산교차로(총 29분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄부산역 → 사직야구장(KTX 및 SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 부산역 승차 (지하 연결 통로 이용) → 3호선 연산역 환승 → 사직역 하차(총 25분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              중앙대로 - 신암로 - 연제공용차고지(총 23분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄구포역 → 사직야구장(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              3호선 구포역 승차 (3번 출구로 진입) → 사직역 하차(총 14분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              1) 만덕대로 - 만덕1터널/2터널 - 사직산복도로/미남로터리(총 20분 소요)
              <br>
              2) 만덕대로- 만덕초읍아시아드터널- 연제공용차고지(총 22분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄부전역 → 사직야구장(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 동해선 부전역 승차 → 3호선 거제역 환승 → 사직역 하차(총 16분 소요)
              <br>
              2) 1호선 부전역 승차 (1번 출구로 진입) → 3호선 연산역 환승 → 사직역 하차(총 12분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄신해운대역 → 사직야구장(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              동해선 신해운대역 승차 → 3호선 거제역 환승 → 사직역 하차(총 31분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫김해국제공항 → 사직야구장(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              부산김해경전철 공항역 승차 (1번 출구로 진입) → 3호선 대저역 환승 → 사직역 하차(총 31분 소요)
            </p>
          </div>
          <div class="detail-item">
            <span class="category">택시</span>
            <p>
              체육공원역 - 만덕1터널/2터널 - 사직산복도로/미남로터리(총 50분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚢부산항연안여객터미널 → 사직야구장(선박 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 중앙역 승차 (10번 출구로 진입) → 3호선 연산역 환승 → 사직역 하차(총 27분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚢부산항국제여객터미널 → 사직야구장(선박 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 초량역 승차 (6번 출구로 진입) → 3호선 연산역 환승 → 사직역 하차(총 23분 소요)
            </p>
          </div>
        </div>
      `;
    }else if(team.team === 'hanwha'){
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌대전복합터미널 → 한화생명 이글스파크(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 복합터미널에서 4번 승차 → 한밭종합운동장 하차(총 23분 소요)
              <br>
              2) 복합터미널에서 802번 승차 → 한화생명이글스파크 하차(총 32분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌대전서남부터미널 → 한화생명 이글스파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              버드내아파트에서 119번 승차 → 보문오거리 하차(총 16분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌유성고속버스터미널, 🚌유성시외버스정류소 → 한화생명 이글스파크(고속버스 및 시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+지하철</span>
            <p>
              1호선 구암역 승차 → 서대전네거리역에서 119번 환승 → 보문오거리 하차(총 30분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌북대전시외버스정류소 → 한화생명 이글스파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              전자디자인고에서 301번 승차 → 이마트에서 604번 환승 → 한밭종합운동장 하차(총 58분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌둔산고속버스정류장 → 한화생명 이글스파크(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              사학연금회관에서 108번 승차 → 보문오거리 하차(총 30분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌둔산시외버스정류장 → 한화생명 이글스파크(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 정부대전청사남문에서 108번 승차 → 보문오거리 하차(총 31분 소요)
              <br>
              2) 선사유적지에서 604번 승차 → 한밭종합운동장 하차(총 40분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄대전역 → 한화생명 이글스파크(KTX 및 SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 대전역에서 4번 승차 → 한밭종합운동장 하차(총 13분 소요)
              <br>
              2) 대전역에서 802번 승차 → 한화생명이글스파크 하차(총 17분 소요)
              <br>
              3) 목척교에서 313번 승차 → 보문오거리 하차(총 11분 소요)
              <br>
              4) 중앙시장에서 52번 승차 → 한밭종합운동장 하차(총 10분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄서대전역 → 한화생명 이글스파크(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 서대전역네거리에서 119번 승차 → 보문오거리 하차(총 9분 소요)
              <br>
              2) 서대전역네거리에서 513번 승차 → 한밭종합운동장 하차(총 15분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄신탄진역 → 한화생명 이글스파크(열차 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              신탄진역에서 2번 승차 → 복합터미널에서 4번 승차 → 한밭종합운동장 하차(총 57분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚇1호선 중앙로역 → 한화생명 이글스파크(지하철 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 대흥동성당에서 604번 승차 → 한밭종합운동장 하차(총 7분 소요)
              <br>
              2) 으능정이거리에서 4번 승차 → 한밭종합운동장 하차(총 11분 소요)
              <br>
              3) 대흥동성당에서 802번 승차 → 한화생명이글스파크 하차(총 12분 소요)
              <br>
              4) 중앙로역6번출구에서 313/620번 승차 → 보문오거리 하차(총 8분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫청주국제공항 → 한화생명 이글스파크(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스+열차</span>
            <p>
              청주공항역에서 무궁화호 승차 → 대전역에서 4/52/313/802번 승차 → 한화생명이글스파크 인근 하차(총 70분 소요)
            </p>
          </div>
        </div>
      `;
    }else if(team.team === 'nc'){
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌마산고속버스터미널 → 창원 NC 파크(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">도보</span>
            <p>
              마산고속버스터미널에서 왼쪽 방향 → 어린로교차로에서 우회전 → 창원 NC 파크(총 8분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌마산시외버스터미널 → 창원 NC 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              마산시외버스터미널에서 46/100/108번 승차 → 문화방송 하차(총 9분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌마산남부시외버스터미널 → 창원 NC 파크(시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 경남대남부터미널종점에서 100/106번 승차 → 창원NC파크.마산회원구청 하차(총 22분 소요)
              <br>
              2) GS마트에서 49/250번 승차 → 문화방송 하차(총 23분 소요)
              <br>
              3) 경남대남부터미널종점에서 105/108번 승차 → 문화방송 하차(총 28분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌내서고속버스터미널 → 창원 NC 파크(고속버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              중리본동에서 116번 승차 → 문화방송 하차(총 31분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌창원종합버스터미널 → 창원 NC 파크(고속버스 및 시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 창원종합버스터미널에서 106번 승차 → 창원NC파크·마산회원구청 하차(총 26분 소요)
              <br>
              2) 창원종합버스터미널에서 108번 승차 → 문화방송 하차(총 31분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄마산역 → 창원 NC 파크(KTX 및 SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              마산역.동마산병원에서 46/100/108번 승차 → 문화방송 하차(총 6분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄창원역 → 창원 NC 파크(KTX 및 SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              1) 창원역에서 46/100/108번 승차 → 문화방송 하차(총 17분 소요)
              <br>
              2) 창원역에서 70번 승차 → 야구장앞홈플러스 하차(총 22분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫김해국제공항 → 창원 NC 파크(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">버스</span>
            <p>
              김해국제공항에서 김해공항리무진 승차 → 마산역 하차 → 마산역.동마산병원에서 46/100/108번 승차 → 문화방송 하차(총 70분 소요)
            </p>
          </div>
        </div>
      `;
    }else if(team.team === 'kiwoom'){
      detailInner.innerHTML = `
      <div class="detail-wrap">
          <h3>🚌서울고속버스터미널, 🚌센트럴시티터미널 → 고척스카이돔(고속버스 및 시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              9호선 고속터미널역 급행 승차 → 1호선 노량진역 환승 → 구일역 하차(총 26분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌동서울터미널 → 고척스카이돔(고속버스 및 시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              2호선 강변역 승차 → 1호선 신도림역 환승 → 구일역 하차(총 51분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚌서울남부터미널 → 고척스카이돔(고속버스 및 시외버스 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 3호선 남부터미널역 승차 → 9호선 고속터미널역 급행 환승 → 1호선 노량진역 환승 → 구일역 하차(총 33분 소요)
              <br>
              2) 3호선 남부터미널역 승차 → 2호선 교대역 환승 →1호선 신도림역 환승 → 구일역 하차(총 37분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄서울역 → 고척스카이돔(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 서울역 승차 → 구일역 하차(총 24분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄용산역 → 고척스카이돔(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 용산역 승차 → 구일역 하차(총 18분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄영등포역 → 고척스카이돔(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 영등포역 승차 → 구일역 하차(총 8분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄청량리역 → 고척스카이돔(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1호선 청량리역 승차 → 구일역 하차(총 42분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄상봉역 → 고척스카이돔(KTX 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              경의중앙선 상봉역 승차 → 1호선 용산역 환승 → 구일역 하차(총 51분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚄수서역 → 고척스카이돔(SRT 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 수인분당선 수서역 승차 → 9호선 선정릉역 급행 환승 → 1호선 노량진역 환승 → 구일역 하차(총 49분 소요)
              <br>
              2) 3호선 수서역 승차 → 9호선 고속터미널역 급행 환승 → 1호선 노량진역 환승 → 구일역 하차(총 50분 소요)
              <br>
              3) 3호선 수서역 승차 → 2호선 교대역 환승 → 1호선 신도림역 환승 → 구일역 하차(총 54분 소요)
              <br>
              4) 수인분당선 수서역 승차 → 2호선 선릉역 환승 → 1호선 신도림역 환승 → 구일역 하차(총 54분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫김포국제공항 → 고척스카이돔(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              서해선 김포공항역 승차 → 1호선 소사역 환승 → 구일역 하차(총 28분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫인천국제공항T1 → 고척스카이돔(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 공항철도 인천공항1터미널역 승차 → 서해선 김포공항역 환승 → 1호선 소사역 환승 → 구일역 하차(총 75분 소요)
              <br>
              2)공항철도 인천공항1터미널역 승차 → 2호선  홍대입구역 환승 → 1호선 신도림역 환승 → 구일역 하차(총 79분 소요)
              <br>
              3) 공항철도 인천공항1터미널역 승차 → 인천1호선 계양역 환승 → 1호선 부평역 환승 → 구일역 하차(총 81분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🛫인천국제공항T2 → 고척스카이돔(비행기 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              1) 공항철도 인천공항2터미널역 승차 → 서해선 김포공항역 환승 → 1호선 소사역 환승 → 구일역 하차(총 80분 소요)
              <br>
              2)공항철도 인천공항2터미널역 승차 → 2호선  홍대입구역 환승 → 1호선 신도림역 환승 → 구일역 하차(총 84분 소요)
              <br>
              3) 공항철도 인천공항2터미널역 승차 → 인천1호선 계양역 환승 → 1호선 부평역 환승 → 구일역 하차(총 86분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚢인천항(연안)→ 고척스카이돔(선박 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              연안여객터미널에서 24번 승차 → 1호선 동인천역 환승 → 구일역 하차(총 74분 소요)
            </p>
          </div>
        </div>
        <div class="detail-wrap">
          <h3>🚢인천항(국제)→ 고척스카이돔(선박 이용시)</h3>
          <div class="detail-item">
            <span class="category">지하철</span>
            <p>
              인천항신국제여객터미널(하행)에서 16-1번 승차 → 항운아파트에서 12번 환승 → 1호선 동인천역 환승 → 구일역 하차(총 69분 소요)
            </p>
          </div>
        </div>
      `;
    }
  }
}


// 팀 선택 시 함수 활성화
let selectTeam = document.querySelectorAll('.select-team div');
selectTeam.forEach(target => {
  target.addEventListener('click', () => {
    selectTeam.forEach(item => item.classList.remove('active'));
    let teamName = target.getAttribute('data-team');
    let team = teams.find(t => t.team === teamName);
    updateDetail(team);
    if(team){
      let {lat, lon} = team;
      let address = document.getElementById('address');
      getTodayWeather(lat, lon);
      getWeeklyWeather(lat, lon);
      var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lat, lon),
        zoom: 16
    });
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lon),
        map: map
    });
      target.classList.add('active');
      address.innerHTML = `
      <b>${team.park}</b>
      <span>${team.address}</span>
      `;
    }else{
      console.error("구장별 시간대 날씨 로딩 에러 발생");
    }
  })
})

// today와 weekly 탭 클릭 시 날씨 보이게 하기
let todayTab = document.querySelector('.today-tab');
let weeklyTab = document.querySelector('.weekly-tab');
let weatherToday = document.getElementById('today');
let weatherWeekly = document.getElementById('weekly');


todayTab.addEventListener('click', () => {
  todayTab.classList.add('active');
  weeklyTab.classList.remove('active');
  weatherToday.classList.add('active');
  weatherWeekly.classList.remove('active');
})

weeklyTab.addEventListener('click', () => {
  weeklyTab.classList.add('active');
  todayTab.classList.remove('active');
  weatherWeekly.classList.add('active');
  weatherToday.classList.remove('active');
})

getTodayWeather(35.168140, 126.889106);
getWeeklyWeather(35.168140, 126.889106);

var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(35.168140, 126.889106),
        zoom: 16
    });
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(35.168140, 126.889106),
        map: map
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
