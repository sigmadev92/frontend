import React, { useState } from "react";
import axios from "axios";
export default function App() {
  const [staticData, setStaticData] = useState({
    fullName: "",
    emailId: "",
  });
  const [images, setImages] = useState([]);
  var { fullName, emailId } = staticData;
  function handleChangeText(e) {
    setStaticData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleChange(e) {
    setImages(Array.from(e.target.files));
    console.log(images);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (images.length == 0) return alert("Must pick at least 1 image");
    else if (images.length > 5) return alert("Images can't be more than 5");
    else {
    }
    const url = "http://localhost:4000/images";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image);
    });
    Object.keys(staticData).forEach((key) => {
      formData.append(key, staticData[key]);
    });
    console.log(formData);

    axios
      .post(url, formData, config)
      .then((res) => {
        if (res.data.status) {
          alert("Data inserted successfully");
          document.getElementById("fname").value = "";
        } else alert("MULTER_REACT_GATEWAY_PROBLEM");
      })
      .catch((err) => {
        console.log(err);
        alert("DATABASE ERROR");
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={handleChangeText}
          placeholder="Enter your full name"
          required
          id="fname"
        />
        <br />
        <input
          required
          type="email"
          name="emailId"
          value={emailId}
          onChange={handleChangeText}
          placeholder="Enter Email"
        />
        <br />

        <input type="file" name="images" onChange={handleChange} multiple="5" />

        <br />
        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
