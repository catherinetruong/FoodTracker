// small wrapper if you want to import convenience functions
import { getMealsForDate, saveMealsForDate } from '../utils/storage';


export async function loadDay(date: string) {
    const data = await getMealsForDate(date);
    if (!data) return { breakfast: [], lunch: [], dinner: [], snacks: [], drinks: [] };
    return data;
}


export async function saveDay(date: string, data: any) {
    await saveMealsForDate(date, data);
}