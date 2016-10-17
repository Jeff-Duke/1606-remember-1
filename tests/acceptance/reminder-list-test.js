/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list', {
  beforeEach() {
    server.createList('reminder', 5);
  },
  afterEach() {
    server.shutdown();
  }
});

test('viewing the homepage', function(assert) {

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });
});

test('clicking on an individual item', function(assert) {

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/1');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), Ember.$('.spec-reminder-title').text().trim());
  });
});

test('clicking on new and creating a new item', function(assert) {

  visit('/');
  click('.new-reminder--button');
  fillIn('.spec-input-title', 'brush teeth');
  fillIn('.spec-input-date', "2016-10-20");
  fillIn('.spec-input-notes', 'also floss, probably should do this more often');

  andThen(function() {
    assert.equal(currentURL(), '/new');
    assert.equal(find('.spec-input-title').val(), "brush teeth");
    assert.equal(find('.spec-input-date').val(), "2016-10-20");
    assert.equal(find('.spec-input-notes').val(), "also floss, probably should do this more often");
    assert.equal(find('.new-reminder--submit').text(), "Submit");
  });

  click('.new-reminder--submit');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item:last').text().trim(), 'brush teeth');
    assert.equal(Ember.$('.list-date:last').text().trim(), 'Wed Oct 19 2016 18:00:00 GMT-0600 (MDT)');
  });
});

test('clicking editing and saving a record', function(assert) {

  visit('/');
  click('.spec-reminder-item:first');
  click('.edit-reminder-button');
  fillIn('.spec-input-title', 'brush teeth');
  fillIn('.spec-input-date', "2016-10-20");
  fillIn('.spec-input-notes', 'also floss, probably should do this more often');

  andThen(function() {
    assert.equal(find('.spec-input-title').val(), "brush teeth");
    assert.equal(find('.spec-input-date').val(), "2016-10-20");
    assert.equal(find('.spec-input-notes').val(), "also floss, probably should do this more often");
    assert.equal(find('.new-reminder--submit').text(), "Save");
  });

  click('.new-reminder--submit');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title').text().trim(), 'brush teeth');
    assert.equal(Ember.$('.spec-reminder-date').text().trim(), 'Wed Oct 19 2016 18:00:00 GMT-0600 (MDT)');
    assert.equal(Ember.$('.spec-reminder-notes').text().trim(), 'also floss, probably should do this more often');

    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), 'brush teeth');
    assert.equal(Ember.$('.list-date:first').text().trim(), 'Wed Oct 19 2016 18:00:00 GMT-0600 (MDT)');
  });
});

test('reverting changes to a record that is being updated', function(assert) {
  let originalTitle;
  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    originalTitle =  find('.spec-reminder-title').text().trim();
  });

  click('.edit-reminder-button');

  andThen(function() {
    assert.equal(find('.revert-changes-button').is(':disabled'), true);
  });

  fillIn('.spec-input-title', 'brush teeth');

  andThen(function() {
    assert.equal(find('.spec-input-title').val(), "brush teeth");
    assert.equal(find('.revert-changes-button').is(':disabled'), false);
  });

  click('.revert-changes-button');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title').text().trim(), originalTitle);
  });
});
