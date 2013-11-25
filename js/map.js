function initializeFooterMap() {
  var mapOptions = {
    zoom: 3,
    center: new google.maps.LatLng(45.770726, 42.396501),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    scrollwheel: false,
    panControl: true,
    zoomControl: true
  }
  
  var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
      
  var image = 'images/map-pin.png';
  
  // Координаты городов
  
  var coords_moscow = new google.maps.LatLng(55.75367, 37.619899);
  var coords_suzdal = new google.maps.LatLng(56.419876, 40.449475);
  var coords_nn = new google.maps.LatLng(56.326887, 44.005986);
  var coords_yaroslavl = new google.maps.LatLng(57.626569, 39.866922);
  var coords_valday = new google.maps.LatLng(57.980199, 33.246667);
  var coords_uglich = new google.maps.LatLng(57.526543, 38.32646);
  var coords_spb = new google.maps.LatLng(59.939095, 30.315868);
  var coords_krasnodar = new google.maps.LatLng(38.970157, 45.023877);
  var coords_tula = new google.maps.LatLng(54.193802, 37.619027);
  var coords_novosib = new google.maps.LatLng(55.030199, 82.920430);
  var coords_ekb = new google.maps.LatLng(56.838607, 60.605514);
  
  var coords_milan = new google.maps.LatLng(45.468936, 9.181025);
  var coords_prague = new google.maps.LatLng(50.079079, 14.433214);
  var coords_vienna = new google.maps.LatLng(48.202536, 16.368796);
  var coords_munich = new google.maps.LatLng(48.136406, 11.577523);
  var coords_antalya = new google.maps.LatLng(36.878937, 30.709258);
  var coords_dubrovnik = new google.maps.LatLng(18.110647, 42.642745);
  var coords_zagreb = new google.maps.LatLng(45.809888, 16.000028);
  var coords_split = new google.maps.LatLng(43.506984, 16.442089);
  var coords_lovran = new google.maps.LatLng(45.292316, 14.276494);
  var coords_sharm = new google.maps.LatLng(27.869504, 34.304181);
  
  var moscowMarker = new google.maps.Marker({
      position: coords_moscow,
      map: map,
      icon: image
  });
  
  var suzdalMarker = new google.maps.Marker({
      position: coords_suzdal,
      map: map,
      icon: image
  });
  
  var nnMarker = new google.maps.Marker({
      position: coords_nn,
      map: map,
      icon: image
  });
  
  var yaroslavlMarker = new google.maps.Marker({
      position: coords_yaroslavl,
      map: map,
      icon: image
  });
  
  var valdayMarker = new google.maps.Marker({
      position: coords_valday,
      map: map,
      icon: image
  });
  
  var uglichMarker = new google.maps.Marker({
      position: coords_uglich,
      map: map,
      icon: image
  });
  
  var spbMarker = new google.maps.Marker({
      position: coords_spb,
      map: map,
      icon: image
  });
  
  var krasnodarMarker = new google.maps.Marker({
      position: coords_krasnodar,
      map: map,
      icon: image
  });
  
  var tulaMarker = new google.maps.Marker({
      position: coords_tula,
      map: map,
      icon: image
  });
  
  var novosibMarker = new google.maps.Marker({
      position: coords_novosib,
      map: map,
      icon: image
  });
  
  var ekbMarker = new google.maps.Marker({
      position: coords_ekb,
      map: map,
      icon: image
  });
  
  var milanMarker = new google.maps.Marker({
      position: coords_milan,
      map: map,
      icon: image
  });
  
  var pragueMarker = new google.maps.Marker({
      position: coords_prague,
      map: map,
      icon: image
  });
  
  var viennaMarker = new google.maps.Marker({
      position: coords_vienna,
      map: map,
      icon: image
  });
  
  var munichMarker = new google.maps.Marker({
      position: coords_munich,
      map: map,
      icon: image
  });
  
  var antalyaMarker = new google.maps.Marker({
      position: coords_antalya,
      map: map,
      icon: image
  });
  
  var dubrovnikMarker = new google.maps.Marker({
      position: coords_dubrovnik,
      map: map,
      icon: image
  });
  
  var zagrebMarker = new google.maps.Marker({
      position: coords_zagreb,
      map: map,
      icon: image
  });
  
  var splitMarker = new google.maps.Marker({
      position: coords_split,
      map: map,
      icon: image
  });
  
  var lovranMarker = new google.maps.Marker({
      position: coords_lovran,
      map: map,
      icon: image
  });
  
  var sharmMarker = new google.maps.Marker({
      position: coords_sharm,
      map: map,
      icon: image
  });
  
  $(".map-menu span[rel='all']").click(function() {
    map.setZoom(3);
    latlng = new google.maps.LatLng(45.770726, 42.396501); 
    map.setCenter(latlng); 
  });
  
  $(".map-menu span[rel='russia']").click(function() {
    map.setZoom(5);
    latlng = new google.maps.LatLng(58, 47); 
    map.setCenter(latlng); 
  });
  
  $(".map-menu span[rel='moscow']").click(function() {
    map.setZoom(10);
    latlng = new google.maps.LatLng(55.75367, 37.619899); 
    map.setCenter(latlng); 
  });
  
  $(".map-menu span[rel='podmos']").click(function() {
    map.setZoom(7);
    latlng = new google.maps.LatLng(55.75367, 37.619899); 
    map.setCenter(latlng); 
  });
  
  $(".map-menu span[rel='turkey']").click(function() {
    map.setZoom(6);
    latlng = new google.maps.LatLng(39.060864, 38.177757); 
    map.setCenter(latlng); 
  });
  
  $(".map-menu span[rel='croatia']").click(function() {
    map.setZoom(7);
    latlng = new google.maps.LatLng(44.9, 16.427977); 
    map.setCenter(latlng); 
  });
  
  $(".map-menu span[rel='italy']").click(function() {
    map.setZoom(6);
    latlng = new google.maps.LatLng(43.529151, 12.16203); 
    map.setCenter(latlng); 
  });
  
  $(".map-menu li").click(function() {
    $(".map-menu li").removeClass("act");
    $(this).addClass("act");
  });
  
}
google.maps.event.addDomListener(window, 'load', initializeFooterMap);