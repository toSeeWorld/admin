export const parseUrlName = (url) => {
    const paths = url.split("/");
    return paths[paths.length - 1]
}