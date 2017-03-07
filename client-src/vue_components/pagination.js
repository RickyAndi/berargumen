var Vue = require('vue');

var pagination = Vue.component('pagination', {
	template : 
	`
		<ul class="pagination">
			<li v-for="page in numberOfPages" v-bind:class="{ 'active' : currentPage == page }" v-if="!notDisplayPaginationButton(page)">
				<a @click="goToPage(page)">{{ page }}</a>
			</li>
		</ul>
	`,
	props : {
		changePageEventName : {
			type : String,
			required : true
		},
		currentPage : {
			type : Number,
			required : true
		},
		numberOfPages : {
			type : Number,
			required : true
		},
		numberOfPaginationDisplayed : {
			type : Number,
			required : true
		} 
	},
	methods : {
		goToPage : function(page) {
			this.$emit('page-change', { 
				pageName : this.changePageEventName, 
				page : page 
			})
		},
		notDisplayPaginationButton : function(page) {
			return (this.currentPage - (this.numberOfPaginationDisplayed - 1)) > page || (this.currentPage + (this.numberOfPaginationDisplayed - 1)) < page  
		},
	}
})

module.exports = pagination;