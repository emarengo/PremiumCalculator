export function ageToBirthday(age) {
  var date = new Date(Date.now());

  return Math.abs(date.getUTCFullYear() - age);
}
