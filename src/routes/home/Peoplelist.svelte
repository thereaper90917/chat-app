<script>
  import { preferences } from "../../stores/users";
  import io from "socket.io-client";
  const socket = io("http://45.41.204.198:8070/");

  let userName = $preferences.user.name;
  let allUsers = []
socket.emit('users',userName)
socket.on('addUsers', (users)=>{
  allUsers = users
})
</script>

<div class="col-12 col-lg-5 col-xl-3 border-right">
  <div class="px-4 d-none d-md-block">
    <div class="d-flex align-items-center">
      <!-- <div class="flex-grow-1">
        <input
          type="text"
          class="form-control my-3"
          placeholder="Search..."
        />
      </div> -->
    </div>
  </div>
  <h2>Users Online: {allUsers.length}</h2>
  <hr class="d-block d-lg-none mt-1 mb-0" />
 {#each allUsers as user}
 <a
 href="#"
 class="list-group-item list-group-item-action border-0"
>
 <div class="badge bg-success float-right">5</div>
 <div class="d-flex align-items-start">
   <img
     src="https://bootdey.com/img/Content/avatar/avatar5.png"
     class="rounded-circle mr-1"
     alt="Vanessa Tucker"
     width="40"
     height="40"
   />
   <div class="flex-grow-1 ml-3">
     {user}
     <div class="small">
       <span class="fas fa-circle chat-online"></span> Online
     </div>
   </div>
 </div>
</a>

<hr class="d-block d-lg-none mt-1 mb-0" />
 {/each}
  
</div>