(function(){
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  hamburgerBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      hamburgerBtn.classList.remove('active');
    });
  });

  document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnButton = hamburgerBtn.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      hamburgerBtn.classList.remove('active');
    }
  });
})();

(function(){
  const layers = Array.from(document.querySelectorAll('.color-bg'));
  if (!layers.length) return;

  function randHsl(alpha=0.6) {
    const h = Math.floor(Math.random()*360);
    const s = 65 + Math.floor(Math.random()*20); // 65-85%
    const l = 40 + Math.floor(Math.random()*20); // 40-60%
    return `hsla(${h} ${s}% ${l}% / ${alpha})`;
  }

  function makeBackground() {
    const c1 = randHsl(0.7);
    const c2 = randHsl(0.6);
    const c3 = randHsl(0.5);


    const pos1 = `${10 + Math.floor(Math.random()*30)}% ${50 + Math.floor(Math.random()*45)}%`;
    const pos2 = `${60 + Math.floor(Math.random()*30)}% ${45 + Math.floor(Math.random()*50)}%`;
    const pos3 = `${40 + Math.floor(Math.random()*30)}% ${60 + Math.floor(Math.random()*30)}%`;

    return `radial-gradient(30% 30% at ${pos1}, ${c1}, transparent 35%),`+
           `radial-gradient(25% 25% at ${pos2}, ${c2}, transparent 30%),`+
           `radial-gradient(40% 40% at ${pos3}, ${c3}, transparent 40%)`;
  }

  layers.forEach(layer => layer.style.background = makeBackground());
  
  if (layers[1]) layers[1].style.opacity = '0';

  let current = 0;
  setInterval(()=>{
    const next = (current + 1) % layers.length;

    layers[next].style.background = makeBackground();

    layers[next].style.transition = 'opacity 1200ms ease';
    layers[current].style.transition = 'opacity 1200ms ease';
    layers[next].style.opacity = '1';
    layers[current].style.opacity = '0';
    current = next;
  }, 4200);

})();

(function(){
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const sectionAnimations = {
    '#about-continue': '#about-continue > *',
    '#team': '#team > *',
    '#contact': '#contact > *'
  };

  Object.entries(sectionAnimations).forEach(([sectionId, selector]) => {
    const section = document.querySelector(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const elements = entry.target.querySelectorAll(':scope > *');
        
        if (entry.isIntersecting) {
          
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('scroll-visible');
            }, index * 100);
          });
        } else {
          elements.forEach((el) => {
            el.classList.remove('scroll-visible');
          });
        }
      });
    }, observerOptions);

    observer.observe(section);
  });
})();

(function(){
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveLink() {
    let current = '';
    const viewportMiddle = window.scrollY + window.innerHeight / 3;

    for (let section of sections) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.clientHeight;

      if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
        current = section.getAttribute('id');
        break;
      }
    }

    if (!current) {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY >= sections[i].offsetTop) {
          current = sections[i].getAttribute('id');
          break;
        }
      }

      history.replaceState(null, null, `#${current}`);
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });

    if (current) {
      const urlId = current === "about-continue" ? "about" : current;
      history.replaceState(null, null, `#${urlId}`);
    }
  }

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink();
})();
