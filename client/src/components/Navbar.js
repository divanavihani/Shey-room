import React from "react";



function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/home">
          Shey Rooms
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
         <span class="navbar-toggler-icon"><i class="fas fa-bars" style={{ color: 'white' }}></i></span>



        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul class="navbar-nav mr-5">
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fa fa-user"></i>{user.name}
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                    <a class="dropdown-item" href="#"onClick={logout}>
                      Logout
                    </a>
                    
                  </div>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-item nav-link active" href="/register">
                    Register <span class="sr-only"></span>
                  </a>
                  <a class="nav-item nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )};
  export default Navbar;