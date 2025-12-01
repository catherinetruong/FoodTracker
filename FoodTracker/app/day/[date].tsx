import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Timeline from "../../components/Timeline";
import AddMealModal from "../../components/AddMealModal";
import { getMealsForDate, saveMealsForDate } from "../../utils/storage";
import formatDate from "../../utils/formatDate";

export default function DayPage() {
    const params = useLocalSearchParams();
    const date = params.date as string;
    const router = useRouter();

    const [meals, setMeals] = useState<any>({ breakfast: [], lunch: [], dinner: [], snacks: [], drinks: [] });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCategory, setModalCategory] = useState<keyof typeof meals>('breakfast');

    useEffect(() => {
        (async () => {
            const saved = await getMealsForDate(date);
            if (saved) setMeals(saved);
        })();
    }, [date]);

    const onSaveMeal = async (category: keyof typeof meals, item: { name: string; notes?: string }) => {
        const copy = { ...meals };
        copy[category] = [...copy[category], { ...item, createdAt: new Date().toISOString() }];
        setMeals(copy);
        await saveMealsForDate(date, copy);
    };

    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-semibold">{formatDate(date)}</Text>
                <Pressable onPress={() => router.back()}>
                    <Text className="text-blue-500">Back</Text>
                </Pressable>
            </View>

            <View className="flex-row gap-4">
                <View className="flex-1">
                    <Timeline meals={meals} onAdd={(cat) => { setModalCategory(cat); setModalVisible(true); }} />
                </View>
            </View>


            <AddMealModal
                visible={modalVisible}
                category={modalCategory}
                onClose={() => setModalVisible(false)}
                onSave={async (item) => { await onSaveMeal(modalCategory, item); setModalVisible(false); }}
            />
        </View>
    );
}