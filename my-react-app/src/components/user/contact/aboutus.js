import React from "react";

const people = [
  {
    name: "Đỗ Hữu Thuận",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/dht.jpg"),
  },

  {
    name: "Ngô Thị Thùy Trang",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/nttt.jpg"),
  },

  {
    name: "Đỗ Hữu Thuận",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/dht.jpg"),
  },

  {
    name: "Đỗ Hữu Thuận",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/dht.jpg"),
  },

  {
    name: "Đỗ Hữu Thuận",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/dht.jpg"),
  },

  {
    name: "Đỗ Hữu Thuận",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/dht.jpg"),
  },

  // More people...
];

export default function AboutUsPage() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Thông tin về chúng tôi
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Bằng những kĩ năng điêu nghệ chúng tôi đã có những cái oke nhất
              dành cho sản phẩm.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
