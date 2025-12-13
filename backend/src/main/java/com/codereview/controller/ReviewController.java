package com.codereview.controller;

import com.codereview.dto.ReviewRequestDTO;
import com.codereview.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/review")
    public ResponseEntity<String> reviewCode(@RequestBody ReviewRequestDTO request) {
        if (request.getCodeSnippet() == null || request.getCodeSnippet().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Code snippet cannot be empty.");
        }

        String review = reviewService.reviewCode(request.getCodeSnippet());
        return ResponseEntity.ok(review);
    }
}
