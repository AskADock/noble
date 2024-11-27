import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
// import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const questionPublications = {
  questionAnswer: 'QuestionAnswer',
  questionNotAnswer: 'QuestionNotAnswer',
  questionAll: 'QuestionAll',
};

class QuestionCollection extends BaseCollection {
  constructor() {
    super('Questions', new SimpleSchema({
      category: String,
      question: String,
      answer: {
        type: String,
        optional: true,
      },
      answered: {
        type: Boolean,
        defaultValue: false,
      },
      timestamp: Date,
    }));
  }

  /**
   * Defines a new Question item.
   * @param category the category of the question.
   * @param question the question.
   * @param answer the answer.
   * @param answered whether the question has been answered.
   * @param timestamp the timestamp.
   * @return {String} the docID of the new document.
   */
  define({ category, question, answer, answered, timestamp = new Date() }) {
    const docID = this._collection.insert({
      category,
      question,
      answer,
      answered,
      timestamp,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param category the new category (optional).
   * @param question the new question (optional).
   * @param answer the new answer (optional).
   * @param timestamp the new timestamp.
   * @param answered the new answered status (optional).
   */
  update(docID, { category, question, answer, answered, timestamp = new Date() }) {
    const updateData = {};
    if (category) {
      updateData.category = category;
    }
    if (question) {
      updateData.question = question;
    }
    if (answer) {
      updateData.answer = answer;
    }
    if (answered) {
      updateData.answered = answered;
    }
    if (timestamp) {
      updateData.timestamp = timestamp;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } question The document ID or object.
   * @returns true
   */
  removeIt(question) {
    const doc = this.findDoc(question);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection and just the questions not answered.
   */
  publish() {
    if (Meteor.isServer) {
      // get the QuestionCollection instance.
      const instance = this;
      /** This subscription publishes unanswered questions */
      Meteor.publish(questionPublications.questionAnswer, function publish() {
        return instance._collection.find({ answered: true });
      });

      /** This subscription publishes answered questions */
      Meteor.publish(questionPublications.questionNotAnswer, function publish() {
        return instance._collection.find({ answered: false });
      });

      /** This subscription publishes all questions */
      Meteor.publish(questionPublications.questionAll, function publish() {
        return instance._collection.find();
      });
    }
  }

  /**
   * Subscription method for answered questions
   */
  subscribeQuestionAnswer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(questionPublications.questionAnswer);
    }
    return null;
  }

  /**
   * Subscription method for questions not answered
   */
  subscribeQuestionNotAnswer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(questionPublications.questionNotAnswer);
    }
    return null;
  }

  /**
   * Subscription method for all questions
   */
  subscribeQuestionAll() {
    if (Meteor.isClient) {
      return Meteor.subscribe(questionPublications.questionAll);
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
   * @param docID The docID of a Question
   * @returns {{category: *, question: *, answer: *, answered: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const category = doc.category;
    const question = doc.question;
    const answer = doc.answer;
    const answered = doc.answered;
    const timestamp = doc.timestamp;
    return { category, question, answer, answered, timestamp };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Questions = new QuestionCollection();
