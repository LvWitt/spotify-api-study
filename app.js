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
//https://lvwitt.github.io/spotify-api-study/?code=AQDHS9wDnvenB1ZZUdF8Gk8pFw8PDlB_TEXpiz8zcpy-kQKcE2AYJNDg6sHY_0ro23-unxN6VrMF_YTEktroQ8jsXFrbBiSS-dbATO_reju1C3C9UxppzenGKsG_OrvYjPMqatsDknAw0zT7k0ElCNi_E8jpJb1JKiXp5N8ggeh1BHXHBoPyh5H_ycwo11w    
//https://accounts.spotify.com/authorize?response_type=code&client_id=aeda74075eec4ffa897944adb9682ba5&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Findex.html
//http://127.0.0.1:5500/index.html?code=AQASh5oteI57Ohobm2zXlj7iTdh9Xomr45835AegacNeBxrALeKE--dxH-gehBcMDa32uFWUgXKuBugebciM9eQ5nje3qr5RuEBxR0u5H8Crjw_ouh4r2AlFoT9hYLXvfqvylPSvh24MDNpq3QcZ71zTQfyPADoLEm0EmFaef6kzRsdc
 ;
}

authorize()

