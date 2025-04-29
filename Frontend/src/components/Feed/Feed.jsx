import React, { useState,useEffect } from "react";
import "./Feed.css";
import axios from "axios";



function Feed() {
  const [data, setData] = useState([]);
  useEffect(() => {
  axios.get("http://localhost:3000/feed")
  .then((res)=>{
    setData(res.data);
  })
  .catch((error) => {
   alert("error accored ",error)
  })
},[]);

  return (
    <div className="feed-container">
      {data.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <div className="user-info">
              <h4>{post.postTitle}</h4>
             
            </div>
          </div>
          <div className="post-content">
            <p></p>
            {post.postImg && <img src={post.postImg} alt="Post" />}
            <div className="hashtags">
              {post.postTags}
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
}

export default Feed;
