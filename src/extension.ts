'use strict';

import * as vscode from 'vscode';
import * as faker from 'faker';

// faker.prototype.setLocale = function (locale) {
//     this.locale = locale;
// }

export function activate() {
	console.log('Congratulations, your extension "EQUALITY" is now active!');
	vscode.commands.registerCommand('extension.equality', equality);
}

function equality(){
    const
        config = vscode.workspace.getConfiguration(),
        equal = String(config.get('equality.symbol')),
        editor = vscode.window.activeTextEditor;

        faker.locale = String(config.get('faker.locale'));

    var
        position = editor.selection.active,
        lineText = editor.document.getText(
            new vscode.Selection(
                position.line, 0,
                position.line, position.character
            )
        ),
        result,
        equalPosition = lineText.lastIndexOf(equal);

    if(equalPosition > -1 && lineText.length > 3){
        var
            contentSelection = new vscode.Selection(
                position.line, equalPosition,
                position.line, position.character
            ),
            contentText = editor.document.getText(contentSelection);


        if(result = evaluate(contentText)){
            editor.edit(function (edit) {
                edit.replace(contentSelection, String(result));
            });
        }
    }
}

function evaluate(str){
    let evalue = str.replace(/ /g, '').substr(1);

    try {
        return eval(evalue);
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.warn(e.message);
            return false
        }
    }
}

export function deactivate() {
    console.log('OPS, your extension "EQUALITY" is not active!');
}
