import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Rocket, Flag, Award, Cpu, Zap, MapPin, Users, Calendar } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes tlDotPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.5); }
    50%      { box-shadow: 0 0 0 6px rgba(34,211,238,0.0); }
  }
  @keyframes tlDotPulseGold {
    0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.6); }
    50%      { box-shadow: 0 0 0 8px rgba(251,191,36,0.0); }
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  .hex-bg { background-color: #010912; }

  /* ── Shimmer skeleton ── */
  .img-skeleton {
    background: linear-gradient(90deg,rgba(34,211,238,0.03) 0%,rgba(34,211,238,0.09) 50%,rgba(34,211,238,0.03) 100%);
    background-size:600px 100%;
    animation: shimmer 1.6s infinite linear;
  }

  /* ── Tag badge ── */
  .badge {
    display:inline-flex; align-items:center;
    padding:3px 10px; font-family:'DM Sans',sans-serif;
    font-size:9px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase;
    border-radius:5px; border:1px solid rgba(34,211,238,0.22);
    color:rgba(34,211,238,0.88); background:rgba(34,211,238,0.06); white-space:nowrap;
  }

  /* ── Achievement card ── */
  .ach-card {
    position: relative;
    background: linear-gradient(150deg,rgba(6,14,28,0.97) 0%,rgba(3,8,18,0.99) 100%);
    border-radius: 20px;
    overflow: hidden;
    transition: box-shadow 0.4s ease, border-color 0.4s ease;
    cursor: default;
  }
  .ach-card-cyan {
    border: 1px solid rgba(34,211,238,0.16);
  }
  .ach-card-cyan:hover {
    border-color: rgba(34,211,238,0.42);
    box-shadow:
      0 28px 70px rgba(0,0,0,0.55),
      0 0 50px rgba(34,211,238,0.07),
      inset 0 1px 0 rgba(34,211,238,0.08);
  }
  .ach-card-gold {
    border: 1px solid rgba(251,191,36,0.28);
  }
  .ach-card-gold:hover {
    border-color: rgba(251,191,36,0.55);
    box-shadow:
      0 32px 80px rgba(0,0,0,0.6),
      0 0 60px rgba(251,191,36,0.08),
      inset 0 1px 0 rgba(251,191,36,0.1);
  }

  /* ── meta row ── */
  .meta-item {
    display:flex; align-items:center; gap:5px;
    font-family:'DM Sans'; font-size:11px; color:rgba(148,163,184,0.6);
  }

  /* ── scan line texture ── */
  .scanlines {
    background-image: repeating-linear-gradient(
      0deg,
      rgba(34,211,238,0.012) 0px,
      rgba(34,211,238,0.012) 1px,
      transparent 1px,
      transparent 4px
    );
    pointer-events:none;
  }

  /* ── Stat card ── */
  .stat-card {
    background:rgba(34,211,238,0.03); border:1px solid rgba(34,211,238,0.09);
    border-radius:14px; padding:22px 16px; text-align:center;
    transition:background 0.3s, border-color 0.3s, transform 0.3s;
  }
  .stat-card:hover {
    background:rgba(34,211,238,0.07); border-color:rgba(34,211,238,0.25);
    transform:translateY(-3px);
  }

  /* ── Horizontal timeline ── */
  .htl-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 0 40px;
    margin-bottom: 72px;
  }
  .htl-line {
    position: absolute;
    top: 50%;
    left: 40px;
    right: 40px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,211,238,0.25) 15%, rgba(34,211,238,0.25) 85%, transparent);
    transform: translateY(-50%);
    z-index: 0;
  }
  .htl-item {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    cursor: pointer;
    gap: 8px;
  }
  .htl-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: rgba(34,211,238,0.85);
    border: 2px solid rgba(34,211,238,0.3);
    box-shadow: 0 0 10px rgba(34,211,238,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
    animation: tlDotPulse 2.5s ease-in-out infinite;
  }
  .htl-dot-gold {
    background: rgba(251,191,36,0.9);
    border-color: rgba(251,191,36,0.4);
    box-shadow: 0 0 14px rgba(251,191,36,0.5);
    animation: tlDotPulseGold 2s ease-in-out infinite;
  }
  .htl-item:hover .htl-dot,
  .htl-item.active .htl-dot {
    transform: scale(1.6);
    box-shadow: 0 0 18px rgba(34,211,238,0.7);
  }
  .htl-item:hover .htl-dot-gold,
  .htl-item.active .htl-dot-gold {
    transform: scale(1.6);
    box-shadow: 0 0 22px rgba(251,191,36,0.8);
  }
  .htl-year {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 9px;
    letter-spacing: 0.18em;
    color: rgba(34,211,238,0.5);
    transition: color 0.2s;
    white-space: nowrap;
  }
  .htl-year-gold { color: rgba(251,191,36,0.6); }
  .htl-item:hover .htl-year,
  .htl-item.active .htl-year { color: rgba(34,211,238,0.9); }
  .htl-item:hover .htl-year-gold,
  .htl-item.active .htl-year-gold { color: rgba(251,191,36,1); }
  .htl-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 8px;
    color: rgba(148,163,184,0.4);
    letter-spacing: 0.06em;
    text-align: center;
    max-width: 80px;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
  }
  .htl-item:hover .htl-title,
  .htl-item.active .htl-title { color: rgba(148,163,184,0.8); }
`;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const achievements = [
  {
    featured: true, rank: '#1 IN INDIA',
    year: '2026', date: 'Ongoing',
    title: 'National Robotics Championship', subtitle: 'Winner — All India',
    description: 'Secured 1st place among 200+ teams across India with our autonomous quadruped — cutting-edge locomotion and real-time terrain mapping that redefined competitive standards nationwide.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
    icon: Trophy, venue: 'National Level', teamSize: '30+',
    tags: ['National', 'Gold', 'Autonomous', '1st Place'], accent: '#fbbf24',
    hallLabel: 'Hall of Fame',
  },
  {
    rank: 'ABU', year: '2025', date: 'DD Robocon Season',
    title: 'DD Robocon', subtitle: 'IIT Delhi — ABU Asia-Pacific',
    description: 'Competed at DD Robocon (ABU Asia-Pacific) at IIT Delhi against 100+ teams with a custom-built high-speed competition robot.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    icon: Rocket, venue: 'IIT Delhi', teamSize: '25',
    tags: ['Robocon', 'ABU'], accent: '#22d3ee',
  },
  {
    rank: 'TOP 5', year: '2024', date: 'Competition Season',
    title: 'Robocon India', subtitle: 'Grand Finalists',
    description: 'Reached the grand finale with our custom-built elephant robot and advanced throwing mechanism at IIT Delhi.',
    image: 'https://images.unsplash.com/photo-1620825937374-87fc1a6014dc?q=80&w=1200&auto=format&fit=crop',
    icon: Award, venue: 'IIT Delhi', teamSize: '22',
    tags: ['Robocon', 'Finalist'], accent: '#a78bfa',
  },
  {
    rank: 'TOP 10', year: '2023', date: 'IRoC-U',
    title: 'ISRO Robotics Challenge', subtitle: 'Global Top 10',
    description: "Ranked top 10 globally in ISRO's IRoC-U for planetary rover design and precision manipulation arm.",
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop',
    icon: Cpu, venue: 'ISRO / URSC', teamSize: '18',
    tags: ['ISRO', 'Rover'], accent: '#38bdf8',
  },
  {
    rank: 'IIT-B', year: '2022', date: 'E-Yantra Season',
    title: 'E-Yantra & Aero-Design', subtitle: 'IIT Bombay',
    description: "Autonomous UAVs with precision payload dropping at IIT Bombay's flagship robotics olympiad.",
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    icon: Zap, venue: 'IIT Bombay', teamSize: '15',
    tags: ['E-Yantra', 'UAV'], accent: '#34d399',
  },
  {
    rank: '2017', year: '2017', date: 'Foundation Year',
    title: 'Genesis of RTF', subtitle: 'Where it all began',
    description: "Passionate engineers at GCoEA laid the foundation for the college's most decorated technical club.",
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    icon: Flag, venue: 'GCoEA Amravati', teamSize: '12',
    tags: ['Foundation', 'Legacy'], accent: '#94a3b8',
  },
];

/* ═══════════════════════════════════════════════════════
   LAZY IMAGE
═══════════════════════════════════════════════════════ */
function LazyImage({ src, alt, style }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && !err && <div className="img-skeleton" style={{ position: 'absolute', inset: 0 }} />}
      <img
        src={src} alt={alt} loading="lazy" decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { setErr(true); setLoaded(true); }}
        style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.55s ease' }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TILT WRAPPER
═══════════════════════════════════════════════════════ */
function TiltCard({ className, style, children }) {
  const ref = useRef(null);
  const onMove = useCallback(e => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);
  return (
    <div ref={ref} className={className} style={{ ...style, transition: 'transform 0.12s ease, box-shadow 0.4s ease, border-color 0.4s ease' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SINGLE ACHIEVEMENT CARD  (image left / content right)
═══════════════════════════════════════════════════════ */
function AchCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = item.icon;
  const isGold = !!item.featured;
  const cardCls = `ach-card ${isGold ? 'ach-card-gold' : 'ach-card-cyan'}`;
  const cardNum = String(index + 1).padStart(2, '0');

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
    >
      <TiltCard className={cardCls}>
        <div style={{ display: 'grid', gridTemplateColumns: '45% 55%', minHeight: 340 }}>

          {/* ── LEFT: image ── */}
          <div style={{ position: 'relative', minHeight: 300 }}>
            <LazyImage
              src={item.image} alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.52) saturate(1.15)' }}
            />
            {/* Right-fade overlay so image bleeds into body */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 45%, rgba(3,8,18,0.98) 100%)' }} />
            {/* Accent tint */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${item.accent}18 0%, transparent 55%)` }} />
            {/* Scanlines */}
            <div className="scanlines" style={{ position: 'absolute', inset: 0 }} />

            {/* Hall of Fame pill (featured only) */}
            {item.hallLabel && (
              <div style={{
                position: 'absolute', top: 20, left: 20,
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.35)',
                borderRadius: 99, padding: '5px 13px',
              }}>
                <Trophy size={10} color="#fbbf24" />
                <span style={{ fontFamily: 'DM Sans', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fbbf24' }}>
                  {item.hallLabel}
                </span>
              </div>
            )}

            {/* Large ghost year */}
            <div style={{
              position: 'absolute', bottom: -8, left: 14,
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 'clamp(52px,6vw,84px)',
              color: item.accent, opacity: 0.055,
              lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>{item.year}</div>
          </div>

          {/* ── RIGHT: body ── */}
          <div style={{
            padding: '36px 36px 32px 32px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative', gap: 0,
          }}>

            {/* Rank label */}
            <div style={{
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: item.accent, marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ width: 26, height: 1, background: item.accent, opacity: 0.45 }} />
              {item.rank}
              <div style={{ width: 26, height: 1, background: item.accent, opacity: 0.45 }} />
            </div>

            {/* Icon + date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 11,
                background: `${item.accent}14`, border: `1px solid ${item.accent}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color={item.accent} />
              </div>
              <span style={{
                fontFamily: 'DM Sans', fontSize: 11,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: `${item.accent}99`,
              }}>{item.date}</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px,2.2vw,28px)', letterSpacing: '0.03em',
              color: '#f1f5f9', lineHeight: 1.2, marginBottom: 6,
            }}>{item.title}</h2>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500,
              color: `${item.accent}cc`, letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 16,
            }}>{item.subtitle}</p>

            {/* Description */}
            <p style={{
              fontFamily: 'DM Sans', fontSize: 14,
              color: 'rgba(148,163,184,0.78)', lineHeight: 1.82,
              marginBottom: 22, maxWidth: 400,
            }}>{item.description}</p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
              {item.tags.map(tag => (
                <span key={tag} className="badge"
                  style={{ borderColor: `${item.accent}28`, color: `${item.accent}cc`, background: `${item.accent}09` }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { I: MapPin,   l: item.venue },
                { I: Users,    l: `${item.teamSize} Members` },
                { I: Calendar, l: item.year },
              ].map(({ I, l }) => (
                <span key={l} className="meta-item">
                  <I size={11} color={`${item.accent}55`} />{l}
                </span>
              ))}
            </div>

            {/* Ghost index number bottom-right */}
            <div style={{
              position: 'absolute', bottom: 24, right: 28,
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 52, color: item.accent, opacity: 0.065,
              lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}>{cardNum}</div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   HORIZONTAL TIMELINE
═══════════════════════════════════════════════════════ */
function HorizontalTimeline({ activeIndex, onSelect }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: -16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 }}
      style={{ position: 'relative', marginBottom: 64 }}
    >
      {/* Background track */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        height: 1, transform: 'translateY(-50%)',
        background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.2) 10%, rgba(34,211,238,0.2) 90%, transparent)',
      }} />

      {/* Items */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        {achievements.map((a, i) => {
          const isActive = activeIndex === i;
          const isGold = !!a.featured;
          return (
            <div
              key={a.year}
              className={`htl-item${isActive ? ' active' : ''}`}
              onClick={() => onSelect(i)}
              style={{ gap: 8 }}
            >
              {/* Year label above dot */}
              <span className={`htl-year${isGold ? ' htl-year-gold' : ''}`}
                style={isActive ? { color: isGold ? 'rgba(251,191,36,1)' : 'rgba(34,211,238,0.95)' } : {}}>
                {a.year}
              </span>

              {/* Dot */}
              <div
                className={`htl-dot${isGold ? ' htl-dot-gold' : ''}`}
                style={isActive ? {
                  transform: 'scale(1.7)',
                  boxShadow: isGold
                    ? '0 0 22px rgba(251,191,36,0.85)'
                    : '0 0 18px rgba(34,211,238,0.75)',
                } : {}}
              />

              {/* Short title below dot */}
              <span className="htl-title"
                style={isActive ? { color: 'rgba(148,163,184,0.9)' } : {}}>
                {a.title.split(' ').slice(0, 3).join(' ')}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   STATS
═══════════════════════════════════════════════════════ */
const STATS = [
  { val: '9+',   label: 'Years Active'  },
  { val: '200+', label: 'Teams Beaten'  },
  { val: '6+',   label: 'Major Titles'  },
  { val: '30+',  label: 'Team Members'  },
];

function StatsRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 64 }}>
      {STATS.map((s, i) => (
        <motion.div key={s.label} className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1 + 0.2, duration: 0.55 }}
        >
          <div style={{
            fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
            fontSize: 'clamp(22px,2.8vw,32px)', color: '#22d3ee',
            lineHeight: 1, marginBottom: 6,
          }}>{s.val}</div>
          <div style={{
            fontFamily: 'DM Sans', fontSize: 10.5,
            color: 'rgba(148,163,184,0.5)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
export default function Achievement() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Scroll to card when timeline dot clicked
  const cardRefs = useRef([]);
  const handleSelect = (i) => {
    setActiveIdx(i);
    const el = cardRefs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Update active dot on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = cardRefs.current.indexOf(e.target);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    cardRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="hex-bg" style={{ minHeight: '100vh', position: 'relative' }}>

        {/* Subtle ambient top glow — matches site bg */}
        <div style={{
          position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 320, pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.045) 0%, transparent 65%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign: 'center', padding: '112px 24px 60px' }}>
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 0.9 }}
              style={{
                fontFamily: 'DM Sans', fontSize: 10.5, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: 'rgba(34,211,238,0.55)',
                display: 'block', marginBottom: 22,
              }}
            >// HALL OF FAME</motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
                fontSize: 'clamp(42px,7vw,82px)', letterSpacing: '0.07em',
                background: 'linear-gradient(135deg,#eafaff 0%,#22d3ee 30%,#38bdf8 60%,#a78bfa 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.05, marginBottom: 24,
              }}
            >ACHIEVEMENTS</motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{
                height: 1.5, width: 100, margin: '0 auto 24px',
                background: 'linear-gradient(90deg,transparent,#22d3ee,#a78bfa,transparent)',
                borderRadius: 99,
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                fontFamily: 'DM Sans', fontSize: 15.5,
                color: 'rgba(148,163,184,0.62)',
                maxWidth: 460, margin: '0 auto', lineHeight: 1.85, fontStyle: 'italic',
              }}
            >
              From a garage dream to national glory — every block a milestone, every year a battle won.
            </motion.p>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 110px' }}>

            <StatsRow />

            {/* ── HORIZONTAL TIMELINE ── */}
            <HorizontalTimeline activeIndex={activeIdx} onSelect={handleSelect} />

            {/* ── ALL ACHIEVEMENT CARDS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {achievements.map((item, i) => (
                <div key={item.title} ref={el => cardRefs.current[i] = el}>
                  <AchCard item={item} index={i} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}