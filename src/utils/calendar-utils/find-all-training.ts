import { training } from "@constants/types";
import { checkIsDatesEqual } from "@utils/check-is-dates-equal";

export const findAllTraining = (training: training[], date: Date) => {
    return training.filter(el => checkIsDatesEqual(new Date(el.date), date));
}
