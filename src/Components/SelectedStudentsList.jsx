import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./SelectedStudentsList.css";

const SelectedStudentsList = ({ students, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.uniqueId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (uniqueId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      onDelete(uniqueId);
    }
  };

  return (
    <div className="students-list-container">
      <nav className="students-list-nav">
        <Link to="/" className="back-button">← Back to Registration</Link>
        <h1>Selected Internship Candidates</h1>
      </nav>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span>{filteredStudents.length} students found</span>
      </div>

      {filteredStudents.length > 0 ? (
        <div className="students-grid">
          {filteredStudents.map((student) => (
            <div key={student.uniqueId} className="student-card">
              <div className="student-info">
                <h3>{student.name}</h3>
                <p>ID: {student.uniqueId}</p>
                <p>Email: {student.email}</p>
                <p>Phone: {student.phoneNumber}</p>
              </div>
              {/* Display Admin if loginType is admin, otherwise Selected */}
              <span className="status-badge">
                {student.loginType === 'admin' ? 'Admin' : 'Selected'}
              </span>
              <button onClick={() => handleDelete(student.uniqueId)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No students found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default SelectedStudentsList;
