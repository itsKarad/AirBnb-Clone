import React from 'react';
import Card from '../../UI/Card';
import PlaceList from '../components/Placelist';
import './UserPlaces.css';

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Matheran",
        description: "Matheran is a hill station, near Mumbai, in the west Indian state of Maharashtra. It’s known for its mild climate and well-preserved colonial architecture. Motor vehicles are banned and many visitors arrive by narrow-gauge railway on the 1907 Neral–Matheran Toy Train. The Panorama Point lookout offers views across the mountains of the Western Ghats. Louisa Point has views of waterfalls and the ancient Prabal Fort. ",
        image: "https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/cover-image-of-Places-to-visit-in-Matheran-in-May_27th-jan.jpg",
        address: "Kasturba road, Matheran, Maharashtra, 410102",
        location: {
            lat: 18.993933092358084,
            long: 73.27187537836642,
        }
    },
    {
        id: "p2",
        title: "Matheran",
        description: "Matheran is a hill station, near Mumbai, in the west Indian state of Maharashtra. It’s known for its mild climate and well-preserved colonial architecture. Motor vehicles are banned and many visitors arrive by narrow-gauge railway on the 1907 Neral–Matheran Toy Train. The Panorama Point lookout offers views across the mountains of the Western Ghats. Louisa Point has views of waterfalls and the ancient Prabal Fort. ",
        image: "https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/cover-image-of-Places-to-visit-in-Matheran-in-May_27th-jan.jpg",
        address: "Kasturba road, Matheran, Maharashtra, 410102",
        location: {
            lat: 18.993933092358084,
            long: 73.27187537836642,
        }
    },
    {
        id: "p3",
        title: "Matheran",
        description: "Matheran is a hill station, near Mumbai, in the west Indian state of Maharashtra. It’s known for its mild climate and well-preserved colonial architecture. Motor vehicles are banned and many visitors arrive by narrow-gauge railway on the 1907 Neral–Matheran Toy Train. The Panorama Point lookout offers views across the mountains of the Western Ghats. Louisa Point has views of waterfalls and the ancient Prabal Fort. ",
        image: "https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/cover-image-of-Places-to-visit-in-Matheran-in-May_27th-jan.jpg",
        address: "Kasturba road, Matheran, Maharashtra, 410102",
        location: {
            lat: 18.993933092358084,
            long: 73.27187537836642,
        }
    },
];
const UserPlaces = (props) => {
    return (
        <div className = "user-places-container">
            <div className = "places-header">
                Your places
            </div>
            <Card>
                <PlaceList places = {DUMMY_PLACES}></PlaceList>
            </Card>
        </div>
        
        
    );

};

export default UserPlaces;