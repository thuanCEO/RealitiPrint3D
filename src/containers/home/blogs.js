import React, { useState, useEffect } from "react";
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
  return (
    <>
      <section className="section-fullscreen text-gray-600 body-font overflow-hidden">
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
                      // src="https://firebasestorage.googleapis.com/v0/b/webid-6c809.appspot.com/o/emiu.jpg?alt=media&token=4a6cbadc-f1d9-4589-b217-9c1f926a17d6"
                      src={blog.user.avatar}
                      className="mt-1 rounded-full"
                      width="100px"
                      height="100px"
                    ></img>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      {blog.title}
                    </h2>
                    <p className="leading-relaxed">{blog.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </section>{" "}
    </>
  );
}
