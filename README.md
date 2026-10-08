# Language Translation Tool

A web-based Language Translation Tool developed as part of the CodeAlpha AI Internship.

## Project Overview

The Language Translation Tool allows users to enter text, select a source language and target language, and translate the text using an AI-based translation engine.

The application provides a simple and user-friendly interface for performing translations between supported languages.

## Features

- Text translation between supported languages
- Source and target language selection
- Language swap functionality
- Character counter
- Copy translated text
- Text-to-speech for translated text
- Responsive user interface
- Real-time translation through a local translation service

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- Python

### Translation Engine
- Argos Translate

### Additional Technologies
- CORS
- REST API

## Supported Languages

The application supports multiple installed language models, including:

- English
- Hindi
- French
- German
- Italian
- Japanese
- Korean
- Chinese
- Arabic
- Bengali
- Portuguese and other available language models

Language availability depends on the installed Argos Translate models.

## How the Application Works

1. The user enters text into the input text area.
2. The user selects the source language.
3. The user selects the target language.
4. The user clicks the Translate button.
5. The Node.js server receives the translation request.
6. Node.js forwards the request to the Python translation service.
7. Python uses Argos Translate to process the translation.
8. The translated text is returned to the Node.js server.
9. The result is displayed on the web interface.

## Project Architecture

```text
User
  |
  v
Web Interface
(HTML + CSS + JavaScript)
  |
  v
Node.js + Express
(Port 3000)
  |
  v
Python Translation Service
(Port 5001)
  |
  v
Argos Translate
  |
  v
Translated Text