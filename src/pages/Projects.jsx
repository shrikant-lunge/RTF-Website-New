import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Users, Trophy, Search, AlertTriangle, RefreshCw } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { pageTransition, staggerContainer, slideInRight } from '../lib/animations';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';
import { getDetailImage } from '../lib/cloudinary';

export default function Projects() {
  const loading = false;
  const error = null;
  const refetch = () => {};
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  // Derived filter categories from projects
  const uniqueCategories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['ALL', ...Array.from(cats)].filter(c => c !== 'OTHER');
  }, [projects]);

  // Keep ALL first and preserve the preferred order for known categories,
  // while still rendering any additional categories coming from the CMS.
  const preferredCategoryOrder = ['ALL', 'ROBOTICS', 'ELECTRONICS', 'AI/ML', 'AUTOMATION', 'SOFTWARE'];
  const allCategories = useMemo(() => {
    const orderedKnownCategories = preferredCategoryOrder.filter(c => uniqueCategories.includes(c));
    const additionalCategories = uniqueCategories.filter(c => !preferredCategoryOrder.includes(c));
    return [...orderedKnownCategories, ...additionalCategories];
  }, [uniqueCategories]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { ALL: projects.length };
    projects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = activeCategory === 'ALL' || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const openProject = useCallback((project) => {
    setImageIndex(0);
    setSelectedProject(project);
  }, []);

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24 px-6 min-h-screen"
    >
      <SectionHeader
        label="// OUR PORTFOLIO"
        title="Projects"
        subtitle="From autonomous rovers to competition-winning robots — explore projects built by RTF engineers."
      />

      {/* Error state with fallback indicator */}
      {error && projects.length > 0 && (
        <div className="max-w-7xl mx-auto mb-6 bg-cyan-900/20 border border-cyan-800/50 rounded p-3 flex justify-center text-xs font-mono text-cyan-300">
          Showing offline fallback data
        </div>
      )}

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">

          {/* Search Bar */}
          <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D1520] border border-[#1E2D42] text-[#F1F5F9] font-mono text-[13px] py-[10px] pr-4 pl-10 rounded-md focus:outline-none focus:border-[#22D3EE] focus:ring-[3px] focus:ring-[rgba(34,211,238,0.1)] transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {(allCategories.length > 1 ? allCategories : ['ALL']).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-[18px] py-[8px] text-[11px] font-mono tracking-[0.1em] rounded-[4px] border transition-all duration-200 ${activeCategory === cat
                  ? 'bg-[rgba(34,211,238,0.1)] text-[#22D3EE] border-[#22D3EE] shadow-[0_0_16px_rgba(34,211,238,0.1)]'
                  : 'bg-transparent text-[#475569] border-[#1E2D42] hover:text-[#94A3B8] hover:border-[rgba(34,211,238,0.3)]'
                  }`}
              >
                {cat} ({categoryCounts[cat] || 0})
              </button>
            ))}
          </div>

        </div>

        {/* Results count text */}
        {!loading && projects.length > 0 && (
          <div className="text-[12px] font-mono text-[#475569] mb-4">
            Showing {filtered.length} of {projects.length} projects
          </div>
        )}
      </div>

      {loading ? (
        // Loading State: Skeletons
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0D1520] rounded-xl border border-[#1E2D42] h-[400px] overflow-hidden flex flex-col">
              <div
                className="h-[200px] w-full relative"
                style={{
                  background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite linear'
                }}
              />
              <div className="p-5 flex flex-col flex-1 gap-4">
                <div
                  className="h-[20px] w-[70%] rounded-[4px]"
                  style={{
                    background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite linear'
                  }}
                />
                <div className="flex flex-col gap-2">
                  <div
                    className="h-[14px] w-[90%] rounded-[2px]"
                    style={{
                      background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite linear'
                    }}
                  />
                  <div
                    className="h-[14px] w-[60%] rounded-[2px]"
                    style={{
                      background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite linear'
                    }}
                  />
                </div>
                <div className="flex gap-2 mt-auto">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-[20px] w-[50px] rounded-[3px]"
                      style={{
                        background: 'linear-gradient(90deg, #0D1520 0%, #141E2E 50%, #0D1520 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite linear'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error && projects.length === 0 ? (
        // Error state (no fallback data)
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-[#0D1520] border border-[#1E2D42] max-w-2xl mx-auto">
          <AlertTriangle className="text-[#FBBF24] mb-4" size={40} />
          <h3 className="font-['Space_Grotesk'] text-2xl text-[#F1F5F9] mb-2">Unable to load projects</h3>
          <p className="font-mono text-[#94A3B8] mb-6">Please try again</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-6 py-2 bg-[rgba(34,211,238,0.1)] text-[#22D3EE] border border-[#22D3EE] rounded font-mono tracking-wider hover:bg-[rgba(34,211,238,0.2)]"
          >
            <RefreshCw size={16} />
            RETRY
          </button>
        </div>
      ) : (
        // Project Grid
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenDetail={openProject}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No results state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center mt-8">
              <p className="text-xl text-[#F1F5F9] font-['Space_Grotesk'] mb-2">
                No projects found for "{searchQuery}"
              </p>
              <p className="text-[#94A3B8] font-['Inter'] mb-6">
                Try a different search or category
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                }}
                className="px-4 py-2 font-mono text-[13px] bg-transparent text-[#22D3EE] border border-[#22D3EE] rounded hover:bg-[rgba(34,211,238,0.1)] transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── Detail Modal (Centered Premium Dialog) ─── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#060B12]/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0D1520]/90 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col md:flex-row z-10"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0D1520]/80 backdrop-blur-md border border-[#1E2D42] flex items-center justify-center text-[#94A3B8] hover:text-[#22D3EE] hover:border-[#22D3EE]/40 transition-all hover:bg-[#22D3EE]/10 group"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Left Column: Image Gallery */}
              <div className="relative w-full md:w-1/2 h-72 md:h-auto min-h-[300px] bg-[#060B12] overflow-hidden shrink-0 group">
                <AnimatePresence mode="wait">
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    <motion.img
                      key={imageIndex}
                      src={getDetailImage(selectedProject.images[imageIndex])}
                      alt={`${selectedProject.title} image ${imageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0D1520] to-[#141E2E] flex items-center justify-center">
                      <div className="text-cyan-500/20">
                         <Search size={48} />
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageIndex((i) =>
                          i === 0 ? selectedProject.images.length - 1 : i - 1
                        );
                      }}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-[#22D3EE] hover:border-[#22D3EE]/50 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageIndex((i) =>
                          i === selectedProject.images.length - 1 ? 0 : i + 1
                        );
                      }}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-[#22D3EE] hover:border-[#22D3EE]/50 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Dot navigation */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                    {selectedProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageIndex(i);
                        }}
                        aria-label={`Go to image ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${i === imageIndex
                          ? 'bg-[#22D3EE] w-6 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                          : 'bg-white/40 w-2 hover:bg-white/70'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Content */}
              <div className="p-8 md:p-10 w-full md:w-1/2 flex flex-col overflow-y-auto custom-scrollbar bg-[#0D1520]">
                {/* Category + Year */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-mono font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    {selectedProject.year}
                  </span>
                  {String(selectedProject.status).toUpperCase() === 'ONGOING' && (
                    <span className="px-3 py-1 text-xs font-mono font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                      ONGOING
                    </span>
                  )}
                  {String(selectedProject.status).toUpperCase() === 'PROTOTYPE' && (
                    <span className="px-3 py-1 text-xs font-mono font-semibold tracking-widest uppercase bg-slate-500/10 text-slate-400 border border-slate-500/30 rounded-full">
                      PROTOTYPE
                    </span>
                  )}
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 drop-shadow-lg">
                  {selectedProject.title}
                </h2>

                <p className="font-sans text-base text-slate-300 leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* Achievements */}
                {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                  <div className="mb-8 flex flex-col gap-3">
                    {selectedProject.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                        <div className="p-2 bg-cyan-500/10 rounded-lg shrink-0">
                          <Trophy size={18} className="text-cyan-400" />
                        </div>
                        <p className="text-sm text-cyan-100 font-medium leading-relaxed mt-1">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-slate-500 mb-4 uppercase flex items-center gap-2">
                      <div className="w-4 h-[1px] bg-slate-500/50"></div>
                      TECH STACK
                      <div className="flex-grow h-[1px] bg-slate-500/20"></div>
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 text-[13px] font-mono font-medium text-cyan-300 bg-cyan-900/20 border border-cyan-800/50 rounded-lg hover:bg-cyan-900/40 hover:border-cyan-500/50 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto">
                  {/* Team Size */}
                  <div className="flex items-center gap-3 mb-8 text-slate-400 bg-white/5 w-fit px-4 py-2 rounded-xl border border-white/5">
                    <Users size={18} className="text-slate-300" />
                    <span className="text-sm font-medium">
                      Built by <span className="text-cyan-400">{selectedProject.teamSize}</span> team members
                    </span>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] font-mono font-bold tracking-widest text-[#060B12] bg-cyan-400 border border-transparent rounded-xl hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all transform hover:-translate-y-0.5"
                      >
                        <ExternalLink size={18} />
                        LIVE DEMO
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[13px] font-mono font-bold tracking-widest text-slate-200 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800 transition-all transform hover:-translate-y-0.5"
                      >
                        <FaGithub size={18} />
                        SOURCE
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
