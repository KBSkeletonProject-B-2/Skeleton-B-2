<!-- 거래내역 저장 뷰 -->
<!-- 가계부 내역을 생성하고 수정하는 뷰이다. -->
<template>
    <Transition name="modal" appear>
        <section class="modal">
            <div class="modal__window">
                <form action="/action_page.php" @submit.prevent="clickSaveButtonHandler">
                    <div class="mb-3 mt-3">
                        <label for="date" class="form-label transinfocreate-color">날짜</label>
                        <input type="date" class="form-control transinfocreate-input" id="date" required
                            v-model="transInfo.date">
                    </div>
                    <div class="mb-3">
                        <label for="inout" class="form-label transinfocreate-color">분류</label>
                        <select class="form-select transinfocreate-select" id="inout" required
                            v-model="transInfo.inout">
                            <option value="" selected disabled hidden>선택</option>
                            <option v-for="io in ioList" :value="io">{{ io }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label transinfocreate-color">카테고리</label>
                        <select class="form-select transinfocreate-select" id="category" required
                            v-model="transInfo.category">
                            <option value="" selected disabled hidden>선택</option>
                            <option v-for="c in cList" :value="c.name">{{ c.name }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="asset" class="form-label transinfocreate-color">계좌</label>
                        <select class="form-select transinfocreate-select" id="asset" required
                            v-model="transInfo.asset">
                            <option value="" selected disabled hidden>선택</option>
                            <option v-for="a in aList" :value="a">{{ a }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="amount" class="form-label transinfocreate-color">금액</label>
                        <input type="text" class="form-control transinfocreate-input" id="amount" required
                            v-model="transInfo.amount">
                    </div>
                    <div class="mb-3">
                        <label for="memo" class="form-label transinfocreate-color">메모</label>
                        <input type="text" class="form-control transinfocreate-input" id="memo"
                            v-model="transInfo.memo">
                    </div>
                    <button @click="changeIsOpen(false)" type="button" class="btn transinfocreate-cancel">취소</button>
                    <button type="submit" class="btn transinfocreate-save">저장</button>
                </form>
            </div>
            <div class="modal__overlay"></div>
        </section>
    </Transition>
</template>

<script>
import axios from 'axios'
import { onMounted, onUpdated, reactive, ref } from 'vue';
export default {
    setup(props, context) {
        let cList = reactive([])
        let ioList = reactive([])
        let aList = reactive([])
        let transInfo = reactive({
            id: Date.now(),
            date: "",
            inout: "",
            category: "",
            asset: "",
            amount: "",
            memo: ""
        })
        let isOpen = ref(false)

        /**
         * onMounted
         * 
         * 컴포넌트가 마운트된 후 JSON에서 카테고리를 가져온다.
         */
        onMounted(async () => {
            try {
                const urlCategory = "http://localhost:3000/category"
                const urlInout = "http://localhost:3000/inout"
                const urlAsset = "http://localhost:3000/asset"
                const responseCategory = await axios.get(urlCategory)
                const responseInout = await axios.get(urlInout)
                const responseAsset = await axios.get(urlAsset)

                Object.assign(cList, responseCategory.data)
                Object.assign(ioList, responseInout.data)
                Object.assign(aList, responseAsset.data)

                console.log(responseCategory.data)
                console.log(responseInout.data)
                console.log(responseAsset.data)
            } catch (err) {
                console.log(err.message)
                alert("카테고리 조회 실패")
            }
        })

        /**
         * onUpdated
         * 
         * 컴포넌트의 업데이트가 발생했을 때 transInfo 값을 초기화한다.
         */
        onUpdated(() => {
            transInfo.date = ""
            transInfo.inout = ""
            transInfo.category = ""
            transInfo.asset = ""
            transInfo.amount = ""
            transInfo.memo = ""
        })

        /**
         * 저장버튼클릭 핸들러
         * 
         * 저장 버튼을 클릭했을 때 JSON에 날짜, 카테고리, 금액, 메모, 분류, 계좌 정보를 업데이트하는 메소드이다.
         */
        const clickSaveButtonHandler = async () => {
            try {
                if (document.getElementById("date").value === "") {
                    alert("날짜를 선택해주세요.")
                } else if (document.getElementById("category").value === "") {
                    alert("카테고리를 선택해주세요.")
                } else if (document.getElementById("amount").value === "") {
                    alert("금액을 입력해주세요.")
                } else {
                    const url = "http://localhost:3000/transInfo"
                    const response = await axios.post(url, transInfo)

                    changeIsOpen(false)

                    console.log(response.data)
                }
            } catch (err) {
                console.log(err.message)
                alert("가계부 저장 실패")
            }
        }

        /**
         * isOpen 변경
         * 
         * isOpen에 파라미터 값인 open으로 변경하는 메소드이다.
         */
        const changeIsOpen = (open) => {
            isOpen.value = open
            console.log("TransInfoCreate.vue changeIsOpen : " + isOpen.value)
            context.emit('changeIsOpen', isOpen.value)
        }
        return { cList, ioList, aList, transInfo, clickSaveButtonHandler, isOpen, changeIsOpen }
    }
}
</script>

<style lang="scss">
.transinfocreate-color {
    color: #84B9C0;
    font-weight: bold;
}

.transinfocreate-cancel {
    color: #C0C0C0;
    font-weight: bold;
    float: left;
}

.transinfocreate-input {
    background-color: #D9D9D9;
}

.transinfocreate-select {
    background-color: #D9D9D9;
}

.transinfocreate-save {
    color: #84B9C0;
    float: right;
}

.modal {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    &__overlay {
        position: absolute;
        width: 100%;
        height: 100%;

        background-color: black;
        opacity: 0.8;
    }

    &__window {
        width: 30rem;
        height: 40rem;
        border-radius: 0.4rem;
        overflow: hidden;
        padding: 1rem;
        z-index: 1;

        background-color: white;
    }

    &-enter,
    &-leave-to {
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    &-enter-to,
    &-leave {
        transition: opacity 0.4s ease;
    }
}
</style>