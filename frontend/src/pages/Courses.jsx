import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
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
      <Sidebar />
      <div className="container mt-4">
        <h2 className="mb-3">Courses</h2>
        <p>Existing Courses</p>
        <table className="table table-bordered">
          <thead>
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
                  <FaEdit onClick={() => handleEdit(course)} className="me-2 text-primary" style={{ cursor: 'pointer' }} />
                  <FaTrash onClick={() => handleDelete(course.id)} className="text-danger" style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <h5>{editingId ? 'Edit Course' : 'Add Course'}</h5>
          <div className="row g-2">
            <div className="col-md-3">
              <input type="text" className="form-control" name="name" placeholder="Course Name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name="code" placeholder="Course Code" value={formData.code} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100" onClick={handleSubmit}>
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
