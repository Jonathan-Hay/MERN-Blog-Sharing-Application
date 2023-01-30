import React, { useState, useEffect } from "react";
import axios from "axios";

import BlogPost from "./BlogPost";

const BlogPostFeed = () => {
  const [blogPosts, setBlogPosts] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/post")
      .catch((e) => console.log(e));

    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogPosts(data.allBlogPosts));
  }, []);

  return (
    <React.Fragment>
      {blogPosts &&
        blogPosts.map((blogPost, index) => (
          <BlogPost
            title={blogPost.title}
            key={index}
            author={blogPost.author.name}
            text={blogPost.text}
            image={blogPost.image}
          />
        ))}
    </React.Fragment>
  );
};

export default BlogPostFeed;
