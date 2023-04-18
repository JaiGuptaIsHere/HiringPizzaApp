import "./Card.css";
import { useState } from "react";
import Footer from "./Footer";
import OrderItemCard from "./OrderItemCard";

function Card(props) {
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState("");
  const [veg, setVeg] = useState(true);
  const [sorting, setSorting] = useState("");
  const [showPopup, isShowPopup] = useState(false);
  const [currentPizza, isCurrentPizza] = useState("");
  const [currentPizzaID, isCurrentPizzaID] = useState(0);
  const [currentPizzaTopping, isCurrentPizzaTopping] = useState(true);
  const [currentPizzaSize, setCurrentPizzaSize] = useState("Regular");
  const [currentPizzaPrice, setCurrentPizzaPrice] = useState(0);
  const [pizzasToBuy, setPizzasToBuy] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [pizzaUnit, setPizzaUnit] = useState(1);

  function filterHandler(e) {
    setFilter(e.target.name);
  }

  function sortingHandler(e) {
    setSorting(e.target.name);
  }

  const allPizzas = props.pizzas;
  let filteredPizzas = allPizzas;
  let sortedPizzas = filteredPizzas;

  if (filter === "") {
    filteredPizzas = allPizzas;
  }
  if (filter === "ov") {
    filteredPizzas = allPizzas.filter((currentPizza) => {
      return currentPizza.isVeg === true;
    });
  }
  if (filter === "onv") {
    filteredPizzas = allPizzas.filter((currentPizza) => {
      return currentPizza.isVeg === false;
    });
  }
  if (sorting === "") {
    sortedPizzas = filteredPizzas;
  }
  if (sorting === "rhtl") {
    sortedPizzas = filteredPizzas.sort((first, second) => {
      return second.rating - first.rating;
    });
  }
  if (sorting === "rlth") {
    sortedPizzas = filteredPizzas.sort((first, second) => {
      return first.rating - second.rating;
    });
  }
  if (sorting === "phtl") {
    sortedPizzas = filteredPizzas.sort((first, second) => {
      return second.price - first.price;
    });
  }
  if (sorting === "plth") {
    sortedPizzas = filteredPizzas.sort((first, second) => {
      return first.price - second.price;
    });
  }
  function toppingSelectHandler(e) {
    if (selectedToppings.includes(e.target.value)) {
      let index = selectedToppings.indexOf(e.target.value);
      selectedToppings.splice(index, 1);
    } else {
      setSelectedToppings([...selectedToppings, e.target.value]);
    }
  }

  function finalAdd() {
    const tempPizza = {
      unit: pizzaUnit,
      name: currentPizza,
      id: currentPizzaID,
      size: currentPizzaSize,
      toppings: selectedToppings,
      isVeg: veg,
      price: currentPizzaPrice,
      singleTopping: currentPizzaTopping,
    };

    setPizzasToBuy([...pizzasToBuy, tempPizza]);
    setPizzaUnit(1);
    isShowPopup(false);
    isCurrentPizza("");
    isCurrentPizzaID(0);
    setVeg(true);
    setCurrentPizzaPrice(0);
    setCurrentPizzaSize("Regular");
    setSelectedToppings([]);
    isCurrentPizzaTopping(true);
    setPizzaUnit(1);
  }

  function closePopup() {
    isShowPopup(false);
    isCurrentPizzaID(0);
    setVeg(true);
    setCurrentPizzaPrice(0);
    isCurrentPizza("");
    isCurrentPizzaID(0);
    isCurrentPizzaTopping(true);
    setCurrentPizzaSize("Regular");
    setSelectedToppings([]);
    setPizzaUnit(1);
  }

  return (
    <div>
      <div className={`${showCart ? "orderPage" : ""}`}>
        <div>
          <div className="menu">
            <button className="menuButton" name="plth" onClick={sortingHandler}>
              Price : Low to High
            </button>
            <button className="menuButton" name="phtl" onClick={sortingHandler}>
              Price : High to Low
            </button>
            <button className="menuButton" name="rlth" onClick={sortingHandler}>
              Rating : Low to High
            </button>
            <button className="menuButton" name="rhtl" onClick={sortingHandler}>
              Rating : High to Low
            </button>
            <button className="menuButton" name="ov" onClick={filterHandler}>
              Only Veg
            </button>
            <button className="menuButton" name="onv" onClick={filterHandler}>
              Only Non-Veg
            </button>
            <button className="menuButton" name="" onClick={filterHandler}>
              All Pizzas
            </button>
          </div>
          {showPopup && (
            <div className="popup stayOnTop">
              <div className="selectedPizza">
                <h2 className="selectedPizzaName">{currentPizza}</h2>
                <button className="popupControls" onClick={finalAdd}>
                  Add To Cart
                </button>

                <button className="popupControls" onClick={closePopup}>
                  Cancel
                </button>
              </div>
              <div className="customizations">
                <div className="selectSize">
                  <p>
                    <b>Select size:</b>
                  </p>
                  <div className="sizeOption">
                    <input
                      type="radio"
                      id="regular"
                      name="size"
                      value="Regular"
                      onChange={(e) => setCurrentPizzaSize(e.target.value)}
                    />
                    <label for="regular">Regular</label>
                  </div>
                  <div className="sizeOption">
                    <input
                      type="radio"
                      id="medium"
                      name="size"
                      value="Medium"
                      onChange={(e) => setCurrentPizzaSize(e.target.value)}
                    />
                    <label for="medium">Medium</label>
                  </div>
                  <div className="sizeOption">
                    <input
                      type="radio"
                      id="large"
                      name="size"
                      value="Large"
                      onChange={(e) => setCurrentPizzaSize(e.target.value)}
                    />
                    <label for="large">Large</label>
                  </div>
                  <input
                    className="quantityInput"
                    onChange={(e) => {
                      setPizzaUnit(e.target.value);
                    }}
                    type="number"
                    max={20}
                    min={1}
                    placeholder="Enter The Quantity"
                  ></input>
                </div>
                <div className="chooseToppings">
                  <p>
                    <b>Choose Topping(s):</b>
                  </p>
                  <div className="toppingOption">
                    <input
                      type="checkbox"
                      id="redPepper"
                      name="redPepper"
                      value="|Red Pepper|"
                      onChange={toppingSelectHandler}
                    />
                    <label for="redPepper">Red Pepper</label>
                  </div>
                  <div className="toppingOption">
                    <input
                      type="checkbox"
                      id="onion"
                      name="onion"
                      value="|Onion|"
                      onChange={toppingSelectHandler}
                    />
                    <label for="onion">Onion</label>
                  </div>
                  <div className="toppingOption">
                    <input
                      type="checkbox"
                      id="grilledMushroom"
                      name="grilledMushroom"
                      value="|Grilled Mushroom|"
                      onChange={toppingSelectHandler}
                    />
                    <label for="grilledMushroom">Grilled Mushroom</label>
                  </div>
                  <div className="toppingOption">
                    <input
                      type="checkbox"
                      id="extraCheese"
                      name="extraCheese"
                      value="|Extra Cheese|"
                      onChange={toppingSelectHandler}
                    />
                    <label for="extraCheese">Extra Cheese</label>
                  </div>
                  <div className="toppingOption">
                    <input
                      type="checkbox"
                      id="blackOlive"
                      name="blackOlive"
                      value="|Black Olive|"
                      onChange={toppingSelectHandler}
                    />
                    <label for="blackOlive">Black Olive</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {sortedPizzas.map((currentPizza) => {
          const { id, name, description, isVeg, rating, price, img_url } =
            currentPizza;
          const toppingVariety = currentPizza.toppings[0].isRadio;
          let descriptionBreak;
          for (let i = 0; i < description.length; i++) {
            if (description.charAt(i) === " " && i > 35) {
              descriptionBreak = i + 1;
              break;
            }
          }

          function addButtonHandler() {
            if (toppingVariety === true) {
              alert(
                "This Pizza Has Only Single-Topping Option. The First Topping You Choose Will Be Added To Your Order. In Case Of Any Confusion, You May Cancel The Pop-Up and Select Again"
              );
            }
            isShowPopup(true);
            setCurrentPizzaPrice(price);
            setVeg(isVeg);
            isCurrentPizza(name);
            isCurrentPizzaID(id);
            isCurrentPizzaTopping(toppingVariety);
          }
          return (
            <div className={`fullCard ${isVeg ? "veg" : "nonVeg"}`}>
              <div className="allDetails">
                <div className="name detail">{name}</div>
                <div className="price detail">{`Rs. ${price}`}</div>
                <div className="rating detail">{`${rating}/5 Stars`}</div>
                <div className="description detail">
                  {description.substring(0, descriptionBreak)}
                  <br></br>
                  {description.substring(descriptionBreak)}
                </div>
                <div className="addOption detail">
                  <div className="addWidget" onClick={addButtonHandler}>
                    ADD
                  </div>
                </div>
              </div>
              <img className="image" src={img_url}></img>
            </div>
          );
        })}
      </div>
      {showCart && (
        <div className="cartPage">
          <div className="cartPageHeading">
            <h2>Cart Page</h2>
          </div>
          <OrderItemCard pizzasToBuy={pizzasToBuy}></OrderItemCard>
        </div>
      )}
      <Footer
        pizzasToBuy={pizzasToBuy}
        setShowCart={setShowCart}
        showCart={showCart}
      ></Footer>
    </div>
  );
}

export default Card;
