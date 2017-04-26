var Vue = require('vue');
var $ = require('jquery');
var expect = require('chai').expect;
var paginationComponent = require('./../../vue_components/pagination');
var OddNumber = require('./../../object_values/odd-number');

var sinon = require('sinon');

describe('Pagination Component', function() {
  
  after(function() {
    $('body').empty();
  })

  var vm, handlePageChangedCallback, changePageEventName, currentPage, numberOfPages, numberOfPaginationDisplayed;

  before(function() {
    
    handlePageChangedCallback = sinon.spy();
    currentPage = 1;
    numberOfPages = 10;
    numberOfPaginationDisplayed = 5;

    vm = new Vue({
      template :
      `
        <div>
          <pagination
            ref="paginationComponent"
            :current-page="currentPage"
            :number-of-pages="numberOfPages"
            :number-of-pagination-displayed="numberOfPaginationDisplayed"
            @page-change="handlePageChanged"
          >
          </pagination>
        </div>
      `,
      components : {
        'pagination' : paginationComponent
      },
      data : {
        numberOfPages : numberOfPages,
        currentPage : currentPage,
        numberOfPaginationDisplayed : new OddNumber(numberOfPaginationDisplayed)
      },
      methods : {
        handlePageChanged : function(args) {
          handlePageChangedCallback(args);
          this.currentPage = args.page;
        }
      }
    }).$mount();
  })

  it('pagination onyl show number of pagination button depend on number-of-pagination-button-displayed', function() {
    var $paginationComponentElement = $(vm.$el).find('.pagination');
    var $lis = $paginationComponentElement.find('li');
    expect($lis.length).to.equal(numberOfPaginationDisplayed)
  })

  describe('when page-change event triggered', function() {
    
    var pageToGo = 2;

    it('it invoke callback with its args, and parent get right current page', function(done) {

      vm.$refs.paginationComponent.goToPage(pageToGo);

      expect(handlePageChangedCallback.called).to.equal(true);
      expect(handlePageChangedCallback.args[0][0].page).to.equal(pageToGo);
      
      expect(vm.currentPage).to.equal(pageToGo);

      Vue.nextTick(function() {
        expect(vm.$refs.paginationComponent.currentPage).to.equal(pageToGo);
        done();
      })
    })
  })
})