import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  date: DS.attr('date'),
  notes: DS.hasMany('note'),
  pinned: DS.attr('boolean', { defaultValue: false }),
});
