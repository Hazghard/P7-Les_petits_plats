export function dropdownMenu() {

    let selectAlldropdown = document.querySelectorAll(".dropdown-menu");
    let clickFlagHandler = 0;
    let seletedUl = "";


    const dropdown = Array.from(document.querySelectorAll(".fa-chevron"));
    dropdown.forEach(element => {
        displayDropdown(element);
    })

    const inputFilter = Array.from(document.querySelectorAll(".dropdown > input"));
    inputFilter.forEach(element => {
        displayDropdown(element);
    })


    function displayDropdown(element) {
        element.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            seletedUl = event.target.parentNode.querySelector("ul").classList[2];

            if (event.target.classList.contains("fa-chevron-down") || event.target.classList.contains("dropdown-toggle")) {

                selectAlldropdown.forEach(item => {

                    if (item.classList.contains(seletedUl)) {
                        item.style.display = "block";
                        item.parentNode.querySelector(".fa-chevron").classList.replace("fa-chevron-down", "fa-chevron-up");
                        clickFlagHandler = 1;

                        //style de l'input
                        item.parentNode.querySelector("input").style.width = item.offsetWidth + "px";
                        item.style.width = item.offsetWidth + "px";

                        item.parentNode.querySelector("input").style.borderRadius = "5px 5px 0px 0px";
                    }
                    else {
                        item.style.display = "none";
                        item.parentNode.querySelector("input").style.width = "100%";
                        item.style.width = "fit-content";

                        item.parentNode.querySelector("input").style.borderRadius = "5px 5px 5px 5px";
                        item.parentNode.querySelector(".fa-chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                    }
                })

            }
            else if (event.target.classList.contains("fa-chevron-up")) {
                console.log("yes");
                selectAlldropdown.forEach(item => {
                    item.style.display = "none";
                    item.parentNode.querySelector("input").style.width = "100%";
                    item.style.width = "fit-content";

                    item.parentNode.querySelector("input").style.borderRadius = "5px 5px 5px 5px";
                    item.parentNode.querySelector(".fa-chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                })
            }

        })
    }

    document.addEventListener("click", event => {
        if (!event.target.classList.contains(seletedUl)) {

            if (clickFlagHandler) {
                seletedUl = "";
                clickFlagHandler = 0;
                selectAlldropdown.forEach(item => {
                    item.style.display = "none";
                    item.parentNode.querySelector(".fa-chevron").classList.replace("fa-chevron-up", "fa-chevron-down");

                    item.parentNode.querySelector("input").style.width = "100%";
                    item.style.width = "fit-content";

                    item.parentNode.querySelector("input").style.borderRadius = "5px 5px 5px 5px";
                })
            }
        }
    })
}