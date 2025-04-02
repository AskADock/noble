import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { FAQ } from '../faq/FAQCollection';
import { Questions } from '../question/QuestionCollection';

export const categoryPublications = {
  categoryAll: 'categoryAll',
};

class CategoryCollection extends BaseCollection {
  constructor() {
    super('Category', new SimpleSchema({
      category: {
        type: String,
        required: true,
      },
    }));
  }

  /**
   * Defines a new Category item.
   * @param category the category of the question/FAQ.
   * @return {String} the docID of the new document.
   */
  define({ category }) {
    const docID = this._collection.insert({
      category,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param category the new category (optional).
   */
  updateCategory(categoryName, updateData = {}) {
    const { category } = updateData; // Safely destructure category from updateData
    const doc = this._collection.findOne({ category: categoryName });
    if (!doc) {
      throw new Meteor.Error('not-found', `Category with name ${categoryName} not found`);
    }

    const oldCategory = doc.category; // Store the old category name
    const updateFields = {};
    if (category) {
      updateFields.category = category;
    }

    // Update the category in the Categories collection
    this._collection.update(doc._id, { $set: updateFields });

    // Update FAQs and Questions with the same category
    if (category && oldCategory !== category) {
      FAQ._collection.update(
        { category: oldCategory }, // Match FAQs with the old category name
        { $set: { category } }, // Update to the new category name
        { multi: true }, // Update multiple documents
      );

      Questions._collection.update(
        { category: oldCategory }, // Match Questions with the old category name
        { $set: { category } }, // Update to the new category name
        { multi: true }, // Update multiple documents
      );
    }
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } category The document ID or object.
   * @returns true
   */
  removeIt(category) {
    const doc = this.findDoc(category);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection of categories.
   */
  publish() {
    if (Meteor.isServer) {
      // get the Category instance.
      const instance = this;
      /** This subscription publishes documents regardless of user and if signed in */
      Meteor.publish(categoryPublications.categoryAll, function publish() {
        return instance._collection.find();
      });
    }
  }

  /**
   * Subscription method for categories.
   */
  subscribeCategoryAll() {
    if (Meteor.isClient) {
      return Meteor.subscribe(categoryPublications.categoryAll);
    }
    return null;
  }

  /**
     * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
     * This is used in the define, update, and removeIt Meteor methods associated with each class.
     * @param userId The userId of the logged-in user. Can be null or undefined
     * @throws { Meteor.Error } If there is no logged-in user, or the user is not an Admin or User.
     */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format acceptable to the restoreOne or define function.
   * @param docID The docID of a category.
   * @returns {{category: *}} An object representing the definition of the corresponding docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const category = doc.category;
    return { category };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Categories = new CategoryCollection();
