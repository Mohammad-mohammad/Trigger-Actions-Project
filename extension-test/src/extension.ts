// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
        vscode.commands.registerCommand('trigger-actions.openWebview', () => {
            const panel = vscode.window.createWebviewPanel(
                'triggerActions',
                'Trigger Actions',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                }
            );

            //const webviewUri = getUri(context.extensionUri, ['dist', 'index.html']);
			const webviewUri =  vscode.Uri.parse('https://example.com');
            panel.webview.html = getWebviewContent(webviewUri);
        })
    );
	
}

function getWebviewContent(webviewUri: vscode.Uri): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Trigger Actions</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" src="${webviewUri}"></script>
        </body>
        </html>
    `;
}

// This method is called when your extension is deactivated
export function deactivate() {}
