(function(){
  const items=[...document.querySelectorAll('[data-reveal]')];
  if(!items.length)return;
  const revealAll=()=>items.forEach(x=>x.classList.add('is-visible'));
  if(!('IntersectionObserver' in window)){revealAll();return}
  try{
    const io=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -4% 0px'});
    items.forEach(x=>io.observe(x));
    window.addEventListener('load',()=>setTimeout(revealAll,1200));
    setTimeout(revealAll,4500);
  }catch(e){revealAll()}
})();
