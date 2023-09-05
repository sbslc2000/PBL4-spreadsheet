
export const MenuButton = (name, eventHandler) => {
    let button = document.createElement("button");
    button.name = name;
    button.classList.add("menu-btn");
    button.innerHTML = name;
    button.addEventListener("click",eventHandler);
    return button;
}

export const ImportButton = (name, eventHandler) => {
    let button = document.createElement("button");
    button.classList.add("menu-btn");
    button.innerHTML = name;

    let input = document.createElement("input");
    input.style="display:none";
    input.type="file";
    input.addEventListener("change",eventHandler);

    button.addEventListener("click",() => {
        input.click();
    });

    button.appendChild(input);
    return button;
}