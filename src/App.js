import { useState, useEffect } from "react";
import Data from "./data.json";

const cartList = [
  {
    id: 4,
    name: "Classic Tiramisu",
    price: 5.5,
    image: "/assets/images/image-tiramisu-thumbnail.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    image: "./assets/images/image-creme-brulee-thumbnail.jpg",
    quantity: 4,
  },
  {
    id: 7,
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
  const [itemsInCart, setItemsInCart] = useState([]);
  // const [quantity, setQuantity] = useState(1);

  function handleAddToCart(item) {
    const newItem = { ...item, quantity: 1 };
    setItemsInCart([newItem, ...itemsInCart]);
    console.log(newItem);
  }

  function handleRemoveItem(id) {
    setItemsInCart((prev) => prev.filter((item) => item.id !== id));
  }

  function handleDecrement(id) {
    if (itemsInCart.find((item) => item.id === id).quantity === 1) return;

    setItemsInCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleIncrement(id) {
    setItemsInCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <main className="App">
        <ProductsList
          isMobile={isMobile}
          onAddItem={handleAddToCart}
          itemsInCart={itemsInCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <Cart itemsInCart={itemsInCart} onRemoveItem={handleRemoveItem} />
      </main>
    </>
  );
}

function Header() {
  return <header>Deserts Shop</header>;
}

function ProductsList({
  isMobile,
  onAddItem,
  itemsInCart,
  onIncrement,
  onDecrement,
}) {
  return (
    <ul className="product-list">
      {dummyData.map((item) => (
        <ProductItem
          key={item.id}
          item={item}
          onAddItem={onAddItem}
          isMobile={isMobile}
          itemsInCart={itemsInCart}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </ul>
  );
}
function ProductItem({
  item,
  isMobile,
  onAddItem,
  itemsInCart,
  onIncrement,
  onDecrement,
}) {
  const { desktop, mobile } = item.image;
  const isInCart = itemsInCart.some((i) => i.id === item.id);
  // console.log(quantity);
  return (
    <li className={`product ${isInCart ? "in-cart" : ""}`}>
      <figure>
        <img src={isMobile ? mobile : desktop} alt={item.name} />
        {isInCart ? (
          <EditQuantityBtn
            itemsInCart={itemsInCart}
            id={item.id}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
          />
        ) : (
          <AddToCartBtn onClick={() => onAddItem(item)} />
        )}
      </figure>
      <figcaption>
        <h4>{item.category}</h4>
        <h3>{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
      </figcaption>
    </li>
  );
}

function AddToCartBtn({ onClick }) {
  return (
    <button className="add-to-cart" onClick={onClick}>
      <img src="/assets/images/icon-add-to-cart.svg" alt="add to cart" />
      Add to Cart
    </button>
  );
}

function EditQuantityBtn({ itemsInCart, id, onIncrement, onDecrement }) {
  return (
    <div className="edit-quantity">
      <button className="decrement" onClick={() => onDecrement(id)}>
        -
      </button>
      <span>{itemsInCart.find((i) => i.id === id).quantity}</span>
      <button className="increment" onClick={() => onIncrement(id)}>
        +
      </button>
    </div>
  );
}

function Cart({ itemsInCart, onRemoveItem }) {
  const total = itemsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <aside className="cart">
      <h2>Your Cart ({itemsInCart.length})</h2>

      {itemsInCart.length > 0 ? (
        <>
          <CartItems itemsInCart={itemsInCart} onRemoveItem={onRemoveItem} />
          <div className="order-total">
            <h4>Order Total</h4>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="delivery">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <p>
              This is a <span>carbon-neutral</span> delivery
            </p>
          </div>
          <button className="confirm-order">Confirm Order</button>
        </>
      ) : (
        <div className="empty-cart">
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt="empty cart"
          />
          <p>Your added items will appear here</p>
        </div>
      )}
    </aside>
  );
}

function CartItems({ itemsInCart, onRemoveItem }) {
  return (
    <ul>
      {itemsInCart.map((item) => (
        <ItemInCart key={item.id} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
}

function ItemInCart({ item, onRemoveItem }) {
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
      <button className="remove-item" onClick={() => onRemoveItem(item.id)}>
        <img src="/assets/images/icon-remove-item.svg" alt="remove item" />
      </button>
    </li>
  );
}

export default App;
