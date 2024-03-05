
export const daysLeft = (deadline) => {
  const millisecondsPerDay = 1000 * 3600 * 24;
  const remainingDays = deadline / millisecondsPerDay;
  console.log(remainingDays.toFixed(0)); 
  

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
