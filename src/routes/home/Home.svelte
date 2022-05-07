<script>
  import People from "./Peoplelist.svelte";
  import Chat from "./Chat.svelte";
  import { isLoggedIn, preferences } from "../../stores/users";
  import {get} from 'svelte/store';

  import { push } from "svelte-spa-router";
  
  if (!$isLoggedIn) {
    push("/login");
  }

</script>

<main>
  <div class="card">
    <div class="row g-0">
      <People />
      <Chat />
    </div>
  </div>
</main>
