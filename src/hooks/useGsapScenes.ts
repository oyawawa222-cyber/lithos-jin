import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type SceneType = 'field' | 'geology' | 'plans' | 'livetour';

export function useGsapScene(containerRef: React.RefObject<HTMLDivElement>,sceneType?: SceneType) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useGSAP(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    // 动效减弱模式直接显示所有内容，跳过动画
    if (isReducedMotion) {
      gsap.set(root.querySelectorAll('.scene-head-1, .scene-head-2, .scene-text'), {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0 0)',
        filter: 'blur(0)'
      });
      return;
    }

    // 每个页面独立ScrollTrigger，避免多页面冲突
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        scroller: document.querySelector('.scroll-snap-container'),
        start: 'top 90%', // 页面刚进入视口就触发文字动画
        end: 'bottom 10%',
        once: true,
        toggleActions: "play none none reverse"
      }
    });

    // 标题分层动画
    const head1 = root.querySelector('.scene-head-1');
    const head2 = root.querySelector('.scene-head-2');
    tl.from(head1, { y: 30, blur: 10, opacity: 0, duration: 1 }, 0.2);
    tl.from(head2, { yPercent: 100, clipPath: 'inset(0 0 100% 0)', opacity: 0, duration: 0.9 }, '-=0.6');

    // 所有文本统一渐入
    tl.from(root.querySelectorAll('.scene-text'), {
      y: 18,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7
    }, '-=0.4');

    // SVG线条动画（带类型校验防报错）
    const svgLines = root.querySelectorAll('.geo-svg-line');
    if (svgLines.length > 0) {
      svgLines.forEach(el => {
        const pathEl = el as SVGPathElement;
        if (typeof pathEl.getTotalLength === 'function') {
          gsap.from(pathEl, {
            strokeDashoffset: pathEl.getTotalLength(),
            duration: 1.6,
            stagger: 0.2,
            delay: 0.5,
            ease: 'power1.out',
            scrollTrigger: { trigger: root, once: true }
          });
        }
      });
    }

    const svgPoints = root.querySelectorAll('.geo-svg-point');
    if (svgPoints.length) {
      gsap.from(svgPoints, { scale: 0, opacity: 0, stagger: 0.12, duration: 0.5, delay: 0.8 });
    }

    // CTA按钮交互
    const ctaBtn = root.querySelector('.scene-cta') as HTMLButtonElement;
    if (ctaBtn) {
      gsap.set(ctaBtn, { transformOrigin: 'center' });
      ctaBtn.addEventListener('mouseenter', () => {
        gsap.to(ctaBtn, { y: -3, scale: 1.04, boxShadow: '0 12px 24px rgba(232,112,0.3)', duration: 0.3 });
      });
      ctaBtn.addEventListener('mouseleave', () => {
        gsap.to(ctaBtn, { y: 0, scale: 1, boxShadow: '0 0 0 rgba(232,112,0)', duration: 0.3 });
      });
      ctaBtn.addEventListener('mousedown', () => {
        gsap.to(ctaBtn, { scale: 0.96, duration: 0.1 });
      });
      ctaBtn.addEventListener('mouseup', () => {
        gsap.to(ctaBtn, { scale: 1.04, duration: 0.2 });
      });
    }

    return () => {
      ScrollTrigger.killAll();
      tl.kill();
    };
  }, { scope: scopeRef });

  return { scopeRef };
}
