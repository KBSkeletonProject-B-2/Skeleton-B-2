<!-- 설정 내 프로필 뷰 -->
<template>
    <header>
      <p>프로필 관리</p>
    </header>
    <div class="container">
      <main>
        <div>
          <label for="profile-picture"></label>
          <input type="file" id="profile-picture" @change="onFileChange" accept="image/*" />
          <div class="image-preview" v-if="imageUrl" :style="{ backgroundImage: 'url(' + imageUrl + ')'}"></div>
          <div class="no-image-preview" v-else>
            <div>사용자 사진을 선택해주세요.</div>
          </div>
          <div class="user-name">{{ userName }}님</div>
        </div>
        <div class="input-group">
          <label for="email-id">이메일</label><br>
          <input type="text" id="email-id" v-model="emailId" placeholder="아이디" />
          @
          <select v-model="emailDomain">
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="gmail.com">gmail.com</option>
          </select>
        </div>
      </main>
      <div class="input-group">
        <label for="phone">전화번호</label><br>
        <input type="tel" id="phone" v-model="phone" placeholder="000-0000-0000" />
      </div>
      <button @click="submitProfile">확인</button>
    </div>
    
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  export default {
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        emailId: '',
        emailDomain: 'naver.com',
        phone: '',
        imageUrl: null,
        userName: 'ㅇㅇㅇ'
      };
    },
    methods: {
      onFileChange(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imageUrl = reader.result;
          };
          reader.readAsDataURL(file);
        } else {
          this.imageUrl = null;
        }
      },
      submitProfile() {
        const email = `${this.emailId}@${this.emailDomain}`
        console.log('Email:', email);
        console.log('Phone', this.phone);
      },
    },
  }
  
  </script>
  
  <style scoped>
  p {
    font-size: 20px;
    font-weight: bold;
    margin : 20px 0;
  }
  .containter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .profile-form {
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    width: 300px;
    background-color: #fff;
  }
  .profile-form label {
    display: block;
    margin-bottom: 10px;
  }
  .profile-form input[type="text"],
  .profile-form input[type="tel"],
  .profile-form select {
    display: block;
    margin-top: 5px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .image-preview, .no-image-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    background-color: #f8f9fa;
    background-size: cover;
    background-position: center;
  }
  
  .image-preview img {
    font-size: 14px;
  }
  
  .user-name {
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
  }
  
  button {
    display: block;
    margin: 20px 0;
    padding: 10px 150px;
    background-color: #f6d14c;
    color: white;
    border: #f6d14c;
    border-radius: 5px;
  }
  button:hover {
    background-color: antiquewhite;
  }
  </style>
  