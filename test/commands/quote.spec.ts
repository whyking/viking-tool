import * as chai from 'chai';
import { expect } from 'chai';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
// @ts-ignore
import test from '../test';
import { getBanner } from '../../src/banner';
import { quotes } from '../../src/quotes';
import QuoteCommand from '../../src/commands/quote';

chai.should();
chai.use(require('chai-as-promised'));

describe('OCLIF Command `quote`', () => {
  it('Test `viking-tools quote`', () => test()
    .command(() => QuoteCommand.run())
    .then((context) => {
      expect(context.error).to.be.equal(null, 'It should be not an error.');

      expect(context.stdout).to.satisfy(
        (out: string) => out.startsWith(getBanner()),
        'The output should be start with the banner.',
      );

      const quoteLine = context.stdout.replace(`${getBanner()}\n`, '').split('\n').shift() || '';
      expect(quoteLine).to.equal(
        chalk.blue(stripAnsi(quoteLine)),
        'The quote line should be colored to blue.',
      );
      expect(quoteLine).to.satisfy(
        (quote: string) => quotes.includes(stripAnsi(quote)),
        `The line "${quoteLine}" should be available in the \`quotes\`.`,
      );
    }));
});
