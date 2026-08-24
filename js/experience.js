(function(){
  document.querySelectorAll('[data-lift]').forEach(el=>{
    el.addEventListener('pointermove',e=>{if(matchMedia('(pointer:coarse)').matches)return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${y*-1.5}deg) rotateY(${x*2}deg) scale(1.005)`});
    el.addEventListener('pointerleave',()=>{el.style.transform=''})
  });
})();
