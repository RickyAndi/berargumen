const Vue = require('vue');

const topicSelector = Vue.component('topic-selector', {
  template : require('../templates/topic-selector.html'),
  data() {
    return {
      topics : [
        {
          name : 'agama',
          selected : false
        },
        {
          name : 'semua',
          selected : false
        }
      ]
    }
  },
  methods : {
    selectTopic : function() {
      const joinedSelectedTopic = this.topics
        .filter(topic => {
          return topic.selected;
        })
        .map(topic => {
          return topic.name;
        })
        .join(',');
      
      this.$emit('topic-selected', {
        topics : joinedSelectedTopic
      });
    }
  }
});

module.exports = topicSelector;
