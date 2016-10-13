import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    createReminder(reminderForm) {
      let reminder = reminderForm.getProperties('title', 'date', 'notes');
      reminder.date = new Date(reminder.date);
      this.get('store').createRecord('reminder', reminder).save().then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
      });
    }
  }
});
