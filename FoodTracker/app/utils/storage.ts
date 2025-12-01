import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@what-i-ate:';

export async function saveMealsForDate(date: string, data: any) {
    try {
        await AsyncStorage.setItem(PREFIX + date, JSON.stringify(data));
    } catch (e) {
        console.error('save error', e);
    }
}

export async function getMealsForDate(date: string) {
    try {
        const raw = await AsyncStorage.getItem(PREFIX + date);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        console.error('load error', e);
        return null;
    }
}