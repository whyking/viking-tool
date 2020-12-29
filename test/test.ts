/* eslint-disable implicit-arrow-linebreak */
import { v4 as createUuid } from 'uuid';
import path from 'path';
import * as os from 'os';
import { mkdirSync } from 'fs';
import { stderr, stdout } from 'stdout-stderr';

type ContextBefore = { uuid: string, tmpDir: string, data: any };
type ContextAfter = {
  uuid: string,
  tmpDir: string,
  data: any,
  stdout: string,
  stderr: string,
  error: any
};

const commandFunction = (context: ContextBefore) =>
  (command: { (context: ContextBefore): PromiseLike<any> }) =>
    new Promise<ContextAfter>((resolve) => {
      stdout.stripColor = false;
      stderr.stripColor = false;

      stdout.start();
      stderr.start();

      Promise.resolve(command(context))
        .then(() => {
          stdout.stop();
          stderr.stop();
          resolve({
            uuid: context.uuid,
            tmpDir: context.tmpDir,
            data: context.data,
            stdout: stdout.output,
            stderr: stderr.output,
            error: null,
          });
        })
        .catch((error) => {
          stdout.stop();
          stderr.stop();
          resolve({
            uuid: context.uuid,
            tmpDir: context.tmpDir,
            data: context.data,
            stdout: stdout.output,
            stderr: stderr.output,
            error,
          });
        });
    });

const isContextBefore = (variableToCheck: any): variableToCheck is ContextBefore =>
  (variableToCheck as ContextBefore) !== undefined;

const testRun = (context: ContextBefore) => ({
  do: (callbackFunction: { (context: ContextBefore): void | ContextBefore }) => {
    const result = callbackFunction(context);
    return testRun(isContextBefore(result) ? result : context);
  },
  command: commandFunction(context),
});

const initTest = () => {
  const uuid = createUuid();
  const tmpDir = path.join(os.tmpdir(), uuid);
  mkdirSync(tmpDir);

  const context = {
    uuid,
    tmpDir,
    data: {},
  };

  return testRun(context);
};

const test = () => initTest();

export default test;
