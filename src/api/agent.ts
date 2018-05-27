export const get = async (url: string) => {
    return fetch(url).then((res) => res.json())
}