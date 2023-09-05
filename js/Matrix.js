import {Cell} from "./Cell.js";

const rowSelector = ['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];
export class Matrix {
    #name = null;
    #data = null;
    #row = null;
    #col = null;
    #refresh = null;

    #selectedRow = null;
    #selectedCol = null;

    #selectHandler = (row, col) => {
        if(this.#selectedRow !== null && this.#selectedCol !== null) {
            this.#data[this.#selectedRow][this.#selectedCol].unselect();
        }

        this.#selectedRow = row;
        this.#selectedCol = col;

        this.#refresh();
    }

    #unselectHandler = (row, col) => {
        this.#selectedRow = null;
        this.#selectedCol = null;
        this.#refresh();
    }

    #submitHandler

    constructor ({row = 10, col = 10 ,refresh, data}) {
        this.#row = row;
        this.#col = col;
        this.#refresh = refresh;

        this.#data = [];
        for(let i = 0; i < row; i++) {
            this.#data[i] = [];
            for(let j = 0; j < col; j++) {
                const props = {
                    row : i,
                    col : j,
                    clickHandler: this.#selectHandler,
                    unselectHandler: this.#unselectHandler,
                    refresh: this.#refresh,
                    data: data !== undefined ? data[i][j] : ""
                };

                this.#data[i][j] = new Cell(props);
            }
        }
        console.log(this.#data);
    }

    findCell(id) {
        return this.#data[id];
    }

    get selectedRow() {
        return this.#selectedRow;
    }

    get selectedCol() {
        return this.#selectedCol;
    }


    element() {
        let frame = document.createElement("div");
        frame.id = "spreadsheet-frame";
        const width = (this.#col+1) * 70 + this.#col + 1;
        frame.setAttribute("style","width:"+width+"px");
        let col = document.createElement("div");
        col.id = "spreadsheet-col";

        for(let i=0; i<this.#col + 1; i++) {
            let props = {};
            props.data = rowSelector[i];
            if(i - 1  === this.#selectedCol)
                props.backgroundColor = "cornflowerblue";
            col.appendChild(new Cell(props).element());
        }

        frame.appendChild(col);

        let rowanddata = document.createElement("div");
        rowanddata.id = "spreadsheet-rowanddata";

        let row = document.createElement("div");
        row.id = "spreadsheet-row";

        for(let i= 1; i< this.#row + 1; i++) {
            let props = {};
            props.data = i;

            if(i - 1  === this.#selectedRow)
                props.backgroundColor = "cornflowerblue";

            row.appendChild(new Cell(props).element());
        }

        let data = document.createElement("div");
        data.id= "spreadsheet-data";
        for(let i=0; i< this.#data.length; i++) {
            for(let j = 0; j< this.#data[i].length; j++) {
                data.appendChild(this.#data[i][j].element());
            }
        }

        rowanddata.appendChild(row);
        rowanddata.appendChild(data);

        frame.appendChild(rowanddata);

        return frame;
    }

    get data() {
        let result = [];
        for(let i=0; i< this.#row; i++) {
            result[i] = [];
            for(let j = 0; j< this.#col; j++) {
                result[i][j] = this.#data[i][j].data;
            }
        }

        return result;
    }

}