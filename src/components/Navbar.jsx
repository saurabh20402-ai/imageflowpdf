'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import ImageFlowLogoImg from '@/components/ImageFlowLogoImg';
import * as Icons from 'lucide-react';
import { TOOLS, TOOL_CATEGORIES, getToolsByCategory } from '@/lib/tools-registry';

const NAV_LINK_STYLE = {
  padding: '10px 14px',
  fontSize: 15,
  fontWeight: 600,
  color: 'var(--ink)',
  textDecoration: 'none',
  borderRadius: 10,
  display: 'block',
};

const TOOL_ROW_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 12px',
  borderRadius: 10,
  textDecoration: 'none',
  color: 'var(--ink)',
  fontSize: 14,
  fontWeight: 500,
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header
      className="glass"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid var(--hairline-soft)',
        minHeight: 'var(--nav-h)',
      }}>
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 'var(--nav-h)',
          gap: 'clamp(8px, 3vw, 28px)',
          maxWidth: '100%',
        }}>
        <Link
          href="/"
          onClick={closeMobile}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, minWidth: 0 }}>
          <ImageFlowLogoImg height={32} />
        </Link>

        {/* Desktop — CSS .navbar-desktop-nav hides &lt;768px */}
        <nav className="navbar-desktop-nav">
          <Link href="/" style={{ padding: '8px 14px', fontSize: '14px', fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', borderRadius: 8, transition: 'all 200ms' }}
            onMouseEnter={e => { e.target.style.color = 'var(--ink)'; e.target.style.background = 'var(--surface)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--muted)'; e.target.style.background = 'transparent'; }}>
            Home
          </Link>

          <div style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
            <button type="button" style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '8px 14px', fontSize: '14px', fontWeight: 500,
              color: dropdownOpen ? 'var(--ink)' : 'var(--muted)',
              background: dropdownOpen ? 'var(--surface)' : 'transparent',
              border: 'none', borderRadius: 8, cursor: 'pointer', transition: 'all 200ms',
            }}>
              Tools <ChevronDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
            </button>

            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                marginTop: 4, width: 'min(640px, calc(100vw - 48px))',
                background: 'var(--surface-card)', border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)',
                padding: 20, zIndex: 200,
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {TOOLS.filter(t => t.popular).slice(0, 12).map(t => {
                    const Icon = Icons[t.icon] || Icons.FileImage;
                    return (
                      <Link key={t.slug} href={`/tools/${t.slug}/`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 12px', borderRadius: 10, textDecoration: 'none',
                          transition: 'background 200ms',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        onClick={() => setDropdownOpen(false)}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: `${t.color}12`, color: t.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Icon size={16} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{t.name}</span>
                      </Link>
                    );
                  })}
                </div>
                <div style={{ borderTop: '1px solid var(--hairline-soft)', marginTop: 12, paddingTop: 12, textAlign: 'center' }}>
                  <Link href="/#all-tools" style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}
                    onClick={() => setDropdownOpen(false)}>
                    View all tools →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/#features" style={{ padding: '8px 14px', fontSize: '14px', fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', borderRadius: 8 }}
            onMouseEnter={e => { e.target.style.color = 'var(--ink)'; e.target.style.background = 'var(--surface)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--muted)'; e.target.style.background = 'transparent'; }}>
            Features
          </Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'var(--surface)', border: '1px solid var(--hairline-soft)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', transition: 'all 200ms',
            }}
            aria-label="Toggle theme">
            {mounted && (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />)}
          </button>

          <button
            type="button"
            className="navbar-mobile-menu-btn"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'var(--surface)', border: '1px solid var(--hairline-soft)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)',
            }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer + backdrop */}
      {mobileOpen && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={closeMobile}
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              top: 'var(--nav-h)',
              border: 'none',
              margin: 0,
              padding: 0,
              background: 'rgba(15, 23, 42, 0.5)',
              zIndex: 1001,
              cursor: 'pointer',
            }}
          />
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              top: 'var(--nav-h)',
              bottom: 0,
              zIndex: 1002,
              background: 'var(--surface-card)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderTop: '1px solid var(--hairline-soft)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            }}>
            <nav style={{ padding: '12px 16px 28px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>

              <p style={{
                fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--muted-soft)', margin: '12px 8px 8px',
              }}>
                Menu
              </p>
              <Link href="/" style={{ ...NAV_LINK_STYLE }} onClick={closeMobile}>Home</Link>
              <Link href="/#features" style={{ ...NAV_LINK_STYLE }} onClick={closeMobile}>Features</Link>
              <Link href="/#all-tools" style={{ ...NAV_LINK_STYLE }} onClick={closeMobile}>All tools on homepage</Link>
              <Link href="/tutorials/" style={{ ...NAV_LINK_STYLE }} onClick={closeMobile}>Tutorials</Link>
              <Link href="/donate/" style={{ ...NAV_LINK_STYLE }} onClick={closeMobile}>Donate</Link>
              <Link href="/about-us/" style={{ ...NAV_LINK_STYLE }} onClick={closeMobile}>About Us</Link>
              <Link href="/support/" style={{ ...NAV_LINK_STYLE }} onClick={closeMobile}>Support</Link>

              <p style={{
                fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--muted-soft)', margin: '22px 8px 10px',
              }}>
                Tools
              </p>

              {TOOL_CATEGORIES.map((cat) => {
                const tools = getToolsByCategory(cat.id);
                if (!tools.length) return null;
                return (
                  <div key={cat.id} style={{ marginBottom: 14 }}>
                    <p style={{
                      fontSize: 12, fontWeight: 700, color: 'var(--primary)', padding: '8px 12px 6px',
                    }}>
                      {cat.name}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {tools.map((t) => {
                        const Icon = Icons[t.icon] || Icons.FileImage;
                        return (
                          <Link
                            key={t.slug}
                            href={`/tools/${t.slug}/`}
                            style={{ ...TOOL_ROW_STYLE, background: 'var(--surface)' }}
                            onClick={closeMobile}>
                            <div style={{
                              width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                              background: `${t.color}14`, color: t.color,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <Icon size={17} />
                            </div>
                            <span>{t.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
