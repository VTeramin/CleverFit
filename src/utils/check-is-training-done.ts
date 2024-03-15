import { training } from "@constants/types";
import { convertDate } from "./convert-date";

export function checkIsTrainingDone(name: string, training: training[], date: Date | undefined) {
    return training.find(el => {
        const cellDate = date ? convertDate(date.toISOString()) : "";
        const nameDate = convertDate(el.date.toString());
        return cellDate === nameDate && el.name === name;
    })?.isImplementation;
}
