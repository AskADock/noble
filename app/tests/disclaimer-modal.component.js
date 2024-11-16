import { t } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class DisclaimerModal {
  // Close the disclaimer modal.
  async closeDisclaimerModal() {
    await t.expect(`#${COMPONENT_IDS.DISCLAIMER_MODAL}`).ok();
    await t.click(`#${COMPONENT_IDS.DISCLAIMER_MODAL_CLOSE}`);
  }
}

export const disclaimerModal = new DisclaimerModal();
