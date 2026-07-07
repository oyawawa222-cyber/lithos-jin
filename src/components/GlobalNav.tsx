import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState } from 'react';

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function GlobalNav({ activeTab, onTabChange }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const tabs = ['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour'];

  useGSAP(() => {
    const activeBtn = document.querySelector('.nav-pill-active');
    if (activeBtn) {
      gsap.to(activeBtn, { scale: 1.05, opacity: 1, duration: 0.3 });
    }
  }, [activeTab]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg width={26} height={26} viewBox="0 0 256 256" fill="#ffffff">
          <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
        </svg>
        <span className="text-white text-2xl font-playfair italic">Lithos</span>
      </div>

      {/* 桌面导航：可点击切换滚动 */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'nav-pill-active text-white bg-white/15'
                : 'text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 右侧按钮 */}
      <button className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
        Sign Up
      </button>

      {/* 移动端菜单 */}
      <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
        <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    </nav>
  );
}