from flask import Flask, request, jsonify
from api_utils.model_loader import load_model, load_scaler, load_indexers
from api_utils.inference import run_inference
from api_utils.explainable_inference import run_explainable_inference

app = Flask(__name__)

# Load model and preprocessing objects once at startup
model = load_model()
scaler_params = load_scaler()
indexers = load_indexers()

@app.route('/')
@app.route('/home')
@app.route('/index')
def index():
    return {
        "success": True,
        "data": "Hello world"
    }


@app.route('/prediction', methods=["POST"])
def predictions():
    user_input = request.get_json()
    try:
        
        print(f"Prediction request received with country: {user_input.get('country')} sector: {user_input.get('sector')} gas: {user_input.get('gas')} year: {user_input.get('year')}. Calling inference function...")

        result = run_inference(user_input, model, scaler_params, indexers)
        return jsonify({"success": True, "data": result})
    except Exception as e:
        print("Error: ", e)
        return jsonify({"success": False, 'error': str(e)}), 400


@app.route('/explanation', methods=["POST"])
def explanations():
    user_input = request.get_json()
    try:

        print(f"Explanation request received with country: {user_input.get('country')} sector: {user_input.get('sector')} gas: {user_input.get('gas')} year: {user_input.get('year')}. Calling inference function...")

        result = run_explainable_inference(user_input, model, scaler_params, indexers)
        return jsonify({"success": True, "data": result})
    except Exception as e:
        print("Error: ", e)
        return jsonify({"success": False, 'error': str(e)}), 400


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
