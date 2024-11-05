import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function BlogAdd() {
  const baseUrl = "http://localhost:8081/api/blogs";
  const writersUrl="http://localhost:8082/api/writers";

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    blogId: "",
    blogTitle: "",
    blogContent: "",
    blogPublished: "",
    blogImageUrl: "",
    rating: 0,
    blogWriterId: "",
  });

  const [formErrorData, setFormErrorData] = useState({
    blogTitle: true,
    blogContent: true,
    blogPublished: true,
    blogWriterId: true,
  });

  //  writers data
  const [writers, setWriters] = useState([]);

  const loadWriters = () => {
    fetch(writersUrl)
      .then((res) => res.json())  
      .then((data) => {
        setWriters(data);  
      })
      .catch((err) => console.error("Error fetching writers:", err));  // Handle errors if the fetch fails
  };
  // Fetch writers when the component mounts
  useEffect(() => {
    loadWriters();
  }, []);
  

  function handleFormChange(event) {
   setFormErrorData({
    ...formErrorData,[event.target.name]:event.target.validity.valid,

   });

   setFormData({...formData,[event.target.name]:event.target.value});
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    // Add the new blog to the backend via a POST request
    fetch(`${baseUrl}/postBlog`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Blog added successfully:", data); // Log response data if needed

        // Redirect to the blog list page after adding the blog
        navigate("/blogapp/blog-list");
      })
      .catch((error) => console.error("Error adding blog:", error));
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
        {showForm ? "Hide Add Blog Form" : "Add New Blog"}
      </button>
      {showForm && (
        <form
          onSubmit={(e)=>handleFormChange(e)}
          className="mb-4 card p-4 shadow-lg"
          style={{ backgroundColor: "#2c2c2c", color: "#ffffff" }}
        >
          <div className="row">
            <div className="col-12 mb-3">
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
                onChange={(e)=>handleFormChange(e)}
                min="0"
                max="5"
              />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="blogWriterId" className="form-label">
                Writer 
              </label>
              <select
                id="blogWriterId"
                name="blogWriterId"
                className="form-select"
                value={formData.blogWriterId}
                onChange={(e)=>handleFormChange(e)}
                required
              >
                <option value="">Select Writer</option>
                {writers.map((writer) => (
                  <option key={writer.id} value={writer.id}>
                    {writer.name} 
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
              <button type="submit" className="btn btn-custom">
                ADD
              </button>
              <button type="reset" className="btn btn-custom">
                CLEAR
              </button>
              
            </div>
        </form>
      )}
    </div>
  );
}
