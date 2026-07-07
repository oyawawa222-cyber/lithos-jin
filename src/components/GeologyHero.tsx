import { useRef } from 'react';
import RevealLayer from './RevealLayer';
import { useSpotlight } from '../hooks/useSpotlight';
import { useGsapScene } from '../hooks/useGsapScenes';
import { GeologyDecor } from './SceneDecorations';

// 地质学页面背景图，替换为你自己的图片地址
const GEO_BG1 = "/images/geology/qipao.jpg";
const GEO_BG2 = "/images/geology/kongdao.webp";

export default function GeologyHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scopeRef } = useGsapScene(wrapRef, 'geology');
  const { cursorPos, SPOTLIGHT_R } = useSpotlight();
  const { x, y } = cursorPos;

  return (
    <section ref={wrapRef} className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }} data-gsap-animate>
      <div ref={scopeRef} style={{ opacity: 1 }}>
        {/* 底层背景图 */}
        <div className="scene-bg absolute inset-0 bg-center bg-cover bg-no-repeat z-10" style={{ backgroundImage: `url(${GEO_BG1})` }} />
        {/* 全局通用鼠标聚光遮罩层 */}
        <div className="z-30 absolute inset-0">
          <RevealLayer baseRevealImage={GEO_BG2} cursorX={x} cursorY={y} radius={SPOTLIGHT_R} />
        </div>
        {/* 地质学专属SVG装饰 */}
        <GeologyDecor />
        {/* 页面主标题 */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <span className="scene-head-1 block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl text-white leading-[0.95]" style={{ letterSpacing: '-0.05em' }}>
            Rock Strata
          </span>
          <span className="scene-head-2 block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 text-white leading-[0.95]" style={{ letterSpacing: '-0.08em' }}>
            Read Earth’s Fault Lines
          </span>
        </div>
        {/* 描述文案与行动按钮 */}
        <div className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 max-w-full sm:max-w-[260px] flex flex-col gap-4 z-50">
          <p className="scene-text text-sm text-white/80 leading-relaxed">
            Analyze bedrock formations, fault structures and mineral deposits hidden beneath forested terrain.
          </p>
          <button className="scene-cta bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all">
            Study Geology Basics
          </button>
        </div>
      </div>
    </section>
  );
}