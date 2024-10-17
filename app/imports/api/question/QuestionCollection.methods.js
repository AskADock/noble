import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { generateID } from '../../utilities/Utilities';
import { Questions } from './QuestionsCollection';

Meteor.methods({
  'Questions.define': function (data) {
    check(data, Object);
    const entity = Questions._collection.findOne({ category: data.category, question: data.question });
    if (entity) {
      console.error('Questions already exists');
      throw new Meteor.Error('Questions already exists');
    }
    try {
      const ID = data._id === undefined ? generateID() : data._id;
      return Questions._collection.insert({
        ...data,
        ...{ _id: ID },
      });

    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new Questions:', error);
    }
  },
  'Questions.update': function (data) {
    check(data, Object);
    const doc = Questions._collection.findOne({ _id: data._id });
    if (!doc) {
      console.error('Questions not found');
      throw new Meteor.Error('Questions not found');
    }
    try {
      Questions._collection.update(data._id, { $set: data });
    } catch (error) {
      throw new Meteor.Error('update-failed', 'Failed to update Questions:', error);
    }
  },
  'Questions.remove': function (data) {
    check(data, String);
    const doc = Questions._collection.findOne({ _id: data });
    if (!doc) {
      console.error('Questions not found');
      throw new Meteor.Error('Questions not found');
    }
    try {
      Questions._collection.remove(data);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove Questions:', error);
    }
  },
});
