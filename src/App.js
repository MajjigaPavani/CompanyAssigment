import React, { useState } from "react";
import initialStudents from "./data";
import { saveAs } from "file-saver"; // for Excel download

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  <p>
    i was deployed to netlify
  </p>

  // Validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Add or Update Student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age || !formData.percentage) {
      alert("All fields are required!");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (isEditing) {
        setStudents(
          students.map((student) =>
            student.id === editId
              ? { ...student, ...formData, age: Number(formData.age), percentage: Number(formData.percentage) }
              : student
          )
        );
        setIsEditing(false);
        setEditId(null);
      } else {
        const newStudent = {
          id: students.length + 1,
          ...formData,
          age: Number(formData.age),
         
        };
        setStudents([...students, newStudent]);
      }

      setFormData({ name: "", email: "", age: "",  });
      setLoading(false);
    }, 1000); // Simulate loading
  };

  // Edit student
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      age: student.age,
      
    });
    setIsEditing(true);
    setEditId(student.id);
  };

  // Delete student with confirmation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  // Download Excel (CSV format)
  const downloadExcel = () => {
    const headers = ["Name", "Email", "Age", "Percentage"];
    const rows = students.map((s) => [s.name, s.email, s.age, s.percentage]);
    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "students.csv");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Students Table</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
       
        <button type="submit">{isEditing ? "Update Student" : "Add Student"}</button>
      </form>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Excel Download */}
      <button onClick={downloadExcel} style={{ marginBottom: "10px" }}>
        Download Excel
      </button>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
          
              <td>
                <button onClick={() => handleEdit(student)} style={{ marginRight: "5px" }}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;