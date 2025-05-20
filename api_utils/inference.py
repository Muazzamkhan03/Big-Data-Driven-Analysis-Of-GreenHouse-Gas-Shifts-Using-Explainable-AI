import numpy as np
from api_utils.preprocessing import preprocess_input

def run_inference(user_input, model, scaler_model, indexers):
    preprocessed_data = preprocess_input(user_input, scaler_model, indexers)

    response = {
        "subsector_emissions": {},
        "monthly_emissions": [0.0] * 12,
        "total_emissions": 0.0
    }

    for subsector, sequence in preprocessed_data.items():
        sequence = np.expand_dims(sequence, axis=0)  # Shape: (1, 12, features)

        # input_seq shape: (1, 12, 10)
        cat_input = sequence[:, :, :4]      # First 4 are categorical
        num_input = sequence[:, :, 4:]      # Remaining 6 are numerical

        predictions = model.predict([cat_input, num_input])[0]  # Shape: (12,)
        emissions = np.expm1(predictions).tolist()  # Inverse of log1p

        total = sum(emissions)
        response["subsector_emissions"][subsector] = {
            "monthly_emissions": emissions,
            "total_emissions": total
        }

        # Aggregate monthly emissions
        response["monthly_emissions"] = [sum(x) for x in zip(response["monthly_emissions"], emissions)]
        response["total_emissions"] += total

    return response