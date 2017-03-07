var Vue = require('vue');
var Card = require('../models/card');
const cardTypeTextHashMap = require('../consts/card-type-text-hash-map');

var card = Vue.component('card', {
	template : 
	`
		<div 
			@click="selectThisCard()" 
			v-bind:class="classObject"
			v-bind:style="styleObject"
			class="panel" 
			style="position: absolute; width: 300px;"
			v-bind:id="card.getId()"
		>
		    <div v-if="card.getType() != 'co-premise-connector'"  class="panel-heading">
		        <div class="row">
		            <div class="col-md-6">
		            	<span class="card-type">{{ cardTextType }}</span>
		            </div>
		            <div class="col-md-6">
		                
		            </div>
		        </div>
		    </div>
		    <div v-if="card.getType() != 'co-premise-connector'" class="panel-body" style=" min-height: 100px;">
		        <p class="card-content">{{ card.getContent() }}</p>
		    </div>
		    
	        <div v-if="card.getType() == 'co-premise-connector'" class="panel-body co-premise-connector">
	            Konektor
	        </div>
		    
		    <div v-if="card.getType() != 'co-premise-connector'"  class="panel-footer">
		    	<button class="btn btn-default btn-xs card-creator-name">{{ card.getCreatorName() }}</button>
		    </div>
		</div>
	`,
	props : {
		selectedCardIndex : {
			type : Number,
			required : true
		},
		card : {
			type : Card,
			required : true
		},
		cardIndex : {
			type : Number,
			required : true
		}
	},
	methods : {
		selectThisCard : function() {
			this.$emit('card-selected', { cardIndex : this.cardIndex } );
		}
	},
	computed : {
		cardTextType : function() {
			return cardTypeTextHashMap[this.card.getType()];
		},
		classObject : function() {
			var vm = this;
			return {
				'selected-card' : vm.selectedCardIndex == vm.cardIndex,
				'panel-success' : vm.card.getType() == 'premise' || vm.card.getType() == 'co-premise' || vm.card.getType() == 'co-premise-connector',
				'panel-warning' : vm.card.getType() == 'rebuttal',
				'panel-danger' 	: vm.card.getType() == 'objection'
			}
		},
		styleObject : function() {
			var vm = this;
			return {
				'top' : vm.card.getTop(),
				'left' : vm.card.getLeft()
			}
		}
	}
})

module.exports = card;