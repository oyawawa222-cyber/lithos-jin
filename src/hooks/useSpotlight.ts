import { useRef, useState, useEffect } from 'react';

export const SPOTLIGHT_R = 260;

export function useSpotlight() {
  // 原始鼠标坐标
  const rawMouse = useRef({ x: -999, y: -999 });
  // 平滑插值坐标
  const smoothMouse = useRef({ x: -999, y: -999 });
  const rafId = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      rawMouse.current.x = e.clientX;
      rawMouse.current.y = e.clientY;
    };

    // 动画帧循环
    const animate = () => {
      // 0.77极高插值，几乎无拖尾，数值越大跟随越快
      const ease = 0.77;
      smoothMouse.current.x += (rawMouse.current.x - smoothMouse.current.x) * ease;
      smoothMouse.current.y += (rawMouse.current.y - smoothMouse.current.y) * ease;
      
      // 仅坐标变化超过1像素才更新state，减少重渲染
      const dx = Math.abs(rawMouse.current.x - smoothMouse.current.x);
      const dy = Math.abs(rawMouse.current.y - smoothMouse.current.y);
      if (dx > 1 || dy > 1) {
        setCursorPos({ ...smoothMouse.current });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { cursorPos, SPOTLIGHT_R };
}