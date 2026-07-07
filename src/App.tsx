import { useState, useRef, useEffect, useCallback } from 'react';
import GlobalNav from './components/GlobalNav';
import CourseHero from './components/CourseHero';
import FieldGuidesHero from './components/FieldGuidesHero';
import GeologyHero from './components/GeologyHero';
import PlansHero from './components/PlansHero';
import LiveTourHero from './components/LiveTourHero';

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Course');

  const tabList = [
    { name: 'Course', index: 0 },
    { name: 'Field Guides', index: 1 },
    { name: 'Geology', index: 2 },
    { name: 'Plans', index: 3 },
    { name: 'Live Tour', index: 4 },
  ];

  // 点击导航滚动到对应区块
  const scrollToSection = (tabName: string) => {
    setActiveTab(tabName);
    const target = tabList.find(item => item.name === tabName);
    if (!target || !mainRef.current) return;
    const section = mainRef.current.children[target.index] as HTMLElement;
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  // 滚动监听：自动更新当前激活tab
  const handleScroll = useCallback(() => {
    if (!mainRef.current) return;
    const scrollTop = mainRef.current.scrollTop;
    const viewHeight = mainRef.current.clientHeight;

    for (const item of tabList) {
      const section = mainRef.current.children[item.index] as HTMLElement;
      if (!section) continue;
      const offsetTop = section.offsetTop;
      // 判断当前视口主体在哪个区块
      if (scrollTop >= offsetTop - viewHeight / 2 && scrollTop < offsetTop + viewHeight / 2) {
        setActiveTab(item.name);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;
    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="bg-black min-h-screen tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <GlobalNav activeTab={activeTab} onTabChange={scrollToSection} />
      <main ref={mainRef} className="w-full h-screen overflow-y-auto scroll-snap-container">
        <CourseHero />
        <FieldGuidesHero />
        <GeologyHero />
        <PlansHero />
        <LiveTourHero />
      </main>
    </div>
  );
}

export default App;