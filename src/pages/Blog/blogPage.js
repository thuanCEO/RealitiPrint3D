import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "@services/axiosClient";
import Header from "@components/common/header/header";
import Footer from "@components/common/footer/footer";
import "@pages/Blog/blogPage.scss";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosClient.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => blog.status === 1);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <>
      <Header />
      <div className="blog-page-container">

        {error && <div className="error-text">{error}</div>}

        <div className="blogs-list">
          {currentBlogs.length > 0 ? (
            currentBlogs.map(blog => (
              <div className="blog-card" key={blog.id}>
                <img
                  src={blog.user?.avatar || "https://i.pravatar.cc/150"}
                  alt={blog.user?.fullName || "User"}
                  className="blog-image"
                />
                <div className="blog-content">
                  <h3 className="blog-title">{truncateText(blog.title, 60)}</h3>
                  <p className="blog-excerpt">{truncateText(blog.content, 120)}</p>
                  <Link to={`/reality3d/blog-detail/${blog.id}`} className="view-detail-btn">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-blog">Chưa có bài viết</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &larr; Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
