import React from "react";

function OpeningTimes() {
  return (
    <div className="container text-center mt-5 mb-4">
      <div className="d-md-flex justify-content-between align-items-center">
        <h1 className="display-4 font-weight-bold" style={{ color: "#BA0001", fontSize: "3rem", fontFamily: 'MV Boli' }}>
          Check Availability
        </h1>
        <div className="availability-details" >
          <p>
            <strong>Wednesday - Monday:</strong> 9:00 AM - 8:00 PM
          </p>
          <p>
            <strong>Tuesday:</strong> Closed
          </p>
        </div>
      </div>
    </div>
  );
}

export default OpeningTimes;


// import React from "react";

// function OpeningTimes() {
//   return (
//     <div className="container text-center mt-4 about">
//     <div className="about_main">
//     <div className="about_text text-center">
//       <p style={{color:"#BA0001" , textAlign:"Center", fontSize:"2rem"}}>Opening Time</p>
//       <h1 className="display-4"><span>Check Availability</span></h1>
//       </div>
//       <div className="availability-details">
//         <p>
//           <strong>Wednesday - Monday:</strong> 9:00 AM - 8:00 PM
//         </p>
//         <hr className="bg-info" />
//         <p>

//           <strong>Tuesday:</strong> Closed
//         </p>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default OpeningTimes;
