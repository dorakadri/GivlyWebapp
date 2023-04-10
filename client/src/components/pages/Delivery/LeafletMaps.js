import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
const LeafletMaps= () => {
    const map = useMap();
    let DefaultIcon = L.icon({
      iconUrl: "/marche.gif",
      iconSize: [90, 90],
    });
    useEffect(() => {
      var marker1 = L.marker([35.6760577,10.0582828], { icon: DefaultIcon }).addTo(
        map
      );
     start()
   
      function start () {
        L.marker([36.7134288,10.1744474]).addTo(map);
        L.Routing.control({
          waypoints: [
            L.latLng(35.6760577,10.0582828),
            L.latLng(36.7134288,10.1744474),
          ],
          lineOptions: {
            styles: [
              {
                color: "blue",
                weight: 4,
                opacity: 0.7,
              },
            ],
          },
          routeWhileDragging: false,
          geocoder: L.Control.Geocoder.nominatim(),
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          showAlternatives: true,
        })
          .on("routesfound", function (e) {
            e.routes[0].coordinates.forEach((c, i) => {
              setTimeout(() => {
                marker1.setLatLng([c.lat, c.lng]);
              }, 1000 * i);
            });
          })
          .addTo(map);
      };
    }, []);
    return null;
  };

export default LeafletMaps