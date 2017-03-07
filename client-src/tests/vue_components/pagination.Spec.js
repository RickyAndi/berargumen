var Vue = require('vue');
var $ = require('jquery');
var expect = require('chai').expect;
var paginationComponent = require('./../../vue_components/pagination');
var sinon = require('sinon');

describe('Pagination Component', function() {

	var vm, handlePageChangedCallback, changePageEventName, currentPage, numberOfPages, numberOfPaginationDisplayed;

	before(function() {

		changePageEventName = 'index-page-changed';
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
						:change-page-event-name="changePageEventName"
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
				changePageEventName : changePageEventName,
				numberOfPages : numberOfPages,
				currentPage : currentPage,
				numberOfPaginationDisplayed : numberOfPaginationDisplayed
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

		before(function() {
			vm.$refs.paginationComponent.goToPage(pageToGo);
		})

		it('it invoke callback with its args', function() {
			expect(handlePageChangedCallback.called).to.equal(true);
			expect(handlePageChangedCallback.args[0][0].pageName).to.equal(changePageEventName);
			expect(handlePageChangedCallback.args[0][0].page).to.equal(pageToGo);
		})

		it('component get right current page after change from parent', function(done) {
			Vue.nextTick(function() {
				expect(vm.$refs.paginationComponent.currentPage).to.equal(pageToGo);
				done();
			})
			
		})
	})
})