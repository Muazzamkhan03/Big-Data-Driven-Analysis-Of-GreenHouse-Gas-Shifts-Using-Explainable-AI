import numpy as np
import pandas as pd
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Concatenate
from api_utils.custom_layers import PositionalEncoding, SliceLayer, SqueezeLayer
from api_utils.xai.model_from_embeddings import get_model_from_embeddings
from api_utils.xai.categorical_ig import compute_integrated_gradients_on_embeddings

def calculate_yearly_categorical_ig(model, cat_batch, num_batch):
    
    # Identify embedding layers in your model
    embedding_layers = []
    for layer in model.layers:
        if "embedding" in layer.name.lower():
            embedding_layers.append(layer)
    
    """
    Build a submodel that outputs the concatenated embeddings
    Create a new Keras model that:
    -Takes the same inputs as your full model (cat_inputs and num_inputs).
    -Outputs the concatenated embeddings (before combining with numerical features).
    """

    # Step 2: Extract model inputs
    cat_input = model.input[0]  # (batch, 12, 4)
    num_input = model.input[1]  # (batch, 12, 6)

    # Step 3: Slice each categorical column & pass through the correct embedding
    slice_layers = []
    for i in range(4):
        slice_layer = None
        for layer in model.layers:
            if isinstance(layer, SliceLayer) and layer.index == i:
                slice_layer = layer
                break
        if slice_layer is None:
            raise ValueError(f"SliceLayer for index {i} not found.")
        slice_layers.append(slice_layer)

    # Pass slices through corresponding embeddings
    embed_outputs = []
    for i in range(4):
        cat_col = slice_layers[i](cat_input)
        embedded = embedding_layers[i](cat_col)
        embed_outputs.append(embedded)

    # Concatenate all embeddings
    concat_embed = Concatenate(axis=-1)(embed_outputs)  # shape (batch, 12, 32) → 4 embeddings × 8 dims each

    # Step 4: Create the submodel
    embedding_submodel = Model(
        inputs=[cat_input, num_input],
        outputs=concat_embed
    )

    # Example: compute IG for timestep 0 (first month)
    timestep = 0

    model_from_embeddings = get_model_from_embeddings()

    ig_embeddings = compute_integrated_gradients_on_embeddings(
        model_from_embeddings,
        model,
        embedding_submodel,
        cat_batch,
        num_batch,
        target_index=timestep,
        m_steps=50
    )

    ig_embeddings = ig_embeddings[0]  # Shape now (12, 32)

    # Split attributions
    ig_iso3 = ig_embeddings[:, 0:8]
    ig_sector = ig_embeddings[:, 8:16]
    ig_subsector = ig_embeddings[:, 16:24]
    ig_gas = ig_embeddings[:, 24:32]

    iso3_importance = np.sum(ig_iso3, axis=1)    # Shape (12,)
    sector_importance = np.sum(ig_sector, axis=1) # Shape (12,)
    subsector_importance = np.sum(ig_subsector, axis=1)
    gas_importance = np.sum(ig_gas, axis=1)

    df_cat_ig = pd.DataFrame({
        "Month": [f"Month {i+1}" for i in range(12)],
        "iso3_country_index": iso3_importance,
        "sector_index": sector_importance,
        "subsector_index": subsector_importance,
        "gas_index": gas_importance
    })

    # Drop the 'Month' column and calculate mean for each feature
    avg_importance = df_cat_ig.drop(columns=["Month"]).mean().to_dict()

    return avg_importance


    


