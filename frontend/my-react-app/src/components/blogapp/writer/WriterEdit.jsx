import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function WriterEdit() {
  const baseUrl = "http://localhost:8081/api/writers"; // Update the base URL to point to the writers API
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming the writer ID is passed as a URL parameter
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    bio: "",
    profileImageUrl: "",
  });

  useEffect(() => {
    // Fetch the writer data by ID
    fetch(`${baseUrl}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching writer data:", error));
  }, [id]);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    fetch(`${baseUrl}/updateWriter/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/writer-list"); // Redirect after editing
      })
      .catch((error) => console.error("Error updating writer:", error));
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
      <h2>Edit Writer</h2>
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
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter writer's email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
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
          <div className="col-12 mb-3">
            <label htmlFor="profileImageUrl" className="form-label">
              Profile Image URL
            </label>
            <input
              type="text"
              id="profileImageUrl"
              name="profileImageUrl"
              className="form-control"
              placeholder="Enter profile image URL"
              value={formData.profileImageUrl}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-custom">
          Update Writer
        </button>
      </form>
    </div>
  );
}
