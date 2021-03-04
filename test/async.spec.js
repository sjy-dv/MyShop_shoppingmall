const fs = require('fs');

describe('async test', () => {
  it('time limit 3000-', (done) => {
    fs.readFile(__filename, done);
  });
});
