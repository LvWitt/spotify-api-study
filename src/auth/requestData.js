import axios from 'axios'

export async function getTopArtists() {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      const topArtists = await axios.get('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50', { 
        headers: { 
            Authorization: `Bearer ${accessToken}` 
        } 
      });

      this.topArtists = topArtists.data.items;
    }
}