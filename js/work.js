(function(){
  const buttons=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('[data-category]')];
  if(!buttons.length)return;
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    buttons.forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-selected','false')});
    btn.classList.add('is-active'); btn.setAttribute('aria-selected','true');
    const f=btn.dataset.filter;
    cards.forEach(card=>{
      const show=f==='all'||card.dataset.category.split(' ').includes(f);
      card.hidden=true;
      card.style.opacity='0'; card.style.transform='translateY(14px)';
      if(show){
        requestAnimationFrame(()=>{card.hidden=false; requestAnimationFrame(()=>{card.style.opacity='1'; card.style.transform='none'})});
      }
    });
  }));
})();
