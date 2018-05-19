      
      function ZoomNPan(elm) {
        var that = this;
        
        /** minimum zoom allowed (in percent) */
        this.minScale = 60;
        /** maximun zoom allowed (in percent) */
        this.maxScale = 300;
        this.invertOnMac = false;
        
        // if(elm.hasAttribute('data-zoom-and-pan')) return console.error('ZoomNPan This element is already initialized');
        // elm.setAttribute('data-zoom-and-pan', '');
        
        var currentScale = 100;
        elm.addEventListener('mousemove', pan);
        
        function pan(e) {
          var panX, panY, pad = 20;
          if (currentScale >= 100) {
            panX = (e.offsetX - pad) / (e.target.clientWidth - (pad * 2));
            panY = (e.offsetY - pad) / (e.target.clientHeight - (pad * 2));
          }
          else {
            panX = 0.5;
            panY = 0.5;
          }
          elm.style.backgroundPositionX = (panX * 100) + '%';
          elm.style.backgroundPositionY = (panY * 100) + '%';
        }
      }
  

/*** Smooth Scrolling Code ***/
new SmoothScroll();
function SmoothScroll(el) {
  var t = this, h = document.documentElement;
  el = el || window;
  t.rAF = false;
  t.target = 0;
  t.scroll = 0;
  t.animate = function() {
    t.scroll += (t.target - t.scroll) * 0.1;
    if (Math.abs(t.scroll.toFixed(5) - t.target) <= 0.47131) {
      cancelAnimationFrame(t.rAF);
      t.rAF = false;
    }
    if (el == window) scrollTo(0, t.scroll);
    else el.scrollTop = t.scroll;
    if (t.rAF) t.rAF = requestAnimationFrame(t.animate);
  };
  el.onmousewheel = function(e) {
    e.preventDefault();
    e.stopPropagation();
    var scrollEnd = (el == window) ? h.scrollHeight - h.clientHeight : el.scrollHeight - el.clientHeight;
    t.target += (e.wheelDelta > 0) ? -50 : 50;
    if (t.target < 0) t.target = 0;
    if (t.target > scrollEnd) t.target = scrollEnd;
    if (!t.rAF) t.rAF = requestAnimationFrame(t.animate);
  };
  el.onscroll = function() {
    if (t.rAF) return;
    t.target = (el == window) ? pageYOffset || h.scrollTop : el.scrollTop;
    t.scroll = t.target;
  };
}



/***Navbar Animation  Js***/
(function() {
  
  var Menu = (function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu__list');
    var brand = document.querySelector('.menu__brand');
    var menuItems = document.querySelectorAll('.menu__item');
    
    var active = false;
    
    var toggleMenu = function() {
      if (!active) {
        menu.classList.add('menu--active');
        menuList.classList.add('menu__list--active');
        brand.classList.add('menu__brand--active');
        burger.classList.add('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.add('menu__item--active');
        }
        
        active = true;
      } else {
        menu.classList.remove('menu--active');
        menuList.classList.remove('menu__list--active');
        brand.classList.remove('menu__brand--active');
        burger.classList.remove('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.remove('menu__item--active');
        }
        
        active = false;
      }
    };
    
    var bindActions = function() {
      burger.addEventListener('click', toggleMenu, false);
    };
    
    var init = function() {
      bindActions();
    };
    
    return {
      init: init
    };
    
  }());
  
  Menu.init();
  
}());



