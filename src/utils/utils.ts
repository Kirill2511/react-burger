import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

function formatDistanceDayToNow(date: Date) {
  const oneDay = 1000 * 3600 * 24;
  const distance = Date.now() - date.getTime();
  let deltaString = "";
  if (distance < oneDay && distance > 0) {
    return "Cегодня";
  } else if (distance < oneDay * 2) {
    return "Вчера";
  } else if (distance < oneDay * 4) {
    deltaString = distance + " дня назад";
  } else {
    deltaString = distance + " дней назад";
  }
  return formatDistanceToNow(date, { locale: ru, addSuffix: true });
}

export { formatDistanceDayToNow };
