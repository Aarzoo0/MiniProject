package com.demo.authentication_service.dao;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.demo.authentication_service.dao.entity.UserCredentialsEntity;

@Repository
public interface UserCredentialsDao extends MongoRepository<UserCredentialsEntity, String> {
	public Optional<UserCredentialsEntity> findByName(String name);
}
