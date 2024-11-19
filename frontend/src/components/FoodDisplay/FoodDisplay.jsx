import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  // Corrected destructure to match the context value
  const { foodList } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((item) => {
          // Filtering based on category
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={item._id} // Using a unique key for each item
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null; // Explicitly returning null if the item doesn't match
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
