export function dropdownMenu() {
    const dropdown = Array.from(document.querySelectorAll(".fa-chevron"));
    dropdown.forEach(element => {
        element.addEventListener("click", event => {
            if (event.target.classList.contains("fa-chevron-down")) {
                event.target.parentNode.querySelector(".dropdown-menu").style.display = "block";
                event.target.classList.replace("fa-chevron-down", "fa-chevron-up");
            } else if (event.target.classList.contains("fa-chevron-up")) {
                event.target.parentNode.querySelector(".dropdown-menu").style.display = "none";
                event.target.classList.replace("fa-chevron-up", "fa-chevron-down");
            }

            const clickListener = event => {
                if (!element.contains(event.target) && event.target !== element) {
                    // Le clic a été effectué en dehors de l'élément qui a déclenché l'événement
                    event.target.parentNode.querySelectorAll(".dropdown-menu").forEach(item => {
                        item.style.display = "none";
                        item.parentNode.querySelector(".fa-chevron").classList.replace("fa-chevron-up", "fa-chevron-down");
                    })

                    document.removeEventListener("click", clickListener);
                }
            };
            document.addEventListener("click", clickListener);
        })
    })
}