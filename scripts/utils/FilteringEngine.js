import { workingRecipes } from "../page/index.js"
import { filterList } from "../factory/filtersGenerators.js"
import { recipeCard } from "../factory/recipesFactory.js"


//VERSION EN forEach + filter
export let filteredRecipies = [];

export function filteringEngine(choosenFilters) {
    filterRecipes(choosenFilters);
}



function filterRecipes(choosenFilters) {
    if (choosenFilters.input.length < 1 && choosenFilters.ingredientsFilter.length == 0 && choosenFilters.appareilsFilter.length == 0 && choosenFilters.ustensilesFilter.length == 0) {
        filteredRecipies = [...workingRecipes];
    } else {
        filteredRecipies = workingRecipes.filter(recipe => {
            let words = recipe.name.toLowerCase().split(' ')
                .concat(recipe.description.toLowerCase().split(' '))
                .concat(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase().split(' ')))
                .flat();

            if (choosenFilters.input.length > 0) {
                return choosenFilters.input.every(word => {
                    // return words.some(word.toLowerCase()) : // si on veux que ce soit le mot complet qui soit egal à l'input ex : "cocotte = false"
                    return words.some(w => w.includes(word.toLowerCase())); // si on veux verifier que le mot contient la suite de lettre ex : "cocotte = true"
                });
            }
            if (choosenFilters.ingredientsFilter.length > 0) {
                return choosenFilters.ingredientsFilter.every(ingredientTag => {
                    return recipe.ingredients.some(ingredient => ingredient.ingredient.search(ingredientTag) !== -1);
                });
            }
            if (choosenFilters.appareilsFilter.length > 0) {
                return choosenFilters.appareilsFilter.every(appareilTag => {
                    return recipe.appliance.some(appareil => appareil.search(appareilTag) !== -1);
                });
            }
            if (choosenFilters.ustensilesFilter.length > 0) {
                return choosenFilters.ustensilesFilter.every(ustensileTag => {
                    return recipe.ustensils.some(ustensil => ustensil.toLowerCase() == ustensileTag.toLowerCase());
                });
            }
        });
    }
    cardsFiltering();
}

function filterRecipesv2(choosenFilters) {
    if (choosenFilters.input.length < 1 && choosenFilters.ingredientsFilter.length == 0 && choosenFilters.appareilsFilter.length == 0 && choosenFilters.ustensilesFilter.length == 0) {
        filteredRecipies = [...workingRecipes];
    } else {
        filteredRecipies = workingRecipes.filter(recipe => {
            if (choosenFilters.input.length > 0) {
                return choosenFilters.input.every(word => {
                    return recipe.name.toLowerCase().includes(word) || recipe.description.toLowerCase().includes(word) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(word));
                });
            }

            if (choosenFilters.ingredientsFilter.length > 0) {
                return choosenFilters.ingredientsFilter.every(ingredientTag => {
                    return recipe.ingredients.some(ingredient => ingredient.ingredient.search(ingredientTag) !== -1);
                });
            }
            if (choosenFilters.appareilsFilter.length > 0) {
                return choosenFilters.appareilsFilter.every(appareilTag => {
                    return recipe.appliance.some(appareil => appareil.search(appareilTag) !== -1);
                });
            }
            if (choosenFilters.ustensilesFilter.length > 0) {
                return choosenFilters.ustensilesFilter.every(ustensileTag => {
                    return recipe.ustensils.some(ustensil => ustensil.toLowerCase() == ustensileTag.toLowerCase());
                });
            }
        });
    }
    cardsFiltering();
}


function cardsFiltering() {
    const main = document.querySelector("main");
    if (filteredRecipies.length === 0) {
        main.innerHTML = "Aucune recette ne correspond à vos critères… vous pouvez chercher « tarte aux pommes », « poisson », etc."
    } else {
        main.innerHTML = "";
        filteredRecipies.forEach(recipe => {
            new recipeCard(recipe);
        })
        new filterList();
    }
}