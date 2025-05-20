import numpy as np
import pandas as pd
from api_utils.xai.numerical_ig import compute_integrated_gradients_num_only

def calculate_yearly_numerical_ig(model, num_input, cat_input):
    # Choose a baseline (e.g., all zeros or mean of training set)
    baseline_num = np.zeros_like(num_input)

    # Compute Integrated Gradients
    ig_numerical = compute_integrated_gradients_num_only(
        model=model,
        cat_input=cat_input,
        num_input=num_input,
        baseline_num=baseline_num
    )

    ig_num = ig_numerical[0]  # Remove batch dimension

    # Store per-feature attribution per time step
    feature_names = ["lat", "lon", "duration", "start_year", "start_month_sin", "start_month_cos"]

    df = pd.DataFrame(
        ig_num,
        columns=feature_names,
        index=[f"Month {i+1}" for i in range(12)]
    )
        
    yearly_ig = df.abs().sum(axis=0)

    return yearly_ig