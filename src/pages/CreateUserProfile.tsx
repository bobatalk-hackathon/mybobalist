import React, { FormEvent } from "react";
import axios from "axios";

const CreateUserProfile = () => {
  const [profileData, setProfileData] = React.useState({
    firstName: "",
    lastName: "",
    favoriteBoba: "",
    location: "", // Store the location as a string
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target as any;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const location = await axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
            )
            .then((response) => {
              return response.data.results[0].formatted;
            });
          setProfileData((prevData) => ({
            ...prevData,
            location: location,
          }));
        },
        (error) => {
          console.error("Error retrieving location:", error);
          alert("Error retrieving location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Making a POST request to create user profile
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/userprofile/create`,
        profileData,
        {
          withCredentials: true, // Send cookies with the request
        }
      );
      console.log("Profile created successfully:", response.data);
      // Reset form after successful submission
      setProfileData({
        firstName: "",
        lastName: "",
        favoriteBoba: "",
        location: "",
      });
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div>
      <h2>Create User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Favorite Boba:
          <input
            type="text"
            name="favoriteBoba"
            value={profileData.favoriteBoba}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleLocation}>
          Locate Me
        </button>
        <br />
        {profileData.location && (
          <p>Current Location: {profileData.location}</p>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUserProfile;
