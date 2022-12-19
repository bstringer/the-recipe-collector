const axios = require('axios')
const cheerio = require('cheerio')

function ingredient_info(url, callback){

    const all_ingredients = []
    recipe_obj = {}
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const parts = []

            $("#article-heading_2-0", html).each(function(){
                const recipe = $(this).text()
                all_ingredients.push({
                    recipe
                })
            })

            $('.mntl-structured-ingredients__list-item', html).each(function(index){
                ingredient = "";
                quantity = "";
                units = "";            

                $(this).children().children().each(function(){
                    const each_part = $(this).text()
                    const ingredient_info = $(this).attr()
                    if (ingredient_info['data-ingredient-name'] == 'true'){
                        ingredient = each_part
                    }
                    if (ingredient_info['data-ingredient-quantity'] == 'true'){
                        quantity = each_part
                    }
                    if (ingredient_info['data-ingredient-unit'] == 'true'){
                        units = each_part
                    }                       
                })
            parts.push({
                ingredient,
                quantity,
                units
            })
            create_obj(ingredient, quantity, units, recipe_obj)
            })
            all_ingredients.push(parts)
            console.log("recipe_obj at end of funct: ", recipe_obj);
            console.log("all_ingredients at end of funct: ", all_ingredients);
            callback(recipe_obj)
            
        }).catch(err => console.log(err))
        
}

function create_obj(ingredient, quantity, units, recipe_obj){
    if (units == ""){
        units = "single"
    }
    if (quantity == ""){
        quantity = "n/a"
    }    

    if (ingredient in recipe_obj){
        if (units in ingredient){
            recipe_obj[ingredient][units].push(quantity)
        }
        else{
            recipe_obj[ingredient][units] = [quantity]
        }
    }
    else{
        recipe_obj[ingredient] = {
                                [units]: [quantity]
                            };
    }
}

module.exports = {ingredient_info}

/*  

recipe_obj_example = {
    ingredient1: {
        unit_1 : ['value1', 'value2', 'value3'],
        unit_2: ['value_1', 'value2', 'value3', 'vaue4']
    }
    ingredient2: {
        unit_1 : ['value1', 'value2', 'value3'],
        unit_2: ['value_1', 'value2', 'value3', 'vaue4']
    }    
    ingredient3: {
        unit_1 : ['value1', 'value2', 'value3'],
        unit_2: ['value_1', 'value2', 'value3', 'vaue4']
    }    
}

*/