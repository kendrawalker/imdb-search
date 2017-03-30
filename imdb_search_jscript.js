// imdb search

var templates = document.querySelectorAll('script[type="text/handlebars"]');

Handlebars.templates = Handlebars.templates || {};

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});


var searchButton = $('#search-button').eq(0);
var textInputValue;
var searchURL;
var results = $('#results').eq(0);
var inp = $('#text-input').eq(0);
var move;


//setting input field to blank when user clicks to type
inp.on('click', function(){
    inp.html('');
});


//calling search results when user clicks the search button
searchButton.on('click', function() {
    textInputValue = $('#text-input').eq(0).val();
    searchURL = "http://www.omdbapi.com/?t="+encodeURIComponent(textInputValue);

    $.get(searchURL, function(data){
        var awards;
        if(data.Awards == "N/A") {
            delete data.Awards;
            awards = 'no';
        }
        if(data.Poster == "N/A") {
            data.Poster ="movies-film.jpg";
        }
        results.html(Handlebars.templates.moviedata(data));
        if(awards=='no') {
            awards = $('#awards').eq(0);
            awards.html('');
        }
    });
});

//calling the search results when user hits enter button
inp.on('keydown', function(e){
    move = e.key;
    if(move=='Enter'){
        textInputValue = $('#text-input').eq(0).val();
        searchURL = "http://www.omdbapi.com/?t="+encodeURIComponent(textInputValue);

        $.get(searchURL, function(data){
            var awards;
            if(data.Awards == "N/A") {
                delete data.Awards;
                awards = 'no';
            }
            if(data.Poster == "N/A") {
                data.Poster ="movies-film.jpg";
            }
            results.html(Handlebars.templates.moviedata(data));
            if(awards=='no') {
                awards = $('#awards').eq(0);
                awards.html('');
            }
        });
    }
});
