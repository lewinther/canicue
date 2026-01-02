import type { TrainingLog } from "Models/TrainingLog";

export const getClientTrainingDaysLastWeekCET = (
    logs: TrainingLog[] | null
) => {
    if(!logs) return;
    const days: Record<string, { logged: boolean; weekday: string | undefined }> = {};

    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const year = d.getFullYear();
        const month = twoDigits(d.getMonth() + 1);
        const day = twoDigits(d.getDate());
        const dayKey = `${year}-${month}-${day}`;

        const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const weekdayName = weekdays[d.getDay()];

        days[dayKey] = { logged: false, weekday: weekdayName };
    }

    for (const log of logs) {
        const { dayKey, weekdayName } = getCETDayInfo(log.createdAt);
        if (dayKey in days && days[dayKey]) {
            days[dayKey].logged = true;
            days[dayKey].weekday = weekdayName;
        }
    }

    return days;
}

const twoDigits = (n: number): string => (n < 10 ? "0" + n : String(n));

export const getCETDayInfo = (unixSeconds: number) => {
    const d = new Date(unixSeconds * 1000);

    const year = d.getFullYear();
    const month = twoDigits(d.getMonth() + 1);
    const day = twoDigits(d.getDate());

    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const weekdayName = weekdays[d.getDay()];

    return {
        dayKey: `${year}-${month}-${day}`,
        weekdayName,
    };
};

type Weekday = {
    dayKey: string; 
    weekday: string; 
    label: string 
}

export const getLast7DaysCET = (): Weekday[] => {
    const days: { dayKey: string; weekday: string; label: string }[] = [];
    const today = new Date();

    const weekdayLabels: Record<string, string> = {
        Monday: "M",
        Tuesday: "T",
        Wednesday: "W",
        Thursday: "T",
        Friday: "F",
        Saturday: "S",
        Sunday: "S",
    };

    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const year = d.getFullYear();
        const month = twoDigits(d.getMonth() + 1);
        const day = twoDigits(d.getDate());
        const dayKey = `${year}-${month}-${day}`;

        const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const weekdayName = weekdays[d.getDay()];
        if (!weekdayName || !weekdayLabels[weekdayName]) return []

        days.push({
            dayKey,
            weekday: weekdayName,
            label: weekdayLabels[weekdayName],
        });
    }

    return days;
};