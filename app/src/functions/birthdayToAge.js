export function birthdayToAge(date) {
    const bDay = new Date(date);
    const age = ((Date.now() - bDay) / (31557600000));
   return Math.floor(age)
}
