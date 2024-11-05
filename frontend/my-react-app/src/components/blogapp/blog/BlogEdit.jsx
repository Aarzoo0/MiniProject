import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogEdit() {
  const baseUrl = "http://localhost:8081/api/blogs";
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming the blog ID is passed as a URL parameter
  const [formData, setFormData] = useState({
    blogId: "",
    blogTitle: "",
    blogContent: "",
    blogPublished: "",
    blogImageUrl: "",
    rating: 0,
    blogWriterId: "",
  });

  const [writers] = useState([
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Charlie Brown" },
    { id: "4", name: "Diana Prince" },
  ]);

  useEffect(() => {
    // Fetch the blog data by ID
    fetch(`${baseUrl}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching blog data:", error));
  }, [id]);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    fetch(`${baseUrl}/updateBlog/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/blog-list"); // Redirect after editing
      })
      .catch((error) => console.error("Error updating blog:", error));
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
      <h2>Edit Blog</h2>
      <form
        onSubmit={handleFormSubmit}
        className="mb-4 card p-4 shadow-lg"
        style={{ backgroundColor: "#2c2c2c", color: "#ffffff" }}
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="blogTitle" className="form-label">
              Blog Title
            </label>
            <input
              type="text"
              id="blogTitle"
              name="blogTitle"
              className="form-control"
              placeholder="Enter blog title"
              value={formData.blogTitle}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="blogPublished" className="form-label">
              Published Date
            </label>
            <input
              type="date"
              id="blogPublished"
              name="blogPublished"
              className="form-control"
              value={formData.blogPublished}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="blogContent" className="form-label">
              Content
            </label>
            <textarea
              id="blogContent"
              name="blogContent"
              className="form-control"
              placeholder="Enter blog content"
              value={formData.blogContent}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="blogImageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              id="blogImageUrl"
              name="blogImageUrl"
              className="form-control"
              placeholder="Enter image URL"
              value={formData.blogImageUrl}
              onChange={handleFormChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              className="form-control"
              placeholder="Enter rating"
              value={formData.rating}
              onChange={handleFormChange}
              min="0"
              max="5"
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="blogWriterId" className="form-label">
              Writer ID
            </label>
            <select
              id="blogWriterId"
              name="blogWriterId"
              className="form-select"
              value={formData.blogWriterId}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Writer ID</option>
              {writers.map((writer) => (
                <option key={writer.id} value={writer.id}>
                  {writer.name} ({writer.id})
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-custom">
          Update Blog
        </button>
      </form>
    </div>
  );
}
