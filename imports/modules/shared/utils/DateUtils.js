export class DateUtils {
  static IsInLastWeek(providedDate) {
    if (!providedDate) return false;
    const daysDifference = (new Date() - new Date(providedDate)) / (1000 * 60 * 60 * 24);
    return daysDifference < 7;
  };

  static AddSevenDays(date) {
    const result = new Date(date);
    result.setDate(result.getDate() + 7);
    return result;
  };
}
