// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SummerInternshipPortal from './Components/SummerInternshipPortal';
import SelectedStudentsList from './Components/SelectedStudentsList';
import Login from './Components/Login';

function App() {
  // Load students from localStorage on first render
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });

  // Add a new student
  const handleStudentAdd = (newStudent) => {
    setStudents((prevStudents) => {
      const updated = [...prevStudents, newStudent];
      localStorage.setItem('students', JSON.stringify(updated)); // Save to localStorage
      return updated;
    });
  };

  // Delete a student
  const handleDeleteStudent = (uniqueId) => {
    setStudents((prevStudents) => {
      const updated = prevStudents.filter((s) => s.uniqueId !== uniqueId);
      localStorage.setItem('students', JSON.stringify(updated)); // Update localStorage
      return updated;
    });
  };

  // Handle login
  const handleLogin = (credentials) => {
    console.log('User logged in with:', credentials);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SummerInternshipPortal onStudentAdd={handleStudentAdd} />}
        />
        <Route
          path="/selected-students-list"
          element={
            <SelectedStudentsList
              students={students}
              onDelete={handleDeleteStudent}
            />
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
