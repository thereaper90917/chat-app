<script>
  import People from "./Peoplelist.svelte";
  import Chat from "./Chat.svelte";
  import { isLoggedIn } from "../../stores/users";

  import { push } from "svelte-spa-router";

  if (!isLoggedIn) {
	  console.log(preferences)
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
