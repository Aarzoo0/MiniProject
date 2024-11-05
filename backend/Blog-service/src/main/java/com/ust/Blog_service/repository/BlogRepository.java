package com.ust.Blog_service.repository;

import com.ust.Blog_service.entity.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends MongoRepository<Blog,String> {
}
