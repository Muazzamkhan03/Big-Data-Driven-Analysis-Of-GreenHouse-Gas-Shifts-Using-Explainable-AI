import tensorflow as tf
import numpy as np

@tf.keras.utils.register_keras_serializable()
class PositionalEncoding(tf.keras.layers.Layer):
    def __init__(self, sequence_length, d_model, **kwargs):
        super(PositionalEncoding, self).__init__(**kwargs)
        self.sequence_length = sequence_length
        self.d_model = d_model
        self.pos_encoding = self._get_positional_encoding()

    def _get_positional_encoding(self):
        angle_rads = self._get_angles(
            np.arange(self.sequence_length)[:, np.newaxis],
            np.arange(self.d_model)[np.newaxis, :],
            self.d_model
        )
        # apply sin to even indices
        angle_rads[:, 0::2] = np.sin(angle_rads[:, 0::2])
        # apply cos to odd indices
        angle_rads[:, 1::2] = np.cos(angle_rads[:, 1::2])
        pos_encoding = angle_rads[np.newaxis, ...]  # (1, sequence_length, d_model)
        return tf.cast(pos_encoding, dtype=tf.float32)

    def _get_angles(self, pos, i, d_model):
        angle_rates = 1 / np.power(10000, (2 * (i // 2)) / np.float32(d_model))
        return pos * angle_rates

    def call(self, inputs):
        # Simple addition, inputs + pos_encoding
        # return tf.keras.layers.Add()([inputs, self.pos_encoding])
        return inputs + self.pos_encoding[:, :tf.shape(inputs)[1], :]


@tf.keras.utils.register_keras_serializable()
class SliceLayer(tf.keras.layers.Layer):
    def __init__(self, index, **kwargs):
        super().__init__(**kwargs)
        self.index = index

    def call(self, inputs):
        return inputs[:, :, self.index]

    def get_config(self):
        config = super().get_config()
        config.update({"index": self.index})
        return config


@tf.keras.utils.register_keras_serializable()
class SqueezeLayer(tf.keras.layers.Layer):
    def call(self, inputs):
        return tf.squeeze(inputs, axis=-1)

    def get_config(self):
        return super().get_config()