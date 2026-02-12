

import React from 'react';
import AnimatedSection from './AnimatedSection';

// Define the structure of a blog post
interface BlogPost {
  image: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  author: {
    name: string;
    avatar: string;
  };
  slug: string;
}

// Dummy data for blog posts
const blogPosts: BlogPost[] = [
  {
    image: 'https://picsum.photos/600/400?random=5',
    category: 'Market Insights',
    date: 'July 15, 2024',
    title: 'Navigating Volatility: Strategies for a Changing Market',
    summary: 'The financial landscape is ever-evolving. Discover expert strategies to protect your portfolio and identify new opportunities amidst market uncertainty.',
    author: {
      name: 'John Carter',
      avatar: 'https://picsum.photos/100/100?random=6',
    },
    slug: '#',
  },
  {
    image: 'https://picsum.photos/600/400?random=7',
    category: 'Technology',
    date: 'July 10, 2024',
    title: 'The Rise of AI in Financial Planning and Investment',
    summary: 'Artificial intelligence is revolutionizing how we manage wealth. Learn how our platform leverages AI to provide personalized, data-driven financial advice.',
    author: {
      name: 'Emily Davis',
      avatar: 'https://picsum.photos/100/100?random=8',
    },
    slug: '#',
  },
  {
    image: 'https://picsum.photos/600/400?random=9',
    category: 'Retirement',
    date: 'July 5, 2024',
    title: '5 Essential Steps to Secure Your Retirement Future',
    summary: 'Planning for retirement can seem daunting. We break it down into five manageable steps to help you build a secure and comfortable future.',
    author: {
      name: 'Michael Chen',
      avatar: 'https://picsum.photos/100/100?random=3',
    },
    slug: '#',
  },
];

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <div className="bg-light-bg-secondary dark:bg-primary-gray rounded-lg shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col transform hover:-translate-y-2 transition-all duration-300">
        <a href={post.slug} className="block" aria-label={`Read more about ${post.title}`}>
            <img src={post.image} alt="" className="w-full h-48 object-cover" />
        </a>
        <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
                <span className="inline-block bg-primary-red/10 dark:bg-primary-red/20 text-primary-red text-xs font-semibold rounded-full px-3 py-1">
                    {post.category}
                </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-light-text dark:text-white leading-snug">
                <a href={post.slug} className="hover:text-primary-red transition-colors duration-200">{post.title}</a>
            </h3>
            <p className="text-light-text-secondary dark:text-gray-400 text-sm flex-grow mb-6">{post.summary}</p>
            <div className="flex items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <img className="w-10 h-10 rounded-full mr-3 object-cover" src={post.author.avatar} alt={post.author.name} />
                <div>
                    <p className="font-semibold text-light-text dark:text-gray-200 text-sm">{post.author.name}</p>
                    <p className="text-xs text-light-text-secondary dark:text-gray-500">{post.date}</p>
                </div>
            </div>
        </div>
    </div>
);

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-12 md:py-20 bg-light-bg dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">From Our Blog</h2>
            <p className="text-light-text-secondary dark:text-gray-400 mt-2">Stay updated with the latest news and insights from the financial world.</p>
            <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={index} delay={100 + (index * 100)}>
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;