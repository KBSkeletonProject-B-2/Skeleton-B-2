<!-- 설정 내 테마 뷰 -->
<template>
    <p>테마</p>
    <div class="theme-page">
      <div class="theme-buttons">
        <div class="light-mode-container">
          <div class="light-mode-box">KB wallet</div>
          <button @click="setLightMode">
            <i class="fas fa-lightbulb"></i>
            라이트 모드
          </button>
        </div>
        <div class="dark-mode-container">
          <div class="dark-mode-box">KB wallet</div>
          <button @click="setDarkMode">
            <i class="fas fa-moon"></i>
            다크 모드
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
    export default {
      name: 'ThemePage',
      components: {
        Header,
        Footer,
      },
      methods: {
        setLightMode() {
          document.body.classList.remove('dark-mode');
          document.body.classList.add('light-mode');
        },
        setDarkMode() {
          document.body.classList.remove('light-mode');
          document.body.classList.add('dark-mode');
        },
      },
    };
  </script>
  
  
  <style scoped>
    p {
      font-size: 20px;
      font-weight: bold;
      margin : 20px 20px;
      color : rgb(84,80,69)
    }
  
  .theme-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .theme-buttons {
    margin-top: 20px;
    display: flex;
    gap: 20px;
  }
  
  .light-mode-container,
  .dark-mode-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .light-mode-box,
  .dark-mode-box {
    width: 180px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  .light-mode-box {
    background-color: white;
    color: rgb(84,80,69);
    border: 2px solid rgb(255,188,0);
  }
  
  .dark-mode-box {
    background-color: rgb(84,80,69);
    color: white;
    border: 2px solid rgb(255,188,0);
  }
  
  button {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: rgb(255,188,0);
    color: white;
    transition: background-color 0.3s;
  }
  
  button i {
    margin-right: 10px;
  }
  
  button:hover {
    background-color: rgb(255,204,80);
  }
  :global(body.light-mode) {
    background-color: white;
    color: rgb(84,80,69);
  }
  
  :global(body.dark-mode) {
    background-color: rgb(84,80,69);
    color: white;
  }
  </style>