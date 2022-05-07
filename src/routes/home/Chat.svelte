
<script>
  import io from 'socket.io-client'
	const socket = io("http://localhost:8001/")



  let current = new Date()
  let messages = []
  let message = ''
  let userName = ''
  socket.on('chat message', (user,msg) => {

    messages = [...messages, `${user[0].name}: \n ${msg}`]
    userName = user[0].name

    // userName = user[0].name
    // console.log(user)
  })

  function sendMessage() {
    socket.emit('chat message', message)
    message = ''
    const chatMessages = document.querySelector('.chat-messages')
    chatMessages.scrollTop = chatMessages.scrollHeight

  }

  function submit(event) {
  if (event.key === 'Enter') {
    sendMessage()
  }

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
  <!-- <div class="position-relative">
    <div class="chat-messages p-4">
      {#if gifs }
      {#each gifs as gif}
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
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <img src="{gif}" alt="" width="300px" height="200px">
          </div>
        </div>
      {/each}
      {/if}
      {#if !gifsYes }
      {#each messages as message }
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
        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
          <div class="font-weight-bold mb-1">{userName}</div>
          {message}
        </div>
      </div>
      {/each}
      {/if}

    </div>
  </div> -->
  <div class="position-relative">
    <div class="chat-messages p-4">
     {#each messages as message }
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

      {#if message.includes('https://')}
      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <img src="{message.replace(`${userName}:`,"")}" alt="" width="300px" height="200px">
      </div>
      {:else}
      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="font-weight-bold mb-1">{userName}</div>
        {message}
      </div>
    {/if}
    </div>
     {/each}
    </div>
  </div>

  <div class="flex-grow-0 py-3 px-4 border-top">
    <div class="input-group">
      <input
        on:keydown="{submit}"
        type="text"
        class="form-control"
        placeholder="Type your message"
        bind:value={message}
      />
      <button class="btn btn-primary" on:click={sendMessage}>Send</button>
    </div>
  </div>
</div>