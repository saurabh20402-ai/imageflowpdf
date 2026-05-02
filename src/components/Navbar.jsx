'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ImageIcon, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { TOOLS, TOOL_CATEGORIES, getToolsByCategory } from '@/lib/tools-registry';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="glass" style={{
      position: 'sticky', top: 0, zIndex: 100,
      borderBottom: '1px solid var(--hairline-soft)',
      height: 'var(--nav-h)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '100%', gap: '32px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <ImageIcon size={18} color="#fff" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            Image<span style={{ color: 'var(--primary)' }}>Flow</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hidden md:flex">
          <Link href="/" style={{ padding: '8px 14px', fontSize: '14px', fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', borderRadius: 8, transition: 'all 200ms' }}
            onMouseEnter={e => { e.target.style.color = 'var(--ink)'; e.target.style.background = 'var(--surface)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--muted)'; e.target.style.background = 'transparent'; }}>
            Home
          </Link>

          {/* Tools Dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
            <button style={{
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
                marginTop: 4, width: 640,
                background: 'var(--surface-card)', border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)',
                padding: 20, zIndex: 200,
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {TOOLS
                    .filter(t => t.popular)
                    .sort((a, b) => (a.category === 'pdf' ? -1 : 0) - (b.category === 'pdf' ? -1 : 0))
                    .slice(0, 12)
                    .map(t => {
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

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'var(--surface)', border: '1px solid var(--hairline-soft)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', transition: 'all 200ms',
            }}
            aria-label="Toggle theme">
            {mounted && (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />)}
          </button>

          {/* Mobile menu */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'var(--surface)', border: '1px solid var(--hairline-soft)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)',
            }}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden" style={{
          background: 'var(--surface-card)',
          borderTop: '1px solid var(--hairline-soft)',
          padding: 16,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {TOOLS.filter(t => t.popular).slice(0, 8).map(t => (
              <Link key={t.slug} href={`/tools/${t.slug}/`}
                style={{ padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}
                onClick={() => setMobileOpen(false)}>
                {t.name}
              </Link>
            ))}
            <Link href="/#all-tools" style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}
              onClick={() => setMobileOpen(false)}>
              View all tools →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
