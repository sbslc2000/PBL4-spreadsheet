import {ImportButton, MenuButton} from "./MenuButton.js";
import {readSheet, writeSheet} from "./sheet.js";
import {Matrix} from "./Matrix.js";
import {clear,matrix,refresh} from "./main.js";

let spreadsheetElem = document.getElementById("spreadsheet");

const importHandler = (event) => {
    console.log(event);
    readSheet(event.target).then((sheet) => {
        clear();
        console.log(sheet);
        let props = {};

        props.row = sheet[0].row;
        props.col = sheet[0].col;
        props.refresh = refresh;
        props.data = sheet[0].data;
        matrix = new Matrix(props);

        spreadsheetElem.appendChild(matrix.element());
    });
}

const exportHandler = (event) => {
    writeSheet(matrix.data);
}
export const Menu = () => {
    let menubar = document.getElementById("menu");
    menubar.appendChild(ImportButton("Import",importHandler));
    menubar.appendChild(MenuButton("Export",exportHandler));

    return menubar;
}