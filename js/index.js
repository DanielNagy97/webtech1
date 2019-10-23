$(document).ready(function () {

    //$("#content").load("lorem.html");
    $("#content").load("lorem.html");

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

function openBooks(author){
    document.cookie="name=" + author;
    $.getJSON("author", function(data){

        var table = $('<table id="bookTable"></table>');
        $(table).append('<tr><th>Title</th><th>Genre</th>' + '<th>Author</th><th>Quantity</th><th>Available</th></tr>');

        $.each(data, function(key, value){
            var row = $('<tr></tr>');
            var titleCell = $('<td>' + value.title + '</td>');
            var genreCell = $('<td>' + value.genre + '</td>');
            var authorCell = $('<td>' + value.author + '</td>');
            var quantityCell = $('<td>' + value.quantity + '</td>');
            var availableCell = $('<td>' + value.available + '</td>');
            $(row).append(titleCell);
            $(row).append(genreCell);
            $(row).append(authorCell);
            $(row).append(quantityCell);
            $(row).append(availableCell);
            $(table).append(row);
        })
        $("#content").append(table);

    }).error(function(data){
        console.log(data);
    })
}
