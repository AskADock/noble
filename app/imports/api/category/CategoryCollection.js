import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';

export const categories = ['Physical Health', 'Mental Health', 'Medical Readiness',
  'Womens Health', 'Mens Health', 'Injury & Illness Management', 'Substance Use & Addiction',
  'Self-Care & Resilience', 'Medical Resources'];
export const categoryPublications = {
  categoryAll: 'categoryAll',
};

class CategoryCollection extends BaseCollection {
  constructor() {
    super('Category', new SimpleSchema({
      category: {
        type: String,
        allowedValues: categories,
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
  update(docID, { category }) {
    const updateData = {};
    if (category) {
      updateData.category = category;
    }

    this._collection.update(docID, { $set: updateData });
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
   * Subscription method for categoies.
   */
  subscribeCategoryAll() {
    if (Meteor.isClient) {
      return Meteor.subscribe(categoryPublications.categoryAll);
    }
    return null;
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
