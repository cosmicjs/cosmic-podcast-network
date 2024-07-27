function getFormattedDate(
  date: Date,
  prefomattedDate?: "Today" | "Yesterday" | false,
  hideYear?: boolean
) {
  const date_number = date.getDate();
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const day = days[date.getDay()];
  const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  let am_pm = "am";
  if (hours > 11) {
    am_pm = "pm";
    if (hours > 12) hours = hours - 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  let minutes: number | string = date.getMinutes();
  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = "0" + minutes;
  }
  if (prefomattedDate)
    return prefomattedDate + " at " + hours + ":" + minutes + am_pm;
  if (hideYear) {
    // 10. January at 10:20
    return (
      day +
      ", " +
      month +
      " " +
      date_number +
      " at " +
      hours +
      ":" +
      minutes +
      am_pm
    );
  }
  // 10. January 2017. at 10:20
  return (
    day +
    ", " +
    month +
    " " +
    date_number +
    ", " +
    year +
    " at " +
    hours +
    ":" +
    minutes +
    am_pm
  );
}

export function timeAgo(dateParam?: number | string | Date) {
  if (!dateParam) {
    return null;
  }
  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today.getTime() - DAY_IN_MS);
  const seconds = Math.round((today.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();
  if (seconds < 5) {
    return "Just now";
  } else if (seconds < 60) {
    return seconds + " seconds ago";
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return minutes + " minutes ago";
  } else if (isToday) {
    return getFormattedDate(date, "Today"); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }
  return getFormattedDate(date); // 10. January 2017. at 10:20
}
