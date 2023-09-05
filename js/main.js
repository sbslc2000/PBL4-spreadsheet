import {Matrix} from "./Matrix.js";
import {ImportButton, MenuButton} from "./MenuButton";
import {readSheet, writeSheet} from "./sheet";
import {Menu} from "./Menu";


export let matrix = null;
let spreadsheetElem = document.getElementById("spreadsheet");

export const clear = () =>{
    while(spreadsheetElem.firstChild) {
        spreadsheetElem.removeChild(spreadsheetElem.firstChild);
    }
}

export const refresh = () => {
    clear();
    if(matrix !== null) {
        spreadsheetElem.appendChild(matrix.element());
        document.querySelectorAll('[row="'+matrix.selectedRow+'"][col="'+matrix.selectedCol+'"]')[0]?.firstChild?.firstChild?.focus();
        //document.getElementById(matrix.selectedId)?.lastChild.lastChild?.focus();
    }
}


const menubarInit = () => {
    //let menu = document.getElementById("menu");
    Menu();
}
const init = () => {
    const props = {};
    props.row = 10;
    props.col = 10;
    props.refresh = refresh;
    matrix = new Matrix(props);
    spreadsheetElem.appendChild(matrix.element());


    menubarInit();
}

init();