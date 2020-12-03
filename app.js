(function () {
  // get global variables from document
  let resultDiv = document.querySelector(".results");
  let cityInput = document.getElementById("search_id")
  let btn = document.querySelector(".btn");
  console.log(cityInput)

  //resultDiv.remove();
  // fetch data from api
  btn.addEventListener("click", () => {

    event.preventDefault()


    let city = cityInput.value;

    const api = {
      key: "f93f0f6ec73b9962c8732f8123da14d5",
      base: "https://api.openweathermap.org/data/2.5/"
    }


    fetch(`${api.base}forecast?q=${city}&appid=${api.key}&units=metric`)
      .then(
        function (response) {
          //console.log(response);
          resultDiv.innerHTML = "";

          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function (data) {
            console.log(data.list);
            //console.log(data.main.temp);
            for (let i = 0; i < data.list.length; i += 8) {
              let divCard = document.createElement("div");
              divCard.classList.add("card");

              let date = document.createElement("h2");
              date.classList.add("day");

              date.innerHTML = data.list[i].dt_txt;

              let temperature = document.createElement("p");
              temperature.classList.add("day");
              temperature.innerHTML = data.list[i].main.temp

              let iconDiv = document.createElement("div");
              iconDiv.classList.add("icon");

              let icon = document.createElement("img");
              icon.classList.add("icon_img");
              icon.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";

              resultDiv.appendChild(divCard)
              divCard.append(date);
              divCard.appendChild(temperature);
              divCard.appendChild(iconDiv)
              iconDiv.appendChild(icon)


              //resultDiv.replaceChild(divCard)



              // console.log(data.list[i].dt_txt)
              //  console.log(data.list[i].main.temp)
            }

          });

        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });



  })

}());