<script>
  import io from "socket.io-client";
  import Gifs from './Gifs.svelte'
  import { preferences } from "../../stores/users";
  import EmojiPicker from 'svelte-emoji-picker';

  const socket = io("http://45.41.204.198:8070/");
  let showEmoji = false
  let showGifs = false
  let current = new Date();
  let messages = [];
  let message = "";
  let userName = $preferences.user.name;
  
  socket.on("chat message", (user, msg) => {

    if(msg.text === ''){
      return
    }
    messages = [...messages, msg];
    // userName = user[0].name

    // userName = user[0].name
    // console.log(user)
    setTimeout(() => {
      const chatMessages = document.querySelector(".chat-messages");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1);
  });

  function sendMessage() {
   
    const sendMessage = {
      text: message,
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
      sendMessage.gif.url = message
    }
    socket.emit("chat message", sendMessage);
    message = "";
  }

  function submit(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function showEmojis (){
    showEmoji = true
  }
  function showGifss(){
    showGifs = true
  }
  function hideEmojis (){
    showEmoji = false
  }
  function hideGifs(){
    showGifs = false
  }
</script>

<div class="col-12 col-lg-7 col-xl-9">
  <div class="py-2 px-4 border-bottom d-none d-lg-block">
    <div class="d-flex align-items-center py-1">
      <div class="position-relative">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar3.png"
          class="rounded-circle mr-1"
          alt="Sharon Lessman"
          width="40"
          height="40"
        />
      </div>
      <div class="flex-grow-1 pl-3">
        <strong>General Chat</strong>
        <div class="text-muted small"><em>Talk About Anything</em></div>
      </div>
    </div>
  </div>
  <div class="position-relative">
    <div class="chat-messages p-4">
      {#each messages as message}
        <div class="chat-message-left pb-4">
          <div>
            <img
              src="https://bootdey.com/img/Content/avatar/avatar3.png"
              class="rounded-circle mr-1"
              alt="Sharon Lessman"
              width="40"
              height="40"
            />
            <div class="text-muted small text-nowrap mt-2">
              {current.toLocaleTimeString()}
            </div>
          </div>
          <div>
            <div class="flex-grow-1 ml-3">
              {message.user.name}
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
              {#if message.gif.included}
                <img
                  src={message.gif.url}
                  alt=""
                  width="300px"
                  height="200px"
                />
              {:else}
                {message.text}
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex-grow-0 py-3 px-4 border-top">
    <div class="input-group">
      <input
        on:keydown={submit}
        type="text"
        class="form-control"
        placeholder="Type your message"
        bind:value={message}
      />
      <button class="btn btn-primary" on:click={sendMessage}>Send</button>
      <button class="btn btn-primary" on:click={showGifss}>Gifs</button>
      <button class="btn btn-primary" on:click={showEmojis}>Emoji</button>
    </div>
    {#if  showGifs }
    <Gifs showGifs = {showGifs}/>
    <button class="btn btn-primary" on:click={hideGifs}>Close</button>
    {/if}
    
    {#if showEmoji}
    <EmojiPicker bind:value={message} />
    <button class="btn btn-primary" on:click={hideEmojis}>Close</button>
    {/if}
    
  </div>
</div>
