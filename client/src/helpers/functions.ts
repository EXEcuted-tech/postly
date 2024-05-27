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

export function getMonth(dateString: string): string {
    const monthCode = dateString.slice(-2);
    let returnMonth: string;

    switch (monthCode) {
        case '01': 
            returnMonth = 'January';
            break;
        case '02': 
            returnMonth = 'February';
            break;
        case '03': 
            returnMonth = 'March';
            break;
        case '04': 
            returnMonth = 'April';
            break;
        case '05': 
            returnMonth = 'May';
            break;
        case '06': 
            returnMonth = 'June';
            break;
        case '07': 
            returnMonth = 'July';
            break;
        case '08': 
            returnMonth = 'August';
            break;
        case '09': 
            returnMonth = 'September';
            break;
        case '10': 
            returnMonth = 'October';
            break;
        case '11': 
            returnMonth = 'November';
            break;
        case '12': 
            returnMonth = 'December';
            break;
        default:
            returnMonth = 'Invalid month';
            break;
    }

    return returnMonth;
}