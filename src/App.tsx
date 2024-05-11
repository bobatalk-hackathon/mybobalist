import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/boba/top-shops/united-states"
        ); // Adjust URL as necessary
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Boba Shops</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default App;
