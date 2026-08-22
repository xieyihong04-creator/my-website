import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach((element) => {
    gsap.fromTo(
      element as HTMLElement,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element as HTMLElement,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

export function initHeroAnimation() {
  if (typeof window === 'undefined') return undefined;
  const tl = gsap.timeline();
  
  tl.from('.hero-title', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power4.out',
  })
  .from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.6')
  .from('.hero-cta', {
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.4');
  
  return tl;
}

export function initParallaxEffect() {
  if (typeof window === 'undefined') return;
  gsap.utils.toArray<HTMLElement>('.parallax').forEach((layer) => {
    const depth = parseFloat(layer.dataset.depth || '0.5');
    gsap.to(layer, {
      y: () => ScrollTrigger.maxScroll(window) * depth * layer.offsetTop / 1000,
      ease: 'none',
      scrollTrigger: {
        trigger: layer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}
