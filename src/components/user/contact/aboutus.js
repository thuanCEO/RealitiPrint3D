import React from "react";

const people = [
  {
    name: "Đỗ Hữu Thuận",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/dht.jpg"),
  },
  {
    name: "Lương Như Quỳnh",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/lmn.jpg"),
  },

  {
    name: "Trần Đăng Quang",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/qt.jpg"),
  },

  {
    name: "Lê Nguyễn",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/ln.jpg"),
  },

  {
    name: "Phạm Nhật Huy",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/nh.jpg"),
  },

  {
    name: "Phan Bá Lộc",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/loc.jpg"),
  },
  {
    name: "Phạm Hồng Việt",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/hv.jpg"),
  },
  {
    name: "Trịnh Trung Hiếu",
    role: "Co-Founder / CEO",
    imageUrl: require("../../../assets/images/users/people/ht2.jpg"),
  },
];

export default function AboutUsPage() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
            Thông tin về chúng tôi
          </h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {people.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-center gap-y-4"
              >
                <img
                  className="h-32 w-32 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
