import { training } from "@constants/types";

export function filterTrainingByDay(training: training[], date: Date) {
    return training.filter(el => {
        const elDate = String(new Date(el.date)).substring(0, 10);
        const cellDate = String(date).substring(0, 10);
        return elDate === cellDate;
    }).map(el => el.name);
}
