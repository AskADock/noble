import { Selector, t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class FAQFilter {
  constructor() {
    this.pageId = `#${COMPONENT_IDS.FAQ_FILTER}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Assert that the FAQ Filter is displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that the Ask A Doc button works */
  async askADocButton() {
    const askADocButton = Selector(`#${COMPONENT_IDS.FAQ_FILTER_ASK_A_DOC_BUTTON}`);
    const askADocButtonSmall = Selector(`#${COMPONENT_IDS.FAQ_FILTER_ASK_A_DOC_BUTTON_SMALL}`);

    if (await askADocButton.visible) {
      await t.click(askADocButton);
    } else if (await askADocButtonSmall.visible) {
      await t.click(askADocButtonSmall);
    }
  }

  /** Asserts that the FAQ filter dropdown works */
  async filterDropdown() {
    const dropdown = Selector(`#${COMPONENT_IDS.FAQ_FILTER_DROPDOWN}`);
    await t.click(dropdown);
    const checkbox = dropdown.find('input[type="checkbox"]').withAttribute('value', 'FLYERS');
    await t.click(checkbox);
  }
}

export const faqFilter = new FAQFilter();
