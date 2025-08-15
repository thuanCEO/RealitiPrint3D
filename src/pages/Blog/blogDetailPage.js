import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "@services/axiosClient";
import Footer from "@components/common/footer/footer";
import Header from "@components/common/header/header";
import "./blogDetailPage.scss";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/40?img=5",
      content: "Bài viết rất hay và bổ ích!",
      date: "2025-08-13 10:05",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosClient.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlog();
  }, [id]);

  const renderContent = (content) =>
    content?.split("\n").map((paragraph, index) => (
      <p key={index} className="blog-paragraph">
        {paragraph}
      </p>
    ));

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCmt = {
      id: Date.now(),
      user: "Bạn đọc",
      avatar: "https://i.pravatar.cc/40?img=8",
      content: newComment.trim(),
      date: new Date().toLocaleString(),
    };
    setComments([newCmt, ...comments]);
    setNewComment("");
  };

  return (
    <>
      <Header />
      <div className="blog-details-page">
        <div className="container">
          {error && <div className="error-message">{error}</div>}

          {blog ? (
            <>
              {/* Bài viết */}
              <div className="blog-card">
                <div
                  className="blog-banner"
                  style={{
                    backgroundImage: `url(${blog.thumbnail || "https://picsum.photos/900/300?random=1"})`,
                  }}
                >
                  <div className="overlay">
                    <h1 className="blog-title">{blog.title}</h1>
                  </div>
                </div>

                <div className="blog-author">
                  <div className="author-info">
                    <img
                      src={blog.user.avatar}
                      alt={blog.user.fullName}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <span className="author-name">{blog.user.fullName}</span>
                      <span className="author-role"> (Tác giả)</span>
                    </div>

                    <div className="blog-content">{renderContent(blog.content)}</div>
                  </div>
                </div>


              </div>

              {/* Bình luận */}
              <div className="blog-comments">
                <h3>💬 Bình luận</h3>
                <div className="comment-input">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="User"
                    className="comment-avatar"
                  />
                  <textarea
                    placeholder="Hãy chia sẻ cảm nghĩ của bạn..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <button className="btn-submit" onClick={handleAddComment}>
                  🚀 Gửi bình luận
                </button>

                <div className="comment-list">
                  {comments.map((c) => (
                    <div key={c.id} className="comment-item">
                      <img
                        src={c.avatar}
                        alt={c.user}
                        className="comment-avatar"
                      />
                      <div className="comment-content">
                        <strong>{c.user}</strong>
                        <p>{c.content}</p>
                        <span className="comment-date">{c.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="loading-text">⏳ Đang tải dữ liệu...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
