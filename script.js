const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
const menuText = menu.querySelector('.menu-text');
const navigation = document.querySelector('#navigation');
const practiceToggle = document.querySelector('.nav-disclosure');
const practiceMenu = document.querySelector('#nav-practice');
const backdrop = document.querySelector('.nav-backdrop');
const compactNavigation = window.matchMedia('(max-width: 1023px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let navigationAnimation;
let practiceMenuAnimation;

function animateNavigation(element) {
  if (reducedMotion.matches || typeof element.animate !== 'function') return;
  return element.animate(
    [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 220, easing: 'cubic-bezier(.22,.68,0,1.01)' }
  );
}
function closePracticeMenu(restoreFocus = false) {
  practiceMenuAnimation?.cancel();
  practiceToggle.setAttribute('aria-expanded', 'false');
  practiceMenu.hidden = true;
  if (restoreFocus) practiceToggle.focus({ preventScroll: true });
}
function openPracticeMenu(focusEdge) {
  practiceMenuAnimation?.cancel();
  practiceToggle.setAttribute('aria-expanded', 'true');
  practiceMenu.hidden = false;
  practiceMenuAnimation = animateNavigation(practiceMenu);
  if (focusEdge) {
    const links = practiceMenu.querySelectorAll('a');
    links[focusEdge === 'last' ? links.length - 1 : 0].focus({ preventScroll: true });
  }
}
function closeMenu({ restoreFocus = false } = {}) {
  navigationAnimation?.cancel();
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
  menuText.textContent = 'Menu';
  navigation.classList.remove('is-open');
  header.classList.remove('is-menu-open');
  backdrop.hidden = true;
  closePracticeMenu();
  if (restoreFocus && compactNavigation.matches) menu.focus({ preventScroll: true });
}
function openMenu() {
  menu.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-label', 'Fechar menu');
  menuText.textContent = 'Fechar';
  navigation.classList.add('is-open');
  header.classList.add('is-menu-open');
  backdrop.hidden = false;
  navigationAnimation?.cancel();
  navigationAnimation = animateNavigation(navigation);
  practiceToggle.focus({ preventScroll: true });
}
menu.addEventListener('click', () => {
  if (menu.getAttribute('aria-expanded') === 'true') closeMenu({ restoreFocus: true });
  else openMenu();
});
practiceToggle.addEventListener('click', () => {
  if (practiceToggle.getAttribute('aria-expanded') === 'true') closePracticeMenu();
  else openPracticeMenu();
});
practiceToggle.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    openPracticeMenu(event.key === 'ArrowUp' ? 'last' : 'first');
  }
});
header.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (link.dataset.navService) selectService(link.dataset.navService);
  closeMenu();
  const href = link.getAttribute('href');
  if (href?.startsWith('#')) {
    const section = document.getElementById(href.slice(1));
    const destination = section?.querySelector('h1,h2') || section;
    if (destination) {
      window.requestAnimationFrame(() => {
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      });
    }
  }
}));
backdrop.addEventListener('click', () => closeMenu({ restoreFocus: true }));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (practiceToggle.getAttribute('aria-expanded') === 'true') {
    event.preventDefault();
    closePracticeMenu(true);
  } else if (menu.getAttribute('aria-expanded') === 'true') {
    event.preventDefault();
    closeMenu({ restoreFocus: true });
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
header.addEventListener('focusout', event => {
  if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu();
});
compactNavigation.addEventListener('change', () => {
  const focusInNavigation = navigation.contains(document.activeElement);
  const focusOnMenu = document.activeElement === menu;
  closeMenu();
  if (compactNavigation.matches && focusInNavigation) menu.focus({ preventScroll: true });
  else if (!compactNavigation.matches && focusOnMenu) practiceToggle.focus({ preventScroll: true });
});
const serviceButtons = [...document.querySelectorAll('[data-panel]')];
const serviceStatus = document.querySelector('#service-status');
let panelAnimation;
let disclosureAnimation;

function selectService(panelId) {
  const button = serviceButtons.find(option => option.dataset.panel === panelId);
  if (!button) return false;
  if (button.getAttribute('aria-pressed') === 'true') return true;
  panelAnimation?.cancel();
  serviceButtons.forEach(option => {
    const active = option === button;
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-pressed', String(active));
    document.getElementById(option.dataset.panel).hidden = !active;
  });
  const panel = document.getElementById(button.dataset.panel);
  serviceStatus.textContent = 'Área selecionada: ' + button.querySelector('strong').textContent + '.';
  if (!reducedMotion.matches && typeof panel.animate === 'function') {
    panelAnimation = panel.querySelector('.service-body').animate(
      [{ opacity: .2, transform: 'translateX(18px)' }, { opacity: 1, transform: 'translateX(0)' }],
      { duration: 420, easing: 'cubic-bezier(.22,.68,0,1.01)' }
    );
  }
  return true;
}

serviceButtons.forEach(button => button.addEventListener('click', () => selectService(button.dataset.panel)));

document.querySelectorAll('[data-subject]').forEach(link => link.addEventListener('click', () => {
  const text = document.querySelector('#selected-subject');
  text.hidden = false;
  text.textContent = 'Assunto de interesse: ' + link.dataset.subject;
  const contactLink = document.querySelector('.contact-button');
  const message = 'Olá! Gostaria de conversar com a equipe sobre ' + link.dataset.subject + '.';
  contactLink.setAttribute('href', contactLink.dataset.whatsappBase + '?text=' + encodeURIComponent(message));
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// The process indicator follows reading progress, once per animation frame.
const root = document.documentElement;
const journey = document.querySelector('.steps');
const navigationSections = ['atuacao', 'escritorio', 'como-atuamos', 'presenca', 'contato'].map(id => ({
  id, element: document.getElementById(id)
}));
const navigationTargets = [...document.querySelectorAll('[data-nav-section]')];
let currentNavigationSection;
function updateNavigation() {
  header.classList.toggle('is-scrolled', window.scrollY > 32);
  let current = '';
  const threshold = compactNavigation.matches ? 120 : 140;
  navigationSections.forEach(section => {
    if (section.element.getBoundingClientRect().top <= threshold) current = section.id;
  });
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= root.scrollHeight - 24) current = 'contato';
  if (current === currentNavigationSection) return;
  currentNavigationSection = current;
  navigationTargets.forEach(target => {
    const active = target.dataset.navSection === current;
    target.classList.toggle('is-current', active);
    if (active) target.setAttribute('aria-current', 'location');
    else target.removeAttribute('aria-current');
  });
}
let scrollFrame = 0;
function updateReadingPosition() {
  scrollFrame = 0;
  updateNavigation();
  const distance = root.scrollHeight - window.innerHeight;
  root.style.setProperty('--page-progress', distance > 0 ? String(Math.min(1, Math.max(0, window.scrollY / distance))) : '0');
  const bounds = journey.getBoundingClientRect();
  const progress = (window.innerHeight * .7 - bounds.top) / bounds.height;
  journey.style.setProperty('--journey', reducedMotion.matches ? '1' : String(Math.min(1, Math.max(0, progress))));
}
function requestReadingUpdate() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateReadingPosition);
}
window.addEventListener('scroll', requestReadingUpdate, { passive: true });
window.addEventListener('resize', requestReadingUpdate);
window.addEventListener('load', requestReadingUpdate);
reducedMotion.addEventListener('change', () => {
  panelAnimation?.cancel();
  disclosureAnimation?.cancel();
  navigationAnimation?.cancel();
  practiceMenuAnimation?.cancel();
  requestReadingUpdate();
});
if (typeof ResizeObserver === 'function') {
  new ResizeObserver(requestReadingUpdate).observe(document.body);
}
requestReadingUpdate();

// Expanding a question reveals its answer without moving the control.
document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    disclosureAnimation?.cancel();
    const answer = detail.querySelector('.details-content');
    if (detail.open && !reducedMotion.matches && typeof answer?.animate === 'function') {
      disclosureAnimation = answer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240 });
    }
  });
});

// The map shows national availability. Its decorative points are not client locations.
const reachSection = document.querySelector('.reach');
if (reachSection) {
  const reachRegions = {
    brasil: ['Todo o Brasil', 'Atendimento nacional, com sede em Chapecó.'],
    norte: ['Região Norte', 'AC, AP, AM, PA, RO, RR e TO.'],
    nordeste: ['Região Nordeste', 'AL, BA, CE, MA, PB, PE, PI, RN e SE.'],
    'centro-oeste': ['Região Centro-Oeste', 'DF, GO, MT e MS.'],
    sudeste: ['Região Sudeste', 'ES, MG, RJ e SP.'],
    sul: ['Região Sul', 'PR, RS e SC.']
  };
  const reachButtons = [...reachSection.querySelectorAll('[data-reach-region]')];
  const mapGroups = [...reachSection.querySelectorAll('[data-map-region]')];
  const mapName = reachSection.querySelector('[data-reach-name]');
  const mapDetail = reachSection.querySelector('[data-reach-detail]');
  const mapDescription = reachSection.querySelector('#reach-map-description');
  const originalDescription = mapDescription.textContent;
  function selectReachRegion(region) {
    const content = reachRegions[region];
    if (!content) return;
    reachButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.reachRegion === region)));
    mapGroups.forEach(group => {
      const highlighted = region !== 'brasil' && group.dataset.mapRegion === region;
      group.classList.toggle('is-highlighted', highlighted);
      group.classList.toggle('is-muted', region !== 'brasil' && !highlighted);
    });
    mapName.textContent = content[0];
    mapDetail.textContent = content[1];
    mapDescription.textContent = region === 'brasil' ? originalDescription : originalDescription + ' Em destaque: ' + content[0] + '.';
  }
  reachButtons.forEach(button => button.addEventListener('click', () => selectReachRegion(button.dataset.reachRegion)));
  reachSection.querySelector('.reach-explorer').hidden = false;
  if (typeof IntersectionObserver === 'function') {
    const reachObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      reachSection.classList.add('is-visible');
      reachObserver.disconnect();
    }, { threshold: .15 });
    reachObserver.observe(reachSection.querySelector('.reach-map-stage'));
  } else {
    reachSection.classList.add('is-visible');
  }
}
