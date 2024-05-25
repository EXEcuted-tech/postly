export function getLinkClass(link: string, currentLink: string) {
    const formatted = "/" + link;
    if (formatted === currentLink) {
        return "link active";
    } else {
        return "link"
    }
}

export function decodeBase64Url(base64Url: string) {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(escape(atob(base64)));
}

export function getMonthName(monthIndex:number){
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  }