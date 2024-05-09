import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Input, Button, Spin } from "antd";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Navbar from "../Navbar";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://localhost:7279/api/Blog/all-with-details"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddComment = async (postId) => {
    try {
      const response = await fetch(
        "https://localhost:7279/api/Comment/comment/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            blogId: postId,
            commentText: newComment,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await response.json();
      setNewComment("");
      fetchBlogs();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  const handleVote = async (postId, voteType) => {
    try {
      const response = await fetch(
        `https://localhost:7279/api/Reaction/blog/${postId}/${voteType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to vote");
      }
      const data = await response.json();
      fetchBlogs();
      toast.success(`Vote ${voteType.toLowerCase()} successful!`);
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to vote");
    }
  };

  const handleCommentVote = async (commentId, voteType) => {
    try {
      const response = await fetch(
        `https://localhost:7279/api/Reaction/comment/${commentId}/${voteType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to vote");
      }
      const data = await response.json();
      fetchBlogs();
      toast.success(`Comment ${voteType.toLowerCase()} successful!`);
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to vote");
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 mt-20">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {blogs.map((blog) => (
              <Card
                key={blog.blog.blogId}
                title={blog.blog.title}
                style={{ marginBottom: 16 }}
                className="border  border-primary"
              >
                <div className="flex flex-col gap-4">
                  <p>{blog.username}</p>
                  <p>{blog.blog.content}</p>
                  {blog.blog.imageUrl && (
                    <img
                      src={blog.blog.imageUrl}
                      alt={blog.blog.title}
                      className="mt-4 max-h-80 w-full object-cover"
                    />
                  )}
                </div>
                <div style={{ marginTop: 16 }}>
                  <Button
                    onClick={() => handleVote(blog.blog.blogId, "Upvote")}
                    type="primary"
                    icon={<FaThumbsUp />}
                  >
                    Upvote
                  </Button>
                  <Button
                    onClick={() => handleVote(blog.blog.blogId, "Downvote")}
                    style={{
                      marginLeft: 8,
                      background: "#343a40",
                      color: "white",
                    }}
                    icon={<FaThumbsDown />}
                  >
                    Downvote
                  </Button>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <h3>Comments:</h3>
                  {blog.comments.map((comment) => (
                    <Card
                      type="inner"
                      key={comment.commentId}
                      title={comment.username}
                      className="border  border-primary"
                    >
                      {comment.commentText}
                      <div style={{ marginTop: 8 }}>
                        <Button
                          onClick={() =>
                            handleCommentVote(comment.commentId, "Upvote")
                          }
                          type="primary"
                          icon={<FaThumbsUp />}
                        />
                        <Button
                          onClick={() =>
                            handleCommentVote(comment.commentId, "Downvote")
                          }
                          style={{
                            marginLeft: 8,
                            background: "#343a40",
                            color: "white",
                          }}
                          icon={<FaThumbsDown />}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
                <Input.TextArea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className="mt-3"
                />
                <Button
                  onClick={() => handleAddComment(blog.blog.blogId)}
                  className="mt-3 bg-[#343a40] text-white"
                >
                  Add Comment
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
