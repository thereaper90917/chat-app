<script>
import Router from 'svelte-spa-router'
import Home from './routes/home/Home.svelte'
import Login from './routes/login/Login.svelte'

const routes = {
    // Exact path
    '/': Home,
    '/login': Login,
}

</script>

<body>
    <Router {routes}/>
</body>