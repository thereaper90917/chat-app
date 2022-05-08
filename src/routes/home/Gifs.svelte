<script>
    import { preferences } from "../../stores/users";
    import io from 'socket.io-client'
    const socket = io("http://45.41.204.198:8070/")

    let API = 'Imh2ewK2KA4nS0yB9OE67jFmMX5wrVjn'
    let searchGif
    let singleGif = ''
    let gifs = []
    let userName = $preferences.user.name;
    function sendGif(data){
        sendMessage(data)
    }
    function sendMessage(gif) {
   
   const sendMessage = {
     text: gif,
     user: {
       name: userName,
     },
     gif: {
       inlcuded: false,
       url: "",
     },
   };
   if(sendMessage.text.includes('https://')){
     sendMessage.gif.included = true
     sendMessage.gif.url = gif
   }
   socket.emit("chat message", sendMessage);
 }
    async function getGifs(){
        let url = `https://api.giphy.com/v1/gifs/trending?api_key=${API}&limit=8`
        let res = await fetch(url)
        let result = await res.json()
        // console.log(result)
        result.data.forEach((gif) => gifs.push(gif.images.downsized.url));
    }

    async function searchForGif(){
      let url = `https://api.giphy.com/v1/gifs/search?api_key=${API}&limit=1&q=${searchGif}`
      let res = await fetch(url)
      let result = await res.json()
      let gif = result.data[0].images.downsized.url
      searchGif = ''
      singleGif = gif
      // sendMessage(gif)
    }
    function submit(event) {
    if (event.key === "Enter") {
      searchForGif()
    }
  }
    
    let promise = getGifs()
</script>
<div class="input-group mt-3 w-25">
  <input
    on:keydown={submit}
    type="text"
    class="form-control"
    placeholder="Search Giphy"
    height="200px" width="100px"
    bind:value={searchGif}
  />
</div>
<button class="btn btn-primary mt-2" on:click={searchForGif}>Search</button>
<br>
{#if singleGif}
<img  id="search"src="{singleGif}" alt="..." class="img-thumbnail mt-2 mb-4" width="200px" height="200px" on:click="{(event)=> sendGif(event.target.getAttribute('src'), singleGif = '')}">
<br>
{/if}

{#await promise}
    
{:then}
<div class="container-sm"><p class="mt-3">Trending</p> 
  {#each gifs as gif, i }
  <img  id="{i}"src="{gif}" alt="..." class="img-thumbnail mt-1" width="130px" height="140px" on:click="{(event)=> sendGif(event.target.getAttribute('src'))}">
  
  {/each}
  <p class="mt-1">Gifs Powered By GIPHY</p></div>

{/await}

