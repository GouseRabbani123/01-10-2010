var boundary = document.createElement('div');
boundary.classList.add('container');

var row = document.createElement('div');
row.setAttribute('class', 'row')

document.body.append(boundary);
boundary.append(row);


async function getData() {
    try {
        var rest_countries = await fetch("https://restcountries.eu/rest/v2/all");
        var jsondata = await rest_countries.json();
        //    console.log(jsondata[0]);

        jsondata.forEach((element, index) => {
            var async = document.createElement('div');
            async.classList.add('async', 'col-md-4', 'col-sm-12', 'my-2');

            var header = document.createElement('h6')
            header.setAttribute('class', 'async-header text-center bg-green text-pink')
            header.innerHTML = element.name;

            var asyncbody = document.createElement('div');
            asyncbody.classList.add('asyncbody', 'async-body', 'text-center', 'bg-light');

            var img = document.createElement('img');
            img.classList.add('async-img', 'mb-2');
            img.src = element.flag;
            img.height = 150;
            img.width = 150;

            var capital = document.createElement('h6');
            capital.setAttribute('class', 'async-text text-center');
            capital.innerHTML = 'Capital : ' + element.capital;

            var region = document.createElement('h6');
            region.setAttribute('class', 'async-text text-center');
            region.innerHTML = 'Region : ' + element.region;

            var code = document.createElement('h6');
            code.setAttribute('class', 'async-text text-center');
            code.innerHTML = 'Country-code : ' + element.alpha3Code;

            var climate = document.createElement('h6');
            climate.setAttribute('class', 'async-text text-center mt-3');

            var btn = document.createElement('button');
            btn.setAttribute('class', 'btn btn-info');
            btn.innerHTML = 'Click for Weather';
            btn.id = "btn-" + index;
            btn.onclick = async function() {
                try {
                    var data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${element.latlng[0]}&lon=${element.latlng[1]}&appid=1b8219db0924bc0ab5c34aa34a8704e2`);
                    var weatherdata = await data.json();
                    // console.log(element.latlng + ' : ' + weatherdata.coord.lon, weatherdata.coord.lat)
                    climate.innerHTML = (weatherdata.main.temp - 273.15).toFixed(2) + "&#176; C , " + weatherdata['weather'][0].description
                } catch (err) {
                    console.log(err);
                }

            }

            asyncbody.append(img, capital, region, code, btn, climate)
            async.append(header, asyncbody);
            row.append(async);
        });
    } catch (err) {
        console.log(err);
    }

}

getData()