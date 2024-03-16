import { drawerFormFields, training } from "@constants/types";

export function filterTrainingByName(training: training[], cellDate: string, selectedTraining: string) {
    const todayExercises = training.find(el => {
        const elDate = String(new Date(el.date)).substring(0, 10);
        return elDate === cellDate && el.name === selectedTraining;
    })?.exercises.map(el => {
        const { name, replays, weight, approaches } = el;
        return { name, replays, weight, approaches };
    });
    return {...todayExercises} as drawerFormFields;
}
