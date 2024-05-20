<script setup>
</script>

<template>
    <div class="Records__service__container">
        <form>
            <div class="Records__service__form">
                <div>
                    <label for="service">Услуга</label>
                    <select name="service" id="service">
                        <option value="manicure">Маникюр</option>
                        <option value="pedicure">Педикюр</option>
                        <option value="haircut">Стрижка</option>
                        <option value="hairdyeing">Окрашивание волос</option>
                    </select>
                </div>
                <div>
                    <label for="date">Дата</label>
                    <input type="date" name="date" id="date">
                </div>
                <div>
                    <label for="time">Время</label>
                    <input type="time" name="time" id="time">
                </div>
                <div>
                    <label for="master">Мастер</label>
                    <select name="master" id="master">
                        <option value="Irina">Ирина</option>
                        <option value="Olga">Ольга</option>
                        <option value="Anna">Анна</option>
                        <option value="Maria">Мария</option>
                    </select>
                </div>
                <div>
                    <label for="price">Цена</label>
                    <input type="text" name="price" id="price">
                </div>
                <button id="Records__service__btn">Записаться</button>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>