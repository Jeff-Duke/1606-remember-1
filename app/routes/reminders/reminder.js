import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteReminder(reminderForm){
        reminderForm.destroyRecord().then(() => {this.transitionTo('reminders');
      });
    },

    willTransition() {
      var reminder = this.controllerFor('reminders.reminder');
      reminder.set('isEditing', false);
    }
  }
});
