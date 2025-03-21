import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';

const Blogs = () => {
  // Mock blog data - in a real application, this would come from an API or CMS
  const blogPosts = [
    {
      id: 1,
      title: "Improving Crop Selection Through Data Analysis",
      excerpt: "Learn how data-driven decisions can help farmers choose the right crops for their region.",
      date: "March 1, 2025",
    },
    {
      id: 2,
      title: "Connecting Farmers to Markets: Success Stories",
      excerpt: "Read about farmers who have increased their income through direct market access.",
      date: "February 15, 2025",
    },
    {
      id: 3,
      title: "Agricultural Transformation in Rwanda: Progress and Challenges",
      excerpt: "An overview of Rwanda's journey toward agricultural modernization.",
      date: "January 28, 2025",
    }
  ];

  return (
    <div className="ContentContainer">
      <h1 className="PageTitle">Agricultural Insights</h1>
      
      <div className="BlogGrid">
        {blogPosts.map(post => (
          <div key={post.id} className="BlogCard">
            <h2 className="BlogTitle">{post.title}</h2>
            <p className="BlogDate">{post.date}</p>
            <p className="BlogExcerpt">{post.excerpt}</p>
            <Link to={`/blogs/${post.id}`} className="ReadMoreLink">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;