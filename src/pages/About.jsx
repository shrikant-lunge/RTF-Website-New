import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import NeoButton from '../components/ui/NeoButton';
import StatCounter from '../components/ui/StatCounter';
import { Cpu, Wrench, GraduationCap, Target, Trophy, Rocket } from 'lucide-react';
import { stats, competitions } from '../data/stats';

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

function MinimalCard({ children, className = '' }) {
  return (
    <div className={`p-8 h-full bg-surface/50 border border-border rounded-2xl hover:bg-elevated/80 hover:border-[var(--bg-border)] transition-all duration-300 flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export default function About() {
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
      className="pt-28 pb-24 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto mb-20 mt-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 text-xs font-mono tracking-widest text-text-muted bg-elevated/50 border border-border rounded-full mb-6"
        >
          ABOUT RTF
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-8 tracking-tight"
        >
          Where Theory Meets Practice
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-text-body leading-relaxed font-light"
        >
          Founded in 2014, The Robo-Tech Forum (RTF) is the premier robotics club at Government College of Engineering, Amravati. We are a student-driven technical club dedicated to fostering innovation through hands-on robotics, embedded systems, and aero engineering.
        </motion.p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-32">
        <div className="text-center p-6 bg-surface/40 rounded-2xl border border-border/50">
          <StatCounter end={stats.members} label="Active Members" suffix="+" />
        </div>
        <div className="text-center p-6 bg-surface/40 rounded-2xl border border-border/50">
          <StatCounter end={stats.projects} label="Projects Built" suffix="+" />
        </div>
        <div className="text-center p-6 bg-surface/40 rounded-2xl border border-border/50">
          <StatCounter end={stats.competitions} label="Competitions" suffix="+" />
        </div>
        <div className="text-center p-6 bg-surface/40 rounded-2xl border border-border/50">
          <StatCounter end={new Date().getFullYear() - stats.founded} label="Years Strong" suffix="+" />
        </div>
      </div>

      {/* Values */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-heading mb-4">Our Philosophy</h2>
          <p className="text-text-body font-light">The core principles that drive our community.</p>
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
                <div className="w-12 h-12 rounded-xl bg-elevated border border-border flex items-center justify-center mb-6 text-text-secondary">
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
      </div>

      {/* Technical Domains */}
      <div className="mb-32">
        <div className="text-center mb-16">
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
                <div className="w-12 h-12 rounded-xl bg-elevated border border-border flex items-center justify-center shrink-0 text-text-secondary">
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
      </div>

      {/* Competitions */}
      <div className="mb-32">
        <div className="text-center mb-16">
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
                  <span className="px-3 py-1 text-[11px] font-mono font-medium tracking-wider uppercase bg-elevated text-text-secondary border border-border rounded-full">
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
      </div>

      {/* CTA */}
      <div className="text-center bg-surface/40 border border-border/50 rounded-3xl p-10 md:p-14 max-w-4xl mx-auto">
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
    </motion.main>
  );
}