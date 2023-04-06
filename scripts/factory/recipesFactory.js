export class recipeCard {

    recipe = "";

    constructor(recipe) {
        this.recipe = recipe;
        this.main();
    }

    main() {
        this.articleCreation();
    }

    articleCreation() {
        let main = document.querySelector("main");
        // console.log(this.recipe)
        let ingredientsList = "";
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
            ingredientsList += `
                <li>
                    <h3>${this.recipe.ingredients[i].ingredient}</h3>
                    <span>${this.recipe.ingredients[i].quantity ? " : " + this.recipe.ingredients[i].quantity : ""} ${this.recipe.ingredients[i].unit ? (this.recipe.ingredients[i].unit.indexOf("cuillères") >= 0 ? "cuillères" : (this.recipe.ingredients[i].unit.indexOf("grammes") >= 0 ? "g" : this.recipe.ingredients[i].unit)) : ""}
                    </span>
                </li>
            `
        }

        main.innerHTML += `
            <article class="card__container">
                <section class="card--imgSection">
                    <!-- <img src="" alt="" class="card--imgSection__img"> -->
                </section>
                <section class="card--txtSection">
                    <div class="card--txtSection__Title">
                        <h2>${this.recipe.name}</h2>
                        <div class="card--txtSection__timerContainer">
                            <em class="fa-regular fa-clock"></em>
                            <p>${this.recipe.time} min</p>
                        </div>
                    </div>
                    <div class="card--txtSection__List">
                        <ul>
                            ${ingredientsList}
                        </ul>
                        <div class="p--wrapper">
                            <p>${this.recipe.description}</p>
                        </div>
                    </div>
                </section>
            </article>
        `


    }
} 