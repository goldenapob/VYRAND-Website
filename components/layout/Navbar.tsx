"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, CalendarCheck } from "lucide-react";
import { experiences } from "@/lib/experiences";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(17,17,24,0.95)" : "rgba(17,17,24,0.8)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        borderBottom: "1px solid var(--border)",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <nav
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          height: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center" }}>
          <img
            src="/images/logo-nav.png"
            alt="VYRAND"
            style={{ height: 22, width: "auto", display: "block" }}
          />
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            alignItems: "center",
            gap: 8,
            flex: 1,
            justifyContent: "center",
          }}
          className="hidden md:flex"
        >
          {/* Experiences dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "8px 14px",
                background: "none",
                border: "none",
                color: dropdownOpen ? "var(--accent)" : "var(--text)",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 500,
                borderRadius: 6,
                transition: "color 0.2s",
              }}
            >
              Experiences
              <ChevronDown
                size={14}
                style={{
                  transition: "transform 0.2s",
                  transform: dropdownOpen ? "rotate(180deg)" : "none",
                }}
              />
            </button>

            {dropdownOpen && (
              <div
                className="animate-slide-down"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "8px",
                  minWidth: 240,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                }}
              >
                {experiences.map((exp) => (
                  <Link
                    key={exp.id}
                    href={`/experiences/${exp.id}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 7,
                      textDecoration: "none",
                      transition: "background 0.15s",
                      color: "var(--text)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "var(--tag-bg)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "transparent")
                    }
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          color: "var(--text)",
                        }}
                      >
                        {exp.name}
                      </div>
                      <div
                        style={{ fontSize: "0.75rem", color: "var(--muted)" }}
                      >
                        {exp.sport}
                      </div>
                    </div>
                    {exp.isFlagship && (
                      <span
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#25a267",
                          border: "1px solid #25a267",
                          borderRadius: 4,
                          padding: "2px 6px",
                        }}
                      >
                        Flagship
                      </span>
                    )}
                    {exp.isAndorraID && (
                      <span
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                          border: "1px solid var(--accent)",
                          borderRadius: 4,
                          padding: "2px 6px",
                        }}
                      >
                        Andorra
                      </span>
                    )}
                  </Link>
                ))}
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    marginTop: 6,
                    paddingTop: 6,
                  }}
                >
                  <Link
                    href="/experiences"
                    style={{
                      display: "block",
                      padding: "10px 14px",
                      borderRadius: 7,
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "var(--muted)")
                    }
                  >
                    View all experiences →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                color:
                  pathname === link.href ? "var(--accent)" : "var(--text)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  pathname === link.href ? "var(--accent)" : "var(--text)")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div
          style={{ alignItems: "center", gap: 12 }}
          className="hidden md:flex"
        >
          <Link
            href="/account"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: "0.82rem",
              color: "var(--muted)",
              transition: "color 0.2s",
              border: "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--border)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              (e.currentTarget as HTMLElement).style.borderColor = "transparent";
            }}
          >
            <CalendarCheck size={14} />
            My Booking
          </Link>
          <Link href="/booking" className="btn-primary-sm">
            Book Now →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text)",
            cursor: "pointer",
            padding: 8,
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden animate-slide-down"
          style={{
            backgroundColor: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px 24px",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 12,
            }}
          >
            Experiences
          </div>
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "var(--text)",
                  }}
                >
                  {exp.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                  {exp.sport}
                </div>
              </div>
              {exp.isFlagship && (
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#25a267",
                    border: "1px solid #25a267",
                    borderRadius: 4,
                    padding: "2px 6px",
                    marginLeft: "auto",
                  }}
                >
                  Flagship
                </span>
              )}
            </Link>
          ))}

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "var(--text)",
                  textDecoration: "none",
                  padding: "8px 0",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div
              style={{
                marginTop: 8,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: 12,
              }}
            >
              <Link href="/account" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                My Booking
              </Link>
              <Link href="/booking" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
