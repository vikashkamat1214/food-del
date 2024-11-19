import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios for API requests
import { food_list as initialFoodList } from "../assets/assets"; // Renaming import to avoid conflict

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const url = "http://localhost:4000"; // Base URL for API requests
  const [foodList, setFoodList] = useState(initialFoodList || []); // Corrected state name

  // Function to add items to the cart
  const addToCart = async (itemId) => {
    // Check if the item is already in the cart
    if (!cartItems[itemId]) {
      // Add item to the cart with a quantity of 1 if it doesn't exist
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      // Increment the quantity of the item if it already exists in the cart
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  
    // Make an API call if the user is authenticated (has a token)
    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Function to remove items from the cart
  const removeFromCart = async (itemId) => {
     setCartItems((prev) => ({...prev, [itemId]: prev[itemId] -1 }))
     if(token){
      await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}})
     }
  };

  // Calculate the total amount in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = foodList.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  // Fetch the list of food items from the server
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token) => {
      const response = await axios.post(url+"/api/cart/get", {} , {headers:{token}});
       setCartItems(response.data.cartData);
  }

  // Effect to load initial data and check for token in localStorage
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
     if(localStorage.getItem("token")){
       setToken(localStorage.getItem("token"));
       await loadCartData(localStorage.getItem("token"));
     }
    };
    loadData();
  }, []);

  // Context value to be provided to children
  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
