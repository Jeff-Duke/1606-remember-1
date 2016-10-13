import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editReminder: function() {
      this.set('isEditing', true);
    }
  },

  isEditing: false
});
