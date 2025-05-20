import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Concatenate, Dense, Dropout, LayerNormalization, MultiHeadAttention
from tensorflow.keras.layers import Lambda

def get_model_from_embeddings():
    # Step 4: Create new model input layers
    embed_input = tf.keras.Input(shape=(12, 32), name="embed_input")  # 4 embeddings × 8 dims = 32
    num_input2 = tf.keras.Input(shape=(12, 6), name="num_input")

    # Step 5: Concatenate embeddings + numerical features
    x = Concatenate(axis=-1)([embed_input, num_input2])  # Shape: (batch, 12, 38)

    # Step 6: Project to d_model
    d_model = 128  # Same as original model
    x = Dense(d_model)(x)

    # Positional encoding already baked in, so we skip adding it again.

    # Step 7: Transformer encoder layers
    num_layers = 2
    num_heads = 4
    ff_dim = 256
    dropout_rate = 0.1

    for _ in range(num_layers):
        # Multi-head self-attention
        attn_output = MultiHeadAttention(num_heads=num_heads, key_dim=d_model)(x, x)
        attn_output = Dropout(dropout_rate)(attn_output)
        x = LayerNormalization(epsilon=1e-6)(x + attn_output)

        # Feed-forward network
        ffn = tf.keras.Sequential([
            Dense(ff_dim, activation="relu"),
            Dense(d_model)
        ])
        ffn_output = ffn(x)
        ffn_output = Dropout(dropout_rate)(ffn_output)
        x = LayerNormalization(epsilon=1e-6)(x + ffn_output)

    # Step 8: Output layer
    output = Dense(1)(x)  # shape (batch, 12, 1)
    # output = tf.squeeze(output, axis=-1)  # shape (batch, 12)
    output = Lambda(lambda x: tf.squeeze(x, axis=-1))(output)
    # Step 9: Build the new model
    model_from_embeddings = Model(
        inputs=[embed_input, num_input2],
        outputs=output
    )

    return model_from_embeddings
