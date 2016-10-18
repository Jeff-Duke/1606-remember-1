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
  //user visits homepage, selects first item, clicks edit, and enters new values for each input
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
  //user saves those changes
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
  //user visits page and clicks on first item, title of that item saved
  let originalTitle;
  visit('/');
  click('.spec-reminder-item:first');
  andThen(function() {
    originalTitle =  find('.spec-reminder-title').text().trim();
  });
  //user clicks edit
  click('.edit-reminder-button');
  andThen(function() {
    assert.equal(find('.revert-changes-button').is(':disabled'), true);
  });
  //user edits title
  fillIn('.spec-input-title', 'brush teeth');
  andThen(function() {
    assert.equal(find('.spec-input-title').val(), "brush teeth");
    assert.equal(find('.revert-changes-button').is(':disabled'), false);
    assert.equal(find('.unsaved-reminder').length, 1);
  });
  //user clicks the revert button to undo changes
  click('.revert-changes-button');
  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-title').text().trim(), originalTitle);
    assert.equal(find('.unsaved-reminder').length, 0  );
  });
});

test('deleting a reminder removes that reminder and navigates to reminders.index', function(assert) {
  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });

  click('.delete-reminder-button');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(Ember.$('.spec-reminder-item').length, 4);
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
});
