function getId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
  });
}

function getYesterday() {
  let today = new Date();
  return new Date( today.setDate(today.getDate() - 1)).toLocaleDateString();
} 

function getDate(date: string, yesterday: string, today: string, saveDate: string) {
  let result = '';
  if (date !== saveDate) {
    if (date === yesterday) {
      result = 'Yesterday';
    } else if (date === today) {
      result = 'Today'
    } else {
      result = date;
    }
  }
  return result;
}

export { getId, getYesterday, getDate }