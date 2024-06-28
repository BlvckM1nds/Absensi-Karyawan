export const formatDate = datetime => {
  const givenDate = new Date(datetime);

  const year = givenDate.getFullYear();
  const month = String(givenDate.getMonth() + 1).padStart(2, '0');
  const day = String(givenDate.getDate()).padStart(2, '0');

  return `${day}/${month}/${year}`;
};

export const formatTime = datetime => {
  const date = new Date(datetime);

  let hours = ((date.getUTCHours() + 7) % 24);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedHours = hours.toString().padStart(2, '0');

  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

export const calculateTimeDifference = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  let differenceInMilliseconds = endDate - startDate;

  if (differenceInMilliseconds < 0) {
    differenceInMilliseconds = 0;
  };

  const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};