import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    uniqueId: "",
    password: "",
    loginType: "student" // Default to student
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if uniqueId and password are filled
    if (!credentials.uniqueId || !credentials.password) {
      alert("Please fill in all fields.");
      return;
    }

    // Remove the check for uniqueId and password being the same
    // You can add your own logic to verify the uniqueId and password against your database here

    // Call the onLogin function with credentials
    onLogin(credentials);
    navigate('/');
  };

  return (
    <main className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} noValidate>
        <div className="login-type">
          <label>
            <input
              type="radio"
              name="loginType"
              value="student"
              checked={credentials.loginType === 'student'}
              onChange={handleChange}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="loginType"
              value="admin"
              checked={credentials.loginType === 'admin'}
              onChange={handleChange}
            />
            Admin
          </label>
        </div>

        <label htmlFor="uniqueId">Unique ID:</label>
        <input
          id="uniqueId"
          name="uniqueId"
          type="text"
          placeholder="Enter your Unique ID"
          value={credentials.uniqueId}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">LOGIN</button>
      </form>
    </main>
  );
}
