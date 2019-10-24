$(document).ready(function () {

    $("#content").load("home.html");
    $("#carTable").load("carsTable.html");

    $.each($(".menuButton"),
        function(mbIndex, mbValue){
            $(mbValue).click(function (event) {
                event.preventDefault();
                if(!($(this).find('a').attr('href')=="index.html")){
                    $("#content").load($(this).find('a').attr("href"));
                }
                else {
                    open("index.html","_self")
                }

            })
        })
});

function openCar(manufacturer){
    document.cookie="name=" + manufacturer;
    $.getJSON("manufacturer", function(data){

        var table = $('<table id="carsTable"></table>');
        $(table).append('<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>');

        $.each(data, function(key, value){
            var row = $('<tr></tr>');
            var nameCell = $('<td>' + value.name + '</td>');
            var consumptionCell = $('<td>' + value.consumption + '</td>');
            var colorCell = $('<td>' + value.color + '</td>');
            var manufacturerCell = $('<td>' + value.manufacturer + '</td>');
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

    }).error(function(data){
        console.log(data);
    })
}
