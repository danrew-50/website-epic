(function(){
  const root=document.documentElement;
  root.classList.add('js-ready');
  const config=window.SITE_CONFIG||{};
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const isProject=location.pathname.includes('/projects/');
  const prefix=isProject?'../':'';
  const navItems=[['Home','index.html'],['Work','work.html'],['About','about.html'],['Services','services.html'],['Branding','branding.html'],['Contact','contact.html']];

  document.querySelectorAll('[data-site-header]').forEach(el=>{
    el.innerHTML=`<header class="site-header"><div class="site-header__inner"><a class="wordmark" href="${prefix}index.html" aria-label="${config.name||'Studio'} home"><span class="wordmark__mark">${config.mark||'SN'}</span><span>${config.shortName||config.name||'STUDIO NAME'}</span></a><nav class="nav" aria-label="Primary">${navItems.map(([label,file])=>`<a href="${prefix}${file}" ${current===file?'aria-current="page"':''}>${label}</a>`).join('')}</nav><div class="header-actions"><button class="icon-button" type="button" data-theme-toggle aria-label="Switch theme">◐</button><button class="icon-button mobile-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div></div></header>`;
  });

  document.querySelectorAll('[data-site-footer]').forEach(el=>{
    el.innerHTML=`<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><div class="eyebrow">Independent creative practice</div><h2>${config.name||'STUDIO NAME'}.</h2><p class="muted" style="max-width:420px">${config.tagline||'Identity, digital experiences and creative direction.'}</p></div><div><div class="eyebrow" style="margin-bottom:15px">Navigate</div><div class="footer-list">${navItems.map(([label,file])=>`<a href="${prefix}${file}">${label}</a>`).join('')}</div></div><div><div class="eyebrow" style="margin-bottom:15px">Contact</div><div class="footer-list"><a href="mailto:${config.email||'hello@example.com'}">${config.email||'hello@example.com'}</a><a href="${config.instagram||'#'}">Instagram ↗</a><a href="${config.linkedin||'#'}">LinkedIn ↗</a></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${config.name||'STUDIO NAME'}</span><span><a class="credits-mark" href="${prefix}credits.html" aria-label="View site credits">Designed & developed by <strong>Naman</strong> ↗</a></span></div></div></footer>`;
  });

  const applyTheme=(theme)=>{root.dataset.theme=theme;localStorage.setItem('site-theme',theme);document.querySelectorAll('[data-theme-toggle]').forEach(b=>{b.textContent=theme==='dark'?'☀':'◐';b.setAttribute('aria-label',theme==='dark'?'Switch to light theme':'Switch to dark theme')})};
  const saved=localStorage.getItem('site-theme'); if(saved) applyTheme(saved);

  document.addEventListener('click',e=>{
    const t=e.target.closest('[data-theme-toggle]'); if(t){applyTheme(root.dataset.theme==='dark'?'light':'dark');return}
    const m=e.target.closest('.mobile-toggle'); if(m){const nav=document.querySelector('.nav'); if(!nav)return; const open=nav.classList.toggle('is-open');m.setAttribute('aria-expanded',open?'true':'false');m.textContent=open?'×':'☰';return}
    const navLink=e.target.closest('.nav a'); if(navLink){const nav=document.querySelector('.nav');if(nav)nav.classList.remove('is-open');document.querySelector('.mobile-toggle')?.setAttribute('aria-expanded','false');}
  });

  const progress=document.createElement('div');
  progress.className='scroll-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.prepend(progress);
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`};
  addEventListener('scroll',onScroll,{passive:true});
  onScroll();
})();
