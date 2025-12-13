Act as a Senior Full Stack Engineer. I need you to generate a complete, production-ready codebase for a "Code Review Assistant" application.

### Project Context
This is an assignment to build a tool where developers can paste/type code, and an AI analyzes it for bugs, readability, and performance issues.

### Tech Stack Requirements
1. Frontend: React.js (Create React App or Vite)
2. Backend: Spring Boot (Java 17+)
3. AI Integration: OpenAI API (GPT-4 or GPT-3.5-turbo)
4. Styling: Tailwind (keep it clean and professional)

### Architecture & Standards
* **Modular Design:** The backend must follow strict separation of concerns (Controller -> Service -> DTO). Do not put business logic in the Controller.
* **Configuration Management:** ABSOLUTELY NO hardcoded API keys or secrets.
    * Backend: Use `application.properties` reading from environment variables (e.g., `${OPENAI_API_KEY}`).
    * Frontend: Use `.env` for the backend URL.
* **Security:** Ensure CORS is configured properly in Spring Boot to allow requests from the React frontend.

### Functional Requirements

**1. Frontend (React)**
* **Layout:** A split-screen interface (50/50 width).
    * **Left Side:** A code editor. Use `@monaco-editor/react` for a VS-Code-like experience (syntax highlighting, line numbers).
    * **Right Side:** A read-only view to display the AI's feedback. Use `react-markdown` to render the response beautifully.
* **Actions:** A "Review Code" button. When clicked, it should show a loading state (spinner) while waiting for the backend.
* **API Interaction:** Use `axios` to POST the code to the backend.

**2. Backend (Spring Boot)**
* **API Endpoint:** Create a REST controller with a POST endpoint (e.g., `/api/review`).
* **Request Body:** Accept a JSON object: `{ "codeSnippet": "..." }`.
* **Service Layer:**
    * Construct a "System Prompt" for OpenAI that instructs it to find issues, suggest improvements, and provide refactored code snippets.
    * Call the OpenAI API securely.
* **Response:** Return the raw Markdown string from OpenAI to the frontend.

### Deliverables
Please provide the code in the following order:
1.  **Project Structure:** A text-tree view of the file structure.
2.  **Backend Setup:**
    * `pom.xml` dependencies (include Spring Web, Lombok, generic HTTP client/OpenFeign).
    * `application.properties` template.
    * `ReviewController.java`
    * `ReviewService.java` (Logic for OpenAI call)
    * `ReviewRequestDTO.java`
3.  **Frontend Setup:**
    * `App.js` (Main logic)
    * `CodeEditor.js` (Monaco wrapper)
    * `ReviewOutput.js` (Markdown renderer)
    * `services/api.js` (Axios setup)

**Important:** Write the code to be "copy-paste" ready. Ensure all imports are included and the code handles basic errors (e.g., API failure).