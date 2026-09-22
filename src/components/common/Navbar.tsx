/* ==========================================================================
   InfraMaturity - Global Application Navbar
   Desktop + Mobile Responsive Navigation with Profile Dropdown
   ========================================================================== */

import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Bookmark,
  Clock,
  Info,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.tsx';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate('/');
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.45rem 0.8rem',
    fontSize: 'var(--text-sm)',
    fontWeight: (isActive ? 600 : 500) as number,
    color: isActive ? 'var(--navy-950)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'rgba(11, 18, 32, 0.05)' : 'transparent',
    borderBottom: isActive ? '2px solid var(--accent-amber)' : '2px solid transparent',
    borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
    transition: 'all var(--transition-fast)',
    textDecoration: 'none',
  });

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--header-height)',
        }}
      >
        {/* Left: Product Brand */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--navy-950)',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(11, 18, 32, 0.15)',
            }}
          >
            <Layers size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                color: 'var(--navy-950)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              OpenInfra IQ
            </div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              Infrastructure Project Maturity Assessment
            </div>
          </div>
        </Link>

        {/* Right Actions: Desktop Navigation (beside left of auth) + Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
            className="desktop-nav"
          >
            <NavLink to="/" style={navLinkStyle} end>
              Home
            </NavLink>

            <NavLink to="/about" style={navLinkStyle}>
              <Info size={15} />
              About
            </NavLink>

            {isAuthenticated && (
              <NavLink to="/profile" style={navLinkStyle}>
                <UserIcon size={15} />
                Profile
              </NavLink>
            )}
          </nav>

          {/* Subtle Vertical Divider between Nav and Auth on Desktop */}
          <div
            className="desktop-only"
            style={{
              width: '1px',
              height: '20px',
              backgroundColor: 'var(--border-light)',
            }}
          />
          {/* User Profile / Auth Actions */}
          {isAuthenticated && user ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--surface-soft)',
                  cursor: 'pointer',
                  transition: 'border-color var(--transition-fast)',
                }}
                aria-label="User menu"
                aria-expanded={dropdownOpen}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--navy-900)',
                    color: 'var(--accent-amber)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                  }}
                >
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  className="desktop-only"
                >
                  {(user?.name || user?.email || 'User').split(' ')[0]}
                </span>
                <ChevronDown size={14} color="var(--text-secondary)" />
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '230px',
                    backgroundColor: 'var(--surface-primary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: 'var(--space-2)',
                    zIndex: 100,
                  }}
                >
                  <div
                    style={{
                      padding: 'var(--space-3)',
                      borderBottom: '1px solid var(--border-subtle)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {user?.name || user?.email || 'User'}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {user?.email || ''}
                    </div>
                  </div>

                  <Link
                    to="/profile?tab=personal"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none',
                    }}
                    className="dropdown-item"
                  >
                    <UserIcon size={15} />
                    Personal Profile
                  </Link>

                  <Link
                    to="/profile?tab=history"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none',
                    }}
                    className="dropdown-item"
                  >
                    <Clock size={15} />
                    Repository History
                  </Link>

                  <Link
                    to="/profile?tab=saved"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none',
                    }}
                    className="dropdown-item"
                  >
                    <Bookmark size={15} />
                    Saved Repositories
                  </Link>

                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      marginTop: 'var(--space-1)',
                      paddingTop: 'var(--space-1)',
                    }}
                  >
                    <button
                      onClick={handleSignOut}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-2) var(--space-3)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-error)',
                        borderRadius: 'var(--radius-sm)',
                        textAlign: 'left',
                      }}
                      className="dropdown-item"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Link to="/login" className="btn btn-outline btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-secondary btn-sm desktop-only">
                Create Account
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only btn-icon"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'var(--surface-primary)',
            padding: 'var(--space-4) var(--space-6)',
            boxShadow: 'var(--shadow-md)',
          }}
          className="mobile-only"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={navLinkStyle}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={navLinkStyle}
            >
              <Info size={16} />
              About Methodology
            </NavLink>
            {isAuthenticated ? (
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                style={navLinkStyle}
              >
                <UserIcon size={16} />
                Profile & Repositories
              </NavLink>
            ) : (
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-2)',
                  marginTop: 'var(--space-2)',
                  paddingTop: 'var(--space-3)',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
