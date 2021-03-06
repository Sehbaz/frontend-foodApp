import Header from "../../common/header/Header";
import React, { useState, useEffect } from "react";
import SearchRes from "./SearchRes";
export default function Home() {
  const [error, setError] = useState(null);

  const [items, setItems] = useState([]);
  const [itemsDefault, setItemDefault] = useState();

  const [value, setValue] = React.useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/restaurant/")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.restaurants);
          setItemDefault(result.restaurants);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
  }, []);

  const handleChange = async (value) => {
    const filtered = itemsDefault.filter((item) => {
      return item.restaurant_name.toLowerCase().includes(value.toLowerCase());
    });
    setValue(value);
    setItems(filtered);
  };

  return (
    <div>
      <Header value={value} onChange={handleChange} />
      <SearchRes value={items} />
    </div>
  );
}
