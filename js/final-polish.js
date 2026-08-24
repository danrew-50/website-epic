(function(){
  const rail=document.createElement('aside');
  rail.className='signature-rail';
  rail.setAttribute('aria-hidden','true');
  rail.innerHTML='<span class="signature-rail__code">SN / 26</span><span class="signature-rail__line"></span>';
  document.body.appendChild(rail);

  const sections=[...document.querySelectorAll('[data-rail]')];
  const line=rail.querySelector('.signature-rail__line');
  if(!sections.length||!line)return;
  const update=()=>{
    const mid=innerHeight*.42;
    let current=0;
    sections.forEach((section,i)=>{if(section.getBoundingClientRect().top<mid)current=i});
    line.style.setProperty('--rail-progress',`${Math.min(100,((current+1)/sections.length)*100)}%`);
    line.style.background=`linear-gradient(to bottom,var(--accent) 0 ${Math.min(100,((current+1)/sections.length)*100)}%,var(--line) ${Math.min(100,((current+1)/sections.length)*100)}% 100%)`;
  };
  addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update,{passive:true});
  update();
})();
