<!-- 프로필의 정보를 보여주는 뷰 -->
<!-- 프로필에 저장된 이름을 보여준다. -->

<template>
    <div class="name" v-if="latestPerson">
        <span>{{ latestPerson.username }}</span>
        <span>님의 가계부</span>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
    setup() {
        const latestPerson = ref(null);

        const requestAPI = async () => {
            try {
                const url = 'http://localhost:3000/person'; 
                const response = await axios.get(url);
                const persons = response.data;

                const maxIdPerson = persons.reduce((prev, current) => (prev.username == current.username) ? prev : current);

                latestPerson.value = maxIdPerson;
            } catch (error) {
                console.error(error); 
            }
        };

        requestAPI(); 

        return {
            latestPerson
        };
    }
};
</script>
<style>
.name {
    font-size: 25px;
    font-weight: bold;
    color: rgb(96, 88, 76);
}
</style>
