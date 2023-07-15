# ChatGPT_FlaskVision

This open-source project leverages the OpenAI API to provide users with an interactive chatbot experience. Developed using Python Flask as the backend framework, it combines JavaScript, HTML, and CSS for the frontend interface. The application enables users to engage in conversations with ChatGPT, an OpenAI language model.
This project combines ChatGPT with the Stable Diffusion Image Model to enable users to have conversational interactions with ChatGPT and receive AI-generated images as responses.

## Getting Started
To use this application, you'll need an OpenAI API key obtained from their website. Copy and paste the API key into a file named "gpt_api.key" in the project's root directory.

Install the required dependencies, including Flask, by running:
```
pip install -r requirements.txt
```

Once installed, run the "main.py" file to start the application. This will launch a web browser with the chatbot interface.

## Features
The current version of the application allows users to ask questions and receive responses from ChatGPT. Additionally, users can upload a PDF file, which will be analyzed and sent to ChatGPT for further processing. The responses are displayed within the chatbot interface.
![alt text](/IMAGES/interface.png)
![alt text](/IMAGES/chatgpt_interface.png)
## Future Development
The project is actively being developed, with future plans to incorporate image generation using ChatGPT. We aim to integrate stable diffusion methods and prompt ChatGPT with engineering specifications to generate images.

## Contributing
Contributions to this project are welcome. To contribute, fork the repository and create a pull request.


