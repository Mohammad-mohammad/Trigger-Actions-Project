import type { Diagnostic } from 'vscode-languageserver/browser.js';
import { EmptyFileSystem, DocumentState } from 'langium';
import { startLanguageServer } from 'langium/lsp';
import { BrowserMessageReader, BrowserMessageWriter, createConnection, NotificationType } from 'vscode-languageserver/browser.js';
import { createTriggerActionsServices } from './trigger-actions-module.js';

/* browser specific setup code */
const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

// Inject the shared services and language-specific services
const { shared, TriggerActions } = createTriggerActionsServices({ connection, ...EmptyFileSystem });

// Start the language server with the shared services
startLanguageServer(shared);

// Send a notification with the serialized AST after every document change
type DocumentChange = { uri: string, content: string, diagnostics: Diagnostic[] };
const documentChangeNotification = new NotificationType<DocumentChange>('browser/DocumentChange');
const jsonSerializer = TriggerActions.serializer.JsonSerializer;
shared.workspace.DocumentBuilder.onBuildPhase(DocumentState.Validated, documents => {
    for (const document of documents) {
        const json = jsonSerializer.serialize(document.parseResult.value);
        connection.sendNotification(documentChangeNotification, {
            uri: document.uri.toString(),
            content: json,
            diagnostics: document.diagnostics ?? []
        });
    }
});