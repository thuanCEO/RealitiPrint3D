import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "@services/axiosClient";
import Footer from "@components/common/footer/footer";
import Header from "@components/common/header/header";
import "@pages/Blog/blogDetailPage.scss";

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

  const renderContent = (content) => {
    return content?.split("\n").map((paragraph, index) => (
      <p
        key={index}
        className="leading-relaxed mb-5 text-gray-700 text-lg tracking-wide"
      >
        {paragraph}
      </p>
    ));
  };

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
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4">
          {error && (
            <div className="text-red-500 text-center font-medium mb-6">
              {error}
            </div>
          )}
          {blog ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-5 p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <img
                  src={blog.user.avatar}
                  alt={blog.user.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {blog.title}
                  </h1>
                  <p className="text-gray-500 italic">
                    ✍️ Tác giả:{" "}
                    <span className="font-medium">{blog.user.fullName}</span>
                  </p>
                </div>
              </div>

              {/* Nội dung */}
              <div className="p-8">{renderContent(blog.content)}</div>

              {/* Bình luận */}
              <div className="p-8 border-t border-gray-100 bg-gray-50">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  💬 Bình luận
                </h2>

                {/* Form nhập bình luận */}
                <div className="flex items-start gap-3 mb-5">
                  <img
                    src="https://i.pravatar.cc/40?img=8"
                    alt="avatar"
                    className="w-12 h-12 rounded-full shadow"
                  />
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Hãy chia sẻ cảm nghĩ của bạn..."
                    className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm"
                    rows={3}
                  ></textarea>
                </div>
                <button
                  onClick={handleAddComment}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                >
                  🚀 Gửi bình luận
                </button>

                {/* Danh sách bình luận */}
                <div className="mt-8 space-y-4">
                  {comments.length === 0 ? (
                    <p className="text-gray-500 italic">
                      Chưa có bình luận nào
                    </p>
                  ) : (
                    comments.map((cmt) => (
                      <div
                        key={cmt.id}
                        className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                      >
                        <img
                          src={cmt.avatar}
                          alt={cmt.user}
                          className="w-10 h-10 rounded-full shadow"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {cmt.user}
                          </p>
                          <p className="text-gray-700">{cmt.content}</p>
                          <span className="text-xs text-gray-400">
                            {cmt.date}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">⏳ Đang tải dữ liệu...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
