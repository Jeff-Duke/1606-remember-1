import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editReminder: function() {
      this.toggleProperty('isEditing');
    },

    saveReminder(reminderForm) {
      let reminder = reminderForm.getProperties('title', 'date', 'notes', 'id');
      reminder.date = new Date(reminder.date);
      this.get('store').findRecord('reminder', reminder.id).then(function(targetReminder) {
        targetReminder.setProperties({
          title: reminder.title,
          date: reminder.date,
          notes: reminder.notes
        });
        targetReminder.save();
      });
      this.toggleProperty('isEditing');
    },

    revertChanges(reminderForm) {
      console.log('yo button still working', reminderForm.get('hasDirtyAttributes'));
      let reminder = reminderForm.getProperties('title', 'date', 'notes', 'id');
      this.get('store').findRecord('reminder', reminder.id).then(targetReminder => {
        if (targetReminder.get('hasDirtyAttributes')) {
          targetReminder.rollbackAttributes();
          this.toggleProperty('isEditing');
        }
      });
    },

    deleteReminder(reminderForm) {
      let reminder = reminderForm.getProperties('id');
      this.get('store').findRecord('reminder', reminder.id, {
        backgroundReload: false
      }).then(targetReminder => {
        targetReminder.destroyRecord();
      });
    }
  },
});
