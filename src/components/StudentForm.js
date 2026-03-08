import React from "react";

function StudentForm({ formData, handleChange, handleSubmit, editIndex }) {

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>

      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginLeft: "10px" }}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          style={{ marginLeft: "10px" }}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>
          {editIndex !== null ? "Update" : "Save"}
        </button>

      </form>

    </div>
  );
}

export default StudentForm;