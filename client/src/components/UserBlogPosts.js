import React, { useState, useEffect } from "react";
import axios from "axios";

import BlogPost from "./BlogPost";

const UserBlogPosts = () => {
  const [currentUser, setCurrentUser] = useState();

  const userID = localStorage.getItem("userID");
  const fetchUserByID = async () => {
    const res = await axios
      .get(`http://localhost:5000/post/user/${userID}`)
      .catch((e) => console.log(e));

    const data = await res.data;
    //console.log(data);
    return data;
  };

  useEffect(() => {
    fetchUserByID().then((data) => setCurrentUser(data.userAndBlogs));
  }, []);

  return (
    <React.Fragment>
      {currentUser &&
        currentUser.blogs &&
        currentUser.blogs.map((blogPost, index) => (
          <BlogPost
            title={blogPost.title}
            key={index}
            id={blogPost._id}
            author={blogPost.author.name}
            text={blogPost.text}
            image={blogPost.image}
          />
        ))}
    </React.Fragment>
  );
};

export default UserBlogPosts;
