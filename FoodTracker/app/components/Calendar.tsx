import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { getMealsForDate } from "../utils/storage";
import formatDate from "../utils/formatDate";

function monthDaysMatrix(year: number, month: number) {
    const first = new Date(year, month, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    const rows: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
}


export default function Calendar() {
    const router = useRouter();
    const today = new Date();
    const [year] = useState(today.getFullYear());
    const [month] = useState(today.getMonth());
    const [activityMap, setActivityMap] = useState<Record<string, boolean>>({});


    useEffect(() => {
        (async () => {
            const rows = monthDaysMatrix(year, month);
            const map: Record<string, boolean> = {};
            for (const row of rows) {
                for (const d of row) {
                    if (!d) continue;
                    const iso = new Date(year, month, d).toISOString().slice(0,10);
                    const data = await getMealsForDate(iso);
                    map[iso] = !!(data && Object.keys(data).some(k => (data as any)[k].length > 0));
                }
            }
            setActivityMap(map);
        })();
    }, [year, month]);


    const rows = monthDaysMatrix(year, month);


    return (
        <View>
            <Text className="text-lg font-medium mb-2">{today.toLocaleString('default', { month: 'long' })} {year}</Text>
            <View className="grid grid-cols-7 gap-2">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                    <Text key={d} className="text-xs text-gray-500 text-center">{d}</Text>
                ))}
            </View>


            {rows.map((row, i) => (
                <View key={i} className="flex-row justify-between mb-2">
                    {row.map((d, j) => {
                        if (!d) return <View key={j} className="w-12 h-12" />;
                        const iso = new Date(year, month, d).toISOString().slice(0,10);
                        const has = !!activityMap[iso];
                        return (
                            <Pressable key={j} onPress={() => router.push(`/day/${iso}`)} className={`w-12 h-12 items-center justify-center rounded ${iso === new Date().toISOString().slice(0,10) ? 'bg-blue-50' : ''}`}>
                                <Text>{d}</Text>
                                {has && <View className="w-2 h-2 rounded-full bg-green-500 absolute bottom-1" />}
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}