class OddNumber {
  constructor(number) {
    if(number % 2 == 0) {
      throw new Error('The number you provided must be odd number');
    }

    this.number = number;
  }

  getResultOfDivisionAfterSubstractionByOne() {
    return (this.number - 1) / 2;
  }
}

module.exports = OddNumber;
