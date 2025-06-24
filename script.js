const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".loc p");
const dateAndTimeField = document.querySelector(".loc span");
const conditionField = document.querySelector(".cond");
const searchField = document.querySelector("#location");
const form = document.querySelector("form");

form.addEventListener("submit", searchLocation);

let target = "Mumbai";

const fetchResult = async (targetlocation) => {
  let url = `http://api.weatherapi.com/v1/current.json?key=c2b0a8455b3941cfb6a105239252006&q=${targetlocation}&aqi=no`;

  const res = await fetch(url);

  const data = await res.json();

  console.log(data);

  let locationName = data.location.name;
  let time = data.location.localtime;
  let temp = data.current.temp_c;
  let condition = data.current.condition.text;
  let iconUrl = `https:${data.current.condition.icon}`;
  document.getElementById("icon").src = iconUrl;

  updateDetails(temp, locationName, time, condition);
};

function updateDetails(temp, locationName, time, condition) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];
  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.querySelector("p").innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateAndTimeField.innerText = `${splitTime} - ${currentDay} ${splitDate}`;
  conditionField.querySelector("p").innerText = condition;
}

function searchLocation(e) {
  e.preventDefault();

  target = searchField.value;

  fetchResult(target);
}

fetchResult(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
