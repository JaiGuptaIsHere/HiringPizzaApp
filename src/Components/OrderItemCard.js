import "./OrderItemCard.css";
import { useEffect, useState } from "react";

function OrderItemCard(props) {
  const pizzasToBuy = props.pizzasToBuy;
  /*pizzasToBuy has array of the pizzas to buy */
  return (
    <div>
      {pizzasToBuy.map((pizza) => {
        let unit;
        if (pizza.unit < 1) {
          unit = 1;
        } else if (pizza.unit > 20) {
          unit = 20;
        } else {
          unit = pizza.unit;
        }
        let name = pizza.name;
        let isVeg = pizza.isVeg;
        let size = pizza.size;
        let price = pizza.price;
        let midToppings = pizza.toppings;
        let isSingleTopping = pizza.singleTopping;
        let toppings = [];
        if (midToppings.length === 0) {
          toppings.push("No Topping Chosen");
        } else if (isSingleTopping) {
          toppings.push(midToppings.at(0));
        } else {
          toppings = midToppings;
        }

        return (
          <div className="allOrders">
            <div className={`orderUnits ${isVeg ? "isVeg" : "isNonVeg"}`}>
              <div className="orderUnitsValue">{unit}</div>
            </div>
            <div className="orderName">{name}</div>
            <div>
              <div className="orderPrice orderDetailsFormat">
                <div className="orderPriceLabel">Price</div>
                <div className="orderPriceValue">{`Rs. ${price}`}</div>
              </div>
              <div className="orderSize orderDetailsFormat">
                <div className="orderSizeLabel">Size</div>
                <div className="orderSizeValue">{size}</div>
              </div>
              <div className="orderToppings orderDetailsFormat">
                <div className="orderToppingsLabel">Toppings</div>
                <div className="orderToppingsValue">
                  <div>{toppings}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderItemCard;
