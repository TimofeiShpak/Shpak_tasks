import { MINUTE, HOUR, DAY, YESTERDAY } from '../helpers/constants'

function getId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
  });
}

function getTimeText(newTime: number, oldTime: number, divider: number, text: string): string {
  let number = Math.round((newTime - oldTime) / divider);
  let textTime = number === 1 ? `${number} ${text} ago` : `${number} ${text}s ago`;
  return textTime;
}

function getTime(time: string): string {
  let textTime = '';
  let newTime = Date.now();
  let oldTime = +(new Date(time));
  switch(true) {
    case (newTime - oldTime < MINUTE): textTime = 'Just now';
    break;
    case (newTime - oldTime < HOUR): textTime = getTimeText(newTime, oldTime, MINUTE, 'minute');
    break;
    case (newTime - oldTime < DAY): textTime = getTimeText(newTime, oldTime, HOUR, 'hour');
    break;
    case (newTime - oldTime < YESTERDAY): textTime = 'Yesterday';
    break;
    default: textTime = new Date(oldTime).toLocaleDateString()
  }
  return textTime;
}

export { getId, getTime }