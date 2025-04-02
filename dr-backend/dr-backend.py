from flask import Flask, request, jsonify
import torch
import torchvision.transforms as transforms
from PIL import Image
from torchvision.models import resnet50
from flask_cors import CORS


app = Flask(__name__)
CORS(app) # Enables CORS for all routes

# Load the trained ResNet-50 model
model = resnet50(pretrained=False)  # Initialize ResNet-50 without pretrained weights
num_ftrs = model.fc.in_features
model.fc = torch.nn.Linear(num_ftrs, 3)  # Adjust the final layer for 3 classes
model.load_state_dict(torch.load(r"C:\Users\Work\Downloads\best_resnet50.pth", map_location=torch.device('cpu'))) # Load the saved weights
model.eval() # Set the model to evaluation mode

# Define image transformations
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Class labels
classes = ['Mild', 'NoDR', 'Severe']

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    try:
        img = Image.open(image.stream).convert('RGB') # Ensure RGB format
        img_t = transform(img)
        batch_t = torch.unsqueeze(img_t, 0)

        with torch.no_grad():
            output = model(batch_t)
            probabilities = torch.nn.functional.softmax(output[0], dim=0) # Get probabilities
            _, predicted_idx = torch.max(output, 1)
            predicted_class = classes[predicted_idx[0]]
            predicted_probability = probabilities[predicted_idx[0]].item() * 100 # Convert to percentage

        return jsonify({
            'predicted_class': predicted_class,
            'accuracy': round(predicted_probability, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) # Set debug=False for production