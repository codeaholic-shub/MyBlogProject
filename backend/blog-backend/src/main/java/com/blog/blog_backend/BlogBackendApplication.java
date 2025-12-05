package com.blog.blog_backend; // Your existing package

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.blog.blog_backend.entity.Post;
import com.blog.blog_backend.repository.PostRepository;

@SpringBootApplication
public class BlogBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogBackendApplication.class, args);
	}

    // This runs automatically when the server starts
    @Bean
    CommandLineRunner commandLineRunner(PostRepository repository) {
        return args -> {
            repository.save(new Post(null, "My First Blog Post", "This is the content of my first post from Spring Boot!"));
            repository.save(new Post(null, "React + Java", "A powerful full-stack combination."));
        };
    }
}