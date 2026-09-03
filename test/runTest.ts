import * as path from 'path';
import { runTests } from '@vscode/test-electron';

/**
 * Test runner entry point: launches a VS Code Extension Development Host
 * with this extension installed and runs the Mocha suite in
 * `test/suite/index.ts` inside it.
 */
async function main(): Promise<void> {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error('Failed to run tests', err);
    process.exit(1);
  }
}

void main();
