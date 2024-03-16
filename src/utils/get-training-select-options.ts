import { training } from "@constants/types";
import { trainingListItem } from "@redux/trainingListSlice";
import { checkIsTrainingDone } from "./check-is-training-done";

export function getTrainingSelectOptions(training: training[], trainingOnSelDate: string[], trainingList: trainingListItem[], date: Date, isEdit: boolean) {
    const isFuture = date >= new Date(Date.now());
    const allTrainingNames = trainingList.map((el: trainingListItem) => ({ value: el.name }));

    if (isFuture) {
        if(isEdit) {
            return allTrainingNames;
        } else {
            return allTrainingNames.filter(el => !trainingOnSelDate.includes(el.value))
        }
    } else {
        return allTrainingNames.filter(el => trainingOnSelDate.includes(el.value) && !checkIsTrainingDone(el.value, training, date as Date));
    }
}
