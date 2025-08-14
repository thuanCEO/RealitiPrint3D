import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "@services/axiosClient";
import "./blogPage.scss";

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

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="blog-page-container">
      <h2 className="blog-page-title">Bài Viết</h2>

      {error && <div className="text-red-500">{error}</div>}

      <div className="blogs-grid">
        {currentBlogs.length > 0 ? (
          currentBlogs.map(blog => (
            <div className="blog-card" key={blog.id}>
              <div className="blog-card-header">
                <img
                  src={blog.user?.avatar || "https://i.pravatar.cc/100"}
                  alt={blog.user?.fullName || "User"}
                  className="blog-avatar"
                />
                <span className="blog-author">{blog.user?.fullName || "Unknown"}</span>
              </div>
              <div className="blog-card-body">
                <h3 className="blog-title">
                  <Link to={`/reality3d/view-blog-detail/${blog.id}`}>
                    {truncateText(blog.title, 60)}
                  </Link>
                </h3>
                <p className="blog-excerpt">{truncateText(blog.content, 120)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-blog">Chưa có bài viết</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination flex justify-center mt-8 items-center gap-2">
          <button
            className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            &larr; Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
