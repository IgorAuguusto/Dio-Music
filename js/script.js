
//Importanto as chaves da api do arquivo apikeys.js dentro da pasta js
import { API_KEY_GOOGLE_SEARCH, CX, API_KEY_VAGALUME, API_KEY_YOUTUBE } from "./apikeys.js";


function createUrlToSearch(input) {
  /** Monta a url para listar as músicas, dado
  o termo de busca.
  "key" e "cx" foram obtidos conforme explicado em: 
  https://developers.google.com/custom-search/v1/introduction?hl=pt-br#identify_your_application_to_google_with_api_key
  A configuração "cx" precisa conter apenas o site do vagalume. Visite o link acima para saber como criá-la. 
  */
  return "https://www.googleapis.com/customsearch/v1?key=" + API_KEY_GOOGLE_SEARCH + "&cx=" + CX
    + encodeURI(input.text)
}

function parseSearchResponseToList(response) {
  /*Lê o response da busca e monta a lista de exibição
  dentro do programa.*/
  var items = response.items;
  var songs = []
  for (var i = 0; i < items.length; i++) {
    var titleWithArtist = items[i]["title"].split('-')
    var title = titleWithArtist[0]
    var artist = titleWithArtist[1]

    var id = title + '#' + artist
    if (artist.includes("VAGALUME")) {
      continue;
    }
    songs.push({
      "id": id,
      "title": title,
      "artist_or_author": artist,
    })
  }
  return songs
}

function createUrlToGetById(id) {
  /* Monta a URL responsável por capturar a letra da
  música desejada pelo usuário.
  A apiKey do Vagalume foi obtida conforme explicado aqui: 
  https://api.vagalume.com.br/docs/letras/
  */
  if (id == null) {
    return null
  }
  var songAndArtist = id.split('#')
  var song = songAndArtist[0].trim()
  var artist = songAndArtist[1].trim()
  return "https://api.vagalume.com.br/search.php?"
    + "art=" + encodeURI(artist)
    + "&mus=" + encodeURI(song)
    + "&apikey=" + API_KEY_VAGALUME
}

function parseGetResponseToSong(response) {
  /* Monta o map de exibição da letra da música no painel direito.*/
  return {
    "title": response.mus[0].name,
    "artist": response.art.name,
    //'author': json.art.url,
    "lyrics": response.mus[0].text
  }
}

function searchYouTube(query) {
  
  // Construir a URL da API do YouTube
  var apiUrl = "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY_YOUTUBE +
    "&part=snippet&type=video&q=" + encodeURIComponent(query);

  // Fazer a requisição à API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Exibir o primeiro vídeo encontrado
      var videoId = data.items[0].id.videoId;
      var videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
      document.getElementById('results').innerHTML = '<iframe class="showVideo text-center" width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
    })
    .catch(error => {
      console.error('Erro ao buscar vídeos do YouTube:', error);
    });
}

function searchMusic() {
  var searchTerm = $("#searchInput").val();

  if (searchTerm.trim() !== "") {
      // Mostra o spinner ao iniciar a pesquisa
      $("#loadingSpinner").removeClass("d-none");

      var searchUrl = createUrlToSearch({ text: searchTerm });

      $.get(searchUrl, function (data) {
          var songs = parseSearchResponseToList(data);
          displaySearchResults(songs);
      })
      .always(function () {
          // Oculta o spinner quando a pesquisa é concluída (com sucesso ou falha)
          $("#loadingSpinner").addClass("d-none");
      });
  } else {
      alert("Não há itens a serem buscados!");
  }
}



function displaySearchResults(songs) {
  var $searchResults = $("#searchResults tbody");
  $searchResults.empty();

  songs.forEach(function (song) {
    var $tr = $("<tr>");

    var $titleTd = $("<td  class='text-info'>").text(song.title);
    var $artistTd = $("<td  class='text-info'>").text(song.artist_or_author);

    var $buttonLyrics = $("<button type='button' class='btn btn-warning bi-music-note-list'>")
      .click(function () {
        getLyrics(song.id);
        playMusic(song.artist_or_author + " " + song.title);
      });

    $tr.append($titleTd, $artistTd, $("<td>").append($buttonLyrics));
    $tr.attr("data-youtube-id", song.youtubeId);
    $searchResults.append($tr);
    $('#searchResults').show();
  });
}


function getLyrics(id) {
  var lyricsUrl = createUrlToGetById(id);

  $.get(lyricsUrl, function (data) {
    var songData = parseGetResponseToSong(data)
    displayLyrics(songData)
  })
}

function displayLyrics(songData) {
  $("#songTitle").text("Título: " + songData.title)
  $("#artistName").text("Artista: " + songData.artist)
  $("#lyricsText").text("Letra:\n" + songData.lyrics)
}

function playMusic(songName) {
  searchYouTube(songName)
}

$(document).ready(function () {
  
  $("#searchInput").on("keyup", function (event) {
    if (event.keyCode === 13) {
      searchMusic()
    }
  })
  
  $("#searchButton").on("click", function () {
    searchMusic()
  })
})

