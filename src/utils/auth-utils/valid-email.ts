export function validEmail(email: string): boolean {
    const pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

    return pattern.test(email);
}
