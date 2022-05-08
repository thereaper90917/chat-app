<script>
  import io from "socket.io-client";
  import Gifs from "./Gifs.svelte";
  import Message from "../chat/Message.svelte";
  import { preferences } from "../../stores/users";
  import EmojiPicker from "svelte-emoji-picker";

  const socket = io("http://45.41.204.198:8070/");
  let showEmoji = false;
  let showGifs = false;
  let messages = [];
  let message = "";
  let userName = $preferences.user.name;

  socket.on("chat message", (user, msg) => {
    if (msg.text === "") {
      return;
    }
    messages = [...messages, msg];

    setTimeout(() => {
      const chatMessages = document.querySelector(".chat-messages");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1);
  });

  function sendMessage() {
    const sendMessage = {
      data: {
        timestamp: new Date().toISOString(),
      },
      text: message,
      user: {
        name: userName,
      },
      gif: {
        inlcuded: false,
        url: "",
      },
      youtube: {
        inlcuded: false,
        url: "",
      },
    };
    if (sendMessage.text.includes("https://media0.giphy.com")) {
      sendMessage.gif.included = true;
      sendMessage.gif.url = message;
    }
    if (sendMessage.text.includes("https://www.youtube.com/")) {
      sendMessage.youtube.included = true;
      sendMessage.youtube.url = message.replace(
        "https://www.youtube.com/watch?v=",
        "https://www.youtube.com/embed/"
      );
    }
    socket.emit("chat message", sendMessage);
    message = "";
  }

  function submit(event) {
    if (event.key === "Enter") {
      sendMessage();
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
  <div class="position-relative">
    <div class="chat-messages p-4">
      {#each messages as message}
        <Message {message} />
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
      <button
        class="btn btn-primary"
        on:click={() =>
          showGifs === true ? (showGifs = false) : (showGifs = true)}
        >Gifs</button
      >
      <button
        class="btn btn-primary"
        on:click={() =>
          showEmoji === true ? (showEmoji = false) : (showEmoji = true)}
        >Emoji</button
      >
    </div>
    {#if showGifs}
      <Gifs {showGifs} />
    {/if}

    {#if showEmoji}
      <EmojiPicker bind:value={message} />
    {/if}
  </div>
</div>
