package com.ust.Writer_service.controller;

import com.ust.Writer_service.entity.Writer;
import com.ust.Writer_service.service.WriterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/writers")
public class WriterController {

    @Autowired
    private WriterService writerService;

    @GetMapping
    public List<Writer> getAllWriters(){

        return writerService.findAll();
    }

    @GetMapping("/{wid}")
    public ResponseEntity<Writer> getWriterById(@PathVariable String wid){
        Writer writer=writerService.findById(wid);
        return writer != null ? ResponseEntity.ok(writer) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Writer saveWriter(@RequestBody  Writer writer){
        return writerService.save(writer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWriteById(@PathVariable String id){
        writerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
