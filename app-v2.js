const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu() { mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open menu'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; mobileMenu.hidden = open; menuButton.setAttribute('aria-expanded',String(!open)); menuButton.setAttribute('aria-label',open ? 'Open menu' : 'Close menu'); });
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && !mobileMenu.hidden) {closeMenu(); menuButton.focus();} });
const stickyCta = document.querySelector('#mobile-cta');
const heroSection = document.querySelector('.hero');
const closingSection = document.querySelector('.closing-section');
let heroVisible = true, closingVisible = false;
const ctaObserver = new IntersectionObserver(entries => {entries.forEach(entry => {if(entry.target === heroSection) heroVisible = entry.isIntersecting; if(entry.target === closingSection) closingVisible = entry.isIntersecting;}); stickyCta.hidden = heroVisible || closingVisible;},{threshold:0});
ctaObserver.observe(heroSection); ctaObserver.observe(closingSection);
const reviewTrack = document.querySelector('.review-track');
const reviewCards = [...document.querySelectorAll('.review-card')];
const reviewDots = [...document.querySelectorAll('.review-dot')];
reviewDots.forEach((dot,index) => dot.addEventListener('click',() => { reviewTrack.scrollTo({left:reviewCards[index].offsetLeft-reviewCards[0].offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); }));
function updateReviewIndicator() { const closest = reviewCards.reduce((best,card,index) => Math.abs(card.offsetLeft-reviewCards[0].offsetLeft-reviewTrack.scrollLeft) < best.distance ? {index,distance:Math.abs(card.offsetLeft-reviewCards[0].offsetLeft-reviewTrack.scrollLeft)} : best,{index:0,distance:Infinity}); reviewDots.forEach((dot,index) => {dot.classList.toggle('active',index===closest.index); dot.setAttribute('aria-pressed',String(index===closest.index));}); }
reviewTrack.addEventListener('scroll',updateReviewIndicator,{passive:true});
