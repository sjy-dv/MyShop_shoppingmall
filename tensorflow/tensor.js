const tf = require('@tensorflow/tfjs');
const trainingData = require('./neural_data.json');
const { handler } = require('../utils');
const { errorHandler } = handler;

module.exports = (function () {
  const T = {};

  T.LearningMachine = async (req, res) => {
    try {
      let neural_Data = await trainingData.map((k) => ({
        cause: tf.tensor(k.cause),
        result: tf.tensor(k.result),
      }));

      let X = tf.input({ shape: [1] });
      let Y = tf.layers.dense({ units: 1 }).apply(X);
      let model = tf.model({ inputs: X, outputs: Y });
      let compileParam = {
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
      };
      await model.compile(compileParam);

      let repeatTraining = { epochs: 2000 };
      model
        .fit(neural_Data.cause, neural_Data.result, repeatTraining)
        .then((res) => {
          let result = model.predict(neural_Data.cause);
          if (res) return res.status(200).send(result);
          else throw { code: 6 };
        });
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return T;
})();
