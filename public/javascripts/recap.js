// this file completly generates the recap page in javascript.
// it is a summary of the content of the website and shows the title of the different recipies
// you have the choice to ses a discription of the recipie and the ingredient when you hit the buttons
// references used for this code
// https://www.youtube.com/watch?v=XQEfWd1lh4Q
// https://stackoverflow.com/questions/9831074/dynamically-create-link-javascript

//this class makes the boxes that contain the different ellements
var box = class {
    constructor(title){
        this.title = title;
        this.draw = function () {
            //this will create a new section element
            var node = document.createElement("section");
            node.setAttribute("class", "boxSection");

            //this will create the title of the recipie
            var title = document.createElement("h1");
            title.setAttribute("class", "boxTitle");
            var textnode = document.createTextNode(this.title);
            title.appendChild(textnode);
            node.appendChild(title);

            this.addAttributes(node);

            document.body.appendChild(node);
        };
        this.addAttributes = function (node) {

        }
    };
};

//this class extends the box class with the description of the recipie
class recipe extends box {
    constructor(title, text, link) {
        super(title);
        this.addAttributes = function (node) {

            //this creates a new element
            var article = document.createElement('article');
            article.setAttribute("class", "closed");

            //this will create a link to the full recipie
            var a = document.createElement('a');
            a.href =  link;
            a.innerHTML = "link";
            article.appendChild(a);

            //this will create a new text description of the recipie
            var paragraph = document.createElement('p');
            var textNode = document.createTextNode(text);
            paragraph.appendChild(textNode);
            article.appendChild(paragraph);

            node.appendChild(article);

            //this will create a button to show all the above
            var button = document.createElement('button');
            button.setAttribute("class", "showmore");
            button.appendChild(document.createTextNode("Show More"));
            node.appendChild(button);
        };

    }
}

//this class will show the ingredients  of the recipie
class ingredients {
    constructor(ingredients) {

        this.addAttributes = function (node) {


            //will make a new article
            var article = document.createElement('article');
            article.setAttribute("class", "closed");

            //creates the list of ingredients
            var list = document.createElement('ul');

            for(var i =0; i<ingredients.length; i++)
            {
                var ingredient = document.createElement('li');
                ingredient.appendChild(document.createTextNode(ingredients[i]));
                list.appendChild(ingredient);
            }
            article.appendChild(list);

            node.appendChild(article);

            //creates the button to show the ingredients
            var button = document.createElement('button');
            button.setAttribute("class", "showIngredients");
            button.appendChild(document.createTextNode("Show Ingredients"));
            node.appendChild(button);
        };

        this.draw = function () {
            var node = document.createElement("section");
            node.setAttribute("class", "section");

            this.addAttributes(node);

            document.body.appendChild(node);
        };
    }
}


//ingredient lists starters

ingredientsMelon = new ingredients(
    [ " 700 g watermelon",
        "1 small red onion",
        "180 g feta cheese",
        "1 bunch of fresh mint",
        "extra vergin olive oil"
    ]
);

ingredientsPrawn = new ingredients(
    [" olive oil",
        "half a clove of garlic",
        "cayenne pepper",
        "8 unpeeled large, raw tiger prawns",
        "quarter of an iceberg lettuce",
        "quarter of a cucumber",
        "1-2 ripe tomatoes",
        "1 sprig of fresh mint",
        "1 small punnet of salad cress",
        "50 g peeled little prawns",
        "100 g mixed white and brown crabmeat",
        "50 g brown shrimps , optional",
        "1 lemon",
        "half a lemon",
        "1 swig of brandy",
        "1 pinch of cayenne pepper",
        "1 heaped teaspooon ketchup",
        "4 tablespoons mayonnaise, made from free-range eggs"
    ]
);

ingredientsPinwheels = new ingredients(
    [ "plain flour , for dusting",
        "500 g ready-made puff pastry",
        "2 tablespoons basil pesto",
        "12 thin slices higher-welfare smoked pancetta",
        "4 tablespoons grated Parmesan cheese",
        "1 tablespoon milk",
        "2 tablespoons sun-dried tomato pesto"
    ]
);

//ingredient lists main courses

ingredientsGnocchi = new ingredients(
    [ "Hand of gnocchi",
        "Two hands fresh spinach",
        "2 tablespoons ricotta",
        "Hand of parmesan cheese",
        "1 tablespoon pine nuts",
        "½ lemon",
        "Some pepper",
        "Some fresh parsley"
    ]
);

ingredientsTortilla = new ingredients(
    [ "3-4 wraps",
        "passata di pomodoro (tomato purée)",
        "buffalo mozzarella",
        "parma ham",
        "rucola salad",
        "pine nuts",
        "Italian Flakes (parmesan cheese)"
    ]

);

ingredientsSoup = new ingredients(
    [ "1 onion",
        "1 clove of garlic",
        "1 red pepper",
        "½ yellow/orange pepper",
        "1 tablespoon sour cream"
    ]
);

//ingredient lists main courses

ingredientsChocolate = new ingredients(
    [ "200 g quality dark chocolate",
        "400 g pitted cherries in syrup",
        "200 ml double cream",
        "4 large free-range eggs",
        "2 tablespoons of golden caster sugar"
    ]
);

ingredientsBlackberry = new ingredients(
    [  "1 vanilla pod",
        "500 g blackberries",
        "100 g caster sugar",
        "1 lemon",
        "330 ml double cream",
        "200 ml fat-free Greek yogurt"
    ]
);

ingredientsBrownie = new ingredients(
    [ "180 g butter, plus extra for greasing",
        "150 g self-raising flour, plus extra for dusting",
        "300 g sugar",
        "half a teaspoon of vanilla extract",
        "3 large free-range eggs",
        "75 g dark chocolate",
        "75 g white chocolate",
        "100 g hazelnuts",
        "1 tablespoon cacoa powder"
    ]
);


// all starter method recaps

recipeMelon = new recipe(
    "Watermelon and Feta Salad",
    "This salad is a great starter for any occasion. With the fresh flavor of watermelon and the creamyness of feta, is this a perfect starter for summer. It takes only 10 minutes!",
    "starters.htm",
    "ingredientsMelon"
);
recipeMelon.draw();
ingredientsMelon.draw();

recipePrawn = new recipe(
    "Prawn Cocktail",
    "This second starter is somewhat complicated, with more ingredients. But it takes just minutes to make. It is just so easy.",
    "starters.htm"
);
recipePrawn.draw();
ingredientsPrawn.draw();

recipePinwheels = new recipe(
    "Cheese and Bacon Pinwheels",
    "This is the third and final starter, but not less exciting. " +
    "The combination of cheese and bacon is amazing and effort it takes is nothing. For more info: ",
    "starters.htm"
);
recipePinwheels.draw();
ingredientsPinwheels.draw();

// all main courses method recaps

recipeGnocchi = new recipe(
    "Gnocchi with Spinach and Ricotta",
    "This easy and fresh Italian dish is so yummy. You will not get enough of it. " +
    "It is also the fastest recipe for a filling meal, with taking only 10 minutes to cook",
    "maincourses.htm"
);
recipeGnocchi.draw();
ingredientsGnocchi.draw();

recipeTortilla = new recipe(
    "Italian Tortilla Wraps",
    "You may think tortillas and Italian topping is a weird combination, but it is actually really dilicious. " +
    "You slab the toppings on the wraps, in four easy steps, and you are ready to enjoy this meal."
);
recipeTortilla.draw();
ingredientsTortilla.draw();

recipeSoup = new recipe(
    "Pepper Soup",
    "Pepper soup, if you have never had it, now is the time to try it. With just ten minutes and a couple of ingredients ",
    "maincourses.htm"
);
recipeSoup.draw();
ingredientsSoup.draw();

// all desserts method recaps

recipeChocolate = new recipe(
    "Cherry Chocolate Mousse",
    "Making chocolate mouse sounds difficult but is really easy, " +
    "It maybe take some more time in advance, but trust me, it is so worth it!",
    "desserts.htm"
);
recipeChocolate.draw();
ingredientsChocolate.draw();

recipeBlackberry = new recipe(
    "Blackberry Fool",
    "Blackberry fool is a delicious combination of yogurt and fruit. Easy and fresh, it does not get any better. It is also the fastest dessert to make. ",
    "desserts.htm"
);
recipeBlackberry.draw();
ingredientsBlackberry.draw();

recipeBrownie = new recipe(
    "Double Chocolate Brownies",
    "Save the last for best! So this dessert may take the longest but tastes the best!" +
    "50 minutes may seem long, but it is a fun process of melting, stiring and chopping! ",
    "desserts.htm"
);
recipeBrownie.draw();
ingredientsBrownie.draw();



//if the button is clicked then
$(":button").click( function() {
    {
        //if the text is already visible then
        if (this.previousSibling.className == "open") {
            //als het stukje uitleg voor de knop open is, haalt hij class open weg, en sluit hij dus
            this.previousSibling.classList.remove("open");
            this.previousSibling.classList.add("closed");
            if(this.className == "showIngredients") {
                this.innerHTML = "Show Ingredients";

            }
            else{
                this.innerHTML = "Show More";
            }
        //if you want to see the text
        } else if(this.previousSibling.className == "closed") {
            this.previousSibling.className = "open";
            if(this.className == "showIngredients")
            {
                this.innerHTML = "Hide Ingredients";
            }
            else {
                this.innerHTML = "Show Less";
            }
        }
    }
});
