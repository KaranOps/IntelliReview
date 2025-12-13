package com.codereview.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    // OpenAI Fields (Commented Out)
    // @Value("${openai.api.key}")
    // private String openaiApiKey;

    // @Value("${openai.api.url}")
    // private String openaiApiUrl;

    // @Value("${openai.model}")
    // private String openaiModel;

    // Grok Fields
    @Value("${grok.api.key}")
    private String grokApiKey;

    @Value("${grok.api.url}")
    private String grokApiUrl;

    @Value("${grok.model}")
    private String grokModel;

    private final RestTemplate restTemplate = new RestTemplate();

    public String reviewCode(String codeSnippet) {
        System.out.println("DEBUG: Loaded Grok API Key Prefix: "
                + (grokApiKey != null && grokApiKey.length() > 4 ? grokApiKey.substring(0, 4) : "NULL/SHORT"));

        // OpenAI Logic (Commented Out)
        /*
         * HttpHeaders headers = new HttpHeaders();
         * headers.setContentType(MediaType.APPLICATION_JSON);
         * headers.setBearerAuth(openaiApiKey);
         * 
         * Map<String, Object> requestBody = new HashMap<>();
         * requestBody.put("model", openaiModel);
         * 
         * List<Map<String, String>> messages = new ArrayList<>();
         * Map<String, String> systemMessage = new HashMap<>();
         * systemMessage.put("role", "system");
         * systemMessage.put("content",
         * "You are a senior text code review assistant. Analyze the provided code for bugs, readability, and performance issues. Provide concrete suggestions and refactored code snippets where applicable. Format your response in Markdown."
         * );
         * messages.add(systemMessage);
         * 
         * Map<String, String> userMessage = new HashMap<>();
         * userMessage.put("role", "user");
         * userMessage.put("content", codeSnippet);
         * messages.add(userMessage);
         * 
         * requestBody.put("messages", messages);
         * 
         * HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody,
         * headers);
         * 
         * try {
         * ResponseEntity<Map> response = restTemplate.postForEntity(openaiApiUrl,
         * entity, Map.class);
         * Map<String, Object> responseBody = response.getBody();
         * 
         * if (responseBody != null && responseBody.containsKey("choices")) {
         * List<Map<String, Object>> choices = (List<Map<String, Object>>)
         * responseBody.get("choices");
         * if (!choices.isEmpty()) {
         * Map<String, Object> message = (Map<String, Object>)
         * choices.get(0).get("message");
         * return (String) message.get("content");
         * }
         * }
         * } catch (Exception e) {
         * e.printStackTrace();
         * return "Error calling OpenAI API: " + e.getMessage();
         * }
         */

        // Grok Logic (OpenAI Compatible)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(grokApiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", grokModel);

        List<Map<String, String>> messages = new ArrayList<>();
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");

        String prompt = """
                You are a friendly, beginner-focused code review assistant. Your goal is to help the user understand their mistakes and learn best practices using simple, clear language.

                Analyze the provided code and structure your response EXACTLY as follows using Markdown:

                ## 📊 Summary
                A brief, encouraging summary of what the code does and its overall quality.

                ## 🔍 Code Review
                Use a bulleted list to clearly explain syntax errors, logic bugs, or improvements. Explain *why* something is wrong or could be better, avoiding complex jargon. Focus on readability.

                ## ✨ Refactored Code
                Provide the corrected version of the code. Ensure it is clean, readable, and uses beginner-friendly syntax.

                ## 💡 Key Takeaways
                One or two simple tips for the user to remember for next time.
                """;

        systemMessage.put("content", prompt);
        messages.add(systemMessage);

        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", codeSnippet);
        messages.add(userMessage);

        requestBody.put("messages", messages);
        // Grok supports streaming but we'll use non-streaming for simplicity
        requestBody.put("stream", false);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(grokApiUrl, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();

            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling Grok API: " + e.getMessage();
        }

        return "No response from Grok AI.";
    }
}
