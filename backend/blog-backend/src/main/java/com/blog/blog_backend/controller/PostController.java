package com.blog.blog_backend.controller; // Updated Package

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog_backend.entity.Post;
import com.blog.blog_backend.service.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
// CORS CONFIGURATION: This is critical for React to work
@CrossOrigin(origins = "http://localhost:5173") 
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }
    
    @PostMapping
    public Post createPost(@Valid @RequestBody Post post) {
        return postService.createPost(post);
    }
}