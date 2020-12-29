/* eslint-disable max-classes-per-file */
import * as chai from 'chai';
import VikingCommand from '../src/viking-command';

chai.should();
chai.use(require('chai-as-promised'));

describe('`CleanupProjectsCommand` class', () => {
  it('Test call `log()` without parameters.', () => {
    class VikingTestCommand extends VikingCommand {
      public getListener() {
        return this.listener();
      }

      run(): PromiseLike<any> {
        return Promise.resolve()
          .then(() => this.log());
      }
    }

    VikingTestCommand.run();
  });
});
