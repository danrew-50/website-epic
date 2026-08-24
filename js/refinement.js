(() => {
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  function addRail(){
    if(document.querySelector('.signature-rail')) return;
    const sections = [...document.querySelectorAll('[data-rail]')];
    if(sections.length < 3 || innerWidth < 1050) return;
    document.body.insertAdjacentHTML('afterbegin', `
      <aside class="signature-rail" aria-hidden="true">
        <span class="signature-rail__dot"></span>
        <span class="signature-rail__index">01</span>
        <span class="signature-rail__word">field notes</span>
        <span class="signature-rail__line"><span></span></span>
      </aside>`);
    const idx = document.querySelector('.signature-rail__index');
    const line = document.querySelector('.signature-rail__line span');
    const update = () => {
      let current = 0;
      let best = Infinity;
      sections.forEach((section,i) => {
        const r = section.getBoundingClientRect();
        const d = Math.abs(r.top - innerHeight * .25);
        if(r.top <= innerHeight * .55 && d < best){best=d;current=i;}
      });
      idx.textContent = String(current + 1).padStart(2,'0');
      line.style.transform = `scaleY(${Math.max(.08,(current+1)/sections.length)})`;
    };
    addEventListener('scroll',update,{passive:true});
    addEventListener('resize',()=>{ if(innerWidth < 1050) document.querySelector('.signature-rail')?.remove(); else update(); });
    update();
  }

  function addMotionState(){
    if(reduce()) return;
    document.querySelectorAll('[data-lift]').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        el.style.transform=`translate3d(${x*4}px,${y*4}px,0)`;
      });
      el.addEventListener('pointerleave',()=>{el.style.transform=''});
    });
  }

  function init(){
    addRail();
    addMotionState();
  }
  addEventListener('DOMContentLoaded',init);
})();
