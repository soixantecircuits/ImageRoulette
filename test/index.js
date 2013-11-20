var expect = require('expect.js'),
    oscServer = require('..');

describe('oscserver', function() {
  it('should say hello', function(done) {
    expect(oscServer()).to.equal('Hello, world');
    done();
  });
});
