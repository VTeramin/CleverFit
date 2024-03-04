export function getTokenFromSearch() {
    const searchParams = window.location.search;
    if (searchParams) {
        const searchParamsArray = searchParams.replace("?", "").split("&");
        const serachToken = searchParamsArray.find(el => el.startsWith("accessToken")) || "";
        return serachToken ? serachToken.split("=")[1] : "";
    }
}
