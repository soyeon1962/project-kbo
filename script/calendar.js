//## header fetch ##//
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