import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WriterAdd() {
  const baseUrl = "http://localhost:8081/api/writers"; 
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    blogs: "",
   
  });

  const [formErrorData, setFormErrorData] = useState({
    name: true,
    blogs:true
  });

  function handleFormChange(event) {
    const { name, value } = event.target;

    setFormErrorData((prev) => ({
      ...prev,
      [name]: event.target.validity.valid,
    }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    fetch(`${baseUrl}/addWriter`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log response data if needed
        navigate("/writer-list"); // Redirect to the writer list page after adding
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#1c1c1c",
        color: "#ffffff",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <button
        onClick={() => setShowForm(!showForm)}
        className="btn btn-outline-light mb-4"
      >
        {showForm ? "Hide Add Writer Form" : "Add New Writer"}
      </button>
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-4 card p-4 shadow-lg"
          style={{ backgroundColor: "#2c2c2c", color: "#ffffff" }}
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter writer's name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="col-12 mb-3">
              <label htmlFor="bio" className="form-label">
                Blogs
              </label>
              <textarea
                id="bio"
                name="bio"
                className="form-control"
                placeholder="Enter a brief bio"
                value={formData.bio}
                onChange={handleFormChange}
              />
            </div>

          </div>
          <button type="submit" className="btn btn-custom">
            Add Writer
          </button>
        </form>
      )}
    </div>
  );
}
