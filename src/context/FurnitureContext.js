import { createContext, useContext, useState, useEffect } from 'react';
import { getFurnitureItems } from '../services/api';

const FurnitureContext = createContext();

export function FurnitureProvider({ children }) {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const items = await getFurnitureItems();
        setFurnitureItems(items);
      } catch (error) {
        console.error('Error fetching furniture:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFurniture();
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  return (
    <FurnitureContext.Provider value={{ furnitureItems, cart, loading, addToCart }}>
      {children}
    </FurnitureContext.Provider>
  );
}

export const useFurniture = () => useContext(FurnitureContext);