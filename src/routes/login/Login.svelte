<script>
  import { push } from "svelte-spa-router";
  import { preferences } from "../../stores/users";

  import io from "socket.io-client";
  const socket = io("http://45.41.204.198:8070/");
  let username = "";
  let id = "";

  async function doPost() {
    const res = await fetch("http://45.41.204.198:8070/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: username, socketId: id }),
    });
    socket.emit("socketId", username);

    preferences.set({user: {name: username}});

    push('/');
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <!-- <h2 class="text-center text-dark mt-5">Login Form</h2> -->
      <div class="card my-5">
        <form class="card-body cardbody-color p-lg-5">
          <div class="text-center">
            <img
              src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
              class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
              width="200px"
              alt="profile"
            />
          </div>
          <div class="mb-3">
            <input
              bind:value={username}
              type="text"
              class="form-control"
              id="Username"
              aria-describedby="emailHelp"
              placeholder="User Name"
            />
          </div>
          <!-- <div class="mb-3">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="password"
              />
            </div> -->
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-color px-5 mb-5 w-100"
              on:click={doPost}
            >
              Login
            </button>
          </div>
          <!-- <div id="emailHelp" class="form-text text-center mb-5 text-dark">
              Not Registered?
              <a href="#" class="text-dark fw-bold"> Create an Account</a>
            </div> -->
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .btn-color {
    background-color: #0e1c36;
    color: #fff;
  }

  .profile-image-pic {
    height: 200px;
    width: 200px;
    object-fit: cover;
  }

  .cardbody-color {
    background-color: #23272a;
  }
</style>
