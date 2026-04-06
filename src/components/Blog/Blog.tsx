import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { getFeaturedPosts, type BlogPost } from '../../data/blogData';
import { useResponsive } from '../../hooks/useResponsive';
import { FiClock, FiTag, FiArrowRight, FiX, FiCalendar, FiUser } from 'react-icons/fi';

const tagColors: Record<string, string> = {
  Java: '#E85D24', 'Spring Boot': '#6DB33F', React: '#61DAFB',
  TypeScript: '#3B82F6', AWS: '#FF9900', Docker: '#2496ED',
  Microservices: '#8B5CF6', Security: '#EF4444',
};

const Blog = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { isMobile } = useResponsive();
  const posts = getFeaturedPosts();

  return (
    <section id="blog" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh opacity-50" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>
            Insights
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6" style={{ letterSpacing: '-0.04em', fontFamily: 'var(--font-display)' }}>
            Engineering <span className="premium-gradient-text">Logbook</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">Documenting architectural insights, performance breakthroughs, and the evolution of complex Java systems.</p>
        </motion.div>

        {/* Posts grid */}
        <div 
          className="grid md:grid-cols-2 gap-8"
          role="list"
          aria-label="Technical Blog Posts and Insights"
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="group relative cursor-pointer h-full"
              role="listitem"
              aria-labelledby={`blog-title-${post.id}`}
            >
              <div 
                className="glass-card h-full p-8 flex flex-col border-white/5 group-hover:border-white/20 transition-all duration-500"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 h-1 w-full" aria-hidden="true" style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, transparent)' }} />

                <div className="flex flex-col h-full mt-4">
                  {/* Tags + read time */}
                  <div className="flex items-center gap-3 mb-6 flex-wrap" aria-label="Post Metadata">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{ color: tagColors[tag] ?? '#94a3b8', background: `${tagColors[tag] ?? '#94a3b8'}15`, border: `1px solid ${tagColors[tag] ?? '#94a3b8'}20`, fontFamily: "'Fira Code', monospace" }}>
                        <FiTag size={10} aria-hidden="true" />{tag}
                      </span>
                    ))}
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 ml-auto font-medium" aria-label={`${post.readTime} minute read`}>
                      <FiClock size={12} className="text-blue-500" aria-hidden="true" />{post.readTime} min
                    </span>
                  </div>

                  <h3 id={`blog-title-${post.id}`} className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors" style={{ letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
                    {post.title}
                  </h3>

                  <p className="text-slate-400 text-base leading-relaxed mb-8 line-clamp-3 font-light">{post.excerpt}</p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <time dateTime={post.publishDate} className="text-slate-600 text-xs font-bold uppercase tracking-tight" style={{ fontFamily: "'Fira Code', monospace" }}>
                      {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>
                    <span className="flex items-center gap-2 text-sm font-bold text-blue-400 group-hover:gap-3 transition-all" aria-label={`Read full article: ${post.title}`}>
                      Read Article <FiArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ── Post Modal ── */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] pt-24 pb-8 px-4 flex items-center justify-center"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="fixed inset-4 md:inset-10 lg:inset-24 z-[70] overflow-y-auto"
            >
              <div className="glass-card min-h-full border-white/10 shadow-3xl">
                <div className="max-w-4xl mx-auto p-8 md:p-16">
                  {/* Modal header */}
                  <div className="flex items-start justify-between mb-12 border-b border-white/5 pb-10">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                         {selectedPost.tags.map(tag => (
                           <span key={tag} className="text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full text-blue-400 bg-blue-500/10 border border-blue-500/20 font-mono">
                             {tag}
                           </span>
                         ))}
                      </div>
                      <h2 className="text-3xl md:text-6xl font-extrabold text-white leading-tight" style={{ letterSpacing: '-0.04em', fontFamily: 'var(--font-display)' }}>
                        {selectedPost.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-6 text-slate-500 text-xs md:text-sm font-medium">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><FiUser className="text-blue-500" /> Vivek Parmar</div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><FiCalendar className="text-blue-500" /> {new Date(selectedPost.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><FiClock className="text-blue-500" /> {selectedPost.readTime} min</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(null)} 
                      aria-label="Close article"
                      className="p-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all flex-shrink-0 ml-4 hover:rotate-90 transition-transform duration-300 border border-white/10"
                    >
                      <FiX size={isMobile ? 20 : 24} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="prose prose-invert prose-blue max-w-none">
                    {selectedPost.content.split('\n').map((line, i) => {
                      const trimmedLine = line.trim();
                      if (trimmedLine.startsWith('# ')) return <h1 key={i} className="text-3xl md:text-4xl font-extrabold text-white mt-12 mb-6" style={{ fontFamily: 'var(--font-display)' }}>{trimmedLine.replace('# ', '')}</h1>;
                      if (trimmedLine.startsWith('## ')) return <h2 key={i} className="text-2xl md:text-3xl font-bold text-white mt-16 mb-8 border-l-4 border-blue-500 pl-6" style={{ fontFamily: 'var(--font-display)' }}>{trimmedLine.replace('## ', '')}</h2>;
                      if (trimmedLine.startsWith('### ')) return <h3 key={i} className="text-xl md:text-2xl font-bold text-white mt-12 mb-6">{trimmedLine.replace('### ', '')}</h3>;
                      if (trimmedLine.startsWith('- ')) return <li key={i} className="text-slate-300 mb-3 ml-6 list-disc text-base md:text-xl font-light">{trimmedLine.replace('- ', '')}</li>;
                      if (trimmedLine.startsWith('1. ') || trimmedLine.match(/^\d+\. /)) return <li key={i} className="text-slate-300 mb-3 ml-6 list-decimal text-base md:text-xl font-light">{trimmedLine.replace(/^\d+\. /, '')}</li>;
                      if (trimmedLine === '') return <br key={i} />;
                      return <p key={i} className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 font-light">{trimmedLine}</p>;
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-20 pt-12 border-t border-white/5 flex items-center justify-between">
                     <p className="text-slate-500 text-sm italic font-medium">End of journal entry.</p>
                     <button 
                       onClick={() => setSelectedPost(null)}
                       className="px-8 py-3 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/30 active:scale-95"
                     >
                       Close Article
                     </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;