var expect = require('chai').expect;
var Relation = require('./../../models/relation');

describe('Relation Model', function() {
  
  var relationInstance;

  before(function() {
    relationInstance = new Relation();
  })

  it('can set to card id and can retrieve it', function() {
    var toCardId = 'abcdefghijk';
    relationInstance.setToCardId(toCardId);
    expect(relationInstance.getToCardId()).to.equal(toCardId);
  })

  it('can set to type and can retrieve it', function() {
    var type = 'premise';
    relationInstance.setType(type);
    expect(relationInstance.getType()).to.equal(type);
  })
})