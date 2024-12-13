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

//####################리모콘###################//
document.addEventListener('DOMContentLoaded', () => {
  const smallSideNav = document.getElementById('small-side-nav');
  const sideNav = document.getElementById('side-nav');
  let sideNavHeight = sideNav.offsetHeight;

  smallSideNav.style.top = `calc(20% + ${sideNavHeight/2}px)`

  smallSideNav.addEventListener('click', () => {
    if (window.matchMedia("(max-width: 768px)").matches) {  
      if (sideNav.classList.contains('active')) {
        sideNav.classList.remove('active');
        smallSideNav.classList.remove('active');
      } else {
        sideNav.classList.add('active');
        smallSideNav.classList.add('active');
      }
    }
  });
});

/* calendar */
const kbo2024 = {
  "2024-04-01": [
    { status: "경기 없음" }
],
"2024-04-02": [
    { home: "한화", away: "LG", homeScore: 4, awayScore: 6 },
    { home: "SSG", away: "삼성", homeScore: 5, awayScore: 3 },
    { home: "KIA", away: "두산", homeScore: 2, awayScore: 9 },
    { home: "롯데", away: "키움", homeScore: 7, awayScore: 1 },
    { home: "NC", away: "KT", homeScore: 8, awayScore: 4 }
],
"2024-04-03": [
    { home: "NC", away: "LG", homeScore: 3, awayScore: 5 },
    { home: "한화", away: "KIA", homeScore: 6, awayScore: 2 },
    { home: "롯데", away: "SSG", homeScore: 4, awayScore: 7 },
    { home: "두산", away: "삼성", homeScore: 9, awayScore: 1 },
    { home: "키움", away: "KT", homeScore: 5, awayScore: 3 }
],
"2024-04-04": [
    { home: "KT", away: "한화", homeScore: 2, awayScore: 8 },
    { home: "LG", away: "KIA", homeScore: 5, awayScore: 7 },
    { home: "삼성", away: "롯데", homeScore: 1, awayScore: 4 },
    { home: "키움", away: "NC", homeScore: 8, awayScore: 6 },
    { home: "SSG", away: "KT", homeScore: 3, awayScore: 2 }
],
"2024-04-05": [
    { home: "KIA", away: "두산", homeScore: 3, awayScore: 4 },
    { home: "삼성", away: "LG", homeScore: 6, awayScore: 5 },
    { home: "한화", away: "KT", homeScore: 1, awayScore: 9 },
    { home: "롯데", away: "키움", homeScore: 4, awayScore: 2 },
    { home: "NC", away: "SSG", homeScore: 7, awayScore: 3 }
],
"2024-04-06": [
    { home: "키움", away: "NC", homeScore: 9, awayScore: 1 },
    { home: "LG", away: "삼성", homeScore: 2, awayScore: 7 },
    { home: "KIA", away: "한화", homeScore: 4, awayScore: 6 },
    { home: "롯데", away: "두산", homeScore: 5, awayScore: 8 },
    { home: "SSG", away: "KT", homeScore: 3, awayScore: 4 }
],
"2024-04-07": [
    { home: "삼성", away: "KIA", homeScore: 5, awayScore: 2 },
    { home: "한화", away: "LG", homeScore: 8, awayScore: 1 },
    { home: "SSG", away: "롯데", homeScore: 6, awayScore: 3 },
    { home: "NC", away: "키움", homeScore: 4, awayScore: 7 },
    { home: "두산", away: "KT", homeScore: 2, awayScore: 9 }
],
"2024-04-08": [
    { status: "경기 없음" }
],
"2024-04-09": [
    { home: "KIA", away: "한화", homeScore: 2, awayScore: 3 },
    { home: "두산", away: "LG", homeScore: 5, awayScore: 6 },
    { home: "롯데", away: "삼성", homeScore: 8, awayScore: 2 },
    { home: "SSG", away: "키움", homeScore: 4, awayScore: 1 },
    { home: "NC", away: "KT", homeScore: 6, awayScore: 8 }
],
"2024-04-10": [
    { home: "한화", away: "롯데", homeScore: 9, awayScore: 0 },
    { home: "KIA", away: "SSG", homeScore: 3, awayScore: 5 },
    { home: "삼성", away: "두산", homeScore: 6, awayScore: 7 },
    { home: "LG", away: "키움", homeScore: 2, awayScore: 8 },
    { home: "NC", away: "KT", homeScore: 4, awayScore: 5 }
],
"2024-04-11": [
    { status: "경기 없음" }
],
"2024-04-12": [
    { home: "LG", away: "한화", homeScore: 5, awayScore: 3 },
    { home: "두산", away: "KIA", homeScore: 2, awayScore: 7 },
    { home: "삼성", away: "롯데", homeScore: 1, awayScore: 4 },
    { home: "키움", away: "NC", homeScore: 8, awayScore: 6 },
    { home: "SSG", away: "KT", homeScore: 3, awayScore: 2 }
],
"2024-04-13": [
    { status: "경기 없음" }
],
"2024-04-14": [
    { home: "KIA", away: "NC", homeScore: 3, awayScore: 8 },
    { home: "한화", away: "롯데", homeScore: 5, awayScore: 2 },
    { home: "두산", away: "삼성", homeScore: 6, awayScore: 1 },
    { home: "LG", away: "키움", homeScore: 4, awayScore: 7 },
    { home: "SSG", away: "KT", homeScore: 2, awayScore: 3 }
],
"2024-04-15": [ 
   { status: "경기 없음" }
 
],
"2024-04-16": [
  { home: "삼성", away: "한화", homeScore: 2, awayScore: 4 },
    { home: "KIA", away: "LG", homeScore: 5, awayScore: 1 },
    { home: "롯데", away: "두산", homeScore: 3, awayScore: 6 },
    { home: "키움", away: "NC", homeScore: 4, awayScore: 5 },
    { home: "SSG", away: "KT", homeScore: 6, awayScore: 3 }
],
"2024-04-17": [
    { home: "KIA", away: "LG", homeScore: 6, awayScore: 1 },
    { home: "삼성", away: "두산", homeScore: 5, awayScore: 4 },
    { home: "한화", away: "SSG", homeScore: 3, awayScore: 9 },
    { home: "롯데", away: "NC", homeScore: 8, awayScore: 7 },
    { home: "키움", away: "KT", homeScore: 2, awayScore: 3 }
],
"2024-04-18": [
    { home: "두산", away: "한화", homeScore: 4, awayScore: 6 },
    { home: "LG", away: "KIA", homeScore: 3, awayScore: 5 },
    { home: "삼성", away: "롯데", homeScore: 1, awayScore: 9 },
    { home: "NC", away: "SSG", homeScore: 5, awayScore: 2 },
    { home: "KT", away: "키움", homeScore: 7, awayScore: 4 }
],
"2024-04-19": [
  { home: "한화", away: "롯데", homeScore: 3, awayScore: 5 },
  { home: "KIA", away: "삼성", homeScore: 2, awayScore: 6 },
  { home: "SSG", away: "NC", homeScore: 7, awayScore: 1 },
  { home: "키움", away: "두산", homeScore: 4, awayScore: 3 },
  { home: "LG", away: "KT", homeScore: 5, awayScore: 2 }
],
"2024-04-20": [
  { status: "경기 없음" }
],
"2024-04-21": [
  { home: "롯데", away: "KIA", homeScore: 6, awayScore: 4 },
  { home: "한화", away: "SSG", homeScore: 5, awayScore: 3 },
  { home: "삼성", away: "키움", homeScore: 2, awayScore: 7 },
  { home: "LG", away: "두산", homeScore: 1, awayScore: 9 },
  { home: "NC", away: "KT", homeScore: 8, awayScore: 0 }
],
"2024-04-22": [
  { status: "경기 없음" }
],
"2024-04-23": [
  { home: "KIA", away: "한화", homeScore: 4, awayScore: 6 },
  { home: "롯데", away: "삼성", homeScore: 3, awayScore: 5 },
  { home: "LG", away: "NC", homeScore: 2, awayScore: 2, status1: "취소" },
  { home: "KT", away: "두산", homeScore: 7, awayScore: 4 },
  { home: "SSG", away: "키움", homeScore: 1, awayScore: 8 }
],
"2024-04-24": [
  { home: "한화", away: "삼성", homeScore: 2, awayScore: 4 },
  { home: "KIA", away: "롯데", homeScore: 5, awayScore: 1 },
  { home: "LG", away: "KT", homeScore: 3, awayScore: 6 },
  { home: "두산", away: "NC", homeScore: 4, awayScore: 5 },
  { home: "SSG", away: "키움", homeScore: 2, awayScore: 3 }
],
"2024-04-25": [
  { status: "경기 없음" }
],
"2024-04-26": [
  { home: "KIA", away: "LG", homeScore: 6, awayScore: 2 },
  { home: "삼성", away: "한화", homeScore: 5, awayScore: 4 },
  { home: "롯데", away: "두산", homeScore: 3, awayScore: 6 },
  { home: "키움", away: "SSG", homeScore: 4, awayScore: 1 },
  { home: "NC", away: "KT", homeScore: 7, awayScore: 3 }
],
"2024-04-27": [
  { status: "경기 없음" }
],
"2024-04-28": [
  { home: "한화", away: "KIA", homeScore: 2, awayScore: 3 },
  { home: "롯데", away: "삼성", homeScore: 5, awayScore: 2 },
  { home: "LG", away: "두산", homeScore: 6, awayScore: 4 },
  { home: "SSG", away: "NC", homeScore: 3, awayScore: 5 },
  { home: "KT", away: "키움", homeScore: 4, awayScore: 2 }
],
"2024-04-29": [
  { status: "경기 없음" }
],
"2024-04-30": [
  { home: "KIA", away: "한화", homeScore: 5, awayScore: 6 },
  { home: "삼성", away: "롯데", homeScore: 4, awayScore: 2 },
  { home: "두산", away: "LG", homeScore: 3, awayScore: 7 },
  { home: "NC", away: "KT", homeScore: 8, awayScore: 1 },
  { home: "SSG", away: "키움", homeScore: 2, awayScore: 3 }
],
"2024-05-01": [
  { home: "한화", away: "LG", homeScore: 4, awayScore: 6 },
  { home: "SSG", away: "삼성", homeScore: 5, awayScore: 3 },
  { home: "KIA", away: "두산", homeScore: 2, awayScore: 9 },
  { home: "롯데", away: "키움", homeScore: 7, awayScore: 1 },
  { home: "NC", away: "KT", homeScore: 8, awayScore: 4 }
],
"2024-05-02": [
  { home: "NC", away: "LG", homeScore: 3, awayScore: 5 },
  { home: "한화", away: "KIA", homeScore: 6, awayScore: 2 },
  { home: "롯데", away: "SSG", homeScore: 4, awayScore: 7 },
  { home: "두산", away: "삼성", homeScore: 9, awayScore: 1 },
  { home: "키움", away: "KT", homeScore: 5, awayScore: 3 }
],
"2024-05-03": [
  { home: "KT", away: "한화", homeScore: 2, awayScore: 8 },
  { home: "LG", away: "KIA", homeScore: 5, awayScore: 7 },
  { home: "삼성", away: "롯데", homeScore: 1, awayScore: 4 },
  { home: "키움", away: "NC", homeScore: 8, awayScore: 6 },
  { home: "SSG", away: "KT", homeScore: 3, awayScore: 2 }
],
"2024-05-04": [
  { home: "KIA", away: "두산", homeScore: 3, awayScore: 4 },
  { home: "삼성", away: "LG", homeScore: 6, awayScore: 5 },
  { home: "한화", away: "KT", homeScore: 1, awayScore: 9 },
  { home: "롯데", away: "키움", homeScore: 4, awayScore: 2 },
  { home: "NC", away: "SSG", homeScore: 7, awayScore: 3 }
],
"2024-05-05": [
  { home: "키움", away: "NC", homeScore: 9, awayScore: 1 },
  { home: "LG", away: "삼성", homeScore: 2, awayScore: 7 },
  { home: "KIA", away: "한화", homeScore: 4, awayScore: 6 },
  { home: "롯데", away: "두산", homeScore: 5, awayScore: 8 },
  { home: "SSG", away: "KT", homeScore: 3, awayScore: 4 }
],
"2024-05-06": [
  { status: "경기 없음" }
],
"2024-05-07": [
  { home: "삼성", away: "KIA", homeScore: 5, awayScore: 2 },
  { home: "한화", away: "LG", homeScore: 8, awayScore: 1 },
  { home: "SSG", away: "롯데", homeScore: 6, awayScore: 3 },
  { home: "NC", away: "키움", homeScore: 4, awayScore: 7 },
  { home: "두산", away: "KT", homeScore: 2, awayScore: 9 }
],
"2024-05-08": [
  { home: "KIA", away: "한화", homeScore: 2, awayScore: 3 },
  { home: "두산", away: "LG", homeScore: 5, awayScore: 6 },
  { home: "롯데", away: "삼성", homeScore: 8, awayScore: 2 },
  { home: "SSG", away: "키움", homeScore: 4, awayScore: 1 },
  { home: "NC", away: "KT", homeScore: 6, awayScore: 8 }
],
"2024-05-09": [
  { home: "한화", away: "롯데", homeScore: 9, awayScore: 0 },
  { home: "KIA", away: "SSG", homeScore: 3, awayScore: 5 },
  { home: "삼성", away: "두산", homeScore: 6, awayScore: 7 },
  { home: "LG", away: "키움", homeScore: 2, awayScore: 8 },
  { home: "NC", away: "KT", homeScore: 4, awayScore: 5 }
],
"2024-05-10": [
  { home: "삼성", away: "한화", homeScore: 2, awayScore: 4 },
    { home: "KIA", away: "LG", homeScore: 5, awayScore: 1 },
    { home: "롯데", away: "두산", homeScore: 3, awayScore: 6 },
    { home: "키움", away: "NC", homeScore: 4, awayScore: 5 },
    { home: "SSG", away: "KT", homeScore: 6, awayScore: 3 }
],
"2024-05-11": [
  { home: "LG", away: "한화", homeScore: 5, awayScore: 3 },
  { home: "두산", away: "KIA", homeScore: 2, awayScore: 7 },
  { home: "삼성", away: "롯데", homeScore: 1, awayScore: 4 },
  { home: "키움", away: "NC", homeScore: 8, awayScore: 6 },
  { home: "SSG", away: "KT", homeScore: 3, awayScore: 2 }
],
"2024-05-12": [
  { home: "KIA", away: "NC", homeScore: 3, awayScore: 8 },
  { home: "한화", away: "롯데", homeScore: 5, awayScore: 2 },
  { home: "두산", away: "삼성", homeScore: 6, awayScore: 1 },
  { home: "LG", away: "키움", homeScore: 4, awayScore: 7 },
  { home: "SSG", away: "KT", homeScore: 2, awayScore: 3 }
],
"2024-05-13": [
  { status: "경기 없음" }
],
"2024-05-14": [
  { home: "삼성", away: "한화", homeScore: 2, awayScore: 4 },
  { home: "KIA", away: "LG", homeScore: 5, awayScore: 1 },
  { home: "롯데", away: "두산", homeScore: 3, awayScore: 6 },
  { home: "키움", away: "NC", homeScore: 4, awayScore: 5 },
  { home: "SSG", away: "KT", homeScore: 6, awayScore: 3 }
],
"2024-05-15": [
  { home: "두산", away: "LG", homeScore:5 , awayScore: 8 },
  { home: "키움", away: "SSG", homeScore: 0, awayScore: 9 },
  { home: "삼성", away: "한화", homeScore: 6, awayScore: 4 },
  { home: "KT", away: "KIA", homeScore: 4, awayScore: 2 },
  { home: "NC", away: "롯데", homeScore: 2, awayScore: 4 }
],
"2024-05-16": [
  { home: "KIA", away: "LG", homeScore: 6, awayScore: 1 },
  { home: "삼성", away: "두산", homeScore: 5, awayScore: 4 },
  { home: "한화", away: "SSG", homeScore: 3, awayScore: 9 },
  { home: "롯데", away: "NC", homeScore: 8, awayScore: 7 },
  { home: "키움", away: "KT", homeScore: 2, awayScore: 3 }
],
"2024-05-17": [
  { home: "두산", away: "한화", homeScore: 4, awayScore: 6 },
  { home: "LG", away: "KIA", homeScore: 3, awayScore: 5 },
  { home: "삼성", away: "롯데", homeScore: 1, awayScore: 9 },
  { home: "NC", away: "SSG", homeScore: 5, awayScore: 2 },
  { home: "KT", away: "키움", homeScore: 7, awayScore: 4 }
],
"2024-05-18": [
  { home: "한화", away: "롯데", homeScore: 3, awayScore: 5 },
  { home: "KIA", away: "삼성", homeScore: 2, awayScore: 6 },
  { home: "SSG", away: "NC", homeScore: 7, awayScore: 3 },
  { home: "키움", away: "두산", homeScore: 4, awayScore: 2 },
  { home: "LG", away: "KT", homeScore: 5, awayScore: 4 }
],
"2024-05-19": [
  { home: "KIA", away: "한화", homeScore: 4, awayScore: 3 },
  { home: "롯데", away: "LG", homeScore: 5, awayScore: 1 },
  { home: "삼성", away: "SSG", homeScore: 2, awayScore: 6 },
  { home: "NC", away: "두산", homeScore: 7, awayScore: 8 },
  { home: "KT", away: "키움", homeScore: 1, awayScore: 3 }
],
"2024-05-20": [
   { status: "경기 없음" }
],
"2024-05-21": [
  { status: "경기 없음" }
],
"2024-05-22": [
  { home: "한화", away: "KIA", homeScore: 3, awayScore: 5 },
  { home: "LG", away: "롯데", homeScore: 4, awayScore: 6 },
  { home: "두산", away: "삼성", homeScore: 5, awayScore: 3 },
  { home: "키움", away: "SSG", homeScore: 2, awayScore: 4 },
  { home: "NC", away: "KT", homeScore: 6, awayScore: 1 }
],
"2024-05-23": [
  { home: "LG", away: "삼성", homeScore: 0, awayScore: 7 },
  { home: "키움", away: "NC", homeScore: 14, awayScore: 9 },
  { home: "SSG", away: "롯데", homeScore: 2, awayScore: 4 },
  { home: "KT", away: "한화", homeScore: 8, awayScore: 14 },
  { home: "KIA", away: "두산", homeScore: 0, awayScore: 1 }
],
"2024-05-24": [
  { home: "KIA", away: "LG", homeScore: 7, awayScore: 2 },
  { home: "한화", away: "두산", homeScore: 4, awayScore: 6 },
  { home: "삼성", away: "롯데", homeScore: 5, awayScore: 3 },
  { home: "SSG", away: "NC", homeScore: 3, awayScore: 7 },
  { home: "KT", away: "키움", homeScore: 2, awayScore: 1 }
],
"2024-05-25": [
  { home: "LG", away: "한화", status1: "취소" },
  { home: "키움", away: "KIA", homeScore: 5, awayScore: 4 },
  { home: "SSG", away: "두산", homeScore: 6, awayScore: 1 },
  { home: "삼성", away: "KT", homeScore: 1, awayScore: 4 },
  { home: "NC", away: "롯데", homeScore: 9, awayScore: 2 }
],
"2024-05-26": [
  { home: "롯데", away: "한화", homeScore: 3, awayScore: 4 },
  { home: "KIA", away: "SSG", homeScore: 6, awayScore: 2 },
  { home: "삼성", away: "두산", homeScore: 4, awayScore: 5 },
  { home: "키움", away: "LG", homeScore: 3, awayScore: 6 },
  { home: "NC", away: "KT", homeScore: 8, awayScore: 4 }
],
"2024-05-27": [
  { status: "경기 없음" }
],
"2024-05-28": [
  { home: "한화", away: "KIA", homeScore: 2, awayScore: 3 },
  { home: "롯데", away: "삼성", homeScore: 5, awayScore: 4 },
  { home: "LG", away: "두산", homeScore: 6, awayScore: 5 },
  { home: "SSG", away: "NC", homeScore: 4, awayScore: 2 },
  { home: "KT", away: "키움", homeScore: 3, awayScore: 9 }
],
"2024-05-29": [
  { status: "경기 없음" }
],
"2024-05-30": [
  { home: "KIA", away: "한화", homeScore: 4, awayScore: 6 },
  { home: "삼성", away: "롯데", homeScore: 2, awayScore: 5 },
  { home: "두산", away: "LG", homeScore: 3, awayScore: 7 },
  { home: "NC", away: "KT", homeScore: 9, awayScore: 1 },
  { home: "SSG", away: "키움", homeScore: 5, awayScore: 3 }
],
"2024-05-31": [
  { home: "한화", away: "SSG", homeScore: 6, awayScore: 4 },
  { home: "KIA", away: "삼성", homeScore: 2, awayScore: 5 },
  { home: "롯데", away: "두산", homeScore: 3, awayScore: 6 },
  { home: "LG", away: "NC", homeScore: 1, awayScore: 8 },
  { home: "KT", away: "키움", homeScore: 4, awayScore: 2 }
],
  "2024-06-01": [
      { home: "두산", away: "LG", homeScore:5 , awayScore: 8 },
      { home: "키움", away: "SSG", homeScore: 0, awayScore: 9 },
      { home: "삼성", away: "한화", homeScore: 6, awayScore: 4 },
      { home: "KT", away: "KIA", homeScore: 4, awayScore: 2 },
      { home: "NC", away: "롯데", homeScore: 2, awayScore: 4 }
  ],
  "2024-06-02": [
      { home: "두산", away: "LG", homeScore: 1, awayScore: 9 },
      { home: "키움", away: "SSG", homeScore:2, awayScore: 6 },
      { home: "롯데", away: "NC", homeScore: 13, awayScore: 4 },
      { home: "KIA", away: "KT", homeScore: 3, awayScore: 11 },
      { home: "한화", away: "삼성", homeScore: 0, awayScore: 1 }
  ],
  "2024-06-03": [
    { status: "경기 없음" }
  ],
  "2024-06-04": [
      { home: "LG", away: "키움", homeScore: 3, awayScore: 11 },
      { home: "SSG", away: "삼성", homeScore: 1, awayScore: 3 },
      { home: "KT", away: "한화", homeScore: 2, awayScore: 8 },
      { home: "KIA", away: "롯데", homeScore: 0, awayScore: 6 },
      { home: "NC", away: "두산", homeScore: 1, awayScore: 4 }
  ],
  "2024-06-05": [
      { home: "NC", away: "두산", homeScore: 3, awayScore: 4 },
      { home: "KIA", away: "롯데", homeScore: 3, awayScore: 9 },
      { home: "KT", away: "한화", homeScore: 2, awayScore: 12 },
      { home: "SSG", away: "삼성", homeScore: 7, awayScore: 3 },
      { home: "LG", away: "키움", homeScore: 4, awayScore: 2 }
  ],
  "2024-06-06": [
    { home: "SSG", away: "삼성", homeScore: 4, awayScore: 0 },
    { home: "KIA", away: "롯데", homeScore: 5, awayScore: 4 },
    { home: "LG", away: "키움", homeScore: 8, awayScore: 4 },
    { home: "KT", away: "한화", homeScore: 0, awayScore: 6 },
    { home: "NC", away: "두산", homeScore: 4, awayScore: 8 }
  ],
  "2024-06-07": [
      { home: "롯데", away: "SSG", homeScore: 11, awayScore: 7 },
      { home: "한화", away: "NC", homeScore: 2, awayScore: 6 },
      { home: "KT", away: "LG", homeScore: 7, awayScore: 8 },
      { home: "키움", away: "삼성", homeScore: 10, awayScore: 3 },
      { home: "두산", away: "KIA", homeScore: 6, awayScore: 5 }
  ],
  "2024-06-08": [
      { home: "롯데", away: "SSG", status1: "취소" },
      { home: "한화", away: "NC", homeScore: 2, awayScore: 4 },
      { home: "KT", away: "LG", homeScore: 2, awayScore: 8 },
      { home: "키움", away: "삼성", homeScore: 10, awayScore: 3 },
      { home: "두산", away: "KIA", homeScore: 9, awayScore: 8 }
  ],
  "2024-06-09": [
    { home: "키움", away: "삼성", homeScore: 1, awayScore: 7 },
    { home: "롯데", away: "SSG", homeScore: 1, awayScore: 5 },
    { home: "한화", away: "NC", homeScore: 3, awayScore: 3 },
    { home: "KT", away: "LG", homeScore: 11, awayScore: 2 },
    { home: "두산", away: "KIA", homeScore: 2, awayScore: 8 }
  ],
  "2024-06-10": [
    { status: "경기 없음" }
  ],
  "2024-06-11": [
    { home: "NC", away: "KT", homeScore: 8, awayScore: 6 },
    { home: "롯데", away: "키움", homeScore: 2, awayScore: 5 },
    { home: "삼성", away: "LG", homeScore: 6, awayScore: 4 },
    { home: "SSG", away: "KIA", homeScore: 7, awayScore: 6 },
    { home: "두산", away: "한화", homeScore: 1, awayScore: 6 }
],
"2024-06-12": [
    { home: "두산", away: "한화", homeScore: 3, awayScore: 4 },
    { home: "SSG", away: "KIA", homeScore: 7, awayScore: 13 },
    { home: "삼성", away: "LG", homeScore: 5, awayScore: 4 },
    { home: "롯데", away: "키움", homeScore: 9, awayScore: 2 },
    { home: "NC", away: "KT", homeScore: 8, awayScore: 11 }
],
"2024-06-13": [
    { home: "NC", away: "KT", homeScore: 5, awayScore: 3 },
    { home: "롯데", away: "키움", homeScore: 18, awayScore: 10 },
    { home: "삼성", away: "LG", homeScore: 6, awayScore: 3 },
    { home: "SSG", away: "KIA", homeScore: 7, awayScore: 1 },
    { home: "두산", away: "한화", homeScore: 9, awayScore: 6 }
],
"2024-06-14": [
    { home: "LG", away: "롯데", homeScore: 5, awayScore: 3 },
    { home: "키움", away: "두산", homeScore: 4, awayScore: 6 },
    { home: "KT", away: "KIA", homeScore: 1, awayScore: 11 },
    { home: "한화", away: "SSG", homeScore: 4, awayScore: 11 },
    { home: "NC", away: "삼성", homeScore: 4, awayScore: 7 }
],
"2024-06-15": [
    { home: "NC", away: "삼성", homeScore: 6, awayScore: 4 },
    { home: "한화", away: "SSG", homeScore: 1, awayScore: 9 },
    { home: "KT", away: "KIA", homeScore: 1, awayScore: 2 },
    { home: "키움", away: "두산", homeScore: 1, awayScore: 4 },
    { home: "LG", away: "롯데", homeScore: 8, awayScore: 9 }
],
"2024-06-16": [
  { home: "키움", away: "두산", homeScore:8, awayScore: 2 },
  { home: "NC", away: "삼성", homeScore: 5, awayScore: 4 },
  { home: "한화", away: "SSG", homeScore: 4, awayScore: 1 },
  { home: "KT", away: "KIA", homeScore: 1, awayScore: 3 },
  { home: "LG", away: "롯데", homeScore: 9, awayScore: 8 }
],
"2024-06-17": [
  { status: "경기 없음" }
],
"2024-06-18": [
    { home: "두산", away: "NC", homeScore: 6, awayScore: 2 },
    { home: "KT", away: "롯데", homeScore: 6, awayScore: 4 },
    { home: "한화", away: "키움", homeScore: 3, awayScore: 0 },
    { home: "삼성", away: "SSG", homeScore: 3, awayScore: 8 },
    { home: "KIA", away: "LG", homeScore: 11, awayScore: 4 }
],
"2024-06-19": [
    { home: "KIA", away: "LG", homeScore: 5, awayScore: 7 },
    { home: "삼성", away: "SSG", homeScore: 13, awayScore: 2 },
    { home: "한화", away: "키움", homeScore: 14, awayScore: 11 },
    { home: "KT", away: "롯데", homeScore: 5, awayScore: 13 },
    { home: "두산", away: "NC", homeScore: 5, awayScore: 7 }
],
"2024-06-20": [
  { home: "KIA", away: "LG", homeScore: 6, awayScore: 5 },
  { home: "삼성", away: "SSG", homeScore: 4, awayScore: 0 },
  { home: "한화", away: "키움", homeScore: 0, awayScore: 7 },
  { home: "KT", away: "롯데", homeScore: 7, awayScore: 6 },
  { home: "두산", away: "NC", homeScore: 2, awayScore: 0 }
],
"2024-06-21": [
    { home: "LG", away: "KT", homeScore: 2, awayScore: 3 },
    { home: "키움", away: "롯데", homeScore: 5, awayScore: 2 },
    { home: "SSG", away: "NC", homeScore: 2, awayScore: 3 },
    { home: "삼성", away: "두산", homeScore: 7, awayScore: 4 },
    { home: "KIA", away: "한화", homeScore: 8, awayScore: 3 }
],
"2024-06-22": [
    { home: "KIA", away: "한화", status1: "취소" },
    { home: "삼성", away: "두산", status1: "취소" },
    { home: "SSG", away: "NC", homeScore: 12, awayScore: 4 },
    { home: "키움", away: "롯데", homeScore: 1, awayScore: 6 },
    { home: "LG", away: "KT", status1: "취소" }
],
"2024-06-23": [
  { home: "키움", away: "롯데", homeScore: 2, awayScore: 10 },
  { home: "KIA", away: "한화", homeScore: 8, awayScore: 9 },
  { home: "삼성", away: "두산", homeScore: 7, awayScore: 4 },
  { home: "LG", away: "KT", homeScore: 7, awayScore: 2 },
  { home: "KIA", away: "한화", homeScore: 4, awayScore: 1 }
],
"2024-06-24": [
  { status: "경기 없음" }
],
"2024-06-25": [
    { home: "LG", away: "삼성", homeScore: 4, awayScore: 0 },
    { home: "키움", away: "NC", homeScore: 6, awayScore: 5 },
    { home: "SSG", away: "KT", homeScore: 1, awayScore: 6 },
    { home: "한화", away: "두산", homeScore: 5, awayScore: 4 },
    { home: "롯데", away: "KIA", homeScore: 15, awayScore: 15 }
],
"2024-06-26": [
  { home: "롯데", away: "KIA", homeScore: 6, awayScore: 4 },
  { home: "한화", away: "두산", homeScore: 8, awayScore: 15 },
  { home: "SSG", away: "KT", homeScore: 10, awayScore: 5 },
  { home: "키움", away: "NC", homeScore: 10, awayScore: 7 },
  { home: "LG", away: "삼성", homeScore: 2, awayScore: 1 }
],
"2024-06-27": [
  { home: "LG", away: "삼성", homeScore: 1, awayScore: 2 },
  { home: "키움", away: "NC", homeScore: 9, awayScore: 7 },
  { home: "SSG", away: "KT", homeScore: 8, awayScore: 16 },
  { home: "한화", away: "두산", homeScore: 8, awayScore: 3 },
  { home: "롯데", away: "KIA", homeScore: 11, awayScore: 2 }
],
"2024-06-28": [
  { home: "NC", away: "LG", homeScore: 8, awayScore: 2 },
  { home: "롯데", away: "한화", homeScore: 6, awayScore: 4 },
  { home: "KIA", away: "키움", homeScore: 6, awayScore: 17 },
  { home: "KT", away: "삼성", homeScore: 5, awayScore: 4 },
  { home: "두산", away: "SSG", homeScore: 10, awayScore: 0 }
],
"2024-06-29": [
  { home: "두산", away: "SSG", homeScore: 0, awayScore: 6 },
  { home: "KT", away: "삼성", status1: "취소" },
  { home: "KIA", away: "키움", status1: "취소" },
  { home: "롯데", away: "한화", status1: "취소" },
  { home: "NC", away: "LG", status1: "취소" }
],
"2024-06-30": [
  { home: "두산", away: "SSG", homeScore: 1, awayScore: 3 },
  { home: "KT", away: "삼성", homeScore: 2, awayScore: 1 },
  { home: "롯데", away: "한화", status1: "취소" },
  { home: "KIA", away: "키움", status1: "취소" },
  { home: "NC", away: "LG", status1: "취소" }
],
"2024-07-01": [
  { status: "경기 없음" }
],
"2024-07-02": [
  { home: "두산", away: "롯데", status1: "취소" },
  { home: "키움", away: "LG", homeScore: 4, awayScore: 2 },
  { home: "한화", away: "KT", homeScore: 5, awayScore: 6 },
  { home: "삼성", away: "KIA", homeScore: 5, awayScore: 9 },
  { home: "NC", away: "SSG", status1: "취소" }
],
"2024-07-03": [
  { home: "LG", away: "SSG", homeScore: 4, awayScore: 1 },
  { home: "삼성", away: "KIA", homeScore: 4, awayScore: 6 },
  { home: "한화", away: "KT", homeScore: 2, awayScore: 3 },
  { home: "키움", away: "LG", homeScore: 4, awayScore: 1 },
  { home: "두산", away: "롯데", homeScore: 13, awayScore: 8 }
],
"2024-07-04": [
  { home: "NC", away: "SSG", homeScore: 2, awayScore: 0 },
  { home: "삼성", away: "KIA", homeScore: 3, awayScore: 8 },
  { home: "한화", away: "KT", homeScore: 13, awayScore: 5 },
  { home: "키움", away: "LG", homeScore: 2, awayScore: 3 },
  { home: "두산", away: "롯데", homeScore: 6, awayScore: 3 }
],
"2024-07-05": [
  { status: "경기 없음" }
],
"2024-07-06": [
  { status: "경기 없음" }
],
"2024-07-07": [
  { status: "경기 없음" }
],
"2024-07-08": [
  { status: "경기 없음" }
],
"2024-07-09": [
{ home: "LG", away: "KIA", homeScore: 4, awayScore: 11 },
{ home: "키움", away: "한화", homeScore: 5, awayScore: 3 },
{ home: "SSG", away: "롯데", homeScore: 7, awayScore: 4 },
{ home: "KT", away: "두산", status1: "취소" },
{ home: "삼성", away: "NC", status1: "취소" }
],
"2024-07-10": [
  { home: "삼성", away: "NC", homeScore: 15, awayScore: 6 },
  { home: "KT", away: "두산", homeScore: 7, awayScore: 6 },
  { home: "SSG", away: "롯데", homeScore: 1, awayScore: 6 },
  { home: "키움", away: "한화", homeScore: 0, awayScore: 7 },
  { home: "LG", away: "KIA", homeScore: 2, awayScore: 5 }
],
"2024-07-11": [
{ home: "삼성", away: "NC", homeScore: 6, awayScore: 4 },
{ home: "KT", away: "두산", homeScore: 1, awayScore: 12 },
{ home: "SSG", away: "롯데", homeScore: 5, awayScore: 4 },
{ home: "키움", away: "한화", homeScore: 5, awayScore: 4 },
{ home: "LG", away: "KIA", homeScore: 2, awayScore: 4 }
],
"2024-07-12": [
{ home: "두산", away: "삼성", homeScore: 5, awayScore: 9 },
{ home: "한화", away: "LG", homeScore: 6, awayScore: 0 },
{ home: "KIA", away: "SSG", homeScore: 6, awayScore: 14 },
{ home: "롯데", away: "KT", homeScore: 4, awayScore: 5 },
{ home: "NC", away: "키움", homeScore: 9, awayScore: 2 }
],
"2024-07-13": [
{ home: "NC", away: "키움", homeScore: 11, awayScore: 5 },
{ home: "롯데", away: "KT", homeScore: 3, awayScore: 6 },
{ home: "KIA", away: "SSG", homeScore: 9, awayScore: 15 },
{ home: "한화", away: "LG", homeScore: 3, awayScore: 7 },
{ home: "두산", away: "삼성", homeScore: 8, awayScore: 4 }
],
"2024-07-14": [
{ home: "NC", away: "키움", status1: "취소" },
{ home: "롯데", away: "KT", status1: "취소" },
{ home: "KIA", away: "SSG", homeScore: 13, awayScore: 4 },
{ home: "한화", away: "LG", homeScore: 4, awayScore: 8 },
{ home: "두산", away: "삼성", homeScore: 2, awayScore: 6 }
],
"2024-07-15": [
  { status: "경기 없음" }
],
"2024-07-16": [
{ home: "LG", away: "SSG", status1: "취소" },
{ home: "키움", away: "KT", homeScore: 3, awayScore: 4 },
{ home: "KIA", away: "삼성", status1: "취소" },
{ home: "롯데", away: "두산", homeScore: 4, awayScore: 0 },
{ home: "NC", away: "한화", status1: "취소" }
],
"2024-07-17": [
  { home: "NC", away: "한화", homeScore: 5, awayScore: 1 },
  { home: "롯데", away: "두산", homeScore: 6, awayScore: 2 },
  { home: "KIA", away: "삼성", homeScore: 10, awayScore: 5 },
  { home: "키움", away: "KT", homeScore: 2, awayScore: 9 },
  { home: "LG", away: "SSG", homeScore: 12, awayScore: 9 }
],
"2024-07-18": [
{ home: "NC", away: "한화", homeScore: 4, awayScore: 3 },
{ home: "롯데", away: "두산", homeScore: 2, awayScore: 3 },
{ home: "KIA", away: "삼성", homeScore: 10, awayScore: 4 },
{ home: "키움", away: "KT", homeScore: 8, awayScore: 12 },
{ home: "LG", away: "SSG", status1: "취소" }
],
"2024-07-19": [
{ home: "LG", away: "두산", homeScore: 16, awayScore: 7 },
{ home: "SSG", away: "키움", homeScore: 9, awayScore: 3 },
{ home: "KT", away: "NC", homeScore: 6, awayScore: 0 },
{ home: "한화", away: "KIA", homeScore: 3, awayScore: 7 },
{ home: "삼성", away: "롯데", homeScore: 6, awayScore: 10 }
],
"2024-07-20": [
{ home: "삼성", away: "롯데", homeScore: 21, awayScore: 4 },
{ home: "한화", away: "KIA", homeScore: 4, awayScore: 8 },
{ home: "KT", away: "NC", status1: "취소" },
{ home: "SSG", away: "키움", status1: "취소" },
{ home: "LG", away: "두산", status1: "취소" }
],
"2024-07-21": [
{ home: "삼성", away: "롯데", homeScore: 6, awayScore: 5 },
{ home: "한화", away: "KIA", homeScore: 7, awayScore: 8 },
{ home: "KT", away: "NC", homeScore: 2, awayScore: 8 },
{ home: "SSG", away: "키움", homeScore: 2, awayScore: 7 },
{ home: "LG", away: "두산", homeScore: 6, awayScore: 3 }
],
"2024-07-22": [
  { status: "경기 없음" }
],
"2024-07-23": [
{ home: "두산", away: "키움", homeScore: 6, awayScore: 3 },
{ home: "KT", away: "SSG", status1: "취소" },
{ home: "한화", away: "삼성", homeScore: 6, awayScore: 5 },
{ home: "KIA", away: "NC", homeScore: 8, awayScore: 1 },
{ home: "롯데", away: "LG", homeScore: 1, awayScore: 2 }
],
"2024-07-24": [
  { home: "롯데", away: "LG", status1: "취소"},
  { home: "KIA", away: "NC", homeScore: 7, awayScore: 0 },
  { home: "한화", away: "삼성", homeScore: 3, awayScore: 2 },
  { home: "KT", away: "SSG", homeScore: 5, awayScore: 3 },
  { home: "두산", away: "키움", homeScore: 7, awayScore: 4 }
],
"2024-07-25": [
{ home: "롯데", away: "LG", homeScore: 6, awayScore: 9 },
{ home: "KIA", away: "NC", homeScore: 4, awayScore: 7 },
{ home: "한화", away: "삼성", status1: "취소" },
{ home: "KT", away: "SSG", homeScore: 4, awayScore: 2 },
{ home: "두산", away: "키움", homeScore: 1, awayScore: 6 }
],
"2024-07-26": [
{ home: "LG", away: "한화", status1: "취소" },
{ home: "키움", away: "KIA", homeScore: 5, awayScore: 4 },
{ home: "SSG", away: "두산", homeScore: 6, awayScore: 1 },
{ home: "삼성", away: "KT", homeScore: 1, awayScore: 4 },
{ home: "NC", away: "롯데", homeScore: 9, awayScore: 2 }
],
"2024-07-27": [
{ home: "NC", away: "롯데", homeScore: 2, awayScore: 9 },
{ home: "삼성", away: "KT", homeScore: 3, awayScore: 2 },
{ home: "SSG", away: "두산", homeScore: 4, awayScore: 3 },
{ home: "키움", away: "KIA", homeScore: 6, awayScore: 5 },
{ home: "LG", away: "한화", status1: "취소"  }
],
"2024-07-28": [
{ home: "키움", away: "KIA", homeScore: 3, awayScore: 4 },
{ home: "NC", away: "롯데", homeScore: 6, awayScore: 10 },
{ home: "삼성", away: "KT", homeScore: 3, awayScore: 4 },
{ home: "SSG", away: "두산", homeScore: 3, awayScore: 0 },
{ home: "LG", away: "한화", homeScore: 6, awayScore: 9 }
],
"2024-07-29": [
  { status: "경기 없음" }
],
"2024-07-30": [
{ home: "KIA", away: "두산", homeScore: 7, awayScore: 12 },
{ home: "KT", away: "한화", homeScore: 4, awayScore: 6 },
{ home: "SSG", away: "롯데", homeScore: 11, awayScore: 5 },
{ home: "키움", away: "NC", homeScore: 6, awayScore: 2 },
{ home: "LG", away: "삼성", homeScore: 1, awayScore: 7 }
],
"2024-07-31": [
{ home: "LG", away: "삼성", homeScore: 11, awayScore: 5 },
{ home: "키움", away: "NC", homeScore: 0, awayScore: 9 },
{ home: "SSG", away: "롯데", homeScore: 12, awayScore: 11 },
{ home: "KT", away: "한화", homeScore: 7, awayScore: 18 },
{ home: "KIA", away: "두산", homeScore: 6, awayScore: 30 }
  ],
"2024-08-01": [
{ home: "LG", away: "삼성", homeScore: 0, awayScore: 7 },
{ home: "키움", away: "NC", homeScore: 14, awayScore: 9 },
{ home: "SSG", away: "롯데", homeScore: 2, awayScore: 4 },
{ home: "KT", away: "한화", homeScore: 8, awayScore: 14 },
{ home: "KIA", away: "두산", homeScore: 0, awayScore: 1 }
  ],
"2024-08-02": [
  { home: "NC", away: "KT", homeScore: 7, awayScore: 9 },
  { home: "롯데", away: "LG", status1: "취소" },
  { home: "삼성", away: "SSG", homeScore: 4, awayScore: 3 },
  { home: "한화", away: "KIA", homeScore: 10, awayScore: 3 },
  { home: "두산", away: "키움", homeScore: 4, awayScore: 6 }
  ],
"2024-08-03": [
{ home: "두산", away: "키움", homeScore: 5, awayScore: 15 },
{ home: "한화", away: "KIA", homeScore: 3, awayScore: 7 },
{ home: "삼성", away: "SSG", homeScore: 12, awayScore: 4 },
{ home: "롯데", away: "LG", homeScore: 8, awayScore: 3 },
{ home: "NC", away: "KT", status1: "취소" }
  ],
"2024-08-04": [
{ home: "NC", away: "KT", homeScore: 15, awayScore: 5 },
{ home: "롯데", away: "LG", status1: "취소" },
{ home: "삼성", away: "SSG", homeScore: 8, awayScore: 3 },
{ home: "한화", away: "KIA", status1: "취소" },
{ home: "두산", away: "키움", status1: "취소" }
  ],
"2024-08-05": [
{ status: "경기 없음" }
  ],
"2024-08-06": [
{ home: "두산", away: "LG", homeScore: 7, awayScore: 6 },
{ home: "키움", away: "SSG", homeScore: 2, awayScore: 6 },
{ home: "삼성", away: "한화", homeScore: 5, awayScore: 8 },
{ home: "KIA", away: "KT", homeScore: 2, awayScore: 0 },
{ home: "롯데", away: "NC", homeScore: 6, awayScore: 5 }
  ],
"2024-08-07": [
{ home: "롯데", away: "NC", homeScore: 14, awayScore: 7 },
{ home: "KIA", away: "KT", homeScore: 2, awayScore: 13 },
{ home: "삼성", away: "한화", homeScore: 10, awayScore: 6 },
{ home: "키움", away: "SSG", homeScore: 2, awayScore: 6 },
{ home: "두산", away: "LG", homeScore: 8, awayScore: 4 }
  ],
"2024-08-08": [
{ home: "롯데", away: "NC", status1: "취소" },
{ home: "KIA", away: "KT", homeScore: 0, awayScore: 11 },
{ home: "삼성", away: "한화", homeScore: 4, awayScore: 6 },
{ home: "키움", away: "SSG", homeScore: 3, awayScore: 0 },
{ home: "두산", away: "LG", homeScore: 3, awayScore: 10 }
  ],
"2024-08-09": [
{ home: "LG", away: "NC", homeScore: 10, awayScore: 9 },
{ home: "SSG", away: "두산", homeScore: 11, awayScore: 13 },
{ home: "KT", away: "롯데", homeScore: 10, awayScore: 6 },
{ home: "한화", away: "키움", homeScore: 7, awayScore: 5 },
{ home: "KIA", away: "삼성", homeScore: 9, awayScore: 8 }
  ],
"2024-08-10": [
{ home: "KIA", away: "삼성", status1: "취소" },
{ home: "한화", away: "키움", homeScore: 1, awayScore: 3 },
{ home: "KT", away: "롯데", homeScore: 0, awayScore: 2 },
{ home: "SSG", away: "두산", homeScore: 6, awayScore: 10 },
{ home: "LG", away: "NC", homeScore: 9, awayScore: 3 }
  ],
"2024-08-11": [
{ home: "LG", away: "NC", homeScore: 4, awayScore: 3 },
{ home: "SSG", away: "두산", homeScore: 11, awayScore: 9 },
{ home: "KT", away: "롯데", homeScore: 7, awayScore: 9 },
{ home: "한화", away: "키움", homeScore: 3, awayScore: 7 },
{ home: "KIA", away: "삼성", homeScore: 4, awayScore: 5 }
  ],
"2024-08-12": [
  { status: "경기 없음" }
  ],
"2024-08-13": [
{ home: "NC", away: "SSG", homeScore: 0, awayScore: 2 },
{ home: "삼성", away: "KT", homeScore: 7, awayScore: 2 },
{ home: "한화", away: "LG", homeScore: 2, awayScore: 3 },
{ home: "키움", away: "KIA", homeScore: 0, awayScore: 2 },
{ home: "두산", away: "롯데", status1: "취소" }
  ],
  "2024-08-14": [
{ home: "두산", away: "롯데", homeScore: 2, awayScore: 12 },
{ home: "키움", away: "KIA", homeScore: 2, awayScore: 1 },
{ home: "한화", away: "LG", homeScore: 9, awayScore: 5 },
{ home: "삼성", away: "KT", homeScore: 3, awayScore: 1 },
{ home: "NC", away: "SSG", status1: "취소"  }
  ],
  "2024-08-15": [
{ home: "키움", away: "KIA", homeScore: 1, awayScore: 12 },
{ home: "두산", away: "롯데", homeScore: 4, awayScore: 3 },
{ home: "한화", away: "LG", homeScore: 3, awayScore: 17 },
{ home: "삼성", away: "KT", homeScore: 3, awayScore: 5 },
{ home: "NC", away: "SSG", homeScore: 5, awayScore: 10 }
  ],
  "2024-08-16": [
  { home: "NC", away: "삼성", homeScore: 3, awayScore: 7 },
  { home: "롯데", away: "키움", homeScore: 4, awayScore: 0 },
  { home: "KT", away: "두산", homeScore: 0, awayScore: 5 },
  { home: "SSG", away: "한화", homeScore: 1, awayScore: 2 },
  { home: "LG", away: "KIA", homeScore: 2, awayScore: 3 }
  ],
  "2024-08-17": [
    { home: "LG", away: "KIA", homeScore: 4, awayScore: 14 },
    { home: "SSG", away: "한화", homeScore: 5, awayScore: 8 },
    { home: "KT", away: "두산", homeScore: 2, awayScore: 3 },
    { home: "롯데", away: "키움", homeScore: 7, awayScore: 8 },
    { home: "NC", away: "삼성", homeScore: 4, awayScore: 5 }
  ],
  "2024-08-18": [
  { home: "NC", away: "삼성", homeScore: 3, awayScore: 5 },
  { home: "롯데", away: "키움", homeScore: 5, awayScore: 4 },
  { home: "KT", away: "두산", homeScore: 5, awayScore: 4 },
  { home: "SSG", away: "한화", homeScore: 1, awayScore: 7 },
  { home: "LG", away: "KIA", homeScore: 0, awayScore: 4 }
  ],
  "2024-08-19": [
    { status: "경기 없음" }
  ],
  "2024-08-20": [
    { home: "KIA", away: "롯데", status1: "취소" },
    { home: "삼성", away: "두산", homeScore: 3, awayScore: 0 },
    { home: "한화", away: "NC", homeScore: 3, awayScore: 2 },
    { home: "KT", away: "키움", homeScore: 2, awayScore: 3 },
    { home: "LG", away: "SSG", homeScore: 4, awayScore: 3 }
  ],
  "2024-08-21": [
  { home: "LG", away: "SSG", homeScore: 1, awayScore: 5 },
  { home: "KT", away: "키움", homeScore: 5, awayScore: 0 },
  { home: "한화", away: "NC", homeScore: 2, awayScore: 8 },
  { home: "삼성", away: "두산", homeScore: 2, awayScore: 5 },
  { home: "KIA", away: "롯데", homeScore: 6, awayScore: 5 }
  ],
  "2024-08-22": [
    { home: "KIA", away: "롯데", homeScore: 6, awayScore: 4 },
    { home: "삼성", away: "두산", status1: "취소" },
    { home: "한화", away: "NC", status1: "취소" },
    { home: "KT", away: "키움", homeScore: 3, awayScore: 2 },
    { home: "LG", away: "SSG", homeScore: 13, awayScore: 3 }
  ],
  "2024-08-23": [
  { home: "NC", away: "KIA", homeScore: 17, awayScore: 4 },
  { home: "삼성", away: "롯데", homeScore: 5, awayScore: 3 },
  { home: "SSG", away: "KT", homeScore: 6, awayScore: 11 },
  { home: "키움", away: "LG", homeScore: 9, awayScore: 3 },
  { home: "두산", away: "한화", homeScore: 4, awayScore: 7 }
  ],
  "2024-08-24": [
    { home: "두산", away: "한화", homeScore: 6, awayScore: 7},
    { home: "키움", away: "LG", homeScore: 0, awayScore: 7 },
    { home: "SSG", away: "KT", homeScore: 3, awayScore: 9 },
    { home: "삼성", away: "롯데", homeScore: 3, awayScore: 11 },
    { home: "NC", away: "KIA", homeScore: 0, awayScore: 2 }
  ],
  "2024-08-25": [
  { home: "키움", away: "LG", homeScore: 6, awayScore: 4 },
  { home: "두산", away: "한화", homeScore: 1, awayScore: 3 },
  { home: "SSG", away: "KT", homeScore: 4, awayScore: 3 },
  { home: "삼성", away: "롯데", homeScore: 10, awayScore: 5 },
  { home: "NC", away: "KIA", homeScore: 8, awayScore: 2 }
  ],
  "2024-08-26": [
    { status: "경기 없음" }
  ],
  "2024-08-27": [
  { home: "NC", away: "두산", homeScore: 7, awayScore: 13 },
  { home: "롯데", away: "한화", homeScore: 3, awayScore: 1 },
  { home: "KIA", away: "SSG", homeScore: 10, awayScore: 4 },
  { home: "키움", away: "삼성", homeScore: 0, awayScore: 1 },
  { home: "LG", away: "KT", homeScore: 6, awayScore: 1 }
  ],
  "2024-08-28": [
  { home: "LG", away: "KT", homeScore: 4, awayScore: 8 },
  { home: "키움", away: "삼성", homeScore: 5, awayScore: 9 },
  { home: "KIA", away: "SSG", homeScore: 7, awayScore: 6 },
  { home: "롯데", away: "한화", homeScore: 0, awayScore: 7 },
  { home: "NC", away: "두산", homeScore: 1, awayScore: 8 }
  ],
  "2024-08-29": [
    { home: "NC", away: "두산", homeScore: 10, awayScore: 2 },
    { home: "롯데", away: "한화", homeScore: 14, awayScore: 11 },
    { home: "KIA", away: "SSG", homeScore: 4, awayScore: 10 },
    { home: "키움", away: "삼성", homeScore: 0, awayScore: 1 },
    { home: "LG", away: "KT", homeScore: 7, awayScore: 8 }
  ],
  "2024-08-30": [
  { home: "키움", away: "롯데", homeScore: 2, awayScore: 8 },
  { home: "KT", away: "LG", homeScore: 7, awayScore: 11 },
  ],
  "2024-08-31": [
  { home: "두산", away: "롯데", homeScore: 4, awayScore: 7 },
  { home: "SSG", away: "NC", homeScore: 2, awayScore: 7 },
  { home: "한화", away: "KT", homeScore: 2, awayScore: 6 },
  { home: "삼성", away: "KIA", homeScore: 13, awayScore: 15 },
    ],
    
};

const calendarDates = document.getElementById("calendarDates");
const currentMonthElement = document.getElementById("currentMonth");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const selectedDateDetails = document.getElementById("selectedDateDetails");

const today = new Date();
let currentMonth = today.getMonth=5; 
let currentYear = today.getFullYear();
let selectedDateElement = null;

const mediaQuery = window.matchMedia("(max-width: 768px)"); 

function renderCalendar() {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  const formattedMonth = (currentMonth + 1).toString().padStart(2, '0');
  currentMonthElement.textContent = `${currentYear} . ${formattedMonth}`;

  calendarDates.innerHTML = "";
  selectedDateDetails.innerHTML = "";

  for (let i = 0; i < startDayOfWeek; i++) {
    const emptyDate = document.createElement("div");
    emptyDate.classList.add("date");
    calendarDates.appendChild(emptyDate);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    dateElement.textContent = i;

    const gameContainer = document.createElement("div");
    gameContainer.classList.add("games");

    const formattedDate = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;

    if (kbo2024[formattedDate]) {
      let hasStatus = false;

      kbo2024[formattedDate].forEach((game) => {
        const gameElement = document.createElement("div");

        if (game.status1) {
          if (mediaQuery.matches) {
            const redDot = document.createElement("div");
            redDot.classList.add("status1-dot");
            gameContainer.appendChild(redDot);
          } else {
            gameElement.textContent = `${game.home} : ${game.away} [취소]`;
            gameElement.classList.add("status1");
            gameContainer.appendChild(gameElement);
          }
        } else if (game.status) {
          hasStatus = true;
        } else {
          if (mediaQuery.matches) {
            const blueDot = document.createElement("div");
            blueDot.classList.add("normalgame-dot");
            gameContainer.appendChild(blueDot);
          } else {
            gameElement.textContent = `${game.home} ${game.homeScore} : ${game.awayScore} ${game.away}`;
            gameElement.classList.add("normalgame");
            gameContainer.appendChild(gameElement);
          }
        }
      });

      if (hasStatus) {
        dateElement.classList.add("status");
      }
    }

    dateElement.addEventListener("click", () => {
      if (!dateElement.classList.contains("status")) {
        if (selectedDateElement) {
          selectedDateElement.classList.remove("selected-date");
        }
        dateElement.classList.add("selected-date");
        selectedDateElement = dateElement;

        const date = new Date(`${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`);
        const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
        const weekday = weekdays[date.getDay()];

        const dateDetails = document.createElement("div");
        dateDetails.classList.add("game-info");

        if (kbo2024[formattedDate]) {
          dateDetails.innerHTML = `<div class="date-detail-wrap">
            <h3 class="date-heading">
              <p class="date-heading-day">${i}</p> 
              <p class="date-heading-weekday">${weekday}요일</p>
            </h3>
          </div>`;

          kbo2024[formattedDate].forEach((game) => {
            const gameInfo = document.createElement("div");

            if (game.status1) {
              gameInfo.innerHTML = `${game.home} : ${game.away} [취소]`;
              gameInfo.classList.add("status1");
            } else {
              gameInfo.innerHTML = `${game.home} ${game.homeScore} : ${game.awayScore} ${game.away}`;
              gameInfo.classList.add("normalgame");
            }

            dateDetails.appendChild(gameInfo);
          });
        } else {
          dateDetails.innerHTML = `<h3 class="no-game-info">${i} ${weekday}요일 </h3>`;
        }

        selectedDateDetails.innerHTML = "";
        selectedDateDetails.appendChild(dateDetails);
      }
    });

    dateElement.appendChild(gameContainer);
    calendarDates.appendChild(dateElement);
  }
}

function handleMediaQueryChange(e) {
  renderCalendar(); 
}

mediaQuery.addEventListener("change", handleMediaQueryChange); 

renderCalendar();

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
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