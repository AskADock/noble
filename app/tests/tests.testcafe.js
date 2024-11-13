// import { Selector, t } from 'testcafe';
import { questionCompassPage, privacyPolicyPage, signOutPage } from './simple.page';
import { landingPage } from './landing.page';
import { disclaimerModal } from './disclaimer-modal.component';
import { faqPage } from './faq.page';
import { faqFilter } from './faq-filter.component';
import { faqList } from './faq-list.component';
import { askADocPage } from './ask-a-doc.page';
import { feedbackPage } from './feedback.page';
import { signInPage } from './signin.page';
// import { signUpPage } from './signup.page';
import { navBar } from './navbar.component';
import { footer } from './footer.component';
// import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'medgroup@foo.com', password: 'Always-Ready-75' };
// const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
// const newCredentials = { username: 'medgrouptest@foo.com', password: 'Always-Ready-75' };

/** Question and replys */
const askADocQuestion = { category: 'Readiness', passcode: '1234', question: 'This is a test(Cafe)?' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

// FAQ page tests
test('Test that FAQ page shows up', async () => {
  await navBar.gotoFAQPage();
  await disclaimerModal.closeDisclaimerModal();
  await faqPage.isDisplayed();
});

test('Test that FAQ questions and answers show up', async () => {
  await navBar.gotoFAQPage();
  await disclaimerModal.closeDisclaimerModal();
  await faqPage.isDisplayed();
  await faqList.questionAnswerCard();
});

test('Test that FAQ filter and search works', async () => {
  await navBar.gotoFAQPage();
  await disclaimerModal.closeDisclaimerModal();
  await faqPage.isDisplayed();
  await faqFilter.filterDropdown();
  await faqList.search();
  await faqList.questionAnswerCard();
});

test('Test that FAQ Ask A Doc button works', async () => {
  await navBar.gotoFAQPage();
  await disclaimerModal.closeDisclaimerModal();
  await faqPage.isDisplayed();
  await faqFilter.askADocButton();
  await askADocPage.isDisplayed();
});

// Question Compass
test('Test that Question Compass page shows up', async () => {
  await navBar.gotoQuestionCompassPage();
  await disclaimerModal.closeDisclaimerModal();
  await questionCompassPage.isDisplayed();
});

// Ask A Doc
test('Test that Ask A Doc page shows up', async () => {
  await navBar.gotoAskADocPage();
  await disclaimerModal.closeDisclaimerModal();
  await askADocPage.isDisplayed();
});

test('Test question submission', async () => {
  await navBar.gotoAskADocPage();
  await disclaimerModal.closeDisclaimerModal();
  await askADocPage.submitQuestion(askADocQuestion.category, askADocQuestion.passcode, askADocQuestion.question);
});

// Feedback
test('Test that Feedback page shows up', async () => {
  await navBar.gotoFeedbackPage();
  await feedbackPage.isDisplayed();
});

// Privacy Policy
test('Test that Privacy Policy page shows up', async () => {
  await footer.gotoPrivacyPolicyPage();
  await privacyPolicyPage.isDisplayed();
});

// Footer tests
test('Test that footer links work', async () => {
  await footer.gotoHomePage();
  await landingPage.isDisplayed();
  await footer.gotoFAQPage();
  await disclaimerModal.closeDisclaimerModal();
  await faqPage.isDisplayed();
  await footer.gotoQuestionCompassPage();
  await disclaimerModal.closeDisclaimerModal();
  await questionCompassPage.isDisplayed();
  await footer.gotoAskADocPage();
  await disclaimerModal.closeDisclaimerModal();
  await askADocPage.isDisplayed();
  await footer.gotoFeedbackPage();
  await feedbackPage.isDisplayed();
  await footer.gotoPrivacyPolicyPage();
  await privacyPolicyPage.isDisplayed();
});

// Sign in and sign out tests
test('Test that signin and signout work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

// test('Test that user pages show up', async () => {
//   await navBar.gotoSignInPage();
//   await signInPage.signin(credentials.username, credentials.password);
//   await navBar.isLoggedIn(credentials.username);
//   await navBar.gotoAddStuffPage();
//   await addStuffPage.isDisplayed();
//   await navBar.gotoListStuffPage();
//   await listStuffPage.isDisplayed();
//   // want to see if we can get to the editStuffPage
//   const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
//   await t.click(editLinks.nth(0));
//   await editStuffPage.isDisplayed();
//   await navBar.logout();
//   await signOutPage.isDisplayed();
// });

// test('Test that sign up and sign out work', async () => {
//   await navBar.gotoSignUpPage();
//   await signUpPage.isDisplayed();
//   await signUpPage.signupUser(newCredentials.username, newCredentials.password);
//   await navBar.isLoggedIn(newCredentials.username);
//   await navBar.logout();
//   await signOutPage.isDisplayed();
// });

// test('Test that admin pages show up', async () => {
//   await navBar.gotoSignInPage();
//   await signInPage.signin(adminCredentials.username, adminCredentials.password);
//   await navBar.isLoggedIn(adminCredentials.username);
//   await navBar.gotoAddStuffPage();
//   await addStuffPage.isDisplayed();
//   await navBar.gotoListStuffPage();
//   await listStuffPage.isDisplayed();
//   // want to see if we can get to the editStuffPage
//   const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
//   await t.click(editLinks.nth(0));
//   await editStuffPage.isDisplayed();
//   await navBar.gotoListStuffAdminPage();
//   await listStuffAdminPage.isDisplayed();
//   // await navBar.gotoManageDatabasePage();
//   // await manageDatabasePage.isDisplayed();
// });
