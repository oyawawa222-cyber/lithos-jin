import { ReactNode } from 'react';

// 野外指南-沙漠：等高线+测量标
export function FieldDecor(): ReactNode {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      <svg className="geo-svg-line absolute top-[20%] left-[8%] w-[320px] h-[180px] stroke-white/20 fill-none stroke-[0.5px]" viewBox="0 0 320 180">
        <path d="M0,90 Q80,40 160,90 T320,90" strokeDasharray="320" />
        <path d="M0,120 Q80,70 160,120 T320,120" strokeDasharray="340" />
        <path d="M0,150 Q80,100 160,150 T320,150" strokeDasharray="300" />
      </svg>
      <div className="geo-svg-point absolute top-[26%] left-[22%] w-2 h-2 rounded-full bg-orange-400/80" />
    </div>
  );
}

// 地质学-森林：断层线+标注点
export function GeologyDecor(): ReactNode {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      <svg className="geo-svg-line absolute top-[30%] right-[12%] w-[280px] h-[120px] stroke-white/25 fill-none stroke-[0.6px]" viewBox="0 0 280 120">
        <path d="M0,60 L100,20 L180,80 L280,40" strokeDasharray="360" />
      </svg>
      <div className="geo-svg-point absolute top-[34%] right-[24%] w-1.5 h-1.5 bg-white/70 rounded-full" />
      <div className="geo-svg-point absolute top-[42%] right-[18%] w-1.5 h-1.5 bg-white/70 rounded-full" />
    </div>
  );
}

// 勘探规划-湖泊：路线节点
export function PlansDecor(): ReactNode {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      <svg className="geo-svg-line absolute bottom-[28%] left-[10%] w-[360px] h-[140px] stroke-white/20 fill-none stroke-[0.5px]" viewBox="0 0 360 140">
        <path d="M0,70 L90,30 L180,100 L270,50 L360,90" strokeDasharray="420" />
      </svg>
      <div className="geo-svg-point absolute bottom-[32%] left-[12%] w-2 h-2 rounded-full bg-orange-300/70" />
      <div className="geo-svg-point absolute bottom-[36%] left-[30%] w-1.5 h-1.5 rounded-full bg-white/60" />
      <div className="geo-svg-point absolute bottom-[30%] left-[52%] w-1.5 h-1.5 rounded-full bg-white/60" />
    </div>
  );
}

// 实地考察-海洋：海岸线采样点
export function LiveTourDecor(): ReactNode {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      <svg className="geo-svg-line absolute top-[40%] left-[15%] w-[400px] h-[100px] stroke-white/18 fill-none stroke-[0.5px]" viewBox="0 0 400 100">
        <path d="M0,50 Q60,20 120,50 T240,50 T360,50" strokeDasharray="400" />
      </svg>
      <div className="geo-svg-point absolute top-[44%] left-[18%] w-2 h-2 rounded-full bg-cyan-300/60 animate-pulse" style={{animationDuration:'4s'}} />
      <div className="geo-svg-point absolute top-[48%] left-[40%] w-1.5 h-1.5 rounded-full bg-white/60" />
    </div>
  );
}