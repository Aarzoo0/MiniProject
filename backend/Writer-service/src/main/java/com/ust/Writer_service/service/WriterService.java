package com.ust.Writer_service.service;

import com.ust.Writer_service.entity.Writer;
import com.ust.Writer_service.repository.WriterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WriterService {
    @Autowired
    private WriterRepository writerRepository;

    public List<Writer> findAll() {

        return writerRepository.findAll();
    }

    public Writer findById(String id) {

        return writerRepository.findById(id).orElse(null);
    }

    public Writer save(Writer writer) {
        return writerRepository.save(writer);
    }

    public void deleteById(String id) {

        writerRepository.deleteById(id);
    }
}
