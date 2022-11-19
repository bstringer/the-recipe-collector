const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
const url = 'https://www.allrecipes.com/recipe/16354/easy-meatloaf/'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const all_ingredients = []
        const parts = []

        $("#article-heading_2-0", html).each(function(){
            const recipe = $(this).text()
            all_ingredients.push({
                recipe
            })
        })

        $('.mntl-structured-ingredients__list-item', html).each(function(index){
            // const ingredient = $(this).text()
            // all_ingredients.push({
            //     ingredient,
            // })


            $(this).children().children().each(function(){
                const each_part = $(this).text()
                console.log("each_part", each_part)
                parts.push({
                    each_part
                })
            })


        })
        console.log(all_ingredients)
        console.log(parts)

    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT', PORT) ) 
