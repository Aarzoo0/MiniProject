package com.ust.Blog_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "blogs")
public class Blog {
    @Id
    private String id;

    private String title;
    private String rating;
    private String writer_id;
}
