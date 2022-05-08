<script>
  export let message;

  const timestamp = new Date(Date.parse(message.data.timestamp));

</script>

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
      {timestamp.toLocaleTimeString()}
    </div>
  </div>
  <div>
    <div class="flex-grow-1 ml-3">
      {message.user.name}
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
      {#if message.gif.included}
        <img src={message.gif.url} alt="" width="300px" height="200px" />
      {:else if message.youtube.included}
        <iframe
          title="Youtube Video"
          width="420"
          height="345"
          src={message.youtube.url}
        />
      {:else}
        {message.text}
      {/if}
    </div>
  </div>
</div>
