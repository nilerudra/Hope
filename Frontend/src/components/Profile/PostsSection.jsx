import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const PostsSection = ({ ngoId }) => {
  const [selectedTab, setSelectedTab] = useState(0); // Track selected tab (0 for My Posts, 1 for Volunteer Posts)
  const [myPosts, setMyPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch "My Posts" and "Volunteer Posts" (replace with your API endpoints)
    const fetchPosts = async () => {
      try {
        const myPostsResponse = await axios.get(
          `https://hope-v129.onrender.com/login/profile/${ngoId}/posts`
        ); // Adjust URL
        setMyPosts(myPostsResponse.data);
        const volunteerPostsResponse = await axios.get(
          `https://hope-v129.onrender.com/ngo/${ngoId}/volunteers/posts`
        ); // Adjust URL
        setPosts(volunteerPostsResponse.data.post);
        setLoading(false);
      } catch (err) {
        setError("Failed to load posts.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={4} m={1} mb={10}>
      <Grid item xs={12} md={12}>
        <Card sx={{ padding: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Posts
            </Typography>

            {/* Tabs to switch between "My Posts" and "Volunteer Posts" */}
            <Tabs
              value={selectedTab}
              onChange={(event, newValue) => setSelectedTab(newValue)}
              aria-label="Posts tabs"
              variant="fullWidth"
            >
              <Tab label="My Posts" />
              <Tab label="Volunteer Posts" />
            </Tabs>

            {/* Conditionally render posts based on selected tab */}
            {selectedTab === 0 ? (
              <div className="posts-grid">
                <h2>My Posts</h2>
                {myPosts.length > 0 ? (
                  <Grid container spacing={3}>
                    {myPosts.map((post) => (
                      <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <Card variant="outlined">
                          <CardContent>
                            <div className="post-thumbnail">
                              <img
                                src={post.postImg}
                                alt={post.postTitle}
                                className="post-image"
                              />
                              <h1 className="post-title">{post.postTitle}</h1>
                              <p className="post-tags"> {post.postTags}</p>
                            </div>{" "}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    textAlign={"center"}
                  >
                    No posts available.
                  </Typography>
                )}
              </div>
            ) : (
              <div className="posts-grid">
                <h2>Volunteer Posts</h2>
                {posts.length > 0 ? (
                  <Grid container spacing={3}>
                    {posts.map((post) => (
                      <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <Card variant="outlined">
                          <CardContent>
                            <div className="post-thumbnail">
                              <img
                                src={post.postImg}
                                alt={post.postTitle}
                                className="post-image"
                              />
                              <h1 className="post-title">{post.postTitle}</h1>
                              <p className="post-tags"> {post.postTags}</p>
                            </div>{" "}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No volunteer posts available.
                  </Typography>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostsSection;
