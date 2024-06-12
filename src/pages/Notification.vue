<template>
    <div>
      <p>알림</p>
      <!-- <Header /> -->
      <main>
        <section>
          <div class="setting-item">
            <label>
              <span>알림음</span>
              <label class="switch">
                <input type="checkbox" v-model="notificationSound" />
                <span class="slider round"></span>
              </label>
            </label>
          </div>
          <div class="setting-item">
            <label>
              <span>이메일 수신여부</span>
              <label class="switch">
                <input type="checkbox" v-model="emailNotifications" />
                <span class="slider round"></span>
              </label>
            </label>
          </div>
        </section>
      </main>
      <!-- <Footer /> -->
    </div>
  </template>
  
  <script>
  // import Header from '../components/Header.vue';
  // import Footer from '../components/Footer.vue';
  
  export default {
    components: {
      // Header,
      // Footer,
    },
    data() {
      return {
        notificationSound: false,
        emailNotifications: false,
      };
    },
    methods: {
      updateNotificationSound() {
        // 알림음 설정 업데이트 로직
        console.log("Notification Sound:", this.notificationSound);
      },
      updateEmailNotifications() {
        // 이메일 알림 설정 업데이트 로직
        console.log("Email Notifications:", this.emailNotifications);
      },
    },
  };
  </script>
  
  
  <style scoped>
  p {
    font-size: 20px;
    font-weight: bold;
    margin : 20px 20px;
  }
  
  main {
    padding: 1rem;
  }
  
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    font-size: 16px;
    border-bottom: 1px solid #dee2e6;
  }
  
  .notification-settings {
    padding: 20px;
  }
  
  
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin: 15px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(96, 88, 76);
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: rgba(255, 188, 0);
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px rgba(255, 188, 0);
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  </style>
  