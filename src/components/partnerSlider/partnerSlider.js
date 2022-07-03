import React, { useState } from "react";
import * as Element from "./style";
import Carousel from "react-elastic-carousel";
import FetchApi from "./../API/FetchApi"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import {grey} from '@mui/material/colors';

const PartnerSlider = () => {
    const localuData = () => {
        const data = localStorage.getItem('users');
        if(data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    const [items, setItems] = useState(localuData());
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];
    return(
        <Element.Slider>
            <div className="carousel-wrapper">
                <Carousel breakPoints={breakPoints}>
                {items.map((item,index) => (
                    <Card variant="outlined" sx={{width: '100%',m: 2 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://www.freeiconspng.com/thumbs/partnership-icon/partnership-icon-10.jpg"
                            alt="green iguana"
                        />
                        <CardContent sx={{p: 1, borderTop: 1,borderColor: grey[400] }}>
                        <div key={index} class="card-wrapper">
                            <h3>{item.name}</h3>
                            <p>{item.username}</p>
                        </div>
                        </CardContent>
                    </Card>
                    // <Item key={item}>{item}</Item>
                ))}
            </Carousel>
            </div>
        </Element.Slider>
    );
}
export default PartnerSlider;

// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import Carousel from "react-elastic-carousel";
// import Item from "./Item";
// import "./styles.css";

// const breakPoints = [
//   { width: 1, itemsToShow: 1 },
//   { width: 550, itemsToShow: 2, itemsToScroll: 2 },
//   { width: 768, itemsToShow: 3 },
//   { width: 1200, itemsToShow: 4 }
// ];

// function App() {
//   const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

//   const addItem = () => {
//     const nextItem = Math.max(1, items.length + 1);
//     setItems([...items, nextItem]);
//   };

//   const removeItem = () => {
//     const endRange = Math.max(0, items.length - 1);
//     setItems(items.slice(0, endRange));
//   };

//   return (
//     <div className="App">
//       <div className="controls-wrapper">
//         <button onClick={removeItem}>Remove Item</button>
//         <button onClick={addItem}>Add Item</button>
//       </div>
//       <hr className="seperator" />
//       <div className="carousel-wrapper">
//         <Carousel breakPoints={breakPoints}>
//           {items.map((item) => (
//             <Item key={item}>{item}</Item>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
