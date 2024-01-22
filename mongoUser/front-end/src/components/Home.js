import React from "react";
import { useState } from "react";
import "../css/userForm.css";
export const Home = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id, setId] = useState("");
  const [dob, setDob] = useState("");

  const createNewUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/user/create-new-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        surname,
        id,
        dob,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      alert("user added to database!");
    } else {
      alert("ID number already in use.");
    }
  };
  const formatDate = (dob) => {
    const dateRegex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;

    if (dateRegex.test(dob)) {
      const [year, month, day] = dob.split("/");
      // Use leading zeros for day and month
      const formattedDate = new Date(
        `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`
      );
      return formattedDate.toLocaleDateString("en-GB");
    } else {
      console.error("Invalid date format:", dob);
      return dob;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDob(formatDate(value));
  };

  const clearForm = () => {
    window.location.href = "/";
  };

  return (
    <div className="form">
      <form onSubmit={createNewUser}>
        <h1>User Form</h1>
        <input
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <br />
        <input
          value={surname}
          required
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Surname"
        />
        <br />
        <input
          value={id}
          required
          maxLength={13}
          type="number"
          onChange={(e) => setId(e.target.value)}
          placeholder="idNo"
        />
        <p>ID number can only be used once*</p>
        <label for="start">Date Of Birth:</label>
        <br />
        <input
          type="text"
          value={dob}
          required
          onChange={handleInputChange}
          placeholder="dd/mm/yyyy"
        />
        <br />
        <button type="submit">Submit</button>
        <button onClick={clearForm} type="reset">
          Cancel
        </button>
      </form>
    </div>
  );
};
