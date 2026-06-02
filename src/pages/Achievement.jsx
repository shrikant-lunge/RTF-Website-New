import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Rocket, Flag, Award, Cpu, Zap, MapPin, Users, Calendar } from 'lucide-react';

import roboconTeamPhoto    from '../assets/achievements/robocon_results_table.png';
import iitIndoreTeam       from '../assets/achievements/iit_indore_team.png';
import lineFollowerRobots  from '../assets/achievements/line_follower_robots.png';
import gecaLineFollower    from '../assets/achievements/geca_line_follower.png';
import carvaanTrophy       from '../assets/achievements/carvaan_trophy.png';

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   GLOBAL STYLES
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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
  @keyframes tlDotPulseLight {
    0%,100% { box-shadow: 0 0 0 0 rgba(14,165,233,0.5); }
    50%      { box-shadow: 0 0 0 6px rgba(14,165,233,0.0); }
  }
  @keyframes tlDotPulseGoldLight {
    0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.5); }
    50%      { box-shadow: 0 0 0 8px rgba(251,191,36,0.0); }
  }

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  /* â”€â”€ DARK MODE bg â”€â”€ */
  .hex-bg { background-color: #010912; }

  /* â”€â”€ WHITE MODE bg â”€â”€ */
  .hex-bg-light {
    background:
      radial-gradient(circle at 50% 18%, rgba(14,165,233,0.15) 0%, rgba(14,165,233,0.07) 31%, transparent 58%),
      linear-gradient(180deg, #f8fbff 0%, #f6fbff 48%, #ffffff 100%);
    color: #0f172a;
  }
  .hex-bg-light::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(rgba(14,165,233,0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(14,165,233,0.055) 1px, transparent 1px),
      radial-gradient(circle, rgba(6,182,212,0.55) 0 1.5px, transparent 2px);
    background-size: 64px 64px, 64px 64px, 180px 180px;
    background-position: center top, center top, 28px 36px;
    opacity: 0.42;
    mask-image: linear-gradient(180deg, black 0%, rgba(0,0,0,0.75) 56%, transparent 100%);
  }

  /* â”€â”€ Shimmer skeleton â”€â”€ */
  .img-skeleton {
    background: linear-gradient(90deg,rgba(34,211,238,0.03) 0%,rgba(34,211,238,0.09) 50%,rgba(34,211,238,0.03) 100%);
    background-size:600px 100%;
    animation: shimmer 1.6s infinite linear;
  }
  .light .img-skeleton {
    background: linear-gradient(90deg,rgba(14,165,233,0.06) 0%,rgba(14,165,233,0.16) 50%,rgba(14,165,233,0.06) 100%);
    background-size:600px 100%;
  }

  /* â”€â”€ Tag badge â”€â”€ */
  .badge {
    display:inline-flex; align-items:center;
    padding:3px 10px; font-family:'DM Sans',sans-serif;
    font-size:9px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase;
    border-radius:5px; border:1px solid rgba(34,211,238,0.22);
    color:rgba(34,211,238,0.88); background:rgba(34,211,238,0.06); white-space:nowrap;
  }

  /* â”€â”€ Achievement card - DARK â”€â”€ */
  .ach-card {
    position: relative;
    background: linear-gradient(150deg,rgba(6,14,28,0.97) 0%,rgba(3,8,18,0.99) 100%);
    border-radius: 20px;
    overflow: hidden;
    transition: box-shadow 0.4s ease, border-color 0.4s ease;
    cursor: default;
  }
  .ach-card-cyan { border: 1px solid rgba(34,211,238,0.16); }
  .ach-card-cyan:hover {
    border-color: rgba(34,211,238,0.42);
    box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 0 50px rgba(34,211,238,0.07), inset 0 1px 0 rgba(34,211,238,0.08);
  }
  .ach-card-gold { border: 1px solid rgba(251,191,36,0.28); }
  .ach-card-gold:hover {
    border-color: rgba(251,191,36,0.55);
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(251,191,36,0.08), inset 0 1px 0 rgba(251,191,36,0.1);
  }

  /* â”€â”€ Achievement card - WHITE overrides â”€â”€ */
  .light .ach-card {
    background: linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(248,253,255,0.98) 100%);
    box-shadow: 0 18px 46px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.96);
    backdrop-filter: blur(14px);
  }
  .light .ach-card-cyan {
    border: 1px solid rgba(14,165,233,0.22);
  }
  .light .ach-card-cyan:hover {
    border-color: rgba(6,182,212,0.52);
    box-shadow: 0 24px 58px rgba(15,23,42,0.12), 0 0 34px rgba(14,165,233,0.13), inset 0 1px 0 rgba(255,255,255,1);
  }
  .light .ach-card-gold {
    border: 1px solid rgba(245,158,11,0.32);
  }
  .light .ach-card-gold:hover {
    border-color: rgba(245,158,11,0.58);
    box-shadow: 0 24px 58px rgba(15,23,42,0.12), 0 0 34px rgba(245,158,11,0.14), inset 0 1px 0 rgba(255,255,255,1);
  }

  /* â”€â”€ meta row â”€â”€ */
  .meta-item {
    display:flex; align-items:center; gap:5px;
    font-family:'DM Sans'; font-size:11px; color:rgba(148,163,184,0.6);
  }
  .light .meta-item { color: rgba(71,85,105,0.7); }

  /* â”€â”€ scan line texture (only dark) â”€â”€ */
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
  .light .scanlines { background-image: none; }

  /* â”€â”€ Stat card - DARK â”€â”€ */
  .stat-card {
    background:rgba(34,211,238,0.03); border:1px solid rgba(34,211,238,0.09);
    border-radius:14px; padding:22px 16px; text-align:center;
    transition:background 0.3s, border-color 0.3s, transform 0.3s;
  }
  .stat-card:hover {
    background:rgba(34,211,238,0.07); border-color:rgba(34,211,238,0.25);
    transform:translateY(-3px);
  }
  /* WHITE stat card */
  .light .stat-card {
    background: rgba(255,255,255,0.88);
    border: 1px solid rgba(14,165,233,0.2);
    box-shadow: 0 12px 30px rgba(15,23,42,0.055), inset 0 1px 0 rgba(255,255,255,0.92);
    backdrop-filter: blur(12px);
  }
  .light .stat-card:hover {
    background: rgba(240,253,254,0.94);
    border-color: rgba(6,182,212,0.48);
    box-shadow: 0 18px 40px rgba(15,23,42,0.09), 0 0 24px rgba(14,165,233,0.12);
    transform:translateY(-3px);
  }

  /* â”€â”€ Left vertical timeline â”€â”€ */
  .vtl-sidebar {
    position: fixed;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 20px 0;
  }
  .vtl-line {
    position: absolute;
    left: 50%;
    top: 20px;
    bottom: 20px;
    width: 1px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, transparent, rgba(34,211,238,0.25) 15%, rgba(34,211,238,0.25) 85%, transparent);
    z-index: 0;
  }
  .light .vtl-line {
    background: linear-gradient(180deg, transparent, rgba(14,165,233,0.3) 15%, rgba(14,165,233,0.3) 85%, transparent);
  }
  .vtl-item {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    padding: 10px 0;
    width: 140px;
  }
  .vtl-dot-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    flex-shrink: 0;
  }
  .vtl-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: rgba(34,211,238,0.75);
    border: 2px solid rgba(34,211,238,0.25);
    box-shadow: 0 0 8px rgba(34,211,238,0.35);
    transition: transform 0.2s, box-shadow 0.2s;
    animation: tlDotPulse 2.5s ease-in-out infinite;
    flex-shrink: 0;
  }
  .vtl-dot-gold {
    background: rgba(251,191,36,0.9);
    border-color: rgba(251,191,36,0.35);
    box-shadow: 0 0 12px rgba(251,191,36,0.45);
    animation: tlDotPulseGold 2s ease-in-out infinite;
  }
  .vtl-item:hover .vtl-dot,
  .vtl-item.active .vtl-dot {
    transform: scale(1.6);
    box-shadow: 0 0 16px rgba(34,211,238,0.75);
  }
  .vtl-item:hover .vtl-dot-gold,
  .vtl-item.active .vtl-dot-gold {
    transform: scale(1.6);
    box-shadow: 0 0 20px rgba(251,191,36,0.85);
  }
  .vtl-label {
    display: flex;
    flex-direction: column;
    gap: 1px;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.2s, transform 0.2s;
    pointer-events: none;
  }
  .vtl-item:hover .vtl-label,
  .vtl-item.active .vtl-label {
    opacity: 1;
    transform: translateX(0);
  }
  .vtl-year {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 8px;
    letter-spacing: 0.18em;
    color: rgba(34,211,238,0.9);
    white-space: nowrap;
  }
  .vtl-year-gold { color: rgba(251,191,36,1); }
  .vtl-title-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 9px;
    color: rgba(148,163,184,0.85);
    letter-spacing: 0.04em;
    white-space: nowrap;
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* light vtl overrides */
  .light .vtl-dot {
    background: rgba(14,165,233,0.85);
    border-color: rgba(14,165,233,0.3);
    box-shadow: 0 0 8px rgba(14,165,233,0.35);
    animation: tlDotPulseLight 2.5s ease-in-out infinite;
  }
  .light .vtl-dot-gold {
    background: rgba(251,191,36,0.9);
    border-color: rgba(251,191,36,0.35);
    box-shadow: 0 0 12px rgba(251,191,36,0.45);
    animation: tlDotPulseGoldLight 2s ease-in-out infinite;
  }
  .light .vtl-item:hover .vtl-dot,
  .light .vtl-item.active .vtl-dot {
    box-shadow: 0 0 16px rgba(14,165,233,0.75);
  }
  .light .vtl-item:hover .vtl-dot-gold,
  .light .vtl-item.active .vtl-dot-gold {
    box-shadow: 0 0 20px rgba(251,191,36,0.85);
  }
  .light .vtl-year { color: #0369a1; }
  .light .vtl-title-text { color: #334155; }

  /* Tooltip box */
  .vtl-tooltip {
    position: absolute;
    left: 28px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(3,8,18,0.92);
    border: 1px solid rgba(34,211,238,0.2);
    border-radius: 10px;
    width: 182px;
    max-width: calc(100vw - 72px);
    padding: 8px 12px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    white-space: normal;
    overflow-wrap: anywhere;
    backdrop-filter: blur(8px);
  }
  .vtl-item:hover .vtl-tooltip { opacity: 1; }
  .light .vtl-tooltip {
    background: rgba(255,255,255,0.98);
    border-color: rgba(14,165,233,0.3);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
`;

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DATA
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const achievements = [
  {
    featured: true, rank: 'JOINT AIR-1',
    year: '2026', date: 'March 2026',
    title: 'DD Robocon 2026', subtitle: 'Stage 1 — All India Rank 1',
    description: 'Secured Joint AIR-1 in Stage 1 of DD Robocon 2026 — "Kung Fu Quest" — by submitting detailed design documents for two coordinated robots (manual & autonomous) complete with CAD models and simulations for weapon assembly, KFS collection, and Tic-Tac-Toe arena placement.',
    image: roboconTeamPhoto,
    icon: Trophy, venue: 'National Level', teamSize: '30+',
    tags: ['DD Robocon', 'AIR-1', 'Autonomous', 'National'], accent: '#fbbf24',
    hallLabel: 'Hall of Fame',
  },
  {
    rank: 'TRIPLE AIR-1', year: '2026', date: 'March 2026',
    title: 'IIT Indore — Ingenium', subtitle: 'Three Gold Medals at Techfest',
    description: "Competed at IIT Indore's flagship Techfest Ingenium and swept all three events: AIR-1 in Aero Artistry (maximum unpowered glider flight time), AIR-1 in CV Obstacle Course (autonomous navigation via OpenCV on Raspberry Pi), and AIR-1 in Robo Soccer (small-bot football match).",
    image: iitIndoreTeam,
    icon: Award, venue: 'IIT Indore', teamSize: '25',
    tags: ['Aero Artistry', 'CV Obstacle', 'Robo Soccer', 'AIR-1'], accent: '#22d3ee',
  },
  {
    rank: 'AIR-1', year: '2026', date: 'March 2026',
    title: 'SGGSIET Nanded — Rmaggedon', subtitle: 'Line Follower — National Title',
    description: "Three teams from the Robo-Tech Forum competed in the national-level technical event Rmaggedon 2026 at SGGSIET, Nanded. One team claimed All India Rank 1 in the Line Follower event, reinforcing the club's dominance in precision autonomous robotics.",
    image: lineFollowerRobots,
    icon: Zap, venue: 'SGGSIET, Nanded', teamSize: '18',
    tags: ['Line Follower', 'AIR-1', 'Rmaggedon'], accent: '#a78bfa',
  },
  {
    rank: 'AIR-1 & 2', year: '2026', date: 'March 2026',
    title: 'GECA Sambhajinagar — Wings', subtitle: 'Line Follower — 1st & 2nd Place',
    description: "Two teams from the Robo-Tech Forum participated in the national-level Techfest Wings at GECA, Sambhajinagar. Both teams dominated the Line Follower competition, finishing AIR-1 and AIR-2 respectively and bringing dual national recognition to GCoEA.",
    image: gecaLineFollower,
    icon: Rocket, venue: 'GECA, Sambhajinagar', teamSize: '20',
    tags: ['Line Follower', 'AIR-1', 'AIR-2', 'Wings'], accent: '#38bdf8',
  },
  {
    rank: 'AIR-1 & 2', year: '2026', date: 'March 2026',
    title: 'GCOE Jalgaon — CARVAAN', subtitle: 'Line Follower — 1st & 2nd Place',
    description: "Two teams from the Robo-Tech Forum competed in the national-level Techfest CARVAAN at GCOE, Jalgaon, in the Line Follower competition. Both teams secured AIR-1 and AIR-2, completing a remarkable sweep of Line Follower events across multiple national venues in March 2026.",
    image: carvaanTrophy,
    icon: Cpu, venue: 'GCOE, Jalgaon', teamSize: '20',
    tags: ['Line Follower', 'AIR-1', 'AIR-2', 'CARVAAN'], accent: '#34d399',
  },
  {
    rank: '2017', year: '2017', date: 'Foundation Year',
    title: 'Genesis of RTF', subtitle: 'Where it all began',
    description: "Passionate engineers at GCoEA, Amravati laid the foundation for the college's most decorated technical club — the Robo-Tech Forum. From a garage dream to national glory, every block a milestone and every year a battle won.",
    image: roboconTeamPhoto,
    icon: Flag, venue: 'GCoEA Amravati', teamSize: '12',
    tags: ['Foundation', 'Legacy'], accent: '#94a3b8',
  },
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   LAZY IMAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   TILT WRAPPER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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
    <div ref={ref} className={className}
      style={{ ...style, transition: 'transform 0.12s ease, box-shadow 0.4s ease, border-color 0.4s ease' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SINGLE ACHIEVEMENT CARD
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function AchCard({ item, index, isLight }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = item.icon;
  const isGold = !!item.featured;
  const cardCls = `ach-card ${isGold ? 'ach-card-gold' : 'ach-card-cyan'}`;
  const cardNum = String(index + 1).padStart(2, '0');

  const titleColor   = isLight ? '#0b1224' : '#f1f5f9';
  const descColor    = isLight ? '#334155' : 'rgba(148,163,184,0.78)';
  const subtitleClr  = isLight ? '#047fa8' : `${item.accent}cc`;
  const metaClr      = isLight ? '#52637a' : 'rgba(148,163,184,0.6)';

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
    >
      <TiltCard className={cardCls}>
        <div style={{ display: 'grid', gridTemplateColumns: '45% 55%', minHeight: 340 }}>

          {/* â”€â”€ LEFT: image â”€â”€ */}
          <div style={{ position: 'relative', minHeight: 300 }}>
            <LazyImage
              src={item.image} alt={item.title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: isLight
                  ? 'brightness(1) saturate(1.05)'
                  : 'brightness(0.82) saturate(1.2)',
              }}
            />
            {/* Right-fade overlay (soft white) */}
            <div style={{
              position: 'absolute', inset: 0,
              background: isLight
                ? 'linear-gradient(90deg, transparent 18%, rgba(248,253,255,0.56) 58%, rgba(255,255,255,0.96) 100%)'
                : 'linear-gradient(90deg, transparent 45%, rgba(3,8,18,0.98) 100%)',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${item.accent}18 0%, transparent 55%)` }} />
            <div className="scanlines" style={{ position: 'absolute', inset: 0 }} />

            {item.hallLabel && (
              <div style={{
                position: 'absolute', top: 20, left: 20,
                display: 'flex', alignItems: 'center', gap: 6,
                background: isLight ? 'rgba(255,251,235,0.92)' : 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.45)',
                borderRadius: 99, padding: '5px 13px',
              }}>
                <Trophy size={10} color="#fbbf24" />
                <span style={{ fontFamily: 'DM Sans', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d97706' }}>
                  {item.hallLabel}
                </span>
              </div>
            )}

            <div style={{
              position: 'absolute', bottom: -8, left: 14,
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 'clamp(52px,6vw,84px)',
              color: item.accent, opacity: isLight ? 0.12 : 0.055,
              lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
            }}>{item.year}</div>
          </div>

          {/* â”€â”€ RIGHT: body â”€â”€ */}
          <div style={{
            padding: '36px 36px 32px 32px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative', gap: 0,
          }}>
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
                color: isLight ? `${item.accent}` : `${item.accent}99`,
              }}>{item.date}</span>
            </div>

            <h2 style={{
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 'clamp(18px,2.2vw,28px)', letterSpacing: '0.03em',
              color: titleColor, lineHeight: 1.2, marginBottom: 6,
            }}>{item.title}</h2>

            <p style={{
              fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500,
              color: subtitleClr, letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 16,
            }}>{item.subtitle}</p>

            <p style={{
              fontFamily: 'DM Sans', fontSize: 14,
              color: descColor, lineHeight: 1.82,
              marginBottom: 22, maxWidth: 400,
            }}>{item.description}</p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
              {item.tags.map(tag => (
                <span key={tag} className="badge"
                  style={{
                    borderColor: `${item.accent}${isLight ? '55' : '28'}`,
                    color: item.accent,
                    background: `${item.accent}${isLight ? '15' : '09'}`,
                  }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { I: MapPin,   l: item.venue },
                { I: Users,    l: `${item.teamSize} Members` },
                { I: Calendar, l: item.year },
              ].map(({ I, l }) => (
                <span key={l} className="meta-item" style={{ color: metaClr }}>
                  <I size={11} color={`${item.accent}55`} />{l}
                </span>
              ))}
            </div>

            <div style={{
              position: 'absolute', bottom: 24, right: 28,
              fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
              fontSize: 52, color: item.accent,
              opacity: isLight ? 0.12 : 0.065,
              lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}>{cardNum}</div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   LEFT VERTICAL TIMELINE SIDEBAR
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function VerticalTimeline({ activeIndex, onSelect, isLight }) {
  return (
    <div className="vtl-sidebar">
      <div className={isLight ? 'vtl-line light' : 'vtl-line'} />
      {achievements.map((a, i) => {
        const isActive = activeIndex === i;
        const isGold   = !!a.featured;
        const getShadow = () => {
          if (!isActive) return undefined;
          if (isGold) return '0 0 20px rgba(251,191,36,0.85)';
          return isLight
            ? '0 0 16px rgba(14,165,233,0.75)'
            : '0 0 16px rgba(34,211,238,0.75)';
        };
        return (
          <div
            key={a.year + a.title}
            className={`vtl-item${isActive ? ' active' : ''}${isLight ? ' light' : ''}`}
            onClick={() => onSelect(i)}
          >
            <div className="vtl-dot-wrap">
              <div
                className={`vtl-dot${isGold ? ' vtl-dot-gold' : ''}`}
                style={isActive ? { transform: 'scale(1.7)', boxShadow: getShadow() } : {}}
              />
            </div>
            <div className="vtl-tooltip">
              <div style={{
                fontFamily: "'Orbitron',sans-serif", fontWeight: 700,
                fontSize: 8, letterSpacing: '0.18em',
                color: isGold ? '#fbbf24' : (isLight ? '#0284c7' : '#22d3ee'),
                marginBottom: 2,
              }}>{a.year}</div>
              <div style={{
                fontFamily: 'DM Sans', fontSize: 10,
                color: isLight ? '#334155' : 'rgba(148,163,184,0.9)',
                lineHeight: 1.35,
                whiteSpace: 'normal',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
              }}>{a.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   STATS ROW
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const STATS = [
  { val: '5+',   label: 'Events Won (Mar)'  },
  { val: '7',    label: 'AIR-1 Titles'      },
  { val: '3',    label: 'Venues Swept'      },
  { val: '30+',  label: 'Team Members'      },
];

function StatsRow({ isLight }) {
  const ref    = useRef(null);
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
            fontSize: 'clamp(22px,2.8vw,32px)',
            color: isLight ? '#0284c7' : '#22d3ee',
            lineHeight: 1, marginBottom: 6,
          }}>{s.val}</div>
          <div style={{
            fontFamily: 'DM Sans', fontSize: 10.5,
            color: isLight ? '#475569' : 'rgba(148,163,184,0.5)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ROOT COMPONENT
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function Achievement({ lightMode }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [detectedLightMode, setDetectedLightMode] = useState(false);

  const readLightMode = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;

    const root = document.documentElement;
    const body = document.body;
    const themeText = [
      root.className,
      body?.className,
      root.dataset.theme,
      body?.dataset.theme,
      root.dataset.mode,
      body?.dataset.mode,
    ].filter(Boolean).join(' ').toLowerCase();

    const storedTheme = [
      window.localStorage.getItem('theme'),
      window.localStorage.getItem('color-theme'),
      window.localStorage.getItem('mode'),
    ].filter(Boolean).join(' ').toLowerCase();

    if (themeText.includes('light') || storedTheme.includes('light')) return true;
    if (themeText.includes('dark') || storedTheme.includes('dark')) return false;

    return window.matchMedia?.('(prefers-color-scheme: light)').matches ?? false;
  }, []);

  const isLight = typeof lightMode === 'boolean' ? lightMode : detectedLightMode;

  const cardRefs = useRef([]);
  const handleSelect = (i) => {
    setActiveIdx(i);
    const el = cardRefs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    const syncMode = () => setDetectedLightMode(readLightMode());
    syncMode();

    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const observer = new MutationObserver(syncMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'data-mode'] });
    if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme', 'data-mode'] });

    window.addEventListener('storage', syncMode);
    return () => {
      observer.disconnect();
      window.removeEventListener('storage', syncMode);
    };
  }, [readLightMode]);

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

  const bgClass   = isLight ? 'hex-bg-light' : 'hex-bg';
  const modeClass = isLight ? 'light' : '';

  const taglineColor = isLight ? '#087ea4' : 'rgba(34,211,238,0.55)';
  const subtitleClr  = isLight ? '#405167' : 'rgba(148,163,184,0.62)';

  return (
    <>
      <style>{STYLES}</style>
      <div className={`${bgClass} ${modeClass}`} style={{ minHeight: '100vh', position: 'relative', backgroundColor: isLight ? '#f8fbff' : '#010912' }}>

        {/* No ambient glow in white mode */}
        {!isLight && (
          <div style={{
            position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: 900, height: 320, pointerEvents: 'none', zIndex: 1,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.045) 0%, transparent 65%)',
          }} />
        )}

        <VerticalTimeline activeIndex={activeIdx} onSelect={handleSelect} isLight={isLight} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', padding: '112px 24px 60px' }}>
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 0.9 }}
              style={{
                fontFamily: 'DM Sans', fontSize: 10.5, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: taglineColor,
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
                lineHeight: 1.05, marginBottom: 24,
              }}
            >
              <span style={{
                display: 'inline-block',
                backgroundImage: isLight
                  ? 'linear-gradient(135deg,#111827 0%,#0f172a 34%,#0891b2 68%,#4f46e5 100%)'
                  : 'linear-gradient(135deg,#eafaff 0%,#22d3ee 30%,#38bdf8 60%,#a78bfa 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}>
                ACHIEVEMENTS
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{
                height: 1.5, width: 100, margin: '0 auto 24px',
                background: isLight
                  ? 'linear-gradient(90deg,transparent,#06b6d4,#4f46e5,transparent)'
                  : 'linear-gradient(90deg,transparent,#22d3ee,#a78bfa,transparent)',
                borderRadius: 99,
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                fontFamily: 'DM Sans', fontSize: 15.5,
                color: subtitleClr,
                maxWidth: 460, margin: '0 auto', lineHeight: 1.85, fontStyle: 'italic',
              }}
            >
              From a garage dream to national glory — every block a milestone, every year a battle won.
            </motion.p>
          </div>

          <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 110px' }}>
            <StatsRow isLight={isLight} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {achievements.map((item, i) => (
                <div key={item.title} ref={el => cardRefs.current[i] = el}>
                  <AchCard item={item} index={i} isLight={isLight} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}