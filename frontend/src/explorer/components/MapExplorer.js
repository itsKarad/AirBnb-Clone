import React, {useRef, useEffect, useState} from 'react';
import useHttp from '../../hooks/use-http';
import './MapExplorer.css';

const MAP_STYLES = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
];

const MapExplorer = (props) => {
    const [places, setPlaces] = useState([]);
    const { isLoading, sendRequest, error } = useHttp();
    useEffect(() => {
        const fetchPlaces = async() => {
            try{
                const data = await sendRequest({
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/places`
                });
                console.log(data);
                setPlaces(data.places);
            } catch(err){
                console.log(err);
            }
        }
        fetchPlaces();
    }, [sendRequest]);

    const mapRef = useRef();
    useEffect(() => {
      if(!isLoading){
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 32.2431872, lng: 77.1891761 },
            zoom: 4,
            styles: MAP_STYLES,
        });

        // Create an info window to share between markers.
        const infoWindow = new window.google.maps.InfoWindow();

        places.map((place, index) => {
          console.log(place.title);
            const marker = new window.google.maps.Marker({
                position: place.location,
                map: map,
                label: index,
                title: place.title,
                optimised: false
            });

            marker.addListener("click", () => {
              infoWindow.close();
              infoWindow.setContent(`
              <div class = "map-label-container">
                <div class = "map-label-image-container">
                  <img class = "map-label-image" src = ${`${process.env.REACT_APP_BACKEND_URL}/`+place.image} />
                  </div>
                <div class = "map-label-info-container">
                  <h3> 
                    <a href = "/place/${place.id}">
                      <strong>${marker.getTitle()} </strong>  
                    </a>
                    by 
                    <strong> <a href = "/user/${place.creator.id}/places"> ${place.creator.name} </a></strong> 
                  </h3>
                </div>
              </div>
              `);
              infoWindow.open(marker.getMap(), marker);
            });
            
        })  
      }
        
    }, [places, isLoading]);
    
    const markerClickHandler = (place) => {
      console.log("HIT!");

    }
    return (
        <div ref = {mapRef} className = "map">

        </div>
    );
};

export default MapExplorer;