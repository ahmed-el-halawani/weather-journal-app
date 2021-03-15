/* Global Variables */
const apiKey = "cd376bbf80e09726e4d57a05d87876c0";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&`;
const testZip = "94040";
/**
 * @typedef {object} a
 * @property {string} temperature
 * @property {string} date
 * @property {string} user_response
 */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const createUrl = (zip) => {
  return baseUrl + `zip=${zip},us`;
};

//ui Functions
/**
 * @param {a} data
 */
const updateUi = (data) => {
  document.getElementById("date").innerHTML = data.date;
  document.getElementById("temp").innerHTML = data.temperature;
  document.getElementById("content").innerHTML = data.user_response;
};

//ajex calls
const getWetherData = async (url) => {
  const res = await fetch(url);
  try {
    return await res.json();
  } catch (error) {
    return error;
  }
};

/**
 * @param {string} url
 * @param {a} data
 */
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const getData = async () => {
  const res = await fetch("/all");
  try {
    return await res.json();
  } catch (error) {
    return error;
  }
};

const updateData = (zip, user_response) => {
  getWetherData(createUrl(zip))
    .then((i) => {
      if (i.cod == 200)
        return postData("/setData", {
          date: newDate,
          temperature: i.main.temp + "°C",
          user_response: user_response,
        }).then((j) => {
          getData().then((i) => {
            updateUi(i);
          });
        });
      if (i.cod == 404) return alert(i.message);
    })
    .catch((i) => {
      alert(i.message);
    });
};
//dd

// actions
document.getElementById("generate").addEventListener("click", (ev) => {
  const zip = document.getElementById("zip").value;
  console.log(zip);
  if (zip === "") return alert("zipcode must not be empty.");

  const feelings = document.getElementById("feelings").value;

  updateData(zip, feelings);
});
