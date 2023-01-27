import React, { useState, useEffect } from "react";
import axios from "axios";

import BlogPost from "./BlogPost";

const BlogPostFeed = () => {
  const [blogPosts, setBlogPosts] = useState([
    { title: "hi 1" },
    { title: "hi2" },
  ]);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/post")
      .catch((e) => console.log(e));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogPosts(data.allBlogPosts));
  });

  return (
    <React.Fragment>
      {blogPosts.map((blogPost, index) => (
        <BlogPost title={blogPost.title } />
      ))}
    </React.Fragment>
  );
};

export default BlogPostFeed;
