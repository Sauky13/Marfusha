<template>
    <div>
        <form v-if="!token">
            <p>Вы успешно вышли из аккаунта</p>
        </form>
        <form v-else>
            <p>Вы хотите выйти из аккаунта?</p>
            <div class="button-container">
                <button class="yes-button" @click="logout">Да</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const token = ref(localStorage.getItem('token'));

const logout = () => {
    localStorage.removeItem('token');
    token.value = null;
};

onMounted(() => {
    if (!token.value) {
        localStorage.removeItem('token');
    }
});
</script>

<style>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

button {
    padding: 10px 20px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

.yes-button {
    background-color: green;
}

.no-button {
    background-color: red;
}

h2 {
    text-align: center;
}
</style>
