# Final Year Design Project : Big Data Driven Analysis of Greenhouse Gas Shifts Using Explainable AI


## Overview

This project aims to enhance the prediction and understanding of greenhouse gas (GHG) emission trends in South Asia by combining advanced machine learning with explainable AI (XAI) techniques. Traditional models often struggle to manage the complexity and scale of environmental data, and their "black-box" nature limits transparency for decision-makers.

Our solution addresses these challenges through:

- Big Data assimilation from diverse sources to build a robust, region-specific GHG dataset

- Transformer based time series model for accurate prediction of emission trends

- Integration of XAI method integrated gradients to ensure interpretability and trust in the model's decisions

- A user-centric platform that visualizes predictions and explanations in an accessible dashboard

This project supports climate action by empowering stakeholders with both accurate forecasts and clear insights into the factors driving emissions.


The project is divided into multiple branches, each responsible for a different module or phase of the system. This modular structure allows for focused development, easier testing, and streamlined collaboration.

## Branch Structure

Below is a breakdown of the different branches in this repository:

### 🔹 `platform-dev`

This is the main development environment for the user-facing visualisation platform. It includes:

- Frontend UI 
- Backend 
- Integration with the databases
- Integration with the model API

### 🔹 `data-preprocessing`

This branch contains all the code and scripts used for:

- Collecting raw data
- Cleaning and formatting datasets
- Feature extraction and transformation
- Saving prepared datasets for training

### 🔹 `model-api`

This branch includes the machine learning model served via an API. It covers:

- Model loading and inference
- API endpoint creation (using Flask)
- Handling input/output formats

### 🔹 `model-deploy`

Responsible for deploying the model API to a production or cloud environment

### 🔹 `platform-deploy`

Handles deployment of the platform. This includes:

- Build scripts
- Hosting configs (e.g., for Vercel, Netlify, or traditional VPS)

### 🔹 `xai-r-and-d`

Focuses on research and development of eXplainable AI (XAI) aspects of the project:

- Implementation and evaluation of interpretability methods
- Notebooks and experiments
- Visualizations and reports

## How to Explore the Project

Each branch has its own `README.md` with setup instructions and usage examples. You can check out a specific part of the project by switching to the corresponding branch:

```bash
git checkout <branch-name>
```


## 👥 Authors

- **Muazzam Khan**
- **Laiba Muhammad Ali** 
- **Maria Ashfaq** 
- **Aqsa Zaib**

**Supervisor:**  
Prof. Dr. Shehnila Zardari
Chairperson, Department of Software Engineering
NED University of Engineering and Technology  