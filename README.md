# DoctorDR - Diabetic Retinopathy Detection Web Application

## Overview

DoctorDR is a web application designed to assist in the early detection and monitoring of diabetic retinopathy. It allows users to upload retinal images, which are then analyzed using a PyTorch-based machine learning model. The results are displayed to the user, and patient data, including screening logs, are stored in a secure Firebase Firestore database.

## Features

* **Image Upload:** Users can upload retinal images for analysis.
* **Automated Detection:** A PyTorch model analyzes the images to detect signs of diabetic retinopathy.
* **Result Display:** Clear and concise results are presented to the user.
* **Patient Database:** Secure storage of patient data, including screening logs, in Firebase Firestore.
* **User Authentication:** Secure login for patients and medical professionals.
* **Log Tracking:** Records of all screening results are stored in the database.
* **Modern UI:** Built with Next.js, Tailwind CSS, AceternityUI, and DaisyUI for a responsive and user-friendly interface.

## Technologies Used

* **Frontend:** Next.js, Tailwind CSS, AceternityUI, DaisyUI
* **Backend:** Flask (Python)
* **Machine Learning:** PyTorch, OpenCV
* **Database:** Firebase Firestore
* **Cloud (Optional):** Firebase Hosting (for frontend), Cloud Functions (for backend)

## Getting Started

### Prerequisites

* Node.js (for Next.js)
* Python (for Flask)
* pip (Python package installer)
* Firebase account and project setup

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository URL]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd DoctorDR
    ```
3.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```
4.  **Install backend dependencies:**
    ```bash
    cd ../backend
    pip install -r requirements.txt
    ```
5.  **Configure Firebase:**
    * Create a Firebase project and enable Firestore.
    * Download the Firebase service account key JSON file and place it in the `backend` directory.
    * Configure Firebase environment variables in both the `frontend` and `backend` as needed.
6.  **Run the application:**
    * **Frontend:**
        ```bash
        cd ../frontend
        npm run dev
        ```
    * **Backend:**
        ```bash
        cd ../backend
        python app.py
        ```

### Usage

1.  Open the Next.js application in your web browser (usually `http://localhost:3000`).
2.  Create an account or log in.
3.  Upload a retinal image for analysis.
4.  View the results.
5.  Access patient data and screening logs (for medical professionals).

## Contributing

\[If you plan to allow contributions, add guidelines here]

## License

\[Specify the license, e.g., MIT, Apache 2.0]

## Contact

aravindmiras@gmail.com
