import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../../src/App.css";
import { Link, useNavigate } from "react-router-dom";

function BlogList() {
  const baseUrl = "http://localhost:8081/api/blogs"; 
  const [blogs, setBlogs] = useState([]);
  const [searchBlogs, setSearchBlog] = useState(""); 
  const [filteredBlogs, setFilteredBlogs] = useState([]); 
  const navigate = useNavigate();

  // Function to load blogs from the backend
  const loadBlogs = () => {
    fetch(baseUrl)
      .then((res) => res.json()) 
      .then((data) => {
        setBlogs(data); // Update the blogs state
        setFilteredBlogs(data); // Initially set filtered blogs to all blogs
      })
      .catch((err) => console.error("Error fetching blogs:", err)); 
  };

  // Fetch blogs when the component mounts
  useEffect(() => {
    loadBlogs();
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  // Function to handle "add new blog"
  const handleAddNewBlog = () => {
    navigate("/blogapp/add-blog"); // Navigate to the Add New Blog page
  };

  // Function to handle search input
  function handleSearch(event) {
    setSearchBlog(event.target.value);
    let filterAllBlog = blogs.filter(
      (eachBlog) =>
        eachBlog.writer_id
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) // Filter by writer ID
    );
    setFilteredBlogs(filterAllBlog);
  }

  // Function to delete a blog
  const deleteBlog = (id) => {
    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete blog: ${res.statusText}`);
        }
        loadBlogs(); // Reload the blogs list after successful deletion
      })
      .catch((err) => console.error("Error deleting blog:", err));
  };

  // View Blog and Toggle Visibility
  function handleView(id) {
    setBlogs(
      blogs.map((blog) => {
        if (blog.id === id) {
          return { ...blog, isVisible: !blog.isVisible }; // Toggle visibility state
        }
      })
    );

    // Navigate to the blog view page with the selected blog
    const selectedBlog = blogs.find((blog) => blog.id === id);
    navigate(`/blogapp/view-blog/${id}`, { state: selectedBlog });
  }

  // Mapped blogs in card format (similar to your example)
  let mappedBlogs = filteredBlogs.map((blog) => (
    <div key={blog.id} className="col-md-4 mb-4">
      <div
        className="card"
        style={{ backgroundColor: "#2c2c2c", borderRadius: "8px" }}
      >
        <div className="card-body">
          <h5 className="card-title text-light">
            {blog.id}. {blog.title}
          </h5>
          <p className="text-light">Rating :{blog.rating}</p>

          <div className="btn-group" role="group">
            <Link
              to={`/blogapp/view-blog/${blog.id}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default Link behavior (since we're handling it manually)
                handleView(blog.id); // Call the visibility toggle function
              }}
              className="btn btn-custom"
            >
              {blog.isVisible ? (
                "Hide Details"
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </Link>

            <Link
              to={`/blogapp/edit-blog/${blog.id}`}
              className="btn btn-custom"
            >
              <i className="bi bi-pencil-square"></i>
            </Link>

            <button
              onClick={() => deleteBlog(blog.id)}
              className="btn btn-custom"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>

        {blog.isVisible && (
          <div
            className="card-footer mt-2"
            style={{ backgroundColor: "#3c3c3c" }}
          >
            <p className="text-light">
              <strong>Writer ID:</strong> {blog.writer_id}
            </p>
          </div>
        )}
      </div>
    </div>
  ));

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
      <h3 className="mb-4">Blog List</h3>

      <div className="formC-control-group mb-4">
        <label htmlFor="searchBlogs" className="form-label">
          Search Writer ID:
        </label>
        <input
          type="text"
          id="searchBlogs"
          placeholder="Search by Writer ID"
          onChange={handleSearch}
          value={searchBlogs}
          className="form-control"
        />
      </div>

      {filteredBlogs.length > 0 ? (
        <div className="row">{mappedBlogs}</div>
      ) : (
        <p className="text-center">No blogs available.</p>
      )}

      <button className="btn btn-outline-light mb-4" onClick={handleAddNewBlog}>
        ADD NEW BLOG
      </button>
    </div>
  );
}

export default BlogList;
