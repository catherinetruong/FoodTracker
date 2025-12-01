import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Calendar from "../components/Calendar";
import { useRouter } from "expo-router";

export default function Index() {
const router = useRouter();

return (
    <View className="flex-1 bg-white p-4">
        <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-bold">What I Ate</Text>
            <Pressable onPress={() => router.push(`/day/${new Date().toISOString().slice(0,10)}`)}>
                <Text className="text-blue-500">Today</Text>
            </Pressable>
        </View>
        
        <ScrollView>
            <Calendar />
        </ScrollView>
    </View>
);
}