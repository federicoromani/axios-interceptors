import type { Country } from "@/models";
import { api } from "@/plugins/axios";

export const fetchByLang = async (lang: string = 'spanish'): Promise<Country[]> => {
	try {
		const { data } = await api.get(`/lang/${lang}`);
		return data; 
	} catch (error: any) {
		return [];
	}
}

export const fetchBySubregion = async (subregion: string = 'South America'): Promise<Country[]> => {
	try {
		const { data } = await api.get(`/subregion/${subregion}`);
		return data; 
	} catch (error: any) {
		return [];
	}
}