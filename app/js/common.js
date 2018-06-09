window.onload = function(){

  //SVG arrow to "read more"
  var links = document.getElementsByClassName('link-more');
  for (var i = 0; i < links.length; i++) {
    links[i].innerHTML += '<svg class="arrow" x="0px" y="0px" viewBox="0 0 17.5 8.7"><path d="M12.3,0.4c-0.5,0.4-0.5,1.2,0,1.6l0.9,0.9c0.1,0.1,0,0.4-0.1,0.4H1.3c-0.6,0-1.2,0.5-1.2,1.2 c0,0.6,0.5,1.2,1.2,1.2H13c0.2,0,0.3,0.2,0.1,0.4l-0.9,0.9c-0.5,0.4-0.5,1.2,0,1.6c0.5,0.4,1.2,0.4,1.6,0l3.4-3.3    	c0.4-0.4,0.4-1,0-1.3l-3.4-3.3C13.5,0,12.7,0,12.3,0.4z"/></svg>'
  };

  window.onresize = function(){
    setHeight();
    if (screen.width >= 768) {
      closeMenu();
    }
  };

  var body = document.getElementsByTagName('body')[0];

  body.onclick = function(e) {
    if (document.getElementById('menu-toggle').checked) {
      if(hasClass(e.target, 'menu-toggle__checkbox')
      || hasClass(e.target, 'menu-toggle__btn')
      || hasClass(e.target.parentElement, 'menu-toggle__btn')) {
        return;
      } else {
        closeMenu();
      }
    }
  };

  //cropText
  var slideDesc = document.querySelectorAll('.slider-wrapper .slider-item .slider-item__desc');
  var exampleText = document.querySelectorAll('.slider-wrapper .slider-item .example-text')

  cropText(slideDesc, 45);
  cropText(exampleText, 45);

  //slider
  var slides = document.querySelectorAll('.slider-wrapper .slider-item');
  var sliderNav = document.querySelectorAll('.slider-wrapper .slider-nav .slider-nav__dot');
  var activeSlideClass = 'slider-item-showed';
  var activeSliderNavClass = 'slider-nav__dot-active';

  var slider = document.querySelectorAll('.slider-wrapper .slider');

  for (var i = 0; i < sliderNav.length; i++) {
    sliderNav[i].onclick = activeItem;
  };

  function activeItem() {

    var slideNavIndex = this.dataset.index - 1;
    var currentSlide = slides[slideNavIndex];
    var currentNav = sliderNav[slideNavIndex];
    var activeSlide = document.querySelector('.slider-wrapper .slider-item-showed');
    var activeNav = document.querySelector('.slider-wrapper .slider-nav__dot-active');

    if(hasClass(activeSlide, activeSlideClass)) {
      toggleClass(activeSlide, activeSlideClass);
      toggleClass(currentSlide, activeSlideClass);
      toggleClass(activeNav, activeSliderNavClass);
      toggleClass(currentNav, activeSliderNavClass);
    };

  };

  //slider loop
  setInterval(autoSlider, 10000);

  function autoSlider(){
    var slideIndex = 0;
    var activeslide = document.querySelector('.slider-wrapper .slider-item-showed');
    var activeNav = document.querySelector('.slider-wrapper .slider-nav__dot-active');

      for (var i = 0; i < slides.length; i++) {
        if ((' ' + slides[i].className + ' ').indexOf(' ' + activeSlideClass + ' ') > -1) {
          slideIndex = i + 1;
        }
      }

      if (slideIndex == slides.length) {
        slideIndex = 0;
      }

      toggleClass(activeslide, activeSlideClass);
      toggleClass(slides[slideIndex], activeSlideClass);
      toggleClass(activeNav, activeSliderNavClass);
      toggleClass(sliderNav[slideIndex], activeSliderNavClass);

  }

  function toggleClass(element, className){
    element.classList.toggle(className)
  };

  function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  };

  //crop text
  function cropText(element, length) {
    var text = '';
    var croppedText = '';

    for (var i = 0; i < element.length; i++) {
      text = element[i].innerText.split(' ');
      if (text.length > length) {
        croppedText = text.slice(0, length).join(' ');
        element[i].innerText = text.slice(0, length).join(' ') + '...';
      }
    }

  }

  //slide height
  setHeight();

  function setHeight(){
    var slider = document.querySelectorAll('.slider-wrapper .slider');
    var height = 0;


    for (var i = 0; i < slides.length; i++) {
      if (slides[i].offsetHeight > height) {
        height = slides[i].offsetHeight;
      }
    }

    for (var i = 0; i < slider.length; i++) {
      slider[i].style.height = height + 'px';
    }

  }

  //mobile menu toggle
  function closeMenu(){
    var checkboxBtn = document.getElementById('menu-toggle');
    checkboxBtn.checked ? checkboxBtn.checked = false : 1;
  }

  //mobile menu
  function createMobMenu() {
    var menu = document.querySelector('.menu').cloneNode(true);
    var mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.innerHTML += menu.innerHTML;
  }

  createMobMenu();

}
