import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Button, Input, Pagination, Select, Spin } from "antd";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Navbar from "../Navbar";

function Surfer() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("recency"); // Default sorting by recency

  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `https://localhost:7279/api/Blog/paginated?page=${page}&sortBy=${sortBy}`
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
      console.log("Comment added:", data);
      setNewComment("");
      fetchBlogs();
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
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
      console.log("Vote added:", data);
      fetchBlogs();
      toast.success(`Vote ${voteType.toLowerCase()} successful!`);
    } catch (error) {
      console.error("Error voting:", error);
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
      console.log("Vote added:", data);
      fetchBlogs();
      toast.success(`Comment ${voteType.toLowerCase()} successful!`);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, sortBy]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  if (loading) {
    return (
      <Spin
        size="large"
        className="mt-20"
        style={{ display: "block", margin: "0 auto" }}
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 mt-[90px]">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <h2>Select the Filter</h2>
            <Select
              defaultValue="recency"
              style={{ width: 120, marginBottom: 20 }}
              onChange={setSortBy}
              className="mt-2"
            >
              <Select.Option value="recency">Recency</Select.Option>
              <Select.Option value="popularity">Popularity</Select.Option>
              <Select.Option value="random">Random</Select.Option>
            </Select>
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
                    icon={<FaThumbsUp />}
                    type="primary"
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
                  type="primary"
                  className="mt-3 bg-[#343a40] text-white"
                >
                  Add Comment
                </Button>
              </Card>
            ))}
            <Pagination defaultCurrent={1} total={50} onChange={setPage} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Surfer;
