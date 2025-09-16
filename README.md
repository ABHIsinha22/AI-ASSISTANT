# 🤖 Gemini AI Assistant

This is a web-based AI assistant application powered by Google's Gemini API. It provides an interactive chat interface for users to ask questions and receive intelligent, real-time responses from the Gemini Pro model.



## ✨ Features

* **Interactive Chat Interface:** A clean and modern UI for seamless conversations.
* **Real-time AI Responses:** Leverages the power of the Gemini API to provide instant answers and generate content.
* **Markdown Support:** Correctly renders formatted responses from the AI, including code blocks, lists, and tables.
* **Secure API Handling:** Keeps your Google Gemini API key safe on the backend, never exposing it to the client.
* **Responsive Design:** Works smoothly on both desktop and mobile browsers.

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js with Express.js
* **API:** Google Gemini API (`@google/generative-ai`)

## 🚀 Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites
* [Node.js](https://nodejs.org/) (version 16 or later)
* A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/YourRepositoryName.git](https://github.com/YourUsername/YourRepositoryName.git)
    cd YourRepositoryName
    ```

2.  **Install the necessary packages:**
    ```bash
    npm install
    ```

3.  **Create an environment file:** Create a new file in the root of your project named `.env`.

4.  **Add your API key:** Add your Google Gemini API key to the `.env` file like this:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

5.  **Create a `.gitignore` file:** To ensure your secret API key is never pushed to GitHub, create a file named `.gitignore` in the root of your project and add the following line to it:
    ```
    .env
    ```

6.  **Start the server:**
    ```bash
    npm start
    ```

## 🔧 Usage

1.  Once the server is running, open your web browser.
2.  Navigate to `http://localhost:3000` (or the port specified in your project).
3.  Type a prompt in the input box and press Enter to start a conversation with the AI assistant.

## 🔮 Future Improvements

* Implement user accounts and chat history.
* Add the ability to switch between different Gemini models.
* Incorporate voice input and text-to-speech for responses.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.
