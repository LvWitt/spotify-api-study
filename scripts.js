

  function historyDataFunction(){
    $.getJSON("spotify.json", function(data){
      var spotifyData = []; 
        const valueDateStart = $("#valueDateStart").val();
        const valueDateEnd = $("#valueDateEnd").val();
        console.log(valueDateStart);
        
        for (var i = 0, len = data.length; i < len; i++) {
            var dentro = [];
            if (testDateRange(valueDateStart, valueDateEnd, data[i].endTime)){
              dentro.push(data[i].artistName);
              dentro.push(data[i].trackName);
              dentro.push(data[i].endTime);
              spotifyData.push(dentro);
            }
          
        }
        
        //console.log(spotifyData)

        function simpleTemplating(data) {
          var html = '<table>' + '<thead>' + '<tr>' + '<th>Artist</th>' + '<th>Song</th>' + '<th>Date</th>' + '</tr>' + '</thread>' + '<tr>';
            //console.log(data)
          $.each(data, function(index, item){
            var i = 0;
              //console.log(item[i])
              html += '<tr>' + '<td>'+ item[i] +'</td>' + '<td>'+ item[i+1] +'</td>' + '<td>'+ item[i+2] +'</td>' + '</tr>';
            
          });
          html += '</tr>' + '</table>';
          return html;
        }

        $('#pagination-container').pagination({
          dataSource: spotifyData,
          pageSize: 20,
          callback: function(data, pagination) {
              var html = simpleTemplating(data);
              $('#data-container').html(html);
          }
        })
      
        function testDateRange(dateStart, dateEnd, date){
          var rangeAcceptance = {
            minValid: new Date(date) >= new Date(dateStart),
            maxValid: new Date(date) <= new Date(dateEnd)
            };

            //console.log(dateStart);
            //console.log(dateEnd);

            var acceptanceResult; //boolean to determine if the relevant range specified is valid
      
            if (dateStart !== "" && dateEnd !== "") {
      
            acceptanceResult = (rangeAcceptance.minValid && rangeAcceptance.maxValid);
          
            } else if (dateStart !== "") {
          
            acceptanceResult = rangeAcceptance.minValid;
          
            } else if (dateEnd !== "") {
          
            acceptanceResult = rangeAcceptance.maxValid;
          
            } else {
          
            acceptanceResult = true; //show all results if no specific range has been selected
          
            }
      
            console.log(acceptanceResult);
            return (acceptanceResult);
        }
    });
}

$(document).ready(function(){
    function cleanDisplayFunction(){
        $(".listening-history-section").css('display', 'none');
        $(".topArtists-section").css('display', 'none');
        $(".topTracks-section").css('display', 'none');
        $(".topArtists-content").css('display', 'none');
        $(".topTracks-content").css('display', 'none');
    }

  $(".btn-history").click(function() {
    cleanDisplayFunction();
    $(".listening-history-section").css('display', 'contents');
  });

  $(".btn-filter").click(function(){
    historyDataFunction();
  });

  $(".btn-topArtists").click(function() {
      cleanDisplayFunction();
      $(".topArtists-section").css('display', 'contents');
      $(".topArtists-content").css('display', 'contents');
  });

  $(".btn-topTracks").click(function() {
      cleanDisplayFunction();
      $(".topTracks-section").css('display', 'contents');
      $(".topTracks-content").css('display', 'contents');
  });

});


