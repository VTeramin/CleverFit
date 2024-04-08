import { TTraining } from '@constants/types';
import { AppDispatch, GetState } from '@redux/configure-store';

export const getMostPopularTraining = () => (_: AppDispatch, getState: GetState) => {
    const { training, trainingList } = getState();
    const trainingNames = trainingList.map(el => el.name);

    function sumTrainingLoad(trainingInfo: TTraining) {
        return trainingInfo.exercises.reduce((acc: number, exercise) => acc + (exercise.approaches * exercise.replays * exercise.weight || 0), 0);
    }

    const trainingLoads = training.map(trainingInfo => ({
        name: trainingInfo.name,
        load: sumTrainingLoad(trainingInfo)
    }));

    const sumLoad = trainingNames.map(trainingName => {
        const load = trainingLoads
            .filter(loadInfo => loadInfo.name === trainingName)
            .reduce((acc, loadInfo) => acc + loadInfo.load, 0);

        return ({
            name: trainingName,
            load
        });
    })

    return sumLoad.sort((a, b) => b.load - a.load)[0].name;
}
