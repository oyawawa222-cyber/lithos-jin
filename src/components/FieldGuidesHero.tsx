import { useRef } from 'react';
import RevealLayer from './RevealLayer';
import { useSpotlight } from '../hooks/useSpotlight';
import { useGsapScene } from '../hooks/useGsapScenes';
import { FieldDecor } from './SceneDecorations';

// 替换专属沙漠双图
const FIELD_BG1 = "/images/field/shanpo.jpg";
const FIELD_BG2 = "/images/field/dianshi.webp";

export default function FieldGuidesHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scopeRef } = useGsapScene(wrapRef, 'field');
  const { cursorPos, SPOTLIGHT_R } = useSpotlight();
  const { x, y } = cursorPos;

  return (
    <section ref={wrapRef} className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }} data-gsap-animate>
      <div ref={scopeRef} style={{ opacity: 1 }}>
        {/* 底层背景：补上 hero-zoom 统一缩放入场动画 */}
        <div 
          className="scene-bg absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom" 
          style={{ backgroundImage: `url(${FIELD_BG1})` }} 
        />
        {/* 聚光遮罩层 */}
        <div className="z-30 absolute inset-0">
          <RevealLayer baseRevealImage={FIELD_BG2} cursorX={x} cursorY={y} radius={SPOTLIGHT_R} />
        </div>
        {/* 地质装饰SVG */}
        <FieldDecor />
        {/* 标题 */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <span className="scene-head-1 block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl text-white leading-[0.95]" style={{ letterSpacing: '-0.05em' }}>
            Desert Surveys
          </span>
          <span className="scene-head-2 block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 text-white leading-[0.95]" style={{ letterSpacing: '-0.08em' }}>
            Trace Ancient Dunes
          </span>
        </div>
        {/* 文字与按钮 */}
        <div className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 max-w-full sm:max-w-[260px] flex flex-col gap-4 z-50">
          <p className="scene-text text-sm text-white/80 leading-relaxed">
            Field mapping tools to chart desert strata, fossil outcrops and wind-deposited mineral layers.
          </p>
          <button className="scene-cta bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all">
            Explore Field Guides
          </button>
        </div>
      </div>
    </section>
  );
}