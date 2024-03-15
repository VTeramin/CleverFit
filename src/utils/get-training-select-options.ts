import { training } from "@constants/types";
import { trainingListItem } from "@redux/trainingListSlice";
import { checkIsTrainingDone } from "./check-is-training-done";

export function getTrainingSelectOptions(training: training[], trainingOnSelDate: string[], trainingList: trainingListItem[], date: Date) {
    const isFuture = date >= new Date(Date.now());
    const allTrainingNames = trainingList.map((el: trainingListItem) => ({ value: el.name }));

    if(isFuture) {
        return allTrainingNames;
    }
    return allTrainingNames.filter(el => trainingOnSelDate.includes(el.value) && !checkIsTrainingDone(el.value, training, date as Date));
}
