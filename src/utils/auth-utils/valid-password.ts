export function validPassword(password: string): boolean {
    const pattern = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)[а-яА-ЯёЁa-zA-Z\d\W]{8,}$/;

    return pattern.test(password);
}
