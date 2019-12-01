$(document).ready(function () {

    $("#content").load("home.html");

    $.each($(".menuButton"),
        function(mbIndex, mbValue){
            $(mbValue).click(function (event) {
                event.preventDefault();
                if(!($(this).find('a').attr('href')=="index.html")){
                    $("#content").load($(this).find('a').attr("href"));
                }
                else {
                    open("index.html","_self");
                }
            });
        });
});

function openCar(manufacturer){
    document.cookie="name=" + manufacturer;
    $("#selectedCars").remove();
    $.getJSON("manufacturer", function(data){
        if(data.length > 0) {
            var table = $('<table id="selectedCarsTable"></table>');
            $(table).append('<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>');
            $.each(data, function (key, value) {
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
            $("#content").append($('<div id="selectedCars"></div>'));
            $("#selectedCars").empty();
            $("#selectedCars").append('<div id="closeCars" onclick="closeCars()">x</div>');
            $("#selectedCars").append('<h2>' + manufacturer + ' car(s): </h2>');
            $("#selectedCars").append(table);
            $("#selectedCars").slideDown(500);
        }
        else{
            $("#content").append($('<div id="selectedCars"></div>'))
            $("#selectedCars").empty();
            $("#selectedCars").append('<div id="closeCars" onclick="closeCars()">x</div>');
            $("#selectedCars").append('<h2>There are no ' + manufacturer + ' cars! </h2>');
            $("#selectedCars").slideDown(500);
        }
    }).error(function(data){
        console.log(data);
    })
}

function closeCars() {
    $("#selectedCars").slideUp(500);
    setTimeout(function() {
        $("#selectedCars").remove();
    }, 500);
}

function showSlides(n){
    $.getJSON("cars", function(data){
        $(".pbText").slideUp(500);
        $("#carHome").fadeOut(500);
        setTimeout(function() {
            $(".pbText .name").html(data[n].name);
            $(".pbText .manufacturer").html(data[n].manufacturer);
            $(".pbText .consumption").html(data[n].consumption);
            $("#carHome").attr("src","images/car"+n+".png");
        }, 500);
        $(".pbText").slideDown();
        $("#carHome").fadeIn(500);
    });
}

function showForm(form) {
    $("#"+form).slideToggle();
}

function giveMessage(errorMsg) {
    var msg = $('<div id="message"></div>');
    $(msg).append("<p>"+errorMsg+"</p>");
    $("#content").append(msg);
    $("#message").slideDown(500).delay(2000).slideUp(500);
    setTimeout(function() {
        $('#message').remove();
    }, 3000);
}
