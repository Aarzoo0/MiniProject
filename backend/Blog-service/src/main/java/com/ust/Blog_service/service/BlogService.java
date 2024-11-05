package com.ust.Blog_service.service;

import com.ust.Blog_service.entity.Blog;
import com.ust.Blog_service.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    public Blog findById(String id) {
        return blogRepository.findById(id).orElse(null);
    }

    public Blog save(Blog blog) {
        return blogRepository.save(blog);
    }

    public void deleteById(String id) {
       blogRepository.deleteById(id);
    }

}
