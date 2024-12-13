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



/* 스크롤이벤트 */

/* news-sec1 */
function handleScroll() {
  const newsSec1 = document.querySelector('.news-sec1');
  const rect = newsSec1.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight * 1) {
      newsSec1.classList.add('visible');
  }

}

window.addEventListener('scroll', handleScroll);

handleScroll();


/* news-sec2 */
document.addEventListener("scroll", () => {
  const left = document.querySelector(".news-sec2-left");
  const right = document.querySelector(".news-sec2-right");
  const sec3 = document.querySelector(".news-sec3"); 

  const leftTop = left.getBoundingClientRect().top;
  const rightTop = right.getBoundingClientRect().top;
  const leftBottom = left.getBoundingClientRect().bottom;
  const rightBottom = right.getBoundingClientRect().bottom;

  const sec3Top = sec3.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (leftTop < windowHeight * 0.8 && leftBottom > 0) {
    left.classList.add("visible2");
  } else {
    left.classList.remove("visible2");
  }

  if (rightTop < windowHeight * 0.8 && rightBottom > 0) {
    right.classList.add("visible2");
  } else {
    right.classList.remove("visible2");
  }

  if (sec3Top < windowHeight * 0.2) {
    left.classList.remove("visible2");
    right.classList.remove("visible2");
  }
});

/* news-sec3 */
document.addEventListener("scroll", () => {
  const topDivs = document.querySelectorAll(".news-sec3-top div");
  const bottomDivs = document.querySelectorAll(".news-sec3-bottom div");

  const windowHeight = window.innerHeight;

  topDivs.forEach((div, index) => {
    const rect = div.getBoundingClientRect();
    if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
      div.classList.add(index === 0 ? "visible3" : "visible4");
    } else {
      div.classList.remove(index === 0 ? "visible3" : "visible4");
    }
  });

  bottomDivs.forEach((div, index) => {
    const rect = div.getBoundingClientRect();
    if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
      div.classList.add(index === 0 ? "visible3" : "visible4");
    } else {
      div.classList.remove(index === 0 ? "visible3" : "visible4");
    }
  });
});

/* 헤더 */
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
      nav.querySelector('a').style.color = "#000000";
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

/* 푸터 */
fetch("html/footer.html")
.then(response => response.text())
.then(data => {
  document.getElementById('footer').innerHTML = data;
});