export function getLinkClass(link: string, currentLink: string) {
    const formatted = "/" + link;
    if (formatted === currentLink) {
        return "link active";
    } else {
        return "link"
    }
}