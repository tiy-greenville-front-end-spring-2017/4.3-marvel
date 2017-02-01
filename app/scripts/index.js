var $ = require('jquery');
var Handlebars = require('handlebars');

var charactersUrl = 'https://gateway.marvel.com/v1/public/characters';
var apiKey = 'ts=1&hash=21bd2e1b96821f4b508e0dd04ba254bd&apikey=809f574f31a7e23a17adc1f6a3631a58';

$.ajax(charactersUrl + '?' + apiKey).done(start);

/**
 * Start the program
 */
function start(ajaxResults){
  // console.log(ajaxResults);
  var characters = ajaxResults.data.results;
  displayCharacters(characters);
}

/**
 * Display a list of characters from API
 */
function displayCharacters(characters){
  var source = $('#character-template').html();
  var template = Handlebars.compile(source);

  characters.forEach(function(character){
    var $character = $(template(character));

    $character.find('.js-character-button').on('click', function(e){
      e.preventDefault();
      fetchComics(character);
    });

    $('.characters').append($character);
  });
}

function fetchComics(character){
  var url = character.comics.collectionURI + '?' + apiKey;
  $.ajax(url).done(displayComics);
}

function displayComics(ajaxResults){
  console.log(ajaxResults);
  var $modal = $('.modal');
  var source = $('#comic-template').html();
  var template = Handlebars.compile(source);

  var context = {
    comics: ajaxResults.data.results,
    count: ajaxResults.data.count
  };

  $modal.find('.js-modal-content').html(template(context));
  $modal.addClass('is-active');
}

// for(var i=1; i <= 100000000000000; i++){
//   console.log(i);
// }

// 3. --------------------------------------------

// The code below will log the letter twice. What
// is the order that will be logged?

// [a]: x then y then z
// [b]: y then z
// [c]: z then y
// [d]: x then z

// Please explain your answer.

var letter = "x";

setTimeout(function(){
  letter = "y";
  console.log("The letter is", letter);
}, 0);

letter = "z";
console.log("The letter is", letter);



//
