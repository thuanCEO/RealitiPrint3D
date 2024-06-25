import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../services/api/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const resq = await axiosClient.get("api/Blog/GetAllBlogs");
      setBlogs(resq.data);
      console.log(resq.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <div>
        <h2 className="font-semibold title-font text-gray-700 body-font text-center">
          Bài Viết
        </h2>
      </div>
      <section className="section-fullscreen text-gray-600 body-font overflow-hidden text-2xl">
        <div className="container px-5 py-24 mx-auto h-full flex flex-col justify-center">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {error && <div className="text-red-500">{error}</div>}
            {blogs.length > 0 ? (
              blogs.slice(0, 5).map((blog) => (
                <div
                  key={blog.id}
                  className="py-8 flex flex-wrap md:flex-nowrap"
                >
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      {blog.user.fullName}
                    </span>
                    <img
                      src={blog.user.avatar}
                      className="mt-1 rounded-full"
                      width="100px"
                      height="100px"
                      alt="User Avatar"
                    />
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      <Link to={`/reality3d/view-blog-detail/${blog.id}`}>
                        {truncateText(blog.title, 50)}
                      </Link>
                    </h2>
                    <p className="leading-relaxed">
                      {truncateText(blog.content, 100)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
