import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/ProductPage.css";

const products = {
  1: {
    name: "Яблоки",
    description: "Свежие яблоки",
    price: 20,
    unit: "кг",
    image: "/images/apple.jpg",
  },
  2: {
    name: "Мандарины",
    description: "Сладкие мандарины",
    price: 25,
    unit: "кг",
    image: "/images/mandarin.jpg",
  },
  3: {
    name: "Картофель",
    description: "Органический картофель",
    price: 20,
    unit: "кг",
    image: "/images/potato.jpg",
  },
  4: {
    name: "Капуста",
    description: "Свежая капуста",
    price: 15,
    unit: "кг",
    image: "/images/cabbage.jpg",
  },
  5: {
    name: "Газированная вода",
    description: "Освежающая газированная вода",
    price: 10,
    unit: "л",
    image: "/images/gazWater.jpg",
  },
  6: {
    name: "Негазированная вода",
    description: "Чистая негазированная вода",
    price: 10,
    unit: "л",
    image: "/images/noGazWater.jpg",
  },
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products[id as unknown as keyof typeof products];

  const [quantity, setQuantity] = useState<number>(1);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [contactData, setContactData] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuantity(Number(event.target.value));
  };

  const totalPrice = product ? product.price * quantity : 0;

  const handleAddToCart = () => {
    setShowContactForm(true);
  };

  const handleOrder = () => {
    if (contactData) {
      setShowPopup(true);
      setShowContactForm(false);
    } else {
      alert("Пожалуйста, введите ваши контактные данные.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setContactData("");
  };

  if (!product) {
    return <p>Товар не найден.</p>;
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Главная", path: "/" },
          { label: product.name, path: "" },
        ]}
      />
      <h1>Интернет-магазин</h1>
      <>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "200px", marginBottom: "10px" }}
        />
        <p>{product.description}</p>
        <p>
          Цена за {product.unit}: {product.price} руб.
        </p>
        <p>Общая цена: {totalPrice} руб.</p>
        <label>
          Выберите объем:
          <select onChange={handleQuantityChange} value={quantity}>
            {product.unit === "кг" ? (
              <>
                <option value={1}>1 кг</option>
                <option value={2}>2 кг</option>
                <option value={5}>5 кг</option>
              </>
            ) : (
              <>
                <option value={1}>1 л</option>
                <option value={2}>2 л</option>
                <option value={5}>5 л</option>
              </>
            )}
          </select>
        </label>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Добавить в корзину
        </button>

        {showContactForm && (
          <div>
            <h3>Контактные данные</h3>
            <input
              type="text"
              maxLength={32}
              placeholder="Введите ваши данные"
              value={contactData}
              onChange={(e) => setContactData(e.target.value)}
            />
            <button onClick={handleOrder}>Заказать</button>
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Ваш заказ</h3>
              <p>Спасибо! Ваш заказ оформлен.</p>
              <p>
                {product?.name}: {quantity} {product?.unit}
              </p>
              <p>Цена: {totalPrice} руб.</p>
              <p>Ваши контакты: {contactData}</p>
              <button onClick={closePopup}>Закрыть</button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ProductPage;
