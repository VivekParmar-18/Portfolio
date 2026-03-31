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
    <section id="blog" className="py-28 bg-slate-950 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(59,130,246,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
            style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>
            Insights
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
            Java <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Development</span> Blog
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">Best practices, tutorials, and insights from building enterprise applications.</p>
        </motion.div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              whileHover={{ y: -6, background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(59,130,246,0.25)', transition: { duration: 0.2 } }}
            >
              {/* Top accent */}
              <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, transparent)' }} />

              <div className="p-7 flex-1 flex flex-col">
                {/* Tags + read time */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                      style={{ color: tagColors[tag] ?? '#94a3b8', background: `${tagColors[tag] ?? '#94a3b8'}15`, fontFamily: "'Fira Code', monospace" }}>
                      <FiTag size={10} />{tag}
                    </span>
                  ))}
                  <span className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
                    <FiClock size={11} />{post.readTime} min read
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors" style={{ letterSpacing: '-0.01em' }}>
                  {post.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>

                <div className="mt-auto flex items-center justify-between">
                  <time className="text-slate-600 text-xs" style={{ fontFamily: "'Fira Code', monospace" }}>
                    {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:gap-2.5 transition-all">
                    Read More <FiArrowRight size={14} />
                  </span>
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
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="fixed inset-2 md:inset-10 lg:inset-20 z-[70] overflow-y-auto rounded-2xl md:rounded-3xl"
              style={{ background: 'rgba(8,12,24,0.99)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            >
              <div className="max-w-4xl mx-auto p-4 md:p-12 lg:p-16">
                {/* Modal header */}
                <div className="flex items-start justify-between mb-6 md:mb-8 border-b border-white/5 pb-6 md:pb-8">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                       {selectedPost.tags.map(tag => (
                         <span key={tag} className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full text-blue-400 bg-blue-500/10 border border-blue-500/20 font-mono">
                           {tag}
                         </span>
                       ))}
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight" style={{ letterSpacing: '-0.02em' }}>
                      {selectedPost.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-500 text-xs md:text-sm">
                      <div className="flex items-center gap-2"><FiUser className="text-blue-500" /> By Vivek Parmar</div>
                      <div className="flex items-center gap-2 text-[10px] md:text-sm"><FiCalendar className="text-blue-500" /> {new Date(selectedPost.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                      <div className="flex items-center gap-2"><FiClock className="text-blue-500" /> {selectedPost.readTime} min</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedPost(null)} className="p-2 md:p-3 rounded-xl md:rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all flex-shrink-0 ml-2 md:ml-4 sticky top-0">
                    <FiX size={isMobile ? 20 : 24} />
                  </button>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-blue max-w-none">
                  {selectedPost.content.split('\n').map((line, i) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith('# ')) return <h1 key={i} className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">{trimmedLine.replace('# ', '')}</h1>;
                    if (trimmedLine.startsWith('## ')) return <h2 key={i} className="text-xl md:text-2xl font-bold text-white mt-10 mb-5 border-l-4 border-blue-500 pl-4">{trimmedLine.replace('## ', '')}</h2>;
                    if (trimmedLine.startsWith('### ')) return <h3 key={i} className="text-lg md:text-xl font-bold text-white mt-8 mb-4">{trimmedLine.replace('### ', '')}</h3>;
                    if (trimmedLine.startsWith('- ')) return <li key={i} className="text-slate-400 mb-2 ml-4 list-disc text-sm md:text-lg">{trimmedLine.replace('- ', '')}</li>;
                    if (trimmedLine.startsWith('1. ') || trimmedLine.match(/^\d+\. /)) return <li key={i} className="text-slate-400 mb-2 ml-4 list-decimal text-sm md:text-lg">{trimmedLine.replace(/^\d+\. /, '')}</li>;
                    if (trimmedLine === '') return <br key={i} />;
                    return <p key={i} className="text-slate-400 text-base md:text-lg leading-relaxed mb-5">{trimmedLine}</p>;
                  })}
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                   <p className="text-slate-500 text-[10px] md:text-sm italic">Thanks for reading!</p>
                   <button 
                     onClick={() => setSelectedPost(null)}
                     className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                   >
                     Close Article
                   </button>
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