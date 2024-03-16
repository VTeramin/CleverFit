import { training } from "@constants/types";

export function getTrainingId(training: training[], date: Date, selectedTraining: string | null) {
    return training.find(el => {
        const elDate = String(new Date(el.date)).substring(0, 10);
        const cellDate = String(date).substring(0, 10);
        return elDate === cellDate && el.name === selectedTraining;
    })?._id
}
