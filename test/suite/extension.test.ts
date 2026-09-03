import * as assert from 'assert';
import * as vscode from 'vscode';

/**
 * Smoke tests for extension activation.
 *
 * Scenario under test: the extension registers under its declared id and
 * exposes the `genesis.newService` command declared in package.json. This
 * is deliberately the only behavior asserted right now — the wizard itself
 * doesn't exist yet (Epics 2-4), so there's nothing else true to test.
 */
suite('Extension Activation', () => {
  test('extension is present and activates', async () => {
    const ext = vscode.extensions.getExtension('liviuionesi.genesis');
    assert.ok(ext, 'extension should be discoverable by its id');
    await ext?.activate();
    assert.strictEqual(ext?.isActive, true);
  });

  test('genesis.newService command is registered', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(
      commands.includes('genesis.newService'),
      'genesis.newService should be registered on activation',
    );
  });
});
