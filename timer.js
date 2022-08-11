import EventEmmiter from "events";
import moment from "moment";
import "moment-precise-range-plugin";
import colors from "colors";

const emmiter = new EventEmmiter();

const [countDate] = process.argv.slice(2);
const format = "mm:HH-DD-MM-YYYY";

if (
  !countDate ||
  !countDate.includes("-") ||
  countDate.length !== 16
) {
  console.log(
    colors.red(
      "Введите дату в формате mm-HH-DD-MM-YYYY для запуска обратного отсчета."
    )
  );
} else {
  const getDateFromDateString = (datestring) => {
    const [minut, hour, day, month, year] = datestring.split("-");
    return new Date(Date.UTC(year, month - 1, day, hour - 3, minut));
  };

  const dateInFuture = getDateFromDateString(countDate);

  const showRemainingTime = (dateInFuture) => {
    const dateNow = new Date();

    if (dateNow >= dateInFuture) {
      emmiter.emit("timerEnd");
    } else {
      const currentDateFormatted = moment(dateNow, format);
      const futureDateFormatted = moment(dateInFuture, format);
      const diff = moment.preciseDiff(
        currentDateFormatted,
        futureDateFormatted,
        true
      );
      console.clear();
      console.log(colors.green(diff));
    }
  };

  const timerId = setInterval(() => {
    emmiter.emit("timerTick", dateInFuture);
  }, 1000);

  const showTimerDone = (timerId) => {
    clearInterval(timerId);
    console.log(colors.yellow("Отсчет закончен."));
  };

  emmiter.on("timerTick", showRemainingTime);
  emmiter.on("timerEnd", () => {
    showTimerDone(timerId);
  });
}
