import React, { FormEvent } from "react";
import axios from "axios";

type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleRegistration = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          email,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        (error as any).response?.data.error || "Error registering user"
      );
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleRegistration}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
