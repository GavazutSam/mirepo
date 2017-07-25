<!DOCTYPE html>
<html>
<body>

<h1>My First Google Map</h1>

<div id="googleMap" style="width:100%;height:400px;"></div>

<script>
function myMap() {
var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
</script>

<script src="http://api.openweathermap.org/data/2.5/weather?q=Santiago,CL&appid=f5b138de0c78ea1bc3931b4799e54ee3"></script>

</body>
</html>