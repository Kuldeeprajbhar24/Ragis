import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ students = [] }) {  // default to empty array
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

    if (!credentials.uniqueId.trim() || !credentials.password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if user exists
    const userFound = students.find(
      (student) =>
        student.uniqueId === credentials.uniqueId &&
        student.password === credentials.password &&
        (student.loginType || 'student') === credentials.loginType
    );

    if (userFound) {
      alert(`Welcome, ${userFound.name || 'User'}!`);
      navigate('/'); // Redirect to Home page
    } else {
      alert("Invalid Unique ID or Password.");
    }
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
