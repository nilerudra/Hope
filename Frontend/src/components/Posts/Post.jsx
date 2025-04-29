import React, { useState, useEffect } from "react";
import axios from "axios";
import "./post.css";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

function Post() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [tags, setTags] = useState("");

  const imagesListRef = ref(storage, "images/");

  const uploadFile = async () => {
    if (!imageUpload) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        submitPost("" + url); // Pass the URL to submit post data
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const submitPost = async (imageUrl) => {
    const postData = {
      postTitle: postContent,
      postImg: imageUrl,
      postTags: tags,
      userId: localStorage.getItem("user_id") || localStorage.getItem("ngo_id"),
    };

    try {
      await axios.post("https://hope-v129.onrender.com/posts", postData); // replace with your backend URL
      alert("Your work is posted");
      handleCancel();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleCancel = () => {
    setPostContent("");
    setTags("");
    setImageUpload(null);
    setImageName(""); // Reset image name on cancel
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
    setImageName(file ? file.name : ""); // Set the image name
  };

  return (
    <div className="add-post-container">
      <div className="add-post-header">
        <h2>Create a Post</h2>
      </div>
      <div className="add-post-content">
        <textarea
          value={postContent}
          required
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What do you want to talk about?"
          rows="5"
        />
        <div className="post-actions">
          <label htmlFor="file-upload" className="custom-file-upload">
            <input
              type="file"
              required
              id="file-upload"
              onChange={handleFileChange}
            />
            Add Image/Video
          </label>
          {imageName && <span className="file-name">{imageName}</span>}{" "}
          {/* Display selected file name */}
        </div>
        <div className="post-tags">
          <input
            type="text"
            required
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Add tags (e.g., #technology, @JohnDoe)"
          />
        </div>
      </div>
      <div className="add-post-footer">
        <button className="btn cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn post" onClick={uploadFile}>
          Post
        </button>
      </div>
    </div>
  );
}

export default Post;
