import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Fade in elements with .animate-on-scroll class
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

export function initHeroAnimation() {
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
  gsap.utils.toArray('.parallax').forEach((layer: any) => {
    const depth = layer.dataset.depth || 0.5;
    gsap.to(layer, {
      y: (i, target) => ScrollTrigger.maxScroll(window) * depth * (target as HTMLElement).offsetTop / 1000,
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
