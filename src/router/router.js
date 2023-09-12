import { createRouter, createWebHistory} from 'vue-router'
import Charts from '../views/charts.vue'
import Login from '../views/login.vue'
import Callback from '../views/callback.vue'
import TopArtists from '../views/topArtists.vue'
import TopTracks from '../views/topTracks.vue'
import ListeningHistory from '../views/listeningHistory.vue'
import Manager from '../views/manager.vue'


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/Callback',
            name: 'Callback',
            component: Callback
        },
        {
            path: '/Charts',
            name: 'Charts',
            component: Charts
        },
        {
            path: '/TopArtists',
            name: 'TopArtists',
            component: TopArtists
        },
        {
            path: '/TopTracks',
            name: 'TopTracks',
            component: TopTracks
        },
        {
            path: '/ListeningHistory',
            name: 'ListeningHistory',
            component: ListeningHistory
        },
        {
            path: '/Manager',
            name: 'Manager',
            component: Manager
        },

    ]
});


export default router