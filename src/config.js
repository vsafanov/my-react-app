import { fontColor, link } from "suneditor/src/plugins";
import mergeTag from "./Components/plugins/merge_tag_plugin";

export const optionsDetails = {
    className: 'sun-editor-custom',
    defaultTag: 'div',
    plugins: [
        mergeTag,
        fontColor,
        link
    ],
    buttonList: [
        ['codeView'], ['preview'], ["undo", "redo"], ['bold','italic'], 
        [
            {
                name: 'merge_tag',
                dataCommand: 'merge_tag',
                buttonClass: 'phrases',
                title: 'Phrases',
                dataDisplay: 'submenu',
                innerHTML: "Phrases"

            }
        ],['list'],['link'],["fontColor"],["removeFormat"],
    ]
}

export const optionsTitle = {
    className: 'sun-editor-custom',
    defaultTag: 'div',
    plugins: [
        mergeTag
    ],
    buttonList: [
        ['codeView'], ["undo", "redo"], ["removeFormat"], ["bold"],
        [
            {
                name: 'merge_tag',
                dataCommand: 'merge_tag',
                buttonClass: 'phrases',
                title: 'Phrases',
                dataDisplay: 'submenu',
                innerHTML: "Phrases"
            }
        ]
    ]
}