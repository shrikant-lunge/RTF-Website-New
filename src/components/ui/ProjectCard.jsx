import { motion } from 'framer-motion';
import { ExternalLink, Users, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { getCardImage } from '../../lib/cloudinary';

export default function ProjectCard({ project, onOpenDetail, index = 0 }) {
  const {
    title,
    category,
    description,
    techStack,
    teamSize,
    year,
    status,
    images,
    github,
    demo,
    featured
  } = project;

  const categoryColors = {
    ROBOTICS:    'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    ELECTRONICS: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    'AI/ML':     'bg-amber-500/15 text-amber-400 border-amber-500/30',
    AUTOMATION:  'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    SOFTWARE:    'bg-purple-500/15 text-purple-300 border-purple-500/30',
    DEFAULT:     'bg-slate-500/15 text-slate-400 border-slate-500/30'
  };

  const statusConfig = {
    COMPLETED: { bgColor: 'bg-green-500' },
    ONGOING:   { bgColor: 'bg-amber-500', pulse: true },
    PROTOTYPE: { bgColor: 'bg-slate-500' }
  };

  const badgeClass = categoryColors[category] || categoryColors.DEFAULT;
  const normalizedStatus = String(status).toUpperCase();
  const statusDisplay = statusConfig[normalizedStatus] || statusConfig.COMPLETED;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06
      }}
      onClick={() => onOpenDetail?.(project)}
      className="group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,32,32,0.15),0_20px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(255,32,32,0.05)] flex flex-col h-full"
    >
      {/* IMAGE SECTION */}
      <div className="relative overflow-hidden h-[200px] shrink-0">
        {images && images.length > 0 ? (
          <img
            src={getCardImage(images[0])}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface to-elevated flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-border" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-card to-transparent pointer-events-none" />
        
        {/* Top-Left Category Badge */}
      <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase font-mono font-semibold tracking-[0.1em] rounded bg-black/40 backdrop-blur-sm text-text-primary">
        {category}
      </span>

        {/* Top-Right Status Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded bg-[rgba(15,23,42,0.6)] backdrop-blur-[2px] border border-[rgba(30,41,59,0.8)]">
          <span 
            className={`w-[6px] h-[6px] rounded-full ${statusDisplay.bgColor} ${statusDisplay.pulse ? 'animate-pulse' : ''}`}
            style={{ opacity: statusDisplay.pulse ? undefined : 0.8 }}
          />
          <span className="text-[9px] uppercase font-mono tracking-[0.08em] text-text-primary">
            {normalizedStatus}
          </span>
        </div>

        {/* Top-Center Featured Badge */}
        {featured && (
          <span className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[9px] uppercase font-mono rounded whitespace-nowrap">
            ★ FEATURED
          </span>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-[18px] font-semibold text-text-heading mb-2 group-hover:text-cyan-400 transition-colors duration-200">
          {title}
        </h3>
        
        <p className="font-body text-[14px] text-text-body leading-[1.6] mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {description}
        </p>

        {/* Tech Stack tags */}
        <div className="flex flex-wrap gap-[6px] mb-4">
          {techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] text-text-tag bg-elevated/60 border border-border px-2 py-[3px] rounded-[3px]"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="font-mono text-[11px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-[3px] rounded-[3px]">
              +{techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-1"></div>

        {/* FOOTER ROW */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-[6px] text-[11px] font-mono text-text-muted">
            <Users size={12} className="shrink-0" />
            <span>{teamSize} members</span>
            <span className="mx-0.5">·</span>
            <span>{year}</span>
          </div>

          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="GitHub Repo"
                aria-label={`${title} GitHub repository`}
                className="text-text-muted hover:text-cyan-400 transition-colors"
              >
                <FaGithub size={16} />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Live Demo"
                aria-label={`${title} live demo`}
                className="text-text-muted hover:text-cyan-400 transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
            <div 
              title="View Details"
              aria-label={`View details for ${title}`}
              className="text-text-muted group-hover:text-cyan-400 transition-colors"
            >
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}