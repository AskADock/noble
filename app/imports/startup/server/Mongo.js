import { Meteor } from 'meteor/meteor';
// import { Stuffs } from '../../api/stuff/StuffCollection';
import { Categories } from '../../api/category/CategoryCollection';
import { Questions } from '../../api/question/QuestionCollection';
import { FAQ } from '../../api/faq/FAQCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
// function addData(data) {
//   console.log(`  Adding: ${data.name} (${data.owner})`);
//   Stuffs.define(data);
// }

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

// Initialize the StuffsCollection if empty.
// if (Stuffs.count() === 0) {
//   if (Meteor.settings.defaultData) {
//     console.log('Creating default data.');
//     Meteor.settings.defaultData.forEach(data => addData(data));
//   }
// }

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
