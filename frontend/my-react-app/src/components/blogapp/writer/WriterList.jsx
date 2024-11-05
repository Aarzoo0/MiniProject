import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export default function WriterList() {
  const baseUrl = "http://localhost:8082/api/writers";
  const navigate = useNavigate();

  const [searchStack, setSearchStack] = useState("");
  const [allWriters, setAllWriters] = useState([]);
  const [filteredAllWriters, setFilteredAllWriters] = useState([]);

  function loadAllWriters() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setAllWriters(data);
        setFilteredAllWriters(data);
        console.log(data);
      });
  }

  useEffect(() => {
    loadAllWriters();
  }, []);

  function handleView(id) {
    console.log(id);
    navigate(`/blogapp/writer-view/${id}`);
  }

  function handleEdit(id) {
    console.log(id);
    navigate(`/blogapp/writer-edit/${id}`);
  }

  function handleDelete(id) {
    console.log(id);
    fetch(`${baseUrl}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => loadAllWriters());
  }

  function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchStack(searchTerm);
    const filteredWriters = allWriters.filter((writer) =>
      writer.name.toLowerCase().includes(searchTerm)
    );
    setFilteredAllWriters(filteredWriters);
  }

  const mappedAllWriters = filteredAllWriters.map((writer) => (
    <tr key={writer.id}>
      <td>{writer.id}</td>
      <td>{writer.name}</td>
      <td>{writer.blogs}</td> {/* Assuming blogs is an array */}
      <td>
        <button
          onClick={() => handleView(writer.id)}
          className="btn btn-warning"
        >
          <span className="material-symbols-outlined">view_list</span>
        </button>
      </td>
      <td>
        <button
          onClick={() => handleEdit(writer.id)}
          className="btn btn-primary"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(writer.id)}
          className="btn btn-danger"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container m-1">
      <h3>LIST OF Writers</h3>
      <div className="form-control-group">
        <label htmlFor="sStack" className="form-label">
          Search Name:
        </label>
        <input
          type="text"
          id="sStack"
          placeholder="Enter search string"
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr className="table-dark">
            <th>ID</th>
            <th>Name</th>
            <th>Number of Blogs</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{mappedAllWriters}</tbody>
      </table>
    </div>
  );
}
