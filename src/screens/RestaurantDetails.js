import React, { useEffect, useState } from "react";
import RestDetailsCover from "../components/RestDetailsCover";
import FoodCategories from "../components/FoodCategories";
import MenuDetails from "../components/MenuDetails";
import Cart from "../components/Cart";
import { useLocation } from "react-router-dom";

const RestaurantDetails = (props) => {
  const [cartItemsList, setcartItemsList] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [showCartList, setshowCartList] = useState(false);
  const location = useLocation();
  // Use data to access restaurant related details like profile img, username, category, dish for various purposes
  const { data } = location.state;

  const addToCart = (item) => {
    if (item) {
      cartItemsList.push(item);
      settotalPrice(totalPrice + Number(item.itemPrice));
      setcartItemsList(cartItemsList);
      setshowCartList(true);
    }
  };

  const removeCartItem = (itemIndex) => {
    const removedItemPrice = Number(cartItemsList[itemIndex].itemPrice);
    cartItemsList.splice(itemIndex, 1);
    settotalPrice(totalPrice - removedItemPrice);
    setcartItemsList(cartItemsList);
  };

  return (
    <div>
      <RestDetailsCover
        userName={data.userName}
        restName={data.restName}
        userProfileImageUrl={data.userProfileImageUrl}
      />
      <div className="container-fluid bg-slate-200">
        <div className="container mx-auto">
          <div className="flex mx-auto flex-col md:flex-row lg:flex-row sm:space-x-0  md:space-x-4 lg:space-x-4 pt-10 pl-20 pb-10 ml-10">
            <div className="w-1/3 justify-center">
              <FoodCategories />
            </div>
            <div className="w-2/3 flex justify-center">
              <MenuDetails />
            </div>
            <div className="w-1/3 justify-center">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
