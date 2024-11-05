package com.ust.Blog_service.client;

import com.ust.Blog_service.entity.Blog;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "Writer-service", url = "http://localhost:8082/writers")
public interface Client {

    @GetMapping("/writers/{wid}/blogs")
    List<Blog> findBlogsByWid(@PathVariable("wid") Long wid);
}
