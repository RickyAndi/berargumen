const Vue = require('vue');

const collaboratorsView = Vue.component('collaborator-view', {
  template : require('../templates/collaborators-view.html'),
  props : {
    collaborators : {
      type : Array,
      required : true
    }
  }
})

module.exports = collaboratorsView;