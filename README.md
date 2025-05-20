# Final Year Design Project : Big Data Driven Analysis of Greenhouse Gas Shifts Using Explainable AI

# Model API

This branch provides the machine learning model exposed via an API for integration with the platform.

## 🔍 Overview

The model is trained on preprocessed GHG data and wrapped using a web framework. This allows prediction requests to be made programmatically over HTTP.

## 📁 Contents

- Model loading scripts
- Inference logic
- API route definitions
- Input/output format handlers

## ⚙️ How to Use

1. Checkout this branch:
   ```bash
   git checkout model-api
   ```
2. Create a virtual environment and install dependencies.
3. Run the API server using:
   ```bash
   python app.py
   ```
4. Use a tool like Postman or cURL to test predictions.
