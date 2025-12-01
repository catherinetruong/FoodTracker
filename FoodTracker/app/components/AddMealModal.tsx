import React, { useState } from "react";
import { Modal, View, Text, TextInput, Pressable } from "react-native";

export default function AddMealModal({ visible, onClose, onSave, category }: any) {
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');

    const submit = () => {
        if (!name.trim()) return;
        onSave({ name: name.trim(), notes: notes.trim() });
        setName(''); setNotes('');
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View className="flex-1 justify-end bg-black/30">
                <View className="bg-white p-4 rounded-t-2xl">
                    <Text className="text-lg font-semibold mb-2">Add to {category}</Text>
                    <TextInput placeholder="What did you eat?" value={name} onChangeText={setName} className="border p-2 rounded mb-2" />
                    <TextInput placeholder="Notes (optional)" value={notes} onChangeText={setNotes} className="border p-2 rounded mb-4" />

                    <View className="flex-row justify-end">
                        <Pressable onPress={onClose} className="mr-4">
                            <Text className="text-gray-600">Cancel</Text>
                        </Pressable>
                        <Pressable onPress={submit}>
                            <Text className="text-blue-500">Save</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}