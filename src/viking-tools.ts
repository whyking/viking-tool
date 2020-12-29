import chalk from 'chalk';

const packageJson = require('../package.json');

export const getVersion = () => packageJson.version;

export interface Logger {
  info: { (message?: string, ...optionalParams: any[]): void },
  warn: { (message?: any, ...optionalParams: any[]): void },
  error: { (message?: any, ...optionalParams: any[]): void }
}

export type Listener = { (eventType: string, data: any): void };

export type Caller = { logger: Logger, listener: Listener };
type ResolverPromiseLike = PromiseLike<{ logger: Logger; listener: Listener }>;
type ResolverExplicitValue = { logger: Logger; listener: Listener };
type ResolverValue = ResolverPromiseLike | ResolverExplicitValue;

type Resolver = (value?: (ResolverValue)) => void;

const promise = (executor: { (resolve: Resolver): void }) => new Promise<Caller>(executor);

export const promiseChain = (logger: Logger, listener: Listener) => promise(((resolve) => {
  resolve({
    logger,
    listener,
  });
}));

export const toolTag = () => chalk.grey('[') + chalk.yellow('Viking\'s') + chalk.cyan(' CLI Tools') + chalk.grey(']');
