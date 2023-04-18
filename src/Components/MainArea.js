import Card from "./Card";
import { useEffect, useState } from "react";
const API = "https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68";

function MainArea() {
  const [pizzas, setPizzas] = useState([]);

  const fetchPizzas = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length !== 0) {
        setPizzas(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPizzas(API);
  }, []);
  return (
    <div>
      <Card pizzas={pizzas}></Card>
    </div>
  );
}

export default MainArea;
