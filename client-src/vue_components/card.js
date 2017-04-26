const Vue = require('vue');
const Card = require('../models/card');
const cardTypeTextHashMap = require('../consts/card-type-text-hash-map');

const card = Vue.component('card', {
  template : require('../templates/card.html'),
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
    selectThisCard() {
      this.$emit('card-selected', { cardIndex : this.cardIndex } );
    }
  },
  computed : {
    cardTextType() {
      return cardTypeTextHashMap[this.card.getType()];
    },
    classObject() {
      return {
        'selected-card' : this.selectedCardIndex == this.cardIndex,
        'panel-success' : this.card.getType() == 'premise' || this.card.getType() == 'co-premise' || this.card.getType() == 'co-premise-connector',
        'panel-warning' : this.card.getType() == 'rebuttal',
        'panel-danger'  : this.card.getType() == 'objection'
      }
    },
    styleObject() {
      return {
        'top' : this.card.getTop(),
        'left' : this.card.getLeft()
      }
    }
  }
})

module.exports = card;
