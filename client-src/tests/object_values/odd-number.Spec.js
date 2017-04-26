var expect = require('chai').expect;
var OddNumber = require('./../../object_values/odd-number');

describe('OddNumber value object', function() {
  it('will throw an error, if number provided in its constructor is not an odd number', function() {
    
    var evenNumber = 6;
    var error = new Error('The number you provided must be odd number');

    expect((function() {
      var oddNumber = new OddNumber(evenNumber);
    })).to.throw(Error, 'The number you provided must be odd number');
  })

  it('if provided with odd number, it will not throw an error', function() {

    var oddNumber = 5;
    var error = new Error('The number you provided must be odd number');

    expect((function() {
      var oddNumber = new OddNumber(oddNumber);
    })).to.not.throw(Error, 'The number you provided must be odd number');
  })

  it('it can get division of provided number after that number substacted with one', function() {

    var oddNumber = 5;
    var expectedResultNumber = (oddNumber - 1) / 2;

    var oddNumber = new OddNumber(oddNumber);

    expect(oddNumber.getResultOfDivisionAfterSubstractionByOne()).to.equal(expectedResultNumber);
  })
})
