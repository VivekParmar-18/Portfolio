export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishDate: string;
  readTime: number;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "java-spring-boot-best-practices",
    title: "Java Spring Boot Best Practices for Enterprise Applications",
    excerpt: "Essential Spring Boot practices I've learned while developing enterprise applications at Techforce InfoTech. From project structure to performance optimization.",
    content: `
# Java Spring Boot Best Practices for Enterprise Applications

As a Java developer at Techforce InfoTech PVT LTD, I've worked extensively with Spring Boot to build scalable enterprise applications. Here are the key best practices I've learned:

## 1. Project Structure and Organization
- Use proper package structure following domain-driven design
- Separate concerns with clear layers (controller, service, repository)
- Implement proper exception handling strategies

## 2. Configuration Management
- Use application.yml for better readability
- Implement environment-specific configurations
- Leverage Spring Profiles for different environments

## 3. Database Integration
- Use Spring Data JPA for database operations
- Implement proper connection pooling
- Follow database naming conventions

## 4. Security Implementation
- Implement Spring Security for authentication
- Use JWT tokens for stateless authentication
- Follow OWASP security guidelines

## 5. Performance Optimization
- Implement caching strategies with Spring Cache
- Use lazy loading for JPA entities
- Optimize database queries with proper indexing

These practices have helped me build robust, maintainable Java applications that scale effectively in production environments.
    `,
    tags: ["Java", "Spring Boot", "Enterprise", "Best Practices", "Backend Development"],
    publishDate: "2025-01-10",
    readTime: 8,
    featured: true
  },
  {
    id: "java-microservices-architecture",
    title: "Building Microservices with Java and Spring Cloud",
    excerpt: "My experience building microservices architecture using Java, Spring Boot, and Spring Cloud at Techforce InfoTech.",
    content: `
# Building Microservices with Java and Spring Cloud

Microservices architecture has become essential for modern enterprise applications. Here's my approach to building microservices with Java:

## Why Java for Microservices?
- Mature ecosystem with Spring Boot
- Excellent tooling and IDE support
- Strong community and documentation
- Enterprise-ready with proven scalability

## Key Components I Use:
1. **Spring Boot** - For rapid application development
2. **Spring Cloud Gateway** - API gateway and routing
3. **Spring Cloud Config** - Centralized configuration
4. **Spring Cloud Netflix** - Service discovery and circuit breakers

## Implementation Strategy:
- Start with a monolith and gradually extract services
- Use domain-driven design for service boundaries
- Implement proper monitoring and logging
- Use containerization with Docker

This approach has helped me build resilient, scalable systems that can handle enterprise-level traffic and complexity.
    `,
    tags: ["Java", "Microservices", "Spring Cloud", "Architecture", "Scalability"],
    publishDate: "2025-01-08",
    readTime: 6,
    featured: true
  },
  {
    id: "java-developer-career-path",
    title: "My Journey as a Java Developer: From Fresher to Associate Software Developer",
    excerpt: "Sharing my career journey and lessons learned as a Java developer, including tips for other developers starting their Java career.",
    content: `
# My Journey as a Java Developer: From Fresher to Associate Software Developer

Starting my career as a Java developer has been an incredible journey. Here's what I've learned along the way:

## Getting Started with Java
- Mastered core Java concepts (OOP, Collections, Multithreading)
- Built strong foundation in data structures and algorithms
- Practiced coding regularly on platforms like LeetCode and HackerRank

## Learning Spring Framework
- Started with Spring Core and dependency injection
- Progressed to Spring Boot for rapid development
- Learned Spring Security for authentication and authorization
- Explored Spring Data JPA for database operations

## Professional Experience at Techforce InfoTech
- Working on enterprise-level applications
- Collaborating with cross-functional teams
- Following agile development methodologies
- Implementing best practices for code quality and maintainability

## Key Skills Developed:
- **Backend Development**: Java, Spring Boot, REST APIs
- **Database Management**: MySQL, JPA, Hibernate
- **Frontend Integration**: React.js, JavaScript
- **DevOps**: Git, Maven, Docker basics

## Advice for Aspiring Java Developers:
1. Focus on fundamentals first
2. Build real projects, not just tutorials
3. Contribute to open source projects
4. Stay updated with latest Java features
5. Practice system design concepts

The Java ecosystem is vast and constantly evolving. Continuous learning and hands-on practice are key to success.
    `,
    tags: ["Java", "Career", "Software Developer", "Learning", "Professional Growth"],
    publishDate: "2025-01-05",
    readTime: 7,
    featured: false
  },
  {
    id: "java-performance-optimization",
    title: "Java Performance Optimization Techniques I Use in Production",
    excerpt: "Practical Java performance optimization techniques I've implemented in production applications at Techforce InfoTech.",
    content: `
# Java Performance Optimization Techniques I Use in Production

Performance optimization is crucial for enterprise Java applications. Here are techniques I've successfully implemented:

## JVM Tuning
- Proper heap size configuration
- Garbage collection optimization
- JVM flags for better performance

## Code-Level Optimizations
- Efficient use of Collections Framework
- String handling best practices
- Avoiding memory leaks with proper resource management

## Database Performance
- Connection pooling configuration
- Query optimization with proper indexing
- Using pagination for large datasets

## Caching Strategies
- Implementing Redis for distributed caching
- Spring Cache abstraction
- HTTP caching headers for REST APIs

## Monitoring and Profiling
- Using JProfiler for performance analysis
- Application metrics with Micrometer
- Log analysis for performance bottlenecks

These optimizations have helped improve application response times by 40% in production environments.
    `,
    tags: ["Java", "Performance", "Optimization", "Production", "JVM"],
    publishDate: "2025-01-03",
    readTime: 9,
    featured: false
  }
];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostById = (id: string) => blogPosts.find(post => post.id === id);
export const getPostsByTag = (tag: string) => blogPosts.filter(post => post.tags.includes(tag));