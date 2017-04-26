const Vue = require('vue');
const Modal = require('bootstrap.native').Modal;

const modal = Vue.component('fullscreen-modal', {
  template : require('../templates/fullscreen-modal.html'),
  props : {
    title : {
      type : String,
      required : true
    },
    uniqId : {
      type : String,
      required : true
    },
  },
  data : function() {
    return {
      modal : null,
      $modal : null
    }
  },
  methods : {
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },
    onHidden() {
      this.$emit('on-hidden');
    }
  },
  mounted() {
    const vm = this;
    
    vm.$modal = document.querySelector('#' + vm.uniqId);
    vm.modal = new Modal(vm.$modal, {});

    vm.$modal.addEventListener('hidden.bs.modal', function() {
      vm.onHidden();
    })
    
    vm.$modal.addEventListener('show.bs.modal', function () {
      setTimeout( function() {
          document.querySelector(".modal-backdrop").classList.add("modal-backdrop-fullscreen");
        }, 0);
    });

    vm.$modal.addEventListener('hidden.bs.modal', function () {
        document.querySelector(".modal-backdrop").classList.add("modal-backdrop-fullscreen");
    });
  }
})

module.exports = modal;
