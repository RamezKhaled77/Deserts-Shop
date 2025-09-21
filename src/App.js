import { useState, useEffect } from "react";
import Data from "./data.json";

const itemsInCart = [
  {
    name: "Classic Tiramisu",
    price: 5.5,
    image: "/assets/images/image-tiramisu-thumbnail.jpg",
    quantity: 1,
  },
  {
    name: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    image: "./assets/images/image-creme-brulee-thumbnail.jpg",
    quantity: 4,
  },
  {
    name: "Red Velvet Cake",
    price: 4.5,
    image: "./assets/images/image-cake-thumbnail.jpg",
    quantity: 2,
  },
];

const dummyData = Data;
console.log(dummyData);

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <main className="App">
        <ProductsList isMobile={isMobile} />
        <Cart />
      </main>
    </>
  );
}

function Header() {
  return <header>Deserts Shop</header>;
}

function ProductsList({ isMobile }) {
  return (
    <ul className="product-list">
      {dummyData.map((item) => (
        <ProductItem key={item.name} item={item} isMobile={isMobile} />
      ))}
    </ul>
  );
}
function ProductItem({ item, isMobile }) {
  const { desktop, mobile } = item.image;
  return (
    <li className="product">
      <figure>
        <img src={isMobile ? mobile : desktop} alt={item.name} />
        <AddToCartBtn />
      </figure>
      <figcaption>
        <h4>{item.category}</h4>
        <h3>{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
      </figcaption>
    </li>
  );
}

function AddToCartBtn() {
  return (
    <button className="add-to-cart">
      <img src="/assets/images/icon-add-to-cart.svg" alt="add to cart" />
      Add to Cart
    </button>
  );
}

function Cart() {
  return (
    <aside className="cart">
      <h2>Your Cart (X)</h2>
      <ul>
        {itemsInCart.map((item) => (
          <ItemInCart key={item.name} item={item} />
        ))}
      </ul>
      <div className="order-total">
        <h4>Order Total</h4>
        <p>X.xx</p>
      </div>
      <div className="delivery">
        <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
        <p>
          This is a <span>carbon-neutral</span> delivery
        </p>
      </div>
      <button className="confirm-order">Confirm Order</button>
    </aside>
  );
}

function ItemInCart({ item }) {
  const priceXQuantity = (item.price * item.quantity).toFixed(2);

  return (
    <li>
      <div>
        <h5>{item.name}</h5>
        <div>
          <span>{item.quantity}x</span>
          <p className="price-of-piece">@ ${item.price.toFixed(2)}</p>
          <p className="price-x-quantity">${priceXQuantity}</p>
        </div>
      </div>
      <button>
        <img src="/assets/images/icon-remove-item.svg" alt="remove item" />
      </button>
    </li>
  );
}

export default App;
