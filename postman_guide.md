# Testing via Postman

To test the API using Postman:

1.  **Open Postman**.
2.  **Create a New Request**:
    *   Click the **+** button or **New > HTTP Request**.
3.  **Set the Method**: Select `POST` from the dropdown (default is GET).
4.  **Enter the URL**: `http://localhost:8080/api/review`
5.  **Configure Headers**:
    *   Go to the **Headers** tab.
    *   Key: `Content-Type`
    *   Value: `application/json`
6.  **Configure Body**:
    *   Go to the **Body** tab.
    *   Select **raw**.
    *   Ensure the format dropdown (to the right of 'raw') is set to **JSON**.
    *   Enter the following JSON payload:
        ```json
        {
          "codeSnippet": "public class Test { public static void main(String[] args) { System.out.println(\"Hello\"); } }"
        }
        ```
7.  **Send Request**: Click the **Send** button.
8.  **Check Response**: You should receive a code review/analysis in the response body.

## Troubleshooting
- **401 Unauthorized**: Your OpenAI API Key is missing or invalid. Check `backend/.env`.
- **Connection Refused**: Ensure your Spring Boot backend is running (`mvn spring-boot:run`).
