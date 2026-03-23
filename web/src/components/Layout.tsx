import { Outlet, useNavigate, useLocation } from 'react-router-dom';

/* ─── SVG icons matching prototype exactly ─── */
const icons = {
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
  barChart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </svg>
  ),
  coins: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1113.63 18.09" />
      <path d="M7 6h2v4H7z" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
};

/* ─── Nav structure matching prototype ─── */
const navSections = [
  {
    label: '监控',
    items: [
      { key: '/', text: '模型监控', icon: icons.grid },
      { key: '/channels', text: '通道管理', icon: icons.activity },
      { key: '/models', text: '全部模型', icon: icons.box },
    ],
  },
  {
    label: '分析',
    items: [
      { key: '/history', text: '测试历史', icon: icons.barChart },
    ],
  },
  {
    label: '配置',
    items: [
      { key: '/settings', text: '设置', icon: icons.gear },
    ],
  },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      fontFamily: "Inter, -apple-system, 'Segoe UI', sans-serif",
      background: '#f5f6fa', color: '#16192c',
    }}>
      {/* ─── Sidebar ─── */}
      <aside style={{
        width: 220, flexShrink: 0, background: '#fff',
        borderRight: '1px solid #ececf1', display: 'flex',
        flexDirection: 'column', padding: '24px 0',
      }}>
        {/* Brand */}
        <div style={{ padding: '0 22px 28px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 16,
            boxShadow: '0 3px 12px rgba(99,102,241,0.3)',
          }}>M</div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#16192c' }}>Model Monitor</span>
        </div>

        {/* Nav sections */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 10px' }}>
          {navSections.map(section => (
            <div key={section.label}>
              <div style={{
                fontSize: 10, color: '#9ca3af', textTransform: 'uppercase',
                letterSpacing: 1, padding: '16px 14px 6px', fontWeight: 700,
              }}>{section.label}</div>
              {section.items.map(item => {
                const isActive = location.pathname === item.key;
                return (
                  <div
                    key={item.key}
                    onClick={() => navigate(item.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px', borderRadius: 10, fontSize: 13,
                      fontWeight: isActive ? 600 : 500, cursor: 'pointer',
                      color: isActive ? '#6366f1' : '#5a6078',
                      background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent',
                      transition: 'all 0.15s', textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#f5f5ff';
                        e.currentTarget.style.color = '#6366f1';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#5a6078';
                      }
                    }}
                  >
                    <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </span>
                    {item.text}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* ─── Main content (no header bar) ─── */}
      <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
