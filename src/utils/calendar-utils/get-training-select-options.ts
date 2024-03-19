import { trainingListItem } from "@redux/trainingListSlice";
import { checkIsTrainingDone } from "./check-is-training-done";
import { AppDispatch, GetState } from "@redux/configure-store";
import { findAllTraining } from "./find-all-training";
import { checkIsFuture } from "@utils/check-is-future";

export const getTrainingSelectOptions = (date: Date) => (_: AppDispatch, getState: GetState) => {
    const trainingList = getState().trainingList;
    const training = getState().training;
    const { isEdit } = getState().calendarModal;
    const trainingNames = findAllTraining(training, date).map(el => el.name);
    const allTrainingNames = trainingList.map((el: trainingListItem) => ({ value: el.name }));
    const isFuture = checkIsFuture(date);

    if (!isFuture) {
        return allTrainingNames.filter(el => trainingNames.includes(el.value) && !checkIsTrainingDone(el.value, date));
    }
    if (isEdit) {
        return allTrainingNames;
    }
    return allTrainingNames.filter(el => !trainingNames.includes(el.value));
}
