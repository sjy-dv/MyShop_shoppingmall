const brain = require('brain.js');
const data = require('./neural_data.json');
const { handler } = require('../utils');
const { errorHandler } = handler;
const neural_network = new brain.recurrent.LSTM();
const trainingData = data.map((m) => ({
  input: m.cause,
  output: m.result,
}));
module.exports = (function () {
  const B = {};

  B.StartAI = async () => {
    try {
      let starting = await neural_network.train(trainingData, {
        iterations: 1000,
      });
      if (starting) return console.log('training ok');
    } catch (err) {
      return console.log(err);
    }
  };

  B.ReplyAI = async (req, res) => {
    try {
      let { cause } = req.body;
      let output = neural_network.run(cause);
      res.send(output);
    } catch (err) {
      return res.status(400).send(errorHandler(err, req));
    }
  };

  return B;
})();
