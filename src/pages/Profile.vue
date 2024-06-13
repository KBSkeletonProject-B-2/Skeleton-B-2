<!-- 설정 내 프로필 뷰 -->
<template>
  <Sidebar/>
    <p>프로필 관리</p>
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
          <label for="email-id">1</label>
        </div>
        <div>
          <input type="text" id="email-id" v-model="emailId" placeholder="이메일 주소" />
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
      <label for="phone">2</label><br>
      <input type="tel" id="phone" v-model="phone" placeholder="전화번호" />
    </div>
    <button @click="submitProfile">확인</button>
  </div>
</template>

  
<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');

    const submitProfile = () => {
      const formData = {
        email: email.value
      };

      axios.post('http://localhost:3000/person', formData)
        .then(response => {
          console.log('성공적으로 추가되었습니다:', response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    return {
      email,
      submitProfile
    };
  }
  // data() {
  //   return {
  //     emailId: '',
  //     emailDomain: 'naver.com',
  //     phone: '',
  //     imageUrl: '/images/normal.JPG',
  //     userName: '익명1',
  //     images: [
  //       { id: 1, src: '/images/image1.JPG' },
  //       { id: 2, src: '/images/image2.JPG' },
  //       { id: 3, src: '/images/image3.JPG' },
  //       { id: 4, src: '/images/image4.JPG' }
  //     ]
  //   };
  // },
  // methods: {
  //   onFileChange(e) {
  //     const file=e.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.imageUrl = reader.result;
  //         this.persistData();
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       this.imageUrl = null;
  //     }
  //   },
  //   updateProfile(index) {
  //     this.imageUrl = this.images[index].src;
  //     this.userName = '익명' + (index + 1);
  //     this.persistData();
  //   },
  //   submitProfile() {
  //     console.log('Email:', this.emailId + '@' + this.emailDomain);
  //     console.log('Phone:', this.phone);
  //     this.persistData();
  //   },
  //   persistData() {
  //     const data = {
  //       emailId: this.emailId,
  //       emailDomain: this.emailDomain,
  //       phone: this.phone,
  //       imageUrl: this.imageUrl,
  //       userName: this.userName
  //     };
  //     localStorage.setItem('profileData', JSON.stringfy(data));
  //   },
  //   localData() {
  //     const data = JSON.parse(localStorage.getItem('profileData'));
  //     if (data) {
  //       this.emailId = data.emailId;
  //       this.emailDomain = data.emailDomain;
  //       this.phone = data.phone;
  //       this.imageUrl = data.imageUrl;
  //       this.userName = data.userName;
  //     }
  //   }
  // },
  // mounted() {
  //   this.localData();
  // },
}
</script>
  
<style scoped>

p {
  font-size: 20px;
  font-weight: bold;
  margin : 20px 20px;
  color : rgb(84,80,69)
}
.containter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.user-name {
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}

.input-group {
  font-size: 16px;
  padding: 10px 0px;
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
  width: 80px;
  height: 80px;
  cursor: pointer;
  margin: 5px;
}
.image-preview {
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  background-color: #f8f9fa;
  background-size: cover;
  background-position: center;
  margin-top: 10px;
}
button {
  display: block;
  width: auto;
  margin: 20px 0;
  padding: 10px 170px;
  background-color: rgb(255,188,0);
  color: white;
  border: rgb(255,188,0);
  border-radius: 5px;
}
button:hover {
  background-color: rgb(255,204,80);
}
</style>

  
