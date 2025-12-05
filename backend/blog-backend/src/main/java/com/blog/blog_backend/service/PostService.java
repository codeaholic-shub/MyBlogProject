package com.blog.blog_backend.service; // Updated Package

import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.blog_backend.entity.Post;
import com.blog.blog_backend.repository.PostRepository;

@Service
public class PostService {
    
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
    
    public Post createPost(Post post) {
        return postRepository.save(post);
    }
}