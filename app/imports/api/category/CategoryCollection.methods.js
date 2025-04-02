import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { generateID } from '../../utilities/Utilities';
import { Categories } from './CategoryCollection';
import { FAQ } from '../faq/FAQCollection';
import { Questions } from '../question/QuestionCollection';

Meteor.methods({
  'Categories.define': function (data) {
    check(data, Object);
    const entity = Categories._collection.findOne({ category: data.category, question: data.question });
    if (entity) {
      console.error('Categories already exists');
      throw new Meteor.Error('Categories already exists');
    }
    try {
      const ID = data._id === undefined ? generateID() : data._id;
      return Categories._collection.insert({
        ...data,
        ...{ _id: ID },
      });

    } catch (error) {
      throw new Meteor.Error('create-failed', 'Failed to create new Categories:', error);
    }
  },
  'Categories.updateCategory': function (data) {
    check(data, Object);

    const { category, newCategory } = data; // Safely destructure category and newCategory
    if (!category || !newCategory) {
      throw new Meteor.Error('invalid-arguments', 'Both category and newCategory are required.');
    }

    const doc = Categories._collection.findOne({ category });
    if (!doc) {
      console.error('Categories not found');
      throw new Meteor.Error('Categories not found');
    }

    try {
    // Update the category in the Categories collection
      Categories._collection.update(
        { category },
        { $set: { category: newCategory } },
      );

      // Update FAQs with the same category
      FAQ._collection.update(
        { category }, // Match FAQs with the old category name
        { $set: { category: newCategory } }, // Update to the new category name
        { multi: true }, // Update multiple documents
      );

      // Update Questions with the same category
      Questions._collection.update(
        { category }, // Match Questions with the old category name
        { $set: { category: newCategory } }, // Update to the new category name
        { multi: true }, // Update multiple documents
      );
    } catch (error) {
      throw new Meteor.Error('update-failed', `Failed to update category: ${error.message}`);
    }
  },
  'Categories.remove': function (data) {
    check(data, String);
    const doc = Categories._collection.findOne({ _id: data });
    if (!doc) {
      console.error('Categories not found');
      throw new Meteor.Error('Categories not found');
    }
    try {
      Categories._collection.remove(data);
    } catch (error) {
      throw new Meteor.Error('remove-failed', 'Failed to remove Categories:', error);
    }
  },
});
