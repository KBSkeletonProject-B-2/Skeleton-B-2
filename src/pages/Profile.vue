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
               :key="image.id">
        </div>
        <div class="image-preview" :style="{ backgroundImage: 'url(' + imageUrl + ')'}"></div>
        <div class="user-name">{{ userName }}</div>
      </div>
      <div class="input-group1">
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
    <div class="input-group2">
      <label for="phone-part1">전화번호</label><br>
      <input type="tel" id="phone-part1" v-model="phonePart1" maxlength="3" @input="updatePhone" placeholder="010" /> -
      <input type="tel" id="phone-part2" v-model="phonePart2" maxlength="4" @input="updatePhone" placeholder="1234" /> -
      <input type="tel" id="phone-part3" v-model="phonePart3" maxlength="4" @input="updatePhone" placeholder="5678" />
    </div>
    <button @click="submitProfile">확인</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted, toRefs } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const state = reactive({
      emailId: '',
      emailDomain: 'naver.com',
      phonePart1: '',
      phonePart2: '',
      phonePart3: '',
      phone: '',
      imageUrl: '/images/normal.JPG',
      userName: '기본프로필',
      selectedProfileIndex: 0,
      images: [
        { id: 1, src: '/images/image1.JPG' },
        { id: 2, src: '/images/image2.JPG' },
        { id: 3, src: '/images/image3.JPG' },
        { id: 4, src: '/images/image4.JPG' }
      ]
    });

    const loadLocalData = () => {
      const data = JSON.parse(localStorage.getItem('profileData')) || [];
      const profile = data[state.selectedProfileIndex] || {};
      state.emailId = profile.emailId || '';
      state.emailDomain = profile.emailDomain || 'naver.com';
      const phoneParts = (profile.phone || '---').split('-');
      state.phonePart1 = phoneParts[0] || '';
      state.phonePart2 = phoneParts[1] || '';
      state.phonePart3 = phoneParts[2] || '';
      state.imageUrl = profile.imageUrl || state.images[state.selectedProfileIndex].src;
      state.userName = profile.userName || `닉네임${state.selectedProfileIndex + 1}`;
      updatePhone(); // Load data 후 phone 업데이트
    };

    const updateProfile = (index) => {
      persistData(); // 현재 프로필 데이터 저장
      state.selectedProfileIndex = index;
      loadLocalData(); // 선택된 프로필 데이터 로드
    };

    const onFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          state.imageUrl = reader.result;
          persistData();
        };
        reader.readAsDataURL(file);
      } else {
        state.imageUrl = null;
      }
    };

    const updatePhone = () => {
      state.phone = `${state.phonePart1}-${state.phonePart2}-${state.phonePart3}`;
    };

    const submitProfile = () => {
      updatePhone();
      const formData = {
        username: state.userName,
        emailId: state.emailId,
        emailDomain: state.emailDomain,
        phone: state.phone,
        imageUrl: state.imageUrl
      };

      axios.post('http://localhost:3000/person', formData)
        .then(response => {
          console.log('성공적으로 추가되었습니다:', response.data);
          persistData();
        })
        .catch(error => {
          console.error(error);
        });
    };

    const persistData = () => {
      updatePhone(); // persistData 전에 phone 업데이트
      let profileData = JSON.parse(localStorage.getItem('profileData')) || [];
      profileData[state.selectedProfileIndex] = {
        emailId: state.emailId,
        emailDomain: state.emailDomain,
        phone: state.phone,
        imageUrl: state.imageUrl,
        userName: state.userName
      };
      localStorage.setItem('profileData', JSON.stringify(profileData));
    };

    onMounted(() => {
      loadLocalData();
    });

    return {
      ...toRefs(state),
      updateProfile,
      onFileChange,
      submitProfile
    };
  }
};
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
}

.input-group1 {
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px;
}

.input-group1 > div {
  margin-bottom: 10px;
}

.input-group1 input,
.input-group1 select {
  margin-top: 0; 
  padding: 10px;
}

.input-group2 {
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px;
}

.input-group2 input {
  margin-top: 10px;
  height: 40px;
  width: 80px;
}

.input-group1 input {
  width: 120px;
  height: 40px;
}

.input-group1 select {
  width: 120px;
  height: 40px;
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



  
