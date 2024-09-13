
import React from 'react';
import pic from "../../src/assets/profile-photo.jpg";
import "../components/css/card.css"

const TaskCard = ({ cameraNumber, title, tag }) => {
  return (
    <div className="cardContainer flex-gap-10" style={{ gap: '5px' }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className='color-grey'>{cameraNumber}</span>
        <div className="imageContainer relative" style={{ width: "30px", height: "30px" }}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            src={pic}
            alt="UserImage"
          />
          <div className="showStatus"></div>
        </div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        <p>{title}</p>
      </div>
      <div className="cardTags">
        {tag?.map((elem, index) => (
          <div key={index} className="tags color-grey">
            <span>•</span> {elem}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskCard;






