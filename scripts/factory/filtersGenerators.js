import { workingRecipes } from "../page/index.js"
import { choosenFilters } from "../page/index.js"
import { filteringEngine } from "../utils/FilteringEngine.js"
import { filteredRecipies } from "../utils/FilteringEngine.js"
//import { filteringEngine } from "../utils/FilteringEngineV2.js"
//import { filteredRecipies } from "../utils/FilteringEngineV2.js"



export class filterList {

    filters = {
        ingredientsFilter: [],
        appareilsFilter: [],
        ustensilesFilter: [],
    };

    filtersBtnLists = document.querySelectorAll(".dropdown-menu");

    currentFiltersContainer = document.querySelector(".currentFilters__container");

    clickListItemEventListener = null;

    inputsFilterField = Array.from(document.querySelectorAll(".dropdown > input"));

    constructor() {
        this.main();
    };

    main() {
        this.filterGenerator();
        this.supressIdenticalWords();
        this.uppercaseFirstLetter();
        this.alreadyExistingTag();
        this.domFiltersInsertion();
        this.clickedFilterItem();
        this.inputFilterField();
    }

    filterGenerator() {
        let recipesToDisplay = [];
        const ingredientsFilter = new Set();
        const appareilsFilter = new Set();
        const ustensilesFilter = new Set();

        if (filteredRecipies.length === 0) {
            recipesToDisplay = [...workingRecipes]
        } else {
            recipesToDisplay = [...filteredRecipies]
        }


        recipesToDisplay.forEach(item => {
            //appliance
            appareilsFilter.add(item.appliance.toLowerCase())

            //ingredients
            item.ingredients.forEach(ingredients => {
                ingredientsFilter.add(ingredients.ingredient.toLowerCase())
            })

            //ustensils
            item.ustensils.forEach(ustensils => {
                ustensilesFilter.add(ustensils.toLowerCase())
            })
        })

        // console.log(ingredientsFilter, appareilsFilter, ustensilesFilter)

        this.filters.appareilsFilter = Array.from(appareilsFilter).sort();
        this.filters.ingredientsFilter = Array.from(ingredientsFilter).sort();
        this.filters.ustensilesFilter = Array.from(ustensilesFilter).sort();

    }

    supressIdenticalWords() {
        for (const key in this.filters) {
            this.filters[key].forEach((item) => {
                if (this.filters[key].includes(String(item + "s"))) {
                    this.filters[key].splice(this.filters[key].indexOf(item) + 1, 1)
                }
            });
        }
        // console.log(this.filters)
    }



    uppercaseFirstLetter() {
        //Uppercase de la premiere lettre
        for (let prop in this.filters) {
            this.filters[prop].forEach((stringToChange, index) => {
                this.filters[prop][index] = stringToChange.replace(stringToChange.charAt(0), stringToChange.charAt(0).toUpperCase());
            });
        }
    }



    alreadyExistingTag() {
        let existingFilterTags = document.querySelectorAll(".filterBtn");
        console.log("existingFilterTags", existingFilterTags, "filter", this.filters);
        existingFilterTags.forEach(tag => {
            console.log("tag.classList", this.filters[tag.classList[0]], this.filters[tag.classList[0]].indexOf(tag.innerText))
            this.filters[tag.classList[0]].splice(this.filters[tag.classList[0]].indexOf(tag.innerText), 1)

        })
    }



    domFiltersInsertion() {
        this.filtersBtnLists.forEach(item => {
            let filterType = item.classList[2];
            item.innerHTML = "";
            this.filters[filterType].forEach(item2 => {
                item.innerHTML += `<li><a class="dropdown-item" href="#">${item2}</a></li>`
            })
        })
    }

    clickedFilterItem() {
        let filtersListElements = document.querySelectorAll(".dropdown-item");

        this.clickListItemEventListener = event => {
            event.preventDefault();
            event.stopImmediatePropagation();

            this.currentFiltersContainer.innerHTML += `
                <button class="${event.target.parentElement.parentElement.previousElementSibling.classList[4]} ${event.target.parentElement.parentElement.previousElementSibling.classList[3]} filterBtn ">
                    <span>${event.target.innerText}</span>
                    <i class="fa-regular fa-circle-xmark"></i>
                </button>
                `

            //ajout de l'option de recherche dans l'objet global
            choosenFilters[event.target.parentElement.parentElement.classList[2]].push(event.target.innerText);



            //affiche la section filtres actifs
            this.currentFiltersContainer.style.display = "flex"
            this.selectedFilterClose();

            this.alreadyExistingTag();
            //appel de la fonction de filtrage
            filteringEngine(choosenFilters);



            //supression de la liste Ul du dom
            event.target.parentElement.remove();
        }

        filtersListElements.forEach(item => {
            item.addEventListener("click", this.clickListItemEventListener);
        })


    }


    selectedFilterClose() {
        let closeBtns = Array.from(document.querySelectorAll(".fa-circle-xmark"));
        closeBtns.forEach(item => {
            item.addEventListener("click", event => {
                //reintegration dans l'input filtre
                this.filtersBtnLists.forEach(item2 => {
                    if (item2.classList.contains(item.parentElement.classList[0])) {
                        //firstChild est utilisée pour extraire le noeud li du fragment de document créé par createContextualFragment().
                        let itemToAdd = document.createRange().createContextualFragment(
                            `<li><a class="dropdown-item" href="#">${item.previousElementSibling.innerText}</a></li>`
                        ).firstChild;
                        //ajout de l'event listener
                        itemToAdd.addEventListener("click", this.clickListItemEventListener);
                        //reintegration de la node à l'index
                        item2.insertBefore(itemToAdd, item2.children[this.filters[item.parentElement.classList[0]].indexOf(item.previousElementSibling.innerText)])
                    }
                })

                //supression dans la variable globale:
                choosenFilters[item.parentElement.classList[0]].splice(choosenFilters[item.parentElement.classList[0]].indexOf(item.previousElementSibling.innerText), 1);

                //supression de la node
                event.target.parentNode.remove();

                //display none de la section si aucun bouton
                if (!String(this.currentFiltersContainer.innerHTML).includes("button")) {
                    this.currentFiltersContainer.style.display = "none";
                }

                //appel de la fonction de filtration
                filteringEngine(choosenFilters);
            })
        })
    }

    inputFilterField() {
        this.inputsFilterField.forEach(item => {
            item.addEventListener("keyup", event => {
                let linkedInputUlListElems = Array.from(event.target.nextElementSibling.querySelectorAll("li"))
                let itemValue = event.target.value;
                filterList.filterItemList(linkedInputUlListElems, itemValue);
            });
        })

    }

    static filterItemList(linkedInputUlListElems, itemValue) {
        const filteredElems = Array.from(linkedInputUlListElems.filter(elem => {
            return !elem.firstChild.innerText.toLowerCase().includes(itemValue.toLowerCase())
        }))
        const unFilteredElems = Array.from(linkedInputUlListElems.filter(elem => {
            return elem.firstChild.innerText.toLowerCase().includes(itemValue.toLowerCase())
        }))
        filteredElems.forEach(item => {
            item.style.display = "none";
        })
        unFilteredElems.forEach(item => {
            item.style.display = "block";
        })
    }

}