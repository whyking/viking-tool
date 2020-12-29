import { showQuote } from '../quotes';
import { showBanner } from '../banner';
import VikingCommand from '../viking-command';

export default class QuoteCommand extends VikingCommand {
  static description = 'print a random quote';

  async run() {
    return this.promiseChain()
      .then(showBanner())
      .then(showQuote())
      .then(() => {
        this.close();
      });
  }
}
