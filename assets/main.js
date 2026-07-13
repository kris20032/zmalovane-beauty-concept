(function(){
  var top=document.getElementById('top');
  var burger=document.getElementById('burger');
  var nav=document.getElementById('nav');
  // hero obecny tylko na stronie glownej -> pasek startuje "on-dark"; podstrony maja pagehead (tez ciemny)
  var darkHead=document.querySelector('.hero, .pagehead');

  function onScroll(){
    var y=window.scrollY||window.pageYOffset;
    if(y>24){top.classList.add('solid');}else{top.classList.remove('solid');}
    // pasek jasny gdy zjedziemy ponizej ciemnego naglowka
    if(darkHead){
      var h=darkHead.offsetHeight-70;
      if(y>h){top.classList.remove('on-dark');}else{top.classList.add('on-dark');}
    } else {
      top.classList.remove('on-dark');
    }
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  if(burger){
    burger.addEventListener('click',function(){
      nav.classList.toggle('open');
      top.classList.toggle('menu-open');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){nav.classList.remove('open');top.classList.remove('menu-open');});
    });
  }

  // hero video: pilnuj autoodtwarzania (przegladarki bywaja wybredne)
  var hv=document.querySelector('.hero-video');
  if(hv){
    var playHV=function(){var p=hv.play();if(p&&p.catch)p.catch(function(){});};
    playHV();
    hv.addEventListener('canplay',playHV);
    hv.addEventListener('loadeddata',playHV);
    ['click','touchstart','scroll','keydown','pointerdown'].forEach(function(ev){
      window.addEventListener(ev,playHV,{once:true,passive:true});
    });
    document.addEventListener('visibilitychange',function(){if(!document.hidden)playHV();});
  }

  // reveal
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} });
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    rv.forEach(function(el){io.observe(el);});
  } else { rv.forEach(function(el){el.classList.add('in');}); }
})();
