const expect = require('chai').expect;
const sauertracker = require('../sauertracker');
const sauertracker_data = require('./sauertracker_sample.json');

describe('sauertracker', function() {
  it('should have an API URL', function() {
    expect(sauertracker.API_URL).to.equal('http://sauertracker.net/api/')
  })

  describe('game', function() {
    it('should reject a promise on an invalid game id', function() {
      expect(sauertracker.game(-1)).to.be.rejected;
    })

    it('should return the game as in sauertracker.json', function() {
      sauertracker.game(1).then((data) => {
        expect(data).to.deep.equal(sauertracker_data);
      })
    })
  })
})
