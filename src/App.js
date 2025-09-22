import { useState, useEffect } from "react";
import Data from "./data.json";

// const cartList = [
//   {
//     id: 4,
//     name: "Classic Tiramisu",
//     price: 5.5,
//     image: "/assets/images/image-tiramisu-thumbnail.jpg",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: "Vanilla Bean Crème Brûlée",
//     price: 7.0,
//     image: "./assets/images/image-creme-brulee-thumbnail.jpg",
//     quantity: 4,
//   },
//   {
//     id: 7,
//     name: "Red Velvet Cake",
//     price: 4.5,
//     image: "./assets/images/image-cake-thumbnail.jpg",
//     quantity: 2,
//   },
// ];

const dummyData = Data;
console.log(dummyData);

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const total = itemsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

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

  function handleConfirmation() {
    setIsOpen(true);
  }

  function handleReset() {
    setIsOpen(false);
    setItemsInCart([]);
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
        <Cart
          itemsInCart={itemsInCart}
          onRemoveItem={handleRemoveItem}
          onConfirmation={handleConfirmation}
          total={total}
        />
      </main>
      {isOpen && (
        <ConfirmationOrder
          isOpen={isOpen}
          itemsInCart={itemsInCart}
          total={total}
          onReset={handleReset}
        />
      )}
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

function Cart({ itemsInCart, onRemoveItem, onConfirmation, total }) {
  return (
    <aside className="cart">
      <h2>Your Cart ({itemsInCart.length})</h2>

      {itemsInCart.length > 0 ? (
        <>
          <CartItemsTotal
            itemsInCart={itemsInCart}
            onRemoveItem={onRemoveItem}
            total={total}
          />

          <div className="delivery">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <p>
              This is a <span>carbon-neutral</span> delivery
            </p>
          </div>
          <button className="confirm-order" onClick={onConfirmation}>
            Confirm Order
          </button>
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

function CartItemsTotal({ itemsInCart, onRemoveItem, total }) {
  return (
    <>
      <ul className="cart-items">
        {itemsInCart.map((item) => (
          <ItemInCart key={item.id} item={item} onRemoveItem={onRemoveItem} />
        ))}
      </ul>
      <div className="order-total">
        <h4>Order Total</h4>
        <p>${total.toFixed(2)}</p>
      </div>
    </>
  );
}

function ItemInCart({ item, onRemoveItem }) {
  const priceXQuantity = (item.price * item.quantity).toFixed(2);

  return (
    <li className="cart-item">
      <div className="item-info">
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

function ConfirmationOrder({ isOpen, itemsInCart, total, onReset }) {
  return (
    <div className={`popup-overlay ${isOpen ? "active" : ""}`}>
      <div className="confirmation-popup">
        <span>
          <img
            src="/assets/images/icon-order-confirmed.svg"
            alt="order confirmed"
          />
        </span>
        <h3>Order Confirmed</h3>
        <p>We hope you enjoy your order!</p>
        <ItemsInConfirmation itemsInCart={itemsInCart} total={total} />
        <button className="new-order" onClick={onReset}>
          Start new order
        </button>
      </div>
    </div>
  );
}
function ItemsInConfirmation({ itemsInCart, total }) {
  const items = itemsInCart.map((item) => item);
  console.log(itemsInCart);
  return (
    <div className="items-and-total">
      <ul className="cart-items">
        {items.map((item) => (
          <ItemInConfirm key={item.id} item={item} />
        ))}
      </ul>
      <div className="order-total">
        <h4>Order Total</h4>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
function ItemInConfirm({ item }) {
  const priceXQuantity = (item.price * item.quantity).toFixed(2);

  return (
    <li className="cart-item in-confirmation">
      <div className="item-details">
        <img className="thumbnail" src={item.image.thumbnail} alt={item.name} />
        <div className="item-info">
          <h5>{item.name}</h5>
          <div>
            <span>{item.quantity}x</span>
            <p className="price-of-piece">@ ${item.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <p className="price-x-quantity">${priceXQuantity}</p>
    </li>
  );
}
export default App;
