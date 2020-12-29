import * as fs from 'fs';
import path from 'path';
import { Caller } from './viking-tools';

/**
 * Deletes a file or directory recursively.
 *
 * @param dir directory which contains the file to delete
 * @param file name of the file to delete (without parent directory)
 */
export const deleteFile = (dir: string, file: string) => (caller: Caller) => {
  const fileToDelete = path.join(dir, file);

  if (fs.existsSync(fileToDelete)) {
    fs.rmdirSync(fileToDelete, { recursive: true });

    caller.listener('cleanup-dirs:file-deleted', fileToDelete);
  }
};

/**
 * Cleans up Maven files from a directory.
 *
 * @param dir directory to clean up
 * @param files files in the directory
 */
const cleanupMaven = (dir: string, files: string[]) => (caller: Caller) => {
  if (files.includes('pom.xml')) {
    deleteFile(dir, 'target')(caller);
    deleteFile(dir, 'pom.xml.tag')(caller);
    deleteFile(dir, 'pom.xml.releaseBackup')(caller);
    deleteFile(dir, 'pom.xml.versionsBackup')(caller);
    deleteFile(dir, 'pom.xml.next')(caller);
    deleteFile(dir, 'release.properties')(caller);
    deleteFile(dir, 'dependency-reduced-pom.xml')(caller);
    deleteFile(dir, 'buildNumber.properties')(caller);
    deleteFile(dir, 'build.log')(caller);
  }
};

/**
 * Cleans up npm files from a directory.
 *
 * @param dir directory to clean up
 * @param files files in the directory
 */
const cleanupNpm = (dir: string, files: string[]) => (caller: Caller) => {
  if (files.includes('package.json')) {
    deleteFile(dir, 'node_modules')(caller);
    deleteFile(dir, '.nyc_output')(caller);
    deleteFile(dir, 'coverage')(caller);
    deleteFile(dir, 'dist')(caller);
    deleteFile(dir, 'tmp')(caller);
    files
      .filter((file: string) => file.endsWith('.zip') || file.endsWith('.tgz'))
      .forEach((file: string) => deleteFile(dir, file)(caller));
  }
};

const cleanupDirs = (dirs: string[], ignores: string[]) => (caller: Caller): Promise<Caller> => {
  const dir = dirs.shift();
  if (dir === undefined) {
    return Promise.resolve(caller);
  }
  caller.listener('cleanup-dirs:check-directory', dir);

  if (fs.existsSync(dir)) {
    let files = fs.readdirSync(dir);

    cleanupMaven(dir, files)(caller);
    cleanupNpm(dir, files)(caller);

    files = fs.readdirSync(dir);

    files.forEach((file: string) => {
      if (
        fs.existsSync(path.join(dir, file))
        && fs.lstatSync(path.join(dir, file))
          .isDirectory()
        && (!ignores.includes(file))
      ) {
        dirs.unshift(path.join(dir, file));
      }
    });
  } else {
    caller.listener('cleanup-dirs:dir-not-exists', dir);
  }

  return cleanupDirs(dirs, ignores)(caller);
};

export default cleanupDirs;
