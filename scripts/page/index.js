import { filterList } from "../factory/filtersGenerators.js"
import { dropdownMenu } from "../utils/dropdownMenu.js"
import { recipes } from "../../data/recipes.js"
import { recipeCard } from "../factory/recipesFactory.js"
import { filteringEngine } from "../utils/FilteringEngine.js"



export let choosenFilters = {
    input: "",
    ingredientsFilter: [],
    appareilsFilter: [],
    ustensilesFilter: [],
};

export let workingRecipes = recipes;

function init() {
    new filterList();
    dropdownMenu();
    workingRecipes.forEach(recipe => {
        new recipeCard(recipe);
    });
    mainImputEvent();
}



function mainImputEvent() {
    let mainInput = document.querySelector("#recipeFilter__input");
    let timeout = null;

    mainInput.addEventListener("input", event => {
        clearTimeout(timeout);
        //timeout debounce pour attendre la fin de saisie et ne pas surcharger le navigateur
        timeout = setTimeout(() => {
            inputFiltering(event);
        }, 450);
    })
}


function inputFiltering(event) {
    if (event.target.value.length >= 3 && /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(event.target.value)) {
        //decoupage des mots de l'input globale
        choosenFilters.input = event.target.value.split(" ");
    } else {
        choosenFilters.input = "";
    }
    filteringEngine(choosenFilters);
}


init();
