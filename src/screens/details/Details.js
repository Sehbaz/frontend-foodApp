import Header from "../../common/header/Header";

import React, { useState, useEffect } from "react";
const Details = (props) => {
  useEffect(() => {
    fetch("http://localhost:8080/api/restaurant/name/" + props.value)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.restaurants[0]);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
      );
  }, []);

  /*
  fetch("http://localhost:8080/api/restaurant/name" + props)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
    */
  return (
    <div>
      <Header />
      Hello I am from details page
    </div>
  );
};
export default Details;
