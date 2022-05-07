<script>
    import { preferences } from "../../stores/users";
    import io from 'socket.io-client'
    const socket = io("http://45.41.204.198:8070/")

    let API = 'Imh2ewK2KA4nS0yB9OE67jFmMX5wrVjn'

    let gifs = []
    export let showGifs
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
    let promise = getGifs()

    function closeGifs(){
      showGifs = false
    }
</script>
{#if showGifs}
{#await promise}
    
{:then} 
{#each gifs as gif, i }
<img  id="{i}"src="{gif}" alt="..." class="img-thumbnail mt-2" width="130px" height="140px" on:click="{(event)=> sendGif(event.target.getAttribute('src'))}">

{/each}
<p class="mt-1">Gifs Powered By GIPHY</p>
<button class="btn btn-primary" on:click={closeGifs}>Close</button>
{/await}
{/if}


