import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeaderApp from "./components/HeaderApp";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import BlogList from "./components/blogapp/blog/BlogList";
import Blog from "./components/blogapp/blog/Blog";
import BlogAdd from "./components/blogapp/blog/BlogAdd";
import BlogEdit from "./components/blogapp/blog/BlogEdit";
import WriterList from "./components/blogapp/writer/WriterList";
import WriterAdd from "./components/blogapp/writer/WriterAdd";
import WriterEdit from "./components/blogapp/writer/WriterEdit";
import BlogView from "./components/blogapp/blog/BlogView";


function App() {
  return (
    <Router>
    <HeaderApp />
    <Routes>
        <Route path="/blogapp" element={<Blog/>}/>
        <Route path="/blogapp/blog-list" element={<BlogList/>} />  
        <Route path="/blogapp/add-blog" element={<BlogAdd/>}/>
        <Route path="/blogapp/view-blog/:id" element={<BlogView/>}/>
        <Route path="/blogapp/edit-blog/:Id" element={<BlogEdit/>}/>
        <Route path="/blogapp/writers" element={<WriterList/>}/>
        <Route path="/blogapp/add-writer" element={<WriterAdd/>}/>
        <Route path="/blogapp/writer-edit/:writerId" element={<WriterEdit/>}/>
        
        <Route path="/*" element={<Blog/>}></Route> 

    </Routes>
</Router>
  );
}

export default App;
