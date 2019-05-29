"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    console.log('"smartsemicolon" is now active!');
    let posicaoOriginal;
    let inserido = false;
    let disposable = vscode.commands.registerCommand('extension.smartSemicolon', () => {
        let selection = vscode.window.activeTextEditor.selection;
        let doc = vscode.window.activeTextEditor.document;
        posicaoOriginal = selection.active;
        let texto = doc.lineAt(selection.active.line).text.trimRight();
        let fimDaLinha = doc.lineAt(selection.active).range.start.with(undefined, texto.length);
        if (texto.endsWith(";")) {
            vscode.window.activeTextEditor.edit(editBuilder => {
                editBuilder.insert(selection.active, ";");
                inserido = false;
            });
        }
        else {
            vscode.window.activeTextEditor.edit(editBuilder => {
                editBuilder.insert(fimDaLinha, ";");
                inserido = true;
            });
        }
    });
    let disposable2 = vscode.commands.registerCommand('extension.smartSemicolonBackspace', () => {
        if (inserido && vscode.window.activeTextEditor.selection.active === posicaoOriginal) {
            vscode.window.activeTextEditor.edit(editBuilder => {
                let selection = vscode.window.activeTextEditor.selection;
                let doc = vscode.window.activeTextEditor.document;
                let texto = doc.lineAt(selection.active.line).text.trimRight();
                let fimDaLinha = doc.lineAt(selection.active).range.start.with(undefined, texto.length);
                let rangeDel = new vscode.Range(fimDaLinha.translate(0, -1), fimDaLinha);
                editBuilder.insert(posicaoOriginal, ";");
                editBuilder.delete(rangeDel);
            });
        }
        else {
            vscode.commands.executeCommand("deleteLeft");
        }
        inserido = false;
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map