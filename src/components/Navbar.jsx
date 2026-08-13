'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import ImageFlowLogoImg from '@/components/ImageFlowLogoImg';
import * as Icons from 'lucide-react';
import { TOOLS, TOOL_CATEGORIES, getToolsByCategory } from '@/lib/tools-registry';
import './components.css';

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
    <header className="glass navbar-header">
      <div className="navbar-container">
        <Link href="/" onClick={closeMobile} className="navbar-logo-link" title="ImageFlow — Free Online Image & PDF Tools">
          <ImageFlowLogoImg height={40} />
        </Link>

        {/* Desktop/tablet — hidden <768px; centered between logo and actions */}
        <nav className="navbar-desktop-nav">
          <Link href="/" className="nav-link" onClick={closeMobile} title="ImageFlow Home — Free Image & PDF Tools">
            Home
          </Link>

          <div className="nav-dropdown-container"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
            <button type="button" className="nav-dropdown-trigger" data-open={dropdownOpen}>
              Tools <ChevronDown size={16} className="nav-dropdown-icon" />
            </button>

            {dropdownOpen && (
              <div className="nav-dropdown"
                role="menu">
                <div className="nav-dropdown-grid">
                  {TOOLS
                    .filter(t => t.popular)
                    .sort((a, b) => (a.category === 'pdf' ? -1 : 0) - (b.category === 'pdf' ? -1 : 0))
                    .slice(0, 12)
                    .map(t => {
                    const Icon = Icons[t.icon] || Icons.FileImage;
                    return (
                      <Link key={t.slug} href={`/tools/${t.slug}/`}
                        className="nav-dropdown-item"
                        title={`${t.name} — Free Online Tool`}
                        onClick={() => setDropdownOpen(false)}>
                        <div className="nav-dropdown-icon-box" style={{ background: `${t.color}12`, color: t.color }}>
                          <Icon size={16} />
                        </div>
                        <span>{t.name}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="nav-dropdown-footer">
                  <Link href="/#all-tools" className="nav-dropdown-view-all"
                    title="View all ImageFlow tools"
                    onClick={() => setDropdownOpen(false)}>
                    View all tools →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/#features" className="nav-link" onClick={closeMobile} title="ImageFlow Features — What makes us different">
            Features
          </Link>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-theme-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme">
            {mounted && (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />)}
          </button>

          <button
            type="button"
            className="navbar-mobile-menu-btn"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}>
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
            className="navbar-mobile-backdrop"
          />
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="navbar-mobile-drawer">
            <nav className="navbar-mobile-nav">

              <p className="navbar-section-label">
                Menu
              </p>
              <Link href="/" className="navbar-mobile-link" onClick={closeMobile} title="ImageFlow Home — Free Image & PDF Tools">Home</Link>
              <Link href="/#features" className="navbar-mobile-link" onClick={closeMobile} title="ImageFlow Features">Features</Link>
              <Link href="/#all-tools" className="navbar-mobile-link" onClick={closeMobile} title="All ImageFlow Online Tools">All tools on homepage</Link>
              <Link href="/tutorials/" className="navbar-mobile-link" onClick={closeMobile} title="ImageFlow Tutorials — Learn how to use image tools">Tutorials</Link>
              <Link href="/donate/" className="navbar-mobile-link" onClick={closeMobile} title="Donate to support ImageFlow">Donate</Link>
              <Link href="/about-us/" className="navbar-mobile-link" onClick={closeMobile} title="About ImageFlow — Who we are">About Us</Link>
              <Link href="/support/" className="navbar-mobile-link" onClick={closeMobile} title="ImageFlow Support — Get help">Support</Link>

              <p className="navbar-section-label" style={{ marginTop: 22 }}>
                Tools
              </p>

              {TOOL_CATEGORIES.map((cat) => {
                const tools = getToolsByCategory(cat.id);
                if (!tools.length) return null;
                return (
                  <div key={cat.id} className="navbar-tool-section">
                    <p className="navbar-section-title">
                      {cat.name}
                    </p>
                    <div className="navbar-tool-list">
                      {tools.map((t) => {
                        const Icon = Icons[t.icon] || Icons.FileImage;
                        return (
                          <Link
                            key={t.slug}
                            href={`/tools/${t.slug}/`}
                            className="navbar-tool-row"
                            title={`${t.name} — Free Online Tool`}
                            onClick={closeMobile}>
                            <div className="navbar-tool-icon" style={{ background: `${t.color}14`, color: t.color }}>
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
