import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { generateID } from '../../utilities/Utilities';
import { Feedback } from './FeedbackCollection';

Meteor.methods({
  'Feedback.define': function (data) {
    check(data, Object);
    const entity = Feedback._collection.findOne({ feedback: data.feedback });
    if (entity) {
      console.error('Feedback already exists');
      throw new Meteor.Error('Feedback already exists');
    }
    try {
      const ID = data._id === undefined ? generateID() : data._id;
      return Feedback._collection.insert({
        ...data,
        ...{ _id: ID },
      });

    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new Feedback:', error);
    }
  },
  'Feedback.update': function (data) {
    check(data, Object);
    const doc = Feedback._collection.findOne({ _id: data._id });
    if (!doc) {
      console.error('Feedback not found');
      throw new Meteor.Error('Feedback not found');
    }
    try {
      Feedback._collection.update(data._id, { $set: data });
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update Feedback:', error);
    }
  },
  'Feedback.remove': function (data) {
    check(data, String);
    const doc = Feedback._collection.findOne({ _id: data });
    if (!doc) {
      console.error('Feedback not found');
      throw new Meteor.Error('Feedback not found');
    }
    try {
      Feedback._collection.remove(data);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove Feedback:', error);
    }
  },
});
