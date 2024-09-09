<script>
export default {
    data() {
        return {

        };
    },
};
</script>

<template>
    <div class="input-wrapper">
        <button class="icon">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="25px"
            width="25px"
        >
            <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#fff"
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            ></path>
            <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#fff"
            d="M22 22L20 20"
            ></path>
        </svg>
        </button>
        <input placeholder="Cerca per specializzazione..." class="input" name="text" type="text" />
    </div>
</template>

<style scoped lang="scss">
@use "../style/partials/variables" as *;

.input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    position: relative;
}

.input {
    border-style: none;
    height: 50px;
    width: 50px;
    padding: 10px;
    outline: none;
    border-radius: 50%;
    transition: 0.5s ease-in-out;
    background-color: $egyptian-blue;
    box-shadow: 0px 0px 3px $egyptian-blue;
    padding-right: 40px;
    color: $egyptian-blue;
}

.input::placeholder,
.input {
    // font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
    font-size: 17px;
}

.input::placeholder {
    color: $egyptian-blue;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    outline: none;
    border-style: none;
    border-radius: 50%;
    pointer-events: painted;
    background-color: transparent;
    transition: 0.2s linear;
}

.icon:focus ~ .input,
.input:focus {
    box-shadow: none;
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 3px solid $egyptian-blue;
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
</style>
