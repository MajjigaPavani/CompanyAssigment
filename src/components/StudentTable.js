import React from "react";

function StudentTable({ students, handleEdit, handleDelete }) {

  return (
    <table
      border="1"
      style={{
        textAlign: "center",
        borderCollapse: "collapse",
        margin: "0 auto"
      }}
    >

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {students.map((student, index) => (
          <tr key={index}>

            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>

              <button onClick={() => handleEdit(index)}>Edit</button>

              <button
                onClick={() => handleDelete(index)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>

            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}

export default StudentTable;