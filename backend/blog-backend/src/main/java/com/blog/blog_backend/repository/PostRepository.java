package com.blog.blog_backend.repository; // Updated Package

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.blog_backend.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Spring Data JPA magic
}