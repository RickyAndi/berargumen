const Vue = require('vue');
const Modal = require('bootstrap.native').Modal;
const { isNull } = require('../../shared/utils/comparing');

const modal = Vue.component('modal', {
  template : require('../templates/modal.html'),
  props : {
    options: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      modal : null,
    }
  },
  methods : {
    show : function() {
      this.modal.show({
        backdrop: 'static',
        keyboard: false
      });
    },
    hide : function() {
      this.modal.hide();
    },
    onHidden : function() {
      this.$emit('on-hidden');
    },
    normalizedOptions() {
      return {
        modalSize: isNull(this.options.modalSize) ? 'large' : this.options.modalSize,
        backdrop: isNull(this.options.backdrop) ? null : this.options.backdrop,
        keyboard: isNull(this.options.keyboard) ? false : this.options.keyboard,
        title: isNull(this.options.title) ? '' : this.options.title,
        withHeader: isNull(this.options.withHeader) ? true : this.options.withHeader,
        withCloseButton: isNull(this.options.withCloseButton) ? true : this.options.withCloseButton
      }
    }
  },
  mounted() {
    this.modal = new Modal(this.$el, {
      backdrop: this.normalizedOptions().backdrop,
      keyboard: this.normalizedOptions().keyboard
    });

    this.$el.addEventListener('hidden.bs.modal', () => this.onHidden());
  },
  computed : {
    classObject() {
      return {
        'modal-lg' : this.normalizedOptions().modalSize === 'large',
        'modal-md' : this.normalizedOptions().modalSize === 'medium',
        'modal-sm' : this.normalizedOptions().modalSize === 'small'
      }
    },
  }
});

module.exports = modal;
