// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SummerInternshipPortal from './Components/SummerInternshipPortal';
import SelectedStudentsList from './Components/SelectedStudentsList';
import Login from './Components/Login';
function App() {
  const [students, setStudents] = useState([]);

  const addStudent = (student) => {
    setStudents(prev => [...prev, student]);
  };

  const handleLogin = (credentials) => {
    console.log('User  logged in with:', credentials);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<SummerInternshipPortal onStudentAdd={addStudent} />} 
        />
        <Route 
          path="/selected-students-list" 
          element={<SelectedStudentsList students={students} />} 
        />
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
      </Routes>
    </Router>
  );
}
export default App;
