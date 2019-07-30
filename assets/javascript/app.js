var topics = ["Willie Mays", "Michael Jordan", "Joe Montana", "Wayne Gretzky", "Jack Nicklaus", "Roger Federer", "Lionel Messi"];

$(document).ready(function() {
    //Selects gifs to set values and create spaces
    $("#submit").on("click", function(event) {
    event.preventDefault();
    var gif = $("#addGif").val().trim();
    topics.push(gif);
    makeButtons();
    });
    //Button maker
    function makeButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
        var b = $("<button type='button' class='btn btn-light'>");
        b.addClass("gif");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#gifButtons").append(b);
        }
    }
    //Runs button making function
    makeButtons();

    $("#gifButtons").on("click", ".gif", function(event) {
        event.preventDefault();
        var gifs = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=OGZ6KwtCutaZ9B9ehD46AJAJiEgT7kWP";
        $("#gifDisplay").empty();
        //Communicates with giphy server to allow gif fetching without reloading
        $.ajax({
            url: queryURL,
            method: "GET"
            })
            .then(function(response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='imgDiv'>");
                    var p = $("<p>").text(results.rating);
                    var gifImage = $("<img data-state='still' data-still='"+ results[i].images.fixed_height_still.url +"'  data-animate='"+ results[i].images.fixed_height.url +"' class='img'>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    $("#gifDisplay").prepend(gifDiv);
                }
               
    console.log(results);
          
        });
    });
    //Displays gif and creates clicker function to go from still img to an active gif
    $("#gifDisplay").on("click", ".img", function() {
        var state = $(this).attr("data-state");
    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});