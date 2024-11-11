import { t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class Footer {
  // Go to the home page.
  async gotoHomePage() {
    await t.click(`#${COMPONENT_IDS.FOOTER_HOME}`);
  }

  // Go to the FAQ page.
  async gotoFAQPage() {
    await t.click(`#${COMPONENT_IDS.FOOTER_FAQ}`);
  }

  // Go to the Question Compass page.
  async gotoQuestionCompassPage() {
    await t.click(`#${COMPONENT_IDS.FOOTER_QUESTION_COMPASS}`);
  }

  async gotoAskADocPage() {
    await t.click(`#${COMPONENT_IDS.FOOTER_ASK_A_DOC}`);
  }

  // Go to the Feedback page.
  async gotoFeedbackPage() {
    await t.click(`#${COMPONENT_IDS.FOOTER_FEEDBACK}`);
  }

  // Go to the Privacy Policy page.
  async gotoPrivacyPolicyPage() {
    await t.click(`#${COMPONENT_IDS.FOOTER_PRIVACY_POLICY}`);
  }
}

export const footer = new Footer();
