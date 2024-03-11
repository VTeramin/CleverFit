import { status } from "./requests";

export function getResultModalWidth(resultType: status) {
    switch (resultType) {
        case status.errorTrainingList:
            return 384;
        default:
            return 539;
    }
}
