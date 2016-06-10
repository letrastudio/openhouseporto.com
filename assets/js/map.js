var url;

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function initialize(markers) {

 var latlng = new google.maps.LatLng('41.17023', '-8.636337');

 var mapOptions = {
   zoom: 12,
   center: latlng,
   mapTypeId: google.maps.MapTypeId.ROADMAP,
   styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#00808b"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#00808b"},{"weight":0.3}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#00808b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#00808b"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"color":"#00808b"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#00808b"}]},{"featureType":"administrative","elementType":"labels.icon","stylers":[{"color":"#00808b"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#00808b"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#fcfdf8"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#fcfdf8"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#fcfdf8"}]}]

 };

 var map = new google.maps.Map(document.getElementById('map'),
   mapOptions);

 var infowindowlayout = new google.maps.InfoWindow({
  content: ''
});

 $.each(markers, function(key, value) {
   var placelatlng = new google.maps.LatLng(value['lat'], value['lng']);


   var marker = new RichMarker({
     position: placelatlng,
     map: map,
     draggable: false,
     flat: true,
     content: '<div style="margin-top:25px; display:block;"><span class="place-number">'+value['number']+'</span></div>'
   });

   var infoWindowContent = '<div class="custom-info-window"><span class="place-number">'+value['number']+'</span><a class="info-window-url" href="'+value['url']+'"><h3 class="info-window-title">'+value['title']+'</h3></a></div>';
   

   google.maps.event.addListener(marker, 'click', function() {
    infowindowlayout.setContent(infoWindowContent);
    infowindowlayout.open(map, this);
  });

   if (value['number'] == getUrlParameter('q')) {
      infowindowlayout.setContent(infoWindowContent);
      infowindowlayout.open(map, marker);
      map.setZoom(15);
      map.setCenter(marker.position);
   };

 });

}
