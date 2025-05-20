import tensorflow as tf

"""
Compute Integrated Gradients on the embeddings
  -Interpolate between a baseline embedding (all zeros) and the actual embedding.
  -Compute gradients of the final model prediction with respect to the embeddings.
  -That tells us how much each embedding dimension (and therefore each categorical feature) contributed to the prediction!
"""

def compute_integrated_gradients_on_embeddings(model_from_embeddings, model,embedding_submodel,cat_input,num_input,target_index=None,m_steps=50):
    # 1️⃣ Get actual embeddings for input
    embed_actual = embedding_submodel([cat_input, num_input])

    # 2️⃣ Define baseline (zero embeddings)
    baseline_embed = tf.zeros_like(embed_actual)

    # 3️⃣ Interpolate between baseline and actual embeddings
    alphas = tf.linspace(0.0, 1.0, m_steps + 1)
    interpolated_embeds = [baseline_embed + alpha * (embed_actual - baseline_embed) for alpha in alphas]
    interpolated_embeds = tf.concat(interpolated_embeds, axis=0)  # shape: (m_steps+1, 12, 32)

    # 4️⃣ Repeat numerical input for all alphas
    interpolated_num = tf.repeat(num_input, repeats=m_steps + 1, axis=0)

    # 5️⃣ Compute gradients wrt embeddings
    with tf.GradientTape() as tape:
        tape.watch(interpolated_embeds)

        # Pass embeddings forward through the rest of the model
        # NOTE: We'll need to create a submodel that takes embeddings + num_input as input
        preds = model_from_embeddings([interpolated_embeds, interpolated_num])

        if target_index is not None:
            preds = preds[:, target_index]

    grads = tape.gradient(preds, interpolated_embeds)

    avg_grads = tf.reduce_mean(grads, axis=0)
    integrated_grads = (embed_actual - baseline_embed) * avg_grads

    return integrated_grads.numpy()  # shape (12, 32)
