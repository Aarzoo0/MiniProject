package com.ust.Writer_service.repository;

import com.ust.Writer_service.entity.Writer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WriterRepository extends MongoRepository<Writer,String>
{


}
