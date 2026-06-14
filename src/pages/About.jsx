import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import NeoButton from '../components/ui/NeoButton';
import StatCounter from '../components/ui/StatCounter';
import { stats, competitions } from '../data/stats';

const values = [
  {
    title: 'We Learn',
    description:
      'Every member starts from scratch — Arduino workshops, SolidWorks training, ROS bootcamps. No prior experience required, just curiosity.',
  },
  {
    title: 'We Create',
    description:
      'From Robocon competition bots to ISRO rovers and VTOL aircraft — we design, fabricate, and program real engineering systems.',
  },
  {
    title: 'We Teach',
    description:
      'Seniors mentor juniors. Knowledge transfers through workshops, documentation, and hands-on lab sessions — creating a self-sustaining cycle of innovation.',
  },
];

const domains = [
  { name: 'Mechanical Design & CAD', description: 'SolidWorks, CNC machining, 3D printing, sheet metal fabrication' },
  { name: 'Electronics & Embedded', description: 'Arduino, STM32, PCB design, motor drivers, sensor integration' },
  { name: 'Aero & Drone Systems', description: 'Quadcopters, VTOL, RC planes, Pixhawk, ArduPilot, FPV' },
  { name: 'Software & AI', description: 'ROS/ROS2, Python, OpenCV, path planning, SLAM, inverse kinematics' },
];

export default function About() {
  const [heroRef, heroInView] = useScrollAnimation(0.2);
  const [missionRef, missionInView] = useScrollAnimation(0.2);
  const [statsRef, statsInView] = useScrollAnimation(0.2);
  const [valuesRef, valuesInView] = useScrollAnimation();
  const [livingRef, livingInView] = useScrollAnimation(0.2);
  const [domainsRef, domainsInView] = useScrollAnimation();
  const [compRef, compInView] = useScrollAnimation();
  const [ctaRef, ctaInView] = useScrollAnimation(0.2);

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24"
    >
      {/* ═══════════════════════════════════════════════
          HERO — Large Title
          ═══════════════════════════════════════════════ */}
      <section className="relative mb-24 md:mb-32">
        <div ref={heroRef} className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-text-heading tracking-tight leading-[1] mb-8">
              The Robo-Tech{' '}
              <span className="text-gradient-red">Forum</span>
            </h1>
            <p className="text-lg md:text-xl text-text-body font-light leading-relaxed max-w-3xl mx-auto">
              Founded in {stats.founded} at Government College of Engineering, Amravati — we are a student-driven technical community dedicated to fostering innovation through hands-on robotics, embedded systems, and aero engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MISSION
          ═══════════════════════════════════════════════ */}
      <section className="mb-24 md:mb-32">
        <div ref={missionRef} className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={missionInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-heading tracking-tight leading-[1.15] max-w-4xl">
                We're on a mission to empower students to{' '}
                <span className="text-gradient-red">build real-world</span>{' '}
                engineering systems and compete at the highest level.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <motion.div variants={fadeUp}>
                <h3 className="text-xl font-display font-semibold text-text-heading mb-6">
                  Why hands-on engineering?
                </h3>
                <div className="space-y-6 text-text-body font-light leading-relaxed">
                  <p>
                    <strong className="text-text-heading font-medium">For the individual,</strong> hands-on robotics means learning by doing — soldering circuits, debugging code, machining parts. Students gain skills that textbooks alone can never teach. The ability to design, prototype, and iterate builds confidence that carries far beyond the workshop.
                  </p>
                  <p>
                    <strong className="text-text-heading font-medium">For the college,</strong> having an active, competition-driven robotics club elevates the institution's technical profile. RTF members consistently represent GCoEA at IIT Bombay, ISRO, and national-level stages — showcasing that world-class engineering talent comes from every campus.
                  </p>
                  <p>
                    <strong className="text-text-heading font-medium">For the industry,</strong> students trained in real hardware, embedded systems, and team-based engineering projects become immediately productive. Our alumni work at leading tech companies and research labs, carrying forward the maker mindset.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-xl font-display font-semibold text-text-heading mb-6">
                  It's more urgent than ever to rethink how engineering is taught.
                </h3>
                <div className="space-y-6 text-text-body font-light leading-relaxed">
                  <p>
                    We're here to reimagine the way engineering education works, and make it more accessible. Our model allows anyone — regardless of branch or year — to dive into robotics, aero systems, and intelligent machines.
                  </p>
                  <p>
                    Traditional engineering curricula often separate theory from practice. At RTF, we bridge that gap. Instead of waiting for lab sessions, our members get immediate access to components, tools, and mentorship. This means first-year students can start building from day one.
                  </p>
                  <p>
                    In practice, we build everything ourselves: competition robots capable of autonomous navigation, drones with custom flight controllers, and embedded systems powering real-world solutions — from breadboards to national stages, built by students.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="h-px bg-border/50" />
      </div>

      {/* ═══════════════════════════════════════════════
          STATS ROW
          ═══════════════════════════════════════════════ */}
      <section className="mb-24 md:mb-32">
        <motion.div
          ref={statsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto px-6 md:px-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <motion.div variants={fadeUp} className="text-center">
              <StatCounter end={stats.projects} label="Projects Built" suffix="+" />
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <StatCounter end={stats.competitions} label="Competitions" suffix="+" />
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <StatCounter end={stats.members} label="Active Members" suffix="+" />
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <StatCounter end={new Date().getFullYear() - stats.founded} label="Years Strong" suffix="+" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="h-px bg-border/50" />
      </div>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY / VALUES
          ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-heading mb-6">
            What Drives{' '}
            <span className="text-gradient-red">Us</span>
          </h2>
          <p className="text-text-body font-light max-w-3xl text-lg">
            The core principles that drive our community forward.
          </p>
        </div>
        <motion.div
          ref={valuesRef}
          variants={staggerContainer}
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {values.map((v) => (
            <motion.div key={v.title} variants={fadeUp}>
              <h3 className="font-display font-semibold text-text-heading text-xl mb-4">
                {v.title}
              </h3>
              <p className="text-text-body leading-relaxed font-light">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          "LIVING IT"
          ═══════════════════════════════════════════════ */}
      <section className="mb-24 md:mb-32">
        <div ref={livingRef} className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={livingInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-heading tracking-tight">
                Living It
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <motion.div variants={fadeUp}>
                <h3 className="text-xl font-display font-semibold text-text-heading mb-6">
                  We are a fully student-run team that works every day to make engineering accessible and hands-on.
                </h3>
                <div className="space-y-6 text-text-body font-light leading-relaxed">
                  <p>
                    Our team operates across multiple domains — mechanical, electronics, software, and aero — yet works side by side. Every major project involves cross-functional collaboration, mirroring how professional engineering teams operate in industry.
                  </p>
                  <p>
                    We don't wait for permission to innovate. When a competition is announced, our members self-organize into teams, assign roles, set deadlines, and start building within days. This autonomy is what makes RTF unique.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="space-y-6 text-text-body font-light leading-relaxed mt-1 lg:mt-0">
                  <p>
                    Our workspace at GCoEA is open to members throughout the day. It's equipped with 3D printers, soldering stations, CNC machines, oscilloscopes, and a library of components — everything needed to go from idea to prototype.
                  </p>
                  <p>
                    Everyone in our team enjoys the immense benefits that a hands-on engineering culture brings, and not by forcing members into rigid schedules — but because they genuinely want to build.
                  </p>
                  <p>
                    We choose to work from the workshop because that's where ideas become machines, where circuits come alive, and where a group of students becomes an engineering team.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TECHNICAL DOMAINS
          ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-heading mb-6">Technical Domains</h2>
          <p className="text-text-body font-light text-lg">Our expertise spans across four core engineering areas.</p>
        </div>
        <motion.div
          ref={domainsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={domainsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-12"
        >
          {domains.map((d) => (
            <motion.div key={d.name} variants={fadeUp}>
              <h3 className="font-display font-semibold text-text-heading text-xl mb-4">
                {d.name}
              </h3>
              <p className="text-text-body leading-relaxed font-light">{d.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          COMPETITIONS
          ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-heading mb-6">National Competitions</h2>
          <p className="text-text-body font-light text-lg">Where we put our skills to the test.</p>
        </div>
        <motion.div
          ref={compRef}
          variants={staggerContainer}
          initial="hidden"
          animate={compInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {competitions.map((c) => (
            <motion.div key={c.id} variants={fadeUp}>
              <h3 className="font-display font-semibold text-text-heading text-xl mb-2">
                {c.name}
              </h3>
              <p className="text-sm font-mono text-text-muted mb-4">{c.organizer} • {c.year}</p>
              <p className="text-text-body leading-relaxed font-light">{c.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
        >
          <div className="relative text-center bg-surface/40 border border-border/50 rounded-3xl p-10 md:p-14 max-w-4xl mx-auto overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-heading mb-4">
              Want to be part of the{' '}
              <span className="text-gradient-red">journey</span>?
            </h2>
            <p className="text-text-body max-w-lg mx-auto mb-8 font-light">
              We are passionate about our work and love to connect with people who want to shape the future of engineering. We recruit new members every academic year — no prior experience required.
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
        </motion.div>
      </section>
    </motion.main>
  );
}