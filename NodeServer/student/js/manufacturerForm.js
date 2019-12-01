$(document).ready(function () {
    loadManufacturersTable();
})

function loadManufacturersTable(){
    $.getJSON("manufacturers", function(data) {
        var table = $('<table id="manufacturersTable"></table>');
        $(table).append('<tr><th>Name</th><th>Country</th><th>Founded</th></tr>');

        $.each(data, function(key, value){
            var row = $('<tr></tr>');
            var nameCell = $('<td id="authorId" onclick="openCar(' +
                "'" +
                value.name +
                "'" +
                ')">' + value.name + '</td>');
            var countryCell = $('<td>' + value.country + '</td>');
            var foundedCell = $('<td>' + value.founded + '</td>');
            $(row).append(nameCell);
            $(row).append(countryCell);
            $(row).append(foundedCell);
            $(table).append(row);
        })
        $("#content").append(table);
    })
}

function addManufacturer(){
    var name = $( "input[name='name']" ).val();
    var country = $( "input[name='country']" ).val();
    var founded = $( "input[name='founded']" ).val();

    if (name == '' || country == '' || founded == '' ) {
        giveMessage("Please fill all the inputs!");
    }
    else{
        var manufacturer = {
            name: name,
            country: country,
            founded: founded
        }
        $.post("addManufacturers",manufacturer)
            .done(function(){
                giveMessage("The manufacturer: "+name+" successfully added!");
                $("#manufacturersTable").remove();
                loadManufacturersTable();
            })
            .fail(function(){
                giveMessage("The manufacturer: "+name+" is already in the list!");
            })
    }
}