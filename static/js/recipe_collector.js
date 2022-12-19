
console.log("recipe_collector.js file added to html page")

function ajax_call(){
    console.log("In ajax call")
    $.post( "/ajax_test", function( data ) {
        console.log("data : ", data)
        make_table(data)
      });
}

function make_table(data){
    html_table = ""
    html_table +=    '<div class="table-container">\
                        <table class="table">\
                        <tr>\
                        <th>Ingredient</th>\
                        <th>units</th>\
                        <th>amount</th>\
                      </tr>'

    for (var ingredient in data){

        for (amount in data[ingredient]){
            html_table += "<tr> <td>"+ingredient+"</td>\
                            <td>"+amount+"</td>\
                            <td>"+data[ingredient][amount]+"</td>\
                        </tr>"
        }
    }
    html_table += '</table></div>'
    $('#table_here').html(html_table)
}