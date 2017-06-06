const Vue = require('vue');

const validators = {
  email : new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  url : new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
  text : new RegExp(/^[a-zA-Z]+$/),
  digits : new RegExp(/^[\d() \.\:\-\+#]+$/),
  isodate : new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
}

const modal = Vue.component('vue-input-tag', {
  template : require('../templates/vue-input-tag.html'),
  props : {
    tags: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      newTag: '',
    };
  },
  methods : {
    focusNewTag() {
      if (this.readOnly) { return; }
      this.$el.querySelector('.new-tag').focus();
    },
    addNew(tag) {
      if (tag && !this.tags.includes(tag) && this.validateIfNeeded(tag)) {
        this.tags.push(tag);
        this.tagChange();
      }
      this.newTag = '';
    },
    validateIfNeeded(tagValue) {
      if (this.validate === '' || this.validate === undefined) {
        return true;
      } else if (Object.keys(validators).indexOf(this.validate) > -1) {
        return validators[this.validate].test(tagValue);
      }
      return true;
    },
    remove(index) {
      this.tags.splice(index, 1);
      this.tagChange();
    },
    removeLastTag() {
      if (this.newTag) { return; }
      this.tags.pop();
      this.tagChange();
    },
    getPlaceholder() {
      if (!this.tags.length) {
        return this.placeholder;
      }
      return '';
    },
    tagChange() {
      if (this.onChange) {
        // avoid passing the observer
        this.onChange(JSON.parse(JSON.stringify(this.tags)));
      }
    },
    emptyNewTag() {
      this.newTag = '';
    }
  }
});

module.exports = modal;
