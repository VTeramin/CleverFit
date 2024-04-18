export function wrapPieLabel(label: string, digits: number) {
    const wordsArr = label.split(' ');
    const isWrap = (string: string, word: string) => (string.length % digits + word.length) > digits;

    return wordsArr.reduce((acc, next) => isWrap(acc, next) ? `${acc}\n${next}` : `${acc} ${next}`, '');
}
