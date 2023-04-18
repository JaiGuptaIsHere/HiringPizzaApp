import "./Footer.css";
import { useState } from "react";

function Footer(props) {
  function cartButtonHandler() {
    props.setShowCart(!props.showCart);
  }

  return (
    <div className="footer">
      <p className="thanksMessage">Thanks For Visiting Our Website...</p>
      {props.pizzasToBuy.length > 0 && (
        <button className="cartButton" onClick={cartButtonHandler}>
          {`${props.showCart ? "Go To Order Page" : "Go To Cart Page"}`}
        </button>
      )}
    </div>
  );
}

export default Footer;
