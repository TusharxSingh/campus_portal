import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ name: '', code: '', semester: '', department: '' });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('accessToken');

  const fetchCourses = () => {
    axios.get('http://localhost:8000/api/courses/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const url = editingId
      ? `http://localhost:8000/api/courses/${editingId}/`
      : 'http://localhost:8000/api/courses/';

    const method = editingId ? 'put' : 'post';

    axios[method](url, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        fetchCourses();
        setFormData({ name: '', code: '', semester: '', department: '' });
        setEditingId(null);
      })
      .catch(error => console.error('Error saving course:', error));
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditingId(course.id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/courses/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => fetchCourses())
      .catch(error => console.error('Error deleting course:', error));
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-danger text-white d-flex flex-column align-items-center p-3" style={{ width: '250px', minHeight: '100vh' }}>
        <img
          src="/defaulticon.png"
          alt="avatar"
          className="rounded-circle mb-3"
          width={100}
          height={100}
        />
        <h5 className="fw-bold text-capitalize">admin</h5>

        <ul className="nav flex-column text-center w-100 mt-4">
          <li className="nav-item border-bottom py-2"><a href="#" className="nav-link text-white">Dashboard</a></li>
          <li className="nav-item border-bottom py-2"><a href="#" className="nav-link text-white">About</a></li>
          <li className="nav-item border-bottom py-2"><a href="#" className="nav-link text-white">Profile Setting</a></li>
          <li className="nav-item border-bottom py-2"><a href="#" className="nav-link text-white">Change Pin</a></li>
          <li className="nav-item py-2">
            <a href="#" className="nav-link text-white">Logout</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#fdfae4', minHeight: '100vh' }}>
        <h4 className="fw-bold">
          Welcome <span className="text-danger">Sakshi</span>!
        </h4>
        <p className="text-muted mb-4">Stay Organised , Stay Ahead</p>

        <h3 className="fw-bold mb-3">Courses</h3>
        <p>Existing Courses</p>

        <table className="table table-hover bg-white shadow-sm rounded">
          <thead className="table-light">
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Semester</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.semester}</td>
                <td>{course.department}</td>
                <td>
                  <FaEdit onClick={() => handleEdit(course)} className="me-3 text-primary" style={{ cursor: 'pointer' }} />
                  <FaTrash onClick={() => handleDelete(course.id)} className="text-danger" style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form */}
        <div className="mt-4">
          <h5 className="fw-bold">{editingId ? 'Edit Course' : 'Add Course'}</h5>
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label">Course Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Course Code</label>
              <input type="text" className="form-control" name="code" value={formData.code} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Semester</label>
              <input type="number" className="form-control" name="semester" value={formData.semester} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Department</label>
              <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} />
            </div>
            <div className="col-md-2 d-grid">
              <button className={`btn ${editingId ? 'btn-primary' : 'btn-danger'}`} onClick={handleSubmit}>
                {editingId ? 'Update' : 'Add Course'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
