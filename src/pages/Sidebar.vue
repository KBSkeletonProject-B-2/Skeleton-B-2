<template>
    <aside>
      <nav>
        <ul>
          <li><router-link to="/profile">프로필</router-link></li>
          <li><router-link to="/notification">알림</router-link></li>
          <li><router-link to="/language">언어</router-link></li>
          <li><router-link to="/theme">테마</router-link></li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
  };
  </script>
  
  <style scoped>
  aside {
    width: 200px;
    background-color: rgb(255,188,0);
    padding: 20px;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav ul li {
    margin-bottom: 10px;
  }
  
  nav ul li a {
    text-decoration: none;
    color: rgb(84,80,69);
  }
  
  nav ul li a:hover {
    color: #007bff;
  }
  </style>