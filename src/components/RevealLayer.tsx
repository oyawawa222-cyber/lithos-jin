import { useRef, useEffect, useMemo } from 'react';

interface RevealLayerProps {
  baseRevealImage: string;
  cursorX: number;
  cursorY: number;
  radius: number;
}

export default function RevealLayer({ baseRevealImage, cursorX, cursorY, radius }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskDivRef = useRef<HTMLDivElement>(null);
  // 缓存画布尺寸，避免频繁读取DOM
  const sizeRef = useRef({ w: window.innerWidth, h: window.innerHeight });

  // 窗口 resize 只执行一次尺寸更新
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      sizeRef.current.w = window.innerWidth;
      sizeRef.current.h = window.innerHeight;
      canvas.width = sizeRef.current.w;
      canvas.height = sizeRef.current.h;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, []);

  // 缓存渐变模板，不重复创建
  const gradientStops = useMemo(() => [
    { stop: 0, color: 'rgba(255,255,255,1)' },
    { stop: 0.4, color: 'rgba(255,255,255,1)' },
    { stop: 0.6, color: 'rgba(255,255,255,0.75)' },
    { stop: 0.75, color: 'rgba(255,255,255,0.4)' },
    { stop: 0.88, color: 'rgba(255,255,255,0.12)' },
    { stop: 1, color: 'rgba(255,255,255,0)' },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const maskDiv = maskDivRef.current;
    if (!canvas || !maskDiv) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    // 鼠标在屏幕外，直接清空蒙版，不绘制画布
    if (cursorX < 0 || cursorY < 0) {
      maskDiv.style.maskImage = 'none';
      maskDiv.style.webkitMaskImage = 'none';
      return;
    }

    // 清空画布，单次绘制
    ctx.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h);
    const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, radius);
    gradientStops.forEach(item => grad.addColorStop(item.stop, item.color));
    ctx.fillStyle = grad;
    ctx.arc(cursorX, cursorY, radius, 0, Math.PI * 2);
    ctx.fill();

    const maskUrl = canvas.toDataURL('image/png', 0.7);
    maskDiv.style.maskImage = `url(${maskUrl})`;
    maskDiv.style.webkitMaskImage = `url(${maskUrl})`;
    maskDiv.style.maskSize = '100% 100%';
  }, [cursorX, cursorY, radius, gradientStops]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none hidden" />
      <div
        ref={maskDivRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${baseRevealImage})` }}
      />
    </>
  );
}