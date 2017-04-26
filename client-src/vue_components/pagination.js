const Vue = require('vue');
const getIncrementDecrement = require('get-increment-decrement').getIncrementDecrement; 
const OddNumber = require('../object_values/odd-number');

const pagination = Vue.component('pagination', {
  template : require('../templates/pagination.html'),
  props : {
    currentPage : {
      type : Number,
      required : true
    },
    numberOfPages : {
      type : Number,
      required : true
    },
    numberOfPaginationDisplayed : {
      type : OddNumber,
      required : true
    } 
  },
  methods : {
    goToPage(page) {
      this.$emit('page-change', {
        page : page 
      })
    },
    notDisplayPaginationButton(page) {
      return this.getPaginationNumberArray().find((displayedPageNumber) => {
        return page == displayedPageNumber;
      }) == undefined;
    },
    getPaginationNumberArray() {
      return getIncrementDecrement({
        startNumber : this.currentPage,
        lengthNeeded : this.numberOfPaginationDisplayed.getResultOfDivisionAfterSubstractionByOne(),
        minimumLimit : 1,
        maximumLimit : this.numberOfPages
      });
    }
  }
})

module.exports = pagination;
