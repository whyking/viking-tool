import { expect, test } from '@oclif/test';
import stripAnsi from 'strip-ansi';
import { getBanner } from '../../src/banner';
import { quotes } from '../../src/quotes';

const banner = stripAnsi(getBanner());

describe('quote', () => {
  test.stdout()
    .command(['quote'])
    .it('runs `viking-tool quote`', (ctx) => {
      const { stdout } = ctx;
      expect(stdout)
        .to
        .satisfy((out: string) => out.startsWith(banner));

      const stdoutWithoutBanner = stdout.replace(banner, '');
      expect(stdoutWithoutBanner)
        .to
        .satisfy((out: string) => quotes.includes(out.trim()));
    });
});
