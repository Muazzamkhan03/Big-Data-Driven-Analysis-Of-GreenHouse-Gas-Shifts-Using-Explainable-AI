import tensorflow as tf
import json
import pickle
import keras
from api_utils.custom_layers import PositionalEncoding, SliceLayer, SqueezeLayer

def load_model():
    keras.config.enable_unsafe_deserialization()
    model = tf.keras.models.load_model("models/best_model.keras", compile=False, custom_objects={"SliceLayer": SliceLayer,
                                                                                                 "PositionalEncoding": PositionalEncoding,
                                                                                                 "SqueezeLayer": SqueezeLayer})
    return model

def load_scaler():
    with open("models/scaler_model.pkl", "rb") as f:
        scaler_data = pickle.load(f)

    return scaler_data

def load_indexers():
    with open("models/label_encoding_index_mappings.json", "r") as f:
        indexers = json.load(f)

    return indexers