import { useState } from "react";
import Star from "./Star";
function UseStateObject() {
  const [contact, setContact] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (719) 555-1212",
    email: "itsmyrealname@example.com",
    isFavorite: true,
  });
  function toggleFavorite() {
    setContact((prevContact) => ({
      ...prevContact,
      isFavorite: !prevContact.isFavorite,
    }));
  }
  return (
    <>
      <div className="card">
        <p>useState basic vlaue</p>
        <Star isFilled={contact.isFavorite} handleClick={toggleFavorite} />
      </div>
    </>
  );
}

export default UseStateObject;
