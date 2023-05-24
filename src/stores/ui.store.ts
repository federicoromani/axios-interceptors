import type { Loader, Toast } from "@/models/UI";
import { reactive } from "vue"

// Initial state
export const toastMessageStore = reactive<Toast>({
	titleMessage: '', 
	message: '', 
	typeMessage: '', 
	show: false
});

export const loaderStore = reactive<Loader>({
	show: false
});