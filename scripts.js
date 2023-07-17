var items2 = []; 



$.getJSON("spotify.json", function(data){
    var dataHT = '<tr>';
    for (var i = 0, len = data.length; i < len; i++) {
        var dentro = [];
        dataHT += '<td>' + data[i].artistName + '</td>'
        + '<td>' + data[i].trackName + '</td>' 
        + '<td>' + data[i].endTime + '</td>';

        dentro.push(data[i].artistName);
        dentro.push(data[i].trackName);
        dentro.push(data[i].endTime);
        items2.push(dentro);

        dataHT += '</tr>';
        
    }

    console.log(dataHT);

    function simpleTemplating(data) {
      var html = '<table>' + '<thead>' + '<tr>' + '<th>Artist</th>' + '<th>Song</th>' + '<th>Date</th>' + '</tr>' + '</thread>' + '<tr>';
        console.log(data)
      $.each(data, function(index, item){
        var i = 0;
          console.log(item[i])
          html += '<tr>' + '<td>'+ item[i] +'</td>' + '<td>'+ item[i+1] +'</td>' + '<td>'+ item[i+2] +'</td>' + '</tr>';
        
      });
      html += '</tr>' + '</table>';
      return html;
    }

    $('#pagination-container').pagination({
      dataSource: items2,
      pageSize: 20,
      callback: function(data, pagination) {
          var html = simpleTemplating(data);
          $('#data-container').html(html);
      }
    })
});

$(document).ready(function(){
    function cleanDisplayFunction(){
        $(".history-function").css('display', 'none');
        $(".topArtists-function").css('display', 'none');
        $(".topTracks-function").css('display', 'none');
    }

  $(".btn-history").click(function() {
    cleanDisplayFunction();
    $(".history-function").css('display', 'contents');
});

    $(".btn-topArtists").click(function() {
        cleanDisplayFunction();
        $(".topArtists-function").css('display', 'contents');
    });

    $(".btn-topTracks").click(function() {
        cleanDisplayFunction();
        $(".topTracks-function").css('display', 'contents');
    });

});
