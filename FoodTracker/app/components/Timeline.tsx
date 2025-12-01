import React from "react";
import { View, Text, Pressable } from "react-native";

const SECTIONS = ['breakfast','lunch','dinner','snacks','drinks'] as const;

export default function Timeline({ meals, onAdd }: { meals: any, onAdd: (category: any) => void }) {
    return (
        <View>
            {SECTIONS.map((section) => (
                <View key={section} className="mb-4">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="capitalize font-semibold">{section}</Text>
                        <Pressable onPress={() => onAdd(section)}>
                            <Text className="text-blue-500">Add</Text>
                        </Pressable>
                    </View>
                    <View className="bg-gray-50 rounded p-3">
                        {meals[section].length === 0 ? (
                            <Text className="text-gray-400">No items</Text>
                        ) : (
                            meals[section].map((it: any, idx: number) => (
                                <View key={idx} className="mb-2">
                                    <Text className="font-medium">{it.name}</Text>
                                    {it.notes ? <Text className="text-sm text-gray-500">{it.notes}</Text> : null}
                                </View>
                            ))
                        )}
                    </View>
                </View>
            ))}
        </View>
    );
}