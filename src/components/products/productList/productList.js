// import React, { useState, useEffect } from "react";

// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },

//   // More products...
// ];
// export default function ProductsListPage() {
//   return (
//     <>
//       <div>
//         <div className="bg-white">
//           <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center font-bold ">
//             Sản Phẩm Liên Hệ
//             <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//               {products.map((product) => (
//                 <div key={product.id} className="group relative">
//                   <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                     <img
//                       src={product.imageSrc}
//                       alt={product.imageAlt}
//                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                     />
//                   </div>
//                   <div className="mt-4 flex justify-between">
//                     <div>
//                       <h3 className="text-sm text-gray-700">
//                         <a href={product.href}>
//                           <span
//                             aria-hidden="true"
//                             className="absolute inset-0"
//                           />
//                           {product.name}
//                         </a>
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-500">
//                         {product.color}
//                       </p>
//                     </div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {product.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("https://localhost:7170/api/Product/GetAllProducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center font-bold ">
            Sản Phẩm Liên Hệ
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.slice(0, 24).map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.id}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.productName}
                        </a>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
