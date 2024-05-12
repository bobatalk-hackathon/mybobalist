import React from "react";
import axios from "axios";

interface UserProfile {
  firstName: string;
  lastName: string;
  favoriteBoba: string;
  location: string;
  // Add more profile fields as needed
}

const ViewUserProfile = () => {
  const [userProfile, setUserProfile] = React.useState(
    null as UserProfile | null
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Make a GET request to fetch user profile data
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/userprofile/current`,
          { withCredentials: true }
        );
        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error fetching user profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile ? (
        <div>
          <p>First Name: {userProfile.firstName}</p>
          <p>Last Name: {userProfile.lastName}</p>
          <p>Favorite Boba: {userProfile.favoriteBoba || "N/A"}</p>
          <p>Location: {userProfile.location || "N/A"}</p>
          {/* Add more profile fields as needed */}
        </div>
      ) : (
        <div>No user profile found.</div>
      )}
    </div>
  );
};

export default ViewUserProfile;
