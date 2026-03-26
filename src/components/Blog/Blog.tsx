import { ScrollReveal } from '../../index';
import { getFeaturedPosts } from '../../data/blogData';

const Blog = () => {
  const featuredPosts = getFeaturedPosts();

  return (
    <section id="blog" className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Java Development Insights
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Sharing my experience and knowledge as a Java developer, including best practices, 
              tutorials, and insights from working on enterprise applications.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <ScrollReveal key={post.id} direction={index % 2 === 0 ? "left" : "right"}>
              <article className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">{post.readTime} min read</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <p className="text-slate-300 mb-6">
              Want to read more about Java development, Spring Boot, and enterprise application architecture?
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
              View All Articles
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Blog;