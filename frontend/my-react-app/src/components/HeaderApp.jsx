import { Link } from "react-router-dom";

export default function HeaderApp() {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/blogapp">
                    My Blog Application
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogapp/blog-list">
                            Blog List
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/blogapp/add-blog">
                            Add Blog
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/blogapp/writers">
                            Writer List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogapp/add-writer">
                            Add Writer 
                            </Link>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </header>
    );
}
