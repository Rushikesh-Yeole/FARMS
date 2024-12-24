import React from 'react';
import { Link } from 'react-router-dom';

function Product() {
  const categories = [
    { name: 'Beans', image: 'https://via.placeholder.com/100', link: '/products/beans' },
    { name: 'Cereals', image: 'https://via.placeholder.com/100', link: '/products/cereals' },
    { name: 'Vegetables', image: 'https://via.placeholder.com/100', link: '/products/vegetables' },
    { name: 'Fruits', image: 'https://via.placeholder.com/100', link: '/products/fruits' },
  ];

  return (
    <div className="bg-green-50 py-8">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Product Categories</h2>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transform duration-200"
              />
            </div>
            <span className="mt-2 text-green-700 font-medium group-hover:text-green-800">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;
