const axios = require('axios')
const cheerio = require('cheerio')

function ingredient_info(url, callback){

    const all_ingredients = []
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
            })
            all_ingredients.push(parts)
            callback(all_ingredients)
            
        }).catch(err => console.log(err))
}

module.exports = {ingredient_info}