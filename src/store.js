import { reactive } from "vue";

export const store = reactive({

    apiBaseURL : "http://127.0.0.1:8000",
    imageUrl: "http://127.0.0.1:8000/storage",

    successMessage: false,
})