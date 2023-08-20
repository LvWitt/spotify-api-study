
/*
export async function getProfile() {
    const accessToken = window.localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    console.log("DATA");
    console.log(data);
    return data;
} */
export async function getProfile() {
  accessToken = window.localStorage.getItem('access_token');
  
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  console.log("DATA");
  console.log(data);
  return data;
}


