const Vue = require('vue');
const VeeValidate = require('vee-validate');
const localeId = require('vee-validate/dist/locale/id');

const inputTagComponent = require('./vue-input-tag');

Vue.use(VeeValidate, {
  locale : 'id',
  dictionary : {
    id : { 
      messages : localeId.messages
    }
  }
});

const argumentForm = Vue.component('argument-form', {
  template : require('../templates/argument-form.html'),
  components: {
    'input-tag-component': inputTagComponent
  },
  data() {
    return {
      title: '',
      description: '',
      tags: [],
      status: 'create',
      fieldState: {
        tags: {
          error: false,
          dirty: false,
          errorMessage: ''
        }
      },
      isLoading: false
    }
  },
  methods: {
    reset() {
      
      this.title = '';
      this.description = '';
      this.tags.splice(0, (this.tags.length));

      this.$validator.flag('title', {
        valid: true,
        dirty: false
      });
      this.$validator.flag('description', {
        valid: true,
        dirty: false
      });
      this.setFieldState('tags', 'dirty', false);
      this.$refs.inputTags.emptyNewTag();
    },
    getFieldState(name, state) {
      return this.fieldState[name][state];
    },
    isFieldError(name) {
      return this.getFieldState(name, 'error');
    },
    isFieldDirty(name) {
      return this.getFieldState(name, 'dirty');
    },
    setFieldState(name, state, value) {
      this.fieldState[name][state] = value;
    },
    getErrorMessage(name) {
      return this.fieldState[name]['errorMessage'];
    },
    handleTagsInputChange(tags) {
      this.tags = tags;
      this.setFieldState('tags', 'dirty', true);

      if(this.tags.length === 0) {
        this.setFieldState('tags', 'error', true);
        this.setFieldState('tags', 'errorMessage', 'Setidaknya harus ada satu tag');
      } else {
        this.setFieldState('tags', 'error', false);
      }
    },
    sendData() {
      this.$emit('on-send-data', {
        title: this.title,
        description: this.description,
        tags: this.tags
      });
    },
    onClose() {
      this.$emit('on-close');
    },
    setStatus(status) {
      this.status = status;
    },
    setFormData(formData) {
      this.title = formData.title;
      this.description = formData.description;
      formData.tags.forEach((tag) => {
         this.$refs.inputTags.addNew(tag);
      });
      this.setFieldState('tags', 'dirty', false);
    },
    setLoading(bool) {
      this.isLoading = bool;
    },
    statusIsCreate() {
      return this.status === 'create';
    },
    setError(errorMappedObject) {
      if(errorMappedObject.tags) {
        this.setFieldState('tags', 'error', true);
        this.setFieldState('tags', 'errorMessage', errorMappedObject.tags.msg);
      }

      Object.keys(errorMappedObject).forEach((key) => {
        this.errors.add(key, errorMappedObject[key].msg)
      });
    }
  },
  computed: {
    remainingTitleCharacter() {
      const remainingCharacter = (280 - this.title.length);
      if(remainingCharacter <= 0) {
        return 0;
      }
      return remainingCharacter;
    },
    remainingDescriptionCharacter() {
      const remainingCharacter = (1000 - this.description.length);
      if(remainingCharacter <= 0) {
        return 0;
      }
      return remainingCharacter;
    },
    showTitleError() {
      return this.errors.has('title') && this.fields['title'].dirty;
    },
    showDescriptionError() {
      return this.errors.has('description') && this.fields['description'].dirty;
    },
    showTagsError() {
      return this.isFieldError('tags');
    },
    someFieldDirty() {
      return Object.keys(this.fields).some((key) => this.fields[key].dirty);
    },
    allFieldDirty() {
      return Object.keys(this.fields).every((key) => this.fields[key].dirty);
    },
    canSendData() {
      return !this.errors.any() && this.allFieldDirty && !this.isFieldError('tags') && this.isFieldDirty('tags');
    },
    canSendEditedData() {
      return !this.errors.any() && (this.someFieldDirty || this.isFieldDirty('tags')) && !this.isFieldError('tags');
    }
  }
});

module.exports = argumentForm;