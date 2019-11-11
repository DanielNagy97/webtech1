$(document).ready(function () {
    loadCarsTable();
    $.getJSON("manufacturerNames", function(data) {
        $.each(data, function(key, value){
            $("#selectManufacturer").append('<option value="' + value + '">' + value + '</option>')
        })
    })
})

function loadCarsTable(){
    $.getJSON("cars", function(data) {
        var table = $('<table id="carsTable"></table>');
        $(table).append('<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>');

        $.each(data, function(key, value){
            var row = $('<tr></tr>');
            var nameCell = $('<td>' + value.name + '</td>');
            var consumptionCell = $('<td>' + value.consumption + '</td>');
            var colorCell = $('<td>' + value.color + '</td>');
            var manufacturerCell = $('<td id="authorId" onclick="openManufacturer(' +
                "'" +
                value.manufacturer +
                "'" +
                ')">' + value.manufacturer + '</td>');
            var availableCell = $('<td>' + value.available + '</td>');
            var yearCell = $('<td>' + value.year + '</td>');
            var horsepowerCell = $('<td>' + value.horsepower + '</td>');

            $(row).append(nameCell);
            $(row).append(consumptionCell);
            $(row).append(colorCell);
            $(row).append(manufacturerCell);
            $(row).append(availableCell);
            $(row).append(yearCell);
            $(row).append(horsepowerCell);
            $(table).append(row);
        })
        $("#content").append(table);
    })
}

function addCar(){
    var name = $( "input[name='name']" ).val();
    var consumption = $( "input[name='consumption']" ).val();
    var color = $( "input[name='color']" ).val();
    var manufacturer = $("#selectManufacturer").val();
    var available = $( "input[name='available']" ).val();
    var year = $( "input[name='year']" ).val();
    var horsepower = $( "input[name='horsepower']" ).val();

    if (name == '' || consumption == '' || color == '' || manufacturer == '' || available == '' || year == '' || horsepower == '') {
        giveMessage("Please fill all the inputs!");
    } else {
        var car = {
            name: name,
            consumption: consumption,
            color: color,
            manufacturer: manufacturer,
            available: available,
            year: year,
            horsepower: horsepower
        }
        $.post("addCar",car)
            .done(function(){
                giveMessage("The car: "+name+" successfully added!");
                $("#carsTable").remove();
                loadCarsTable();
            })
            .fail(function(){
                giveMessage("The car: "+name+" is already in the list!");
            })
    }
}