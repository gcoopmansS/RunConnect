export function getWeekDates(startDate: Date): Date[] {
  const week = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay()); // Sunday
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    week.push(d);
  }
  return week;
}
