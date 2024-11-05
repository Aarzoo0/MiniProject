package com.ust.Blog_service.controller;

import com.ust.Blog_service.entity.Blog;
import com.ust.Blog_service.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public List<Blog> getAllBlogs(){
        return blogService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable String id){
        Blog blog=blogService.findById(id);
        return blog != null ? ResponseEntity.ok(blog) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Blog saveBlog(@RequestBody Blog blog){
        return blogService.save(blog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogById(@PathVariable String id){
        blogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
