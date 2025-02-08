import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = {
  fruits: [
    { id: 1, name: "Яблоки", price: 20 },
    { id: 2, name: "Мандарины", price: 25 },
  ],
  vegetables: [
    { id: 3, name: "Картофель", price: 20 },
    { id: 4, name: "Капуста", price: 15 },
  ],
  water: [
    { id: 5, name: "Газированная вода", price: 10 },
    { id: 6, name: "Негазированная вода", price: 10 },
  ],
};

const categories = [
  { name: "Фрукты", image: "/images/fruits.jpg", products: products.fruits },
  {
    name: "Овощи",
    image: "/images/vegetables.jpg",
    products: products.vegetables,
  },
  { name: "Вода", image: "/images/water.jpg", products: products.water },
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: number;
  }) => {
    console.log("Добавлено в корзину:", product);
  };
  return (
    <>
      <h1>Интернет-магазин</h1>
      <input
        type="text"
        placeholder="Поиск"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="categories">
        {categories.map((category, index) => {
          const filteredProducts = category.products.filter((product) =>
            product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
          return (
            <div key={index} className="category">
              <h2>{category.name}</h2>
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
              <div className="product-category">
                {filteredProducts.length === 0 ? (
                  <p>Товары не найдены.</p>
                ) : (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
