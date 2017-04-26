const Vue = require('vue');
const Modal = require('bootstrap.native').Modal;

const modal = Vue.component('modal', {
  template : require('../templates/modal.html'),
  props : {
    title : {
      type : String,
      required : true
    },
    uniqId : {
      type : String,
      required : true
    },
    modalSize : {
      type : String
    }
  },
  data() {
    return {
      modal : null,
      $modal : null
    }
  },
  methods : {
    show : function() {
      this.modal.show();
    },
    hide : function() {
      this.modal.hide();
    },
    onHidden : function() {
      this.$emit('on-hidden');
    }
  },
  mounted() {
    const vm = this;
    
    vm.$modal = document.getElementById(vm.uniqId);
    
    vm.modal = new Modal(vm.$modal, {});

    vm.$modal.addEventListener('hidden.bs.modal', function() {
      vm.onHidden();
    })
  },
  computed : {
    classObject() {
      return {
        'modal-lg' : this.modalSize == 'large' || this.modalSize == null,
        'modal-md' : this.modalSize == 'medium',
        'modal-sm' : this.modalSize == 'small'
      }
    }
  }
});

module.exports = modal;
