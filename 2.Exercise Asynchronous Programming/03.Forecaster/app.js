async function attachEvents() {
    let input = document.getElementById("location");
    let submitButton = document.getElementById("submit");
    let forestcastDiv = document.getElementById("forecast");
    let currentDiv = document.getElementById("current");
    let upcomingDiv = document.getElementById("upcoming");
    let sunny = "&#x2600";
    let partlySunny = "&#x26C5";
    let overcast = "&#x2601";
    let rain = "&#x2614";
    let degrees = "&#176";
    let code = "";
    let divElementCurrent = document.createElement("div");
    let divElementUpcoming = document.createElement("div");
  
    submitButton.addEventListener("click", getInfo);
  
    async function getInfo() {
      divElementCurrent.innerHTML = "";
      divElementUpcoming.innerHTML = "";
      forestcastDiv.style.display = "inline";
      try {
        const response = await fetch(
          `http://localhost:3030/jsonstore/forecaster/locations`
        );
        if (response.ok == false) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        let city = data.find((c) => c.name == input.value);
        code = city.code;
  
        const todayResponse = await fetch(
          `http://localhost:3030/jsonstore/forecaster/today/${code}`
        );
        if (todayResponse.ok == false) {
          throw new Error(`${todayResponse.status} ${todayResponse.statusText}`);
        }
        const todayData = await todayResponse.json();
  
        divElementCurrent.setAttribute("class", "forecasts");
        let symbolSpan = document.createElement("span");
        symbolSpan.setAttribute("class", "condition symbol");
        let condition = todayData.forecast.condition;
        if (condition == "Sunny") {
          symbolSpan.innerHTML = sunny;
        } else if (condition == "Partly Sunny") {
          symbolSpan.innerHTML = partlySunny;
        } else if (condition == "Overcast") {
          symbolSpan.innerHTML = overcast;
        } else if (condition == "Rain") {
          symbolSpan.innerHTML = rain;
        }
  
        let groupSpan = document.createElement("span");
        groupSpan.setAttribute("class", "condition");
  
        let locationSpan = document.createElement("span");
        locationSpan.setAttribute("class", "forecast-data");
        locationSpan.textContent = todayData.name;
  
        let temperatureSpan = document.createElement("span");
        temperatureSpan.setAttribute("class", "forecast-data");
        temperatureSpan.innerHTML = `${todayData.forecast.low}${degrees}/${todayData.forecast.high}${degrees}`;
  
        let conditionSpan = document.createElement("span");
        conditionSpan.setAttribute("class", "forecast-data");
        conditionSpan.textContent = todayData.forecast.condition;
  
        groupSpan.appendChild(locationSpan);
        groupSpan.appendChild(temperatureSpan);
        groupSpan.appendChild(conditionSpan);
        divElementCurrent.appendChild(symbolSpan);
        divElementCurrent.appendChild(groupSpan);
        currentDiv.appendChild(divElementCurrent);
  
        const threeDayResponse = await fetch(
          `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
        );
        if (threeDayResponse.ok == false) {
          throw new Error(
            `${threeDayResponse.status} ${threeDayResponse.statusText}`
          );
        }
        const threeDayData = await threeDayResponse.json();
  
        let nextDays = threeDayData.forecast;
        nextDays.forEach((x) => {
          divElementUpcoming.setAttribute("class", "forecast-info");
          let upcomingGroupSpan = document.createElement("span");
          upcomingGroupSpan.setAttribute("class", "upcoming");
  
          let upcomingSymbolSpan = document.createElement("span");
          upcomingSymbolSpan.setAttribute("class", "symbol");
          if (x.condition == "Sunny") {
            upcomingSymbolSpan.innerHTML = sunny;
          } else if (x.condition == "Partly sunny") {
            upcomingSymbolSpan.innerHTML = partlySunny;
          } else if (x.condition == "Overcast") {
            upcomingSymbolSpan.innerHTML = overcast;
          } else if (x.condition == "Rain") {
            upcomingSymbolSpan.innerHTML = rain;
          }
  
          let upcomingTempSpan = document.createElement("span");
          upcomingTempSpan.setAttribute("class", "forecast-data");
          upcomingTempSpan.innerHTML = `${x.low}${degrees}/${x.high}${degrees}`;
  
          let upcomingConditionSpan = document.createElement("span");
          upcomingConditionSpan.setAttribute("class", "forecast-data");
          upcomingConditionSpan.textContent = x.condition;
  
          upcomingGroupSpan.appendChild(upcomingSymbolSpan);
          upcomingGroupSpan.appendChild(upcomingTempSpan);
          upcomingGroupSpan.appendChild(upcomingConditionSpan);
          divElementUpcoming.appendChild(upcomingGroupSpan);
          upcomingDiv.appendChild(divElementUpcoming);
        });
      } catch (err) {
        forestcastDiv.textContent = console.log(err);
      }
    }
  }
  attachEvents();