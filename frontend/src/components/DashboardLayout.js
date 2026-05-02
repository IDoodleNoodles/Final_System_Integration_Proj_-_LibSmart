import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, LayoutDashboard, LibraryBig, Users, Building2, Settings2, LogOut } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/catalog', label: 'Catalog', icon: BookOpen },
  { to: '/books', label: 'Books', icon: LibraryBig },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/branches', label: 'Branches', icon: Building2 },
];

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="page-shell">
      <aside className="dashboard-sidebar">
        <div className="brand-lockup">
          <div>
            <div className="brand-mark" style={{ fontSize: '2rem' }}>LibSmart</div>
            <div className="brand-subtitle" style={{ color: 'hsl(var(--muted-foreground))' }}>Library</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link key={to} to={to} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link to="/reset-password" className="button button-secondary" style={{ width: '100%' }}>
            <Settings2 size={18} />
            Change Password
          </Link>
          <button type="button" className="button button-ghost" onClick={handleLogout} style={{ width: '100%' }}>
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      <main className="dashboard-content">{children}</main>
    </div>
  );
}
