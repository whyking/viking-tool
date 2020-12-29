/* eslint-disable implicit-arrow-linebreak */
import * as fs from 'fs';
import path from 'path';
import { Caller } from './viking-tools';
import { deleteFile } from './cleanup-dirs';

const cleanupMavenLocalRepositories = (dirs: string[]) => (caller: Caller): Promise<Caller> =>
  new Promise<Caller>((resolve) => {
    if (dirs.length === 0) {
      caller.listener('cleanup-maven-local-repositories:no-dirs-configured', dirs);
    } else {
      dirs.forEach((dir) => {
        const repositoryDir = path.join(dir, 'repository');

        if (fs.existsSync(repositoryDir)) {
          caller.listener('cleanup-maven-local-repositories:delete-directory', repositoryDir);
          deleteFile(dir, 'repository')(caller);
        }
      });
    }
    resolve(caller);
  });

export default cleanupMavenLocalRepositories;
