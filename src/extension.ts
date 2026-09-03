import * as vscode from 'vscode';

/**
 * Extension entry point. Registers Spring Genesis's commands.
 *
 * Currently a placeholder: the wizard (model input, codegen engine, output
 * writer) lands with Epics 2-4 (see docs/architecture/ARCHITECTURE.md).
 * This activation exists so the repo is buildable and installable from
 * commit one, per AGENTS.md's "leave it buildable" rule.
 *
 * @param context extension context, used to register disposables
 */
export function activate(context: vscode.ExtensionContext): void {
  const newService = vscode.commands.registerCommand('genesis.newService', () => {
    void vscode.window.showInformationMessage(
      'Spring Genesis is still being built — track progress at ' +
        'https://github.com/liviuionesi/genesis/issues',
    );
  });

  context.subscriptions.push(newService);
}

/** Extension deactivation hook. Nothing to clean up yet. */
export function deactivate(): void {}
