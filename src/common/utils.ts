export function parseJwt(token: string): string|null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url).split('').map((c)=>{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    return JSON.parse(base64)
  } catch (err) {
    console.info('the token was not decoded')
    return null
  }
}

export function secondsToString(seconds:number): string {
  const hour: number = Math.floor(seconds / 3600);
  const hh: string = (hour < 10)? '0' + hour : `${hour}`;
  const minute = Math.floor((seconds / 60) % 60);
  const min: string = (minute < 10)? '0' + minute : `${minute}`;
  const second = seconds % 60;
  const sec: string = (second < 10)? '0' + second : `${second}`;
  return hh + ' HR ' + min + ' MIN ' + sec + ' SEC';
}

export const dateFormat = (date: Date): string => {
  const mm = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
	const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${mm}-${dd}`;
}

export const dateIsBetween = (checkDate: Date, range: [Date, Date]): boolean => {
  let isBetween: boolean = false;
  isBetween = (checkDate <= range[1] && checkDate >= range[0])
  return isBetween
}