import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';

const MOBILENET_MODEL_PATH =
    'https://storage.googleapis.com/'
        + 'tfjs-models/tfjs/'
        + 'mobilenet_v1_0.25_224/model.json';

const mobnet = await tf.loadModel(MOBILENET_MODEL_PATH);

mobnet.predict(input)