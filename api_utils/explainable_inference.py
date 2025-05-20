import numpy as np
from api_utils.preprocessing import preprocess_input
from api_utils.xai.numerical_yearly_ig import calculate_yearly_numerical_ig
from api_utils.xai.categorical_yearly_ig import calculate_yearly_categorical_ig


def run_explainable_inference(user_input, model, scaler_model, indexers):
    preprocessed_data = preprocess_input(user_input, scaler_model, indexers)

    numerical_yearly_igs = []
    categorical_ig = {}

    response = {}

    for subsector, sequence in preprocessed_data.items():
        sequence = np.expand_dims(sequence, axis=0)  # Shape: (1, 12, features)

        # input_seq shape: (1, 12, 10)
        cat_input = sequence[:, :, :4]      # First 4 are categorical
        num_input = sequence[:, :, 4:]      # Remaining 6 are numerical

        # === XAI for numerical features ===
        yearly_ig = calculate_yearly_numerical_ig(model, num_input, cat_input)
        numerical_yearly_igs.append(yearly_ig) 

        # === XAI for categorical features ===
        categorical_ig[subsector] = calculate_yearly_categorical_ig(model, cat_input, num_input)

    overall_ig = sum(numerical_yearly_igs)  # This adds up feature importance across subsectors
    overall_ig_normalized = overall_ig / overall_ig.sum()  # Normalize to get relative importance

    response["overall_numerical_attribution"] = overall_ig_normalized.to_dict()
    response["overall_categorical_attribution"] = categorical_ig

    return response