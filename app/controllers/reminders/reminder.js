import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editReminder: function() {
      this.toggleProperty('isEditing');
    },

    saveReminder(reminderForm) {
      let newDate = reminderForm.getProperties('date');
      reminderForm.set('date', new Date(newDate.date));
      reminderForm.save().then(() => { this.toggleProperty('isEditing');
      });
    },

    revertChanges(reminderForm) {
      reminderForm.rollbackAttributes();
    }
  },
});
