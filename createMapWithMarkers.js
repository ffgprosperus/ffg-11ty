var map;
var locations = [];

function createMapWithMarkers(latLong) {
      var location = {};
      //location.title = directoryCollection.businessName;
      location.latitude = latLong.latitude;
      location.longitude = latLong.longitude;
      //location.email = directoryCollection.businessEmail;
      // location.mobile = directoryCollection.businessMobile;
      // location.address = directoryCollection.businessAddress;
      locations.push(location);

    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(0, 0)
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var bounds = new google.maps.LatLngBounds();
    // Create nice, customised pop-up boxes, to appear when the marker is clicked on
    var infowindow = new google.maps.InfoWindow({
      content: "Content String"
    });
    for (var i = 0; i < locations.length; i++) {
      var new_marker = createMarker(map, locations[i], infowindow);
      bounds.extend(new_marker.position);
    }
    map.fitBounds(bounds);
}

function createMarker(map, location, infowindow) {

  var position = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude)
  };
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    // title: location.title,
  });
  // google.maps.event.addListener(marker, 'click', function() {
  //   infowindow.setContent('<div>'+
  //   '<p><strong>' + ((location.url === undefined) ? location.title : ('<a href="' + location.url +'">' + location.title + '</a>')) + '</strong></p>' +
  //   ((location.mobile === undefined) ? "" : ('<p><strong>Phone: </strong>' + location.mobile + '</p>')) +
  //   ((location.email === undefined) ? "" : ('<p><strong>Email: </strong>' + location.email + '</p>')) +
  //   ((location.address === undefined) ? "" : ('<p><strong>Address: </strong>' + location.address + '</p>')) +
  //   '</div>');
  //   infowindow.open(map, marker);
  // });
  return marker;
}
