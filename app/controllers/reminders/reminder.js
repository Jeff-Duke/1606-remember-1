import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editReminder: function() {
      this.toggleProperty('isEditing');
    },

    saveReminder(reminderForm) {
      let reminder = reminderForm.getProperties('title', 'date', 'notes', 'id');
      reminder.date = new Date(reminder.date);
      this.get('store').findRecord('reminder', reminder.id).then(function(targetReminder){
        targetReminder.setProperties({title: reminder.title, date: reminder.date, notes: reminder.notes}).save();
      });
      this.toggleProperty('isEditing');
    }
  },

});
