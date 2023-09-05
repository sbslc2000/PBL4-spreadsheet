
export class Cell {

    #data = null;
    #selected = null;
    #row = null;
    #col = null;
    #clickHandler = null;
    #unselectHandler = null;
    #refresh = null;
    #backgroundColor = null;

    #inputMode = () => {
        this.select();
        this.#clickHandler(this.#row, this.#col);
    }

    #submitHandler = () => {

    }

    //create emtpy cell
    constructor ({data = "", row,col, clickHandler ,refresh, backgroundColor = undefined, unselectHandler}) {
        this.#data = data;
        this.#selected = false;
        this.#row = row;
        this.#col = col;
        this.#clickHandler = clickHandler;
        this.#refresh = refresh;
        this.#backgroundColor = backgroundColor;
        this.#unselectHandler = unselectHandler;
    }
    get data () {
        return this.#data;
    }

    set data(value) {
        this.#data = value;
    }

    element() {

        let box = document.createElement("div");
        box.setAttribute("row",this.#row);
        box.setAttribute("col",this.#col);
        box.classList.add("box");

        if(!this.#selected) {
            box.innerHTML = this.#data;
            box.addEventListener("click",() => {
                this.#inputMode();
            });

            if(this.#backgroundColor !== undefined) {
                box.style.backgroundColor = this.#backgroundColor;
                box.style.color = "#fff";
            }
            return box;
        } else {
            let form = document.createElement("form");
            let input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("style","background-color:#eee;");
            input.value = this.#data;

            form.appendChild(input);
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.#data = e.target[0].value;
                this.unselect();
                this.#unselectHandler(this.#row, this.#col);
            })
            box.appendChild(form);




            return box;
        }
    }

    select () {
        this.#selected = true;
    }

    unselect () {
        this.#selected = false;
    }


}