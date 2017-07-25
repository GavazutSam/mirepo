callWeather("Miami","US");

function callWeather(ciudad,pais) {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://api.openweathermap.org/data/2.5/weather?q="+ciudad+","+pais+"&appid=cef0900e241864e29a8e5f67d79507bf";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        getApps(myArr);
     }
   };

   callCountry(pais);

   xmlhttp.open("GET", url, true);
   xmlhttp.send();
}

function callCountry(pais){
  var xmlhttp = new XMLHttpRequest();
  var url = "https://maps.googleapis.com/maps/api/geocode/json?components=country:"+pais+"&key=AIzaSyBKE19KNavpvmHTuicMludbhl_MWwVzaNU";


  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var c = JSON.parse(this.responseText);
        getCountry(c);

      }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}


function getCountry(arr){
  var country = "";
  for (var i = 0;i<arr["results"].length;i++){
    //  console.log(arr["results"]);
      for (var j=0;j<arr["results"][i]["address_components"].length;j++){
          //console.log(arr["results"][i]["address_components"]);
          country = arr["results"][i]["address_components"][j]["long_name"];
          //console.log(country);
      }
  }
  document.getElementById("pais").innerHTML = country;
}


function callAllCountry() {
   var xmlhttp = new XMLHttpRequest();
   var url = "https://restcountries.eu/rest/v1/all";
   xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         var country = JSON.parse(this.responseText);
         getAllCountry(country);
       }
   };

   xmlhttp.open("GET", url, true);
   xmlhttp.send();

}

function getAllCountry(arr) {
  var select;
  select = '<select size="1" name="region"><option selected>Seleccione Pais</option>';
  for( var i = 0; i < arr.length; i++) {
    select += '<option value='+arr[i]["alpha2Code"]+'>'+arr[i]["name"]+'</option>'
  }
  document.getElementById("selectCountry").innerHTML = select;
}


 function getApps(arr) {
    var out = "";
    var i;
    var img;
    var description;
    var main;
    var city = arr["name"];
    var country = arr["sys"]["country"];
    var humedad = arr["main"]["humidity"];
    var presion = arr["main"]["pressure"];

    var cons = 273.15;

    var temperatura = arr["main"]["temp"]-cons;
    var temMaxima = arr["main"]["temp_max"]-cons;
    var temMinima = arr["main"]["temp_min"]-cons;

    var sunrise_dt = new Date(arr["sys"]["sunrise"]*1000);
    var sunrise_hr = sunrise_dt.getHours();
    var sunrise_min = "0" + sunrise_dt.getMinutes();
    var sunrise = sunrise_hr + ':' + sunrise_min.substr(-2);

    var sunset_dt = new Date(arr["sys"]["sunset"]*1000);
    var sunset_hr = sunset_dt.getHours();
    var sunset_min = "0" + sunset_dt.getMinutes();
    var sunset = sunset_hr + ':' + sunset_min.substr(-2);


    for(i = 0; i < arr["weather"].length; i++) {


      img         = arr["weather"][i]["icon"]+'.png';
      description = arr["weather"][i]["description"];
      main        = arr["weather"][i]["main"];

      out += '<div><table class="table table-bordered">'+
              '<tr>'+
                '<th colspan="2"><img src="http://openweathermap.org/img/w/'+img+'" alt="Weather '+city+' , '+country+'" width="100px" height="100px"></th>'+
              '</tr>'+
              '<tr>'+
                '<th colspan="2">'+main+'</th>'+
              '</tr>'+
              '<tr>'+
                '<th colspan="2">'+description+'</th>'+
              '</tr>'+
              '<tr>'+
                '<td>'+city+'</td>'+
                '<td>'+country+'</td>'+
              '</tr>'+
              '<tr>'+
                '<td>Amanecer</td>'+
                '<td>'+sunrise+' AM</td>'+
              '</tr>'+
              '<tr>'+
                '<td>Puesta de Sol</td>'+
                '<td>'+sunset+' PM</td>'+
              '</tr>'+
              '<tr>'+
                '<td>Humedad</td>'+
                '<td>'+humedad+'%</td>'+
              '</tr>'+
              '<tr>'+
                '<td>Presion</td>'+
                '<td>'+presion+' hpa</td>'+
              '</tr>'+
              '<tr>'+
                '<td>Temperatura</td>'+
                '<td>'+temperatura.toString().split(".")[0]+' Cº</td>'+
              '</tr>'+
              '<tr>'+
                '<td>Temperatura Maxima</td>'+
                '<td>'+temMaxima.toString().split(".")[0]+' Cº</td>'+
              '</tr>'+
              '<tr>'+
                '<td>Temperatura Minima</td>'+
                '<td>'+temMinima.toString().split(".")[0]+' Cº</td>'+
              '</tr>'
            '</table></div>';

    }
    var tmp = temperatura.toString().split(".")[0]
//
    document.getElementById("ciudad").innerHTML = tmp+" Cº "+city+", ";
    document.getElementById("clima").innerHTML = out;

    var lat = arr["coord"]["lat"];
    var lng = arr["coord"]["lon"];

    initMap(lat, lng);
}

  function initMap(latitud,longitud) {
    var uluru = {lat: latitud, lng: longitud};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
