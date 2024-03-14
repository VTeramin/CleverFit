import { trainingListItem } from "@redux/trainingListSlice";

export function getTrainingSelectOptions(trainingList: trainingListItem[], trainingOnSelDate: string[]) {
    const trainingListNames = trainingList.map((el: trainingListItem) => ({ value: el.name }));
    return trainingListNames.filter(el => !trainingOnSelDate.includes(el.value));
}
