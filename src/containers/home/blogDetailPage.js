import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../services/api/api";
import Footer from "../../components/Common/footer/footer";
import Header from "../../components/Common/header/header";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      const resq = await axiosClient.get(`api/Blog/GetBlogById?id=${id}`);
      setBlog(resq.data);
      console.log(resq.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const renderContent = (content) => {
    return content.split("\n").map((paragraph, index) => (
      <p key={index} className="leading-relaxed mb-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-10">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container-fluid px-5 py-24 mx-auto max-w-screen-xl">
            <div className="lg:flex lg:flex-wrap lg:justify-between lg:items-center bg-white shadow-lg rounded-lg p-6">
              <div className="container px-5 py-24 mx-auto h-full flex flex-col justify-center">
                <div className="-my-8 divide-y-2 divide-gray-100">
                  {error && <div className="text-red-500">{error}</div>}
                  {blog ? (
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
                          {blog.title}
                        </h2>
                        {renderContent(blog.content)}
                      </div>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
