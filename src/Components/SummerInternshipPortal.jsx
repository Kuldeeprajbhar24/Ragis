import { useState } from 'react';
import './SummerInternshipPortal.css'; 

const SummerInternshipPortal = ({ onStudentAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    uniqueId: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    loginType: "student" // 'student' or 'admin'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.uniqueId.trim()) newErrors.uniqueId = 'Unique ID is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!/^\d{10,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      setTimeout(() => {
        onStudentAdd(formData); // Add student to parent state
        alert(`Registration successful as ${formData.loginType}!`);
        setIsSubmitting(false);
        setFormData({
          name: "",
          uniqueId: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          loginType: "student"
        });
      }, 500);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="portal-container">
      <div className="welcome-section">
        <h1>Welcome to Summer Internship Portal</h1>
        <p>
          Click on <a href="/selected-students-list">Selected students list</a> to find your name and Unique ID
        </p>
        <p>
          If selected, proceed to <a href="/Login">Login</a> to begin your internship registration.
        </p>
      </div>

      <div className="form-section">
        <h2 className="form-header">
          {formData.loginType === 'admin' ? 'ADMIN REGISTER' : 'STUDENT REGISTER'}
        </h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          {/* Login Type */}
          <div className="form-group">
            <label>Login Type:</label>
            <div className="login-type">
              <div className="login-option">
                <input 
                  type="radio" 
                  id="student" 
                  name="loginType" 
                  value="student"
                  checked={formData.loginType === 'student'}
                  onChange={handleChange}
                />
                <label htmlFor="student">Student</label>
              </div>
              <div className="login-option">
                <input 
                  type="radio" 
                  id="admin" 
                  name="loginType" 
                  value="admin"
                  checked={formData.loginType === 'admin'}
                  onChange={handleChange}
                />
                <label htmlFor="admin">Admin</label>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Unique ID */}
          <div className="form-group">
            <label htmlFor="uniqueId">Unique ID:</label>
            <input
              type="text"
              id="uniqueId"
              name="uniqueId"
              value={formData.uniqueId}
              onChange={handleChange}
              className={`form-control ${errors.uniqueId ? 'error' : ''}`}
              placeholder={formData.loginType === 'admin' ? 'Enter admin ID' : 'Enter student ID'}
            />
            {errors.uniqueId && <span className="error-message">{errors.uniqueId}</span>}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`form-control ${errors.phoneNumber ? 'error' : ''}`}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? 'error' : ''}`}
              placeholder="Enter password (min 8 characters)"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'REGISTER'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SummerInternshipPortal;
