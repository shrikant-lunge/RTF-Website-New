import { motion } from 'framer-motion';
import { pageTransition, fadeUp, fadeLeft, fadeRight, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import NeoButton from '../components/ui/NeoButton';
import StatCounter from '../components/ui/StatCounter';
import { Cpu, Wrench, GraduationCap, Target, Trophy, Rocket, Lightbulb, Palette, Cog, Users, FolderOpen, Star, UserCheck, Award } from 'lucide-react';
import { stats, competitions } from '../data/stats';

/* ── images ── */
import heroImg from '../assets/img/Robocon 2025/20250713_181824.webp';
import teamImg from '../assets/img/College Programs/20241012_085453.webp';

const values = [
  {
    icon: GraduationCap,
    title: 'We Learn',
    description:
      'Every member starts from scratch — Arduino workshops, SolidWorks training, ROS bootcamps. No prior experience required, just curiosity.',
  },
  {
    icon: Wrench,
    title: 'We Create',
    description:
      'From Robocon competition bots to ISRO rovers and VTOL aircraft — we design, fabricate, and program real engineering systems.',
  },
  {
    icon: Cpu,
    title: 'We Teach',
    description:
      'Seniors mentor juniors. Knowledge transfers through workshops, documentation, and hands-on lab sessions — creating a self-sustaining cycle of innovation.',
  },
];

const domains = [
  { icon: Target, name: 'Mechanical Design & CAD', description: 'SolidWorks, CNC machining, 3D printing, sheet metal fabrication' },
  { icon: Cpu, name: 'Electronics & Embedded', description: 'Arduino, STM32, PCB design, motor drivers, sensor integration' },
  { icon: Rocket, name: 'Aero & Drone Systems', description: 'Quadcopters, VTOL, RC planes, Pixhawk, ArduPilot, FPV' },
  { icon: Trophy, name: 'Software & AI', description: 'ROS/ROS2, Python, OpenCV, path planning, SLAM, inverse kinematics' },
];

const highlights = [
  { icon: Lightbulb, title: 'Innovation', description: 'Pioneering solutions that push the boundaries of robotics engineering.' },
  { icon: Palette, title: 'Modern Design', description: 'Sleek, functional designs that merge form with performance.' },
  { icon: Cog, title: 'Engineering Excellence', description: 'Precision-built systems from concept to competition.' },
  { icon: Users, title: 'Team Spirit', description: 'Collaborative culture where every member\'s voice matters.' },
];

function MinimalCard({ children, className = '' }) {
  return (
    <div className={`p-8 h-full bg-surface/50 border border-border rounded-2xl hover:bg-elevated/80 hover:border-[var(--bg-border)] transition-all duration-300 flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export default function About() {
  const [heroRef, heroInView] = useScrollAnimation(0.2);
  const [highlightsRef, highlightsInView] = useScrollAnimation(0.2);
  const [statsRef, statsInView] = useScrollAnimation(0.2);
  const [valuesRef, valuesInView] = useScrollAnimation();
  const [domainsRef, domainsInView] = useScrollAnimation();
  const [compRef, compInView] = useScrollAnimation();

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24"
    >
      {/* ═══════════════════════════════════════════════
          SECTION 1 — "WHO ARE WE?" Hero
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mb-24 md:mb-32">
        {/* Large faded background letter */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="text-[20rem] md:text-[30rem] font-display font-black leading-none text-text-heading/[0.02] dark:text-white/[0.02]">
            R
          </span>
        </div>

        <div ref={heroRef} className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-[0.25em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-6 uppercase">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6 tracking-tight leading-[1.1]">
                WHO ARE{' '}
                <span className="text-gradient-red inline-block">WE?</span>
              </h1>
              <p className="text-base md:text-lg text-text-body leading-relaxed font-light mb-8 max-w-xl">
                Founded in 2014, The Robo-Tech Forum (RTF) is the premier robotics club at Government College of Engineering, Amravati. We are a student-driven technical club dedicated to fostering innovation through hands-on robotics, embedded systems, and aero engineering.
              </p>
              <p className="text-sm text-text-muted leading-relaxed font-light max-w-xl">
                From national-level competitions like DD Robocon and E-Yantra to ISRO's IRoC-U challenge — our members design, build, and compete with cutting-edge robotic systems.
              </p>
            </motion.div>

            {/* Right — Artistic Photo */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-400/20 via-cyan-500/10 to-transparent rounded-3xl blur-2xl" />
                {/* Main image */}
                <div className="relative w-72 h-80 md:w-80 md:h-96 lg:w-[22rem] lg:h-[28rem] rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-2xl">
                  <img
                    src={heroImg}
                    alt="RTF Team at Robocon 2025"
                    className="w-full h-full object-cover"
                  />
                  {/* Red gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Accent border glow */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-400/20" />
                </div>
                {/* Decorative corner accent */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-cyan-400/40 rounded-br-2xl" />
                <div className="absolute -top-3 -left-3 w-24 h-24 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — Feature Highlights (like reference)
          ═══════════════════════════════════════════════ */}
      <section className="mb-24 md:mb-32">
        <motion.div
          ref={highlightsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={highlightsInView ? 'visible' : 'hidden'}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative p-6 rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,68,68,0.1)]"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/15 to-cyan-500/5 border border-cyan-400/20 flex items-center justify-center mb-5 group-hover:border-cyan-400/40 transition-colors duration-300">
                  <item.icon size={24} className="text-cyan-400" />
                </div>
                <h3 className="font-display font-semibold text-text-heading text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-body leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — Stats Counter Row (like reference bottom)
          ═══════════════════════════════════════════════ */}
      <section className="mb-24 md:mb-32">
        <div className="relative">
          {/* Subtle divider line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <motion.div
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            className="max-w-6xl mx-auto px-6 md:px-12 pt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {/* Each stat with icon above */}
              <motion.div variants={fadeUp} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-surface/60 border border-border/60 flex items-center justify-center">
                  <FolderOpen size={24} className="text-cyan-400" />
                </div>
                <StatCounter end={stats.projects} label="Projects Built" suffix="+" />
              </motion.div>

              <motion.div variants={fadeUp} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-surface/60 border border-border/60 flex items-center justify-center">
                  <Star size={24} className="text-cyan-400" />
                </div>
                <StatCounter end={stats.competitions} label="Competitions" suffix="+" />
              </motion.div>

              <motion.div variants={fadeUp} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-surface/60 border border-border/60 flex items-center justify-center">
                  <UserCheck size={24} className="text-cyan-400" />
                </div>
                <StatCounter end={stats.members} label="Active Members" suffix="+" />
              </motion.div>

              <motion.div variants={fadeUp} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-surface/60 border border-border/60 flex items-center justify-center">
                  <Award size={24} className="text-cyan-400" />
                </div>
                <StatCounter end={new Date().getFullYear() - stats.founded} label="Years Strong" suffix="+" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom divider line */}
          <div className="mt-16 mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — Philosophy (Values)
          ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-[0.25em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-6 uppercase">
            Our Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-heading mb-4">
            What Drives{' '}
            <span className="text-gradient-red">Us</span>
          </h2>
          <p className="text-text-body font-light max-w-2xl mx-auto">The core principles that drive our community forward.</p>
        </div>
        <motion.div
          ref={valuesRef}
          variants={staggerContainer}
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {values.map((v) => (
            <motion.div key={v.title} variants={fadeUp} className="h-full">
              <MinimalCard>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/15 to-cyan-500/5 border border-cyan-400/20 flex items-center justify-center mb-6 text-cyan-400">
                  <v.icon size={22} />
                </div>
                <h3 className="font-display font-semibold text-text-heading text-xl mb-3">
                  {v.title}
                </h3>
                <p className="text-text-body leading-relaxed font-light">{v.description}</p>
              </MinimalCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — Team Photo + Description
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mb-24 md:mb-32">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="text-[15rem] md:text-[22rem] font-display font-black leading-none text-text-heading/[0.02] dark:text-white/[0.02]">
            T
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Photo */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative flex justify-center lg:justify-start order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/15 via-cyan-500/5 to-transparent rounded-3xl blur-2xl" />
                <div className="relative w-full max-w-md h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden border-2 border-cyan-400/20 shadow-2xl">
                  <img
                    src={teamImg}
                    alt="RTF Team at College Programs"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-400/10" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-20 h-20 border-l-2 border-b-2 border-cyan-400/30 rounded-bl-2xl" />
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-[0.25em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-6 uppercase">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-heading mb-6 tracking-tight">
                Built by{' '}
                <span className="text-gradient-red">Students</span>,{' '}
                for the Future
              </h2>
              <p className="text-base text-text-body leading-relaxed font-light mb-6">
                Our team comprises passionate engineering students from mechanical, electrical, computer science, and electronics backgrounds. Together, we bring diverse skills to tackle complex robotics challenges.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Wrench size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-text-heading text-sm">Hands-On</h4>
                    <p className="text-xs text-text-muted font-light">Real hardware, real builds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-text-heading text-sm">Mentorship</h4>
                    <p className="text-xs text-text-muted font-light">Seniors guide juniors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Target size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-text-heading text-sm">Goal-Driven</h4>
                    <p className="text-xs text-text-muted font-light">Competition-focused work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Rocket size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-text-heading text-sm">Innovation</h4>
                    <p className="text-xs text-text-muted font-light">Push technical limits</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — Technical Domains
          ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-[0.25em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-6 uppercase">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-heading mb-4">Technical Domains</h2>
          <p className="text-text-body font-light">Our expertise spans across four core engineering areas.</p>
        </div>
        <motion.div
          ref={domainsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={domainsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {domains.map((d) => (
            <motion.div key={d.name} variants={fadeUp} className="h-full">
              <MinimalCard className="flex-row items-start gap-5 p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/15 to-cyan-500/5 border border-cyan-400/20 flex items-center justify-center shrink-0 text-cyan-400">
                  <d.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-text-heading text-lg mb-2">
                    {d.name}
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed font-light">{d.description}</p>
                </div>
              </MinimalCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7 — Competitions
          ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-[0.25em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-6 uppercase">
            Competitions
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-heading mb-4">National Competitions</h2>
          <p className="text-text-body font-light">Where we put our skills to the test.</p>
        </div>
        <motion.div
          ref={compRef}
          variants={staggerContainer}
          initial="hidden"
          animate={compInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {competitions.map((c) => (
            <motion.div key={c.id} variants={fadeUp} className="h-full">
              <MinimalCard>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-[11px] font-mono font-medium tracking-wider uppercase bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-full">
                    {c.year}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-text-heading text-lg mb-1">
                  {c.name}
                </h3>
                <p className="text-xs font-mono text-text-muted mb-4">{c.organizer}</p>
                <p className="text-sm text-text-body leading-relaxed font-light mt-auto">{c.description}</p>
              </MinimalCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 8 — CTA
          ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        <div className="relative text-center bg-surface/40 border border-border/50 rounded-3xl p-10 md:p-14 max-w-4xl mx-auto overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-heading mb-4">Join the Team</h2>
          <p className="text-text-body max-w-lg mx-auto mb-8 font-light">
            We recruit new members every academic year. No prior experience required — just a willingness to learn and build.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NeoButton to="/contact" arrow>
              GET IN TOUCH
            </NeoButton>
            <NeoButton to="/projects" variant="secondary" arrow>
              SEE OUR WORK
            </NeoButton>
          </div>
        </div>
      </section>
    </motion.main>
  );
}