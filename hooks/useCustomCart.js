import { useState, useEffect } from 'react';

const useCustomCart = () => {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCartData = localStorage.getItem('cartItems');
      if (savedCartData) {
        const parsedCartData = JSON.parse(savedCartData);
        const currentTime = Date.now();
        const timeLimit = 60 * 60 * 1000;
        
        if (currentTime - parsedCartData.timestamp < timeLimit) {
          setItems(parsedCartData.items);
        } else {
          // Cart data is too old; clear it
          localStorage.removeItem('cartItems');
        }
      }
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      const cartData = {
        items,
        timestamp: Date.now(), // Store the current time
      };
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    }
  }, [items, hydrated]);

  const addItem = (item) => {
    setItems([{
      ...item,
      quantity: 1,
    }]);
  };

  const cartTotal = items.reduce((total, item) => {
    const itemTotal = item.planPrec ? parseInt(item.planPrec) * item.quantity : 0;
    return total + itemTotal;
  }, 0);

  const removeItem = (id) => {
    setItems((prevItems) =>
      prevItems
        .map((i) => (i.id === id && i.quantity > 0 ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  // Add clearCart function
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cartItems'); // Remove cart data from localStorage
  };

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    isEmpty: items.length === 0,
    totalUniqueItems: items.length,
    cartTotal,
    hydrated,
  };
};

export default useCustomCart;
