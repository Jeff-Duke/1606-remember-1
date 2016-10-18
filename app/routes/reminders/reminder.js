import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteReminder(reminderForm) {
      let reminder = reminderForm.getProperties('id');
      this.get('store').findRecord('reminder', reminder.id, {
        backgroundReload: false
      }).then(targetReminder => {
        targetReminder.destroyRecord();
      }).then(() => {this.transitionTo('reminders');});
    },
    willTransition() {
      var reminder = this.controllerFor('reminders.reminder');
      reminder.set('isEditing', false);
    }
  }
});
