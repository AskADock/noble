import { Meteor } from 'meteor/meteor';
import { Categories } from '../../api/category/CategoryCollection';
import { Questions } from '../../api/question/QuestionCollection';
import { FAQ } from '../../api/faq/FAQCollection';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import { Feedback } from '../../api/feedback/FeedbackCollection';
/* eslint-disable no-console */

// Initialize the database with a default category document.
function addCategory(data) {
  console.log(`  Adding: ${data.category}`);
  Categories.define(data);
}

// Initialize the database with a default question document.
function addQuestion(data) {
  console.log(`  Adding: ${data.question}`);
  Questions.define(data);
}

// Initialize the database with a default FAQ document.
function addFAQ(data) {
  console.log(`  Adding: ${data.question}`);
  FAQ.define(data);
}

// Initialize the FeedbackCollection with a default feedback document.
function addFeedback(data) {
  console.log(`  Adding: ${data.feedback}`);
  Feedback.define(data);
}

// Initialize the PasscodeCollection with a default passcode document.
function addPasscode(data) {
  console.log(`  Adding: ${data.code}`);
  Passcodes.define(data);
}

// Initialize the CategoriesCollection if empty
if (Categories.count() === 0) {
  if (Meteor.settings.defaultCategories) {
    console.log('Creating default categories.');
    Meteor.settings.defaultCategories.forEach(data => addCategory(data));
  }
}

// Initialize the QuestionCollection if empty.
if (Questions.count() === 0) {
  if (Meteor.settings.defaultQuestions) {
    console.log('Creating default questions.');
    Meteor.settings.defaultQuestions.forEach(data => addQuestion(data));
  }
}

// Initialize the FAQCollection if empty.
if (FAQ.count() === 0) {
  if (Meteor.settings.defaultFAQ) {
    console.log('Creating default FAQs.');
    Meteor.settings.defaultFAQ.forEach(data => addFAQ(data));
  }
}

// Initialize the FeedbackCollection if empty.
if (Feedback.count() === 0) {
  if (Meteor.settings.defaultFeedback) {
    console.log('Creating default feedback.');
    Meteor.settings.defaultFeedback.forEach(data => addFeedback(data));
  }
}

// Initialize the PasscodeCollection if empty.
if (Passcodes.count() === 0) {
  if (Meteor.settings.defaultPasscodes) {
    console.log('Creating default passcodes.');
    Meteor.settings.defaultPasscodes.forEach(data => addPasscode(data));
  }
}
