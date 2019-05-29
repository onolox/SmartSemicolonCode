"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    console.log('"smartsemicolon" is now active!');
    let disposable = vscode.commands.registerCommand('extension.smartSemicolon', () => {
        let selection = vscode.window.activeTextEditor.selection;
        let doc = vscode.window.activeTextEditor.document;
        let texto = doc.lineAt(selection.active.line).text.trim();
        let fimDaLinha = doc.lineAt(selection.active.line).range.end.with(undefined, texto.length);
        if (texto.endsWith(";")) {
            vscode.window.activeTextEditor.edit(editBuilder => {
                editBuilder.insert(selection.active, ";");
            });
        }
        else {
            vscode.window.activeTextEditor.edit(editBuilder => {
                editBuilder.insert(fimDaLinha, ";");
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extensionB.js.map