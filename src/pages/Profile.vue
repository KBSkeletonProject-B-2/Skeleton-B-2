<!-- 설정 내 프로필 뷰 -->
<template>
  <header>
    <p>프로필 관리</p>
  </header>
  <div class="container">
    <main>
      <div>
        <div class="image-options">
          <img v-for="(image, index) in images" :src="image.src" :alt="'익명' + (index + 1)" 
               :class="{'selected-image': image.src === imageUrl}" 
               @click="updateProfile(index)" 
               key="image.id">
        </div>
        <div class="image-preview" :style="{ backgroundImage: 'url(' + imageUrl + ')'}"></div>
        <div class="user-name">{{ userName }}님</div>
      </div>
      <div class="input-group">
        <div>
          <label for="email-id">이메일</label>
        </div>
        <div>
          <input type="text" id="email-id" v-model="emailId" placeholder="아이디" />
          @
          <select v-model="emailDomain">
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="gmail.com">gmail.com</option>
          </select>
        </div>   
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
      imageUrl: '/images/normal.JPG',
      userName: '익명1',
      images: [
        { id: 1, src: '/images/image1.JPG' },
        { id: 2, src: '/images/image2.JPG' },
        { id: 3, src: '/images/image3.JPG' },
        { id: 4, src: '/images/image4.JPG' }
      ]
    };
  },
  methods: {
    updateProfile(index) {
      this.imageUrl = this.images[index].src;
      this.userName = '익명' + (index + 1);
    },
    submitProfile() {
      console.log('Email:', this.emailId + '@' + this.emailDomain);
      console.log('Phone:', this.phone);
    },
  },
}
</script>
  
<style scoped>

p {
  font-size: 20px;
  font-weight: bold;
  margin : 20px 0;
  color : rgb(84,80,69)
}
.containter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.input-group > div {
  margin-bottom: 10px;
}

.input-group input,
.input-group select {
  margin-top: 0; 
  padding: 8px;
  margin-right: 5px;
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

.selected-image {
  border: 2px solid rgb(84,80,69); /* Highlight the selected image */
}

.image-options img {
  width: 100px; /* Smaller view for selection */
  height: 100px;
  cursor: pointer;
  margin: 5px;
}
.image-preview {
  width: 150px;
  height: 150px;
  border: 2px solid rgb(84,80,69);
  background-color: #f8f9fa;
  background-size: cover;
  background-position: center;
  margin-top: 10px;
}
button {
  display: block;
  margin: 20px 0;
  padding: 10px 150px;
  background-color: rgb(255,188,0);
  color: white;
  border: rgb(255,188,0);
  border-radius: 5px;
}
button:hover {
  background-color: rgb(255,204,80);
}
</style>

  