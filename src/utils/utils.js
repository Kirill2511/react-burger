export const convertOrderDate = (orderDate) => {
  const newDate = new Date(orderDate);
  const currentDate = new Date();
  const data = currentDate.getDate() - newDate.getDate();
  let deltaString = "";
  if (data === 0) {
    deltaString = "Сегодня";
  } else if (data === 1) {
    deltaString = "Вчера";
  } else if (data <= 4) {
    deltaString = data + " дня назад";
  } else {
    deltaString = data + " дней назад";
  }

  const options = { timeZoneName: "short", hour: "numeric", minute: "numeric" };
  return deltaString + ", " + newDate.toLocaleTimeString("ru-RU", options);
};