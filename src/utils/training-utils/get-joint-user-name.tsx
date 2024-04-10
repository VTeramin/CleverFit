export function getJointUserName(name: string, searchInputValue: string) {
    function getNameValueComponent(index: number) {
        const nameHalf = name.split(' ')[index] || '';
        const isNothingSearched = searchInputValue === '';
        const nameParts = nameHalf.split(searchInputValue);

        const nameHalfWithRed = nameParts.map((part, ind) => {
            const isOdd = ind % 2 === 0;
            const isNotLast = ind !== nameParts.length - 1;

            return isOdd && isNotLast
                ? <span key={`${ind * 2} ${part}`}>
                    <span>{part}</span><span style={{ color: 'var(--character-light-red-4)' }}>{searchInputValue}</span>
                </span>
                : <span key={`${ind * 2} ${part}`}>{part}</span>
        })

        return isNothingSearched ? nameHalf : nameHalfWithRed;
    }
    const firstName = getNameValueComponent(0);
    const lastName = getNameValueComponent(1);

    return <span>{firstName}<br />{lastName}</span>;
}
