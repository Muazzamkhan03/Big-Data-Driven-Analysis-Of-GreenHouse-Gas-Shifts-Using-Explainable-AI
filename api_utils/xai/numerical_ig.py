import tensorflow as tf

# Integrated Gradients function
def compute_integrated_gradients_num_only(model,
                                          cat_input,
                                          num_input,
                                          baseline_num,
                                          target_index=None,
                                          m_steps=50):
    # Categorical inputs remain constant
    cat_input_fixed = tf.convert_to_tensor(cat_input, dtype=tf.int32)

    # Expand dims to allow broadcasting
    expanded_num = tf.convert_to_tensor(num_input, dtype=tf.float32)
    baseline_num = tf.convert_to_tensor(baseline_num, dtype=tf.float32)

    alphas = tf.linspace(0.0, 1.0, m_steps + 1)

    interpolated_num = [baseline_num + alpha * (expanded_num - baseline_num) for alpha in alphas]
    interpolated_num = tf.concat(interpolated_num, axis=0)

    # Repeat categorical input for all alphas
    interpolated_cat = tf.repeat(cat_input_fixed, repeats=m_steps + 1, axis=0)

    # Compute gradients
    with tf.GradientTape() as tape:
        tape.watch(interpolated_num)
        preds = model([interpolated_cat, interpolated_num])

        if target_index is not None:
            preds = preds[:, target_index]

    grads = tape.gradient(preds, interpolated_num)

    avg_grads_num = tf.reduce_mean(grads, axis=0)

    integrated_grads_num = (expanded_num - baseline_num) * avg_grads_num

    return integrated_grads_num.numpy()

