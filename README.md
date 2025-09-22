# 🍰 Desserts Shop – React Cart App

## 📌 Overview

Desserts Shop is a responsive e-commerce cart application built with **React**.  
It allows users to browse dessert products, add/remove items to/from the cart, adjust item quantities, confirm their order, and reset the cart.

The project also ensures **accessibility** by supporting keyboard navigation and focus states, and is fully responsive across desktop and mobile devices.

---

## 🚀 Features

- 🛒 Add items to the cart and remove them
- ➕➖ Increase / decrease item quantity in the cart
- 💰 View order total dynamically as items are added or updated
- ✅ See an **order confirmation popup** with cart summary when confirming
- 🔄 Reset the cart and start a new order
- 📱 Responsive design (desktop & mobile images)
- 🎨 Hover and focus states for all interactive elements
- 🖼️ Smooth popup overlay with scroll lock when open

---

## 🛠️ Tech Stack

- **React** (functional components + hooks)
- **CSS** for styling & responsiveness
- **JSON data** for product information

---

## 📂 Project Structure

`src/
│── App.jsx # Root component │── data.json # Product data (id, name, price, category, images) │── components/
│    ├── Header.jsx
│    ├── ProductsList.jsx
│    ├── ProductItem.jsx
│    ├── AddToCartBtn.jsx
│    ├── EditQuantityBtn.jsx
│    ├── Cart.jsx
│    ├── CartItemsTotal.jsx
│    ├── ItemInCart.jsx
│    ├── ConfirmationOrder.jsx
│    ├── ItemsInConfirmation.jsx
│    └── ItemInConfirm.jsx
│── assets/ # Images & icons │── styles/ # CSS files`

---

## ⚙️ Core Logic

### 1. **State Management**

- `itemsInCart`: Array of cart items with `id, name, price, image, quantity`.
- `isMobile`: Boolean for responsive image selection (mobile vs desktop).
- `isOpen`: Boolean for showing/hiding the confirmation popup.

### 2. **Cart Operations**

- **Add item**: Adds new item with quantity `1`.
- **Remove item**: Filters out item by `id`.
- **Increment/Decrement**: Updates quantity (min = 1).
- **Reset**: Clears cart + closes confirmation popup.

### 3. **Responsive Images**

- Each product has `{ desktop, mobile, thumbnail }`.
- Selected based on `window.innerWidth <= 768`.

### 4. **Popup Overlay**

- Locks scroll when open (`document.body.style.overflow = hidden`).
- Displays order summary with all items + total.

---

## 🔮 Future Improvements

- Add localStorage to persist cart state after refresh
- Add animations (Framer Motion) for popup and cart interactions
- Add product filters (categories, price range)
- Connect to a backend API for real products

---

## 👨‍💻 Author

Developed by **Ramez Khaled** ✨
