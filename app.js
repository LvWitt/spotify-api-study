function authorize(){
    //const redirect_uri = "https://lvwitt.github.io/spotify-api-study/";
    const redirect_uri = "http://127.0.0.1:5500/index.html";
    const client_id = "aeda74075eec4ffa897944adb9682ba5";

    let url = 'https://accounts.spotify.com/authorize'
    + '?response_type=code'
    + '&client_id=' + encodeURIComponent(client_id)
    + '&redirect_uri=' + encodeURIComponent(redirect_uri);
    console.log(url)
//window.location = url;

 ;
}

authorize()

