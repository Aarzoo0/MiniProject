import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../../../src/App.css";
 
export default function BlogView() {
    const baseUrl = `http://localhost:8081/api/blogs`; // Base URL for the Blogs API
    const { id } = useParams(); 
    const navigate = useNavigate(); // Hook for navigation
    const [fetchedBlog, setFetchedBlog] = useState({
        id: "",
        title: "",
        rating:"",
        writer_id: "",
        
    });
 
    useEffect(() => {
        fetch(`${baseUrl}/${id}`) 
            .then((res) => res.json())
            .then((data) => setFetchedBlog(data));
    }, [id]); // Fetch Blog data when the component mounts or the ID changes
 
    return (
        <div className="container mx-5 px-5">
            <button onClick={() => navigate(-1)} className="btn btn-custom">Back to Blog List</button>
            {fetchedBlog.title ? (
                <div className="card m-2">
                    <div className="card-header bg-warning text-light">
                        <h3>Blog Details for Blog ID: {id}</h3>
                    </div>
                    <div className="card-body">
                        <h6>Blog ID: {fetchedBlog.id}</h6>
                        <h6>Blog Title: {fetchedBlog.title}</h6>
                        <h6>Rating: {fetchedBlog.rating}</h6>
                        <h6>Writer Id: ${fetchedBlog.writer_id}</h6>
                    </div>
                </div>
            ) : (
                <div className="text-danger">Blog not found!</div> 
            )}
        </div>
    );
}
 