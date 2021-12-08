import React from "react";
import Card from "./Card";
const CardList = ({ robots }) => {
  const cardComponent = robots.map((user, i) => {
    return <Card key={i} id={user.id} name={user.name} email={user.email} />;
  });
  return (
    <div>
      <React.StrictMode>{cardComponent}</React.StrictMode>,
    </div>
  );
};

export default CardList;
