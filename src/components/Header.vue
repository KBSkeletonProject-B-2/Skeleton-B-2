<template>
    <div>
        <h1>Header</h1>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">홈</router-link>
                        <router-link class="nav-link" to="/transactions">거래 내역</router-link>
                        <router-link class="nav-link" to="/profile">프로필</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>