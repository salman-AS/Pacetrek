import React from 'react';
import { BsFillPersonFill,BsFillPersonCheckFill , BsBank} from "react-icons/bs";
import { MdAssuredWorkload } from "react-icons/md";
const course=[
    {
        title:"No.of Students",
        icon:<BsFillPersonFill  />,
    },
    {
        title:"Completed Quiz",
        icon:<BsFillPersonCheckFill />,
    },
     {
        title:"Placement Events",
        icon:< BsBank />,
    },
    {
        title:"students Placed",
        icon:<MdAssuredWorkload />,
    },
   
];
const Cards = () => {
    return (
        <div className="card--container">
          {course.map((item) => (
          <div className="card">
                    <div className="card--cover">{item.icon}</div>
                    <div className="card--title">
                        <h2>{item.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Cards;