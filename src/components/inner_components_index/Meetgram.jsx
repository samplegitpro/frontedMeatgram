import React from "react";

function Meetgram() {
  return (
    <div className="why-Meetgram-container d-flex align-items-center">
      <div className="why-Meetgram">
        <h2>
          Why <span>Meatgram?</span>
        </h2>

        <div className="container">
          <div className="circle-cards-container row">
            {/* Use col-4 class for each card on mobile */}
            <div className="col-4 col-md-2">
              <div className="circle-card">
                <img src="/assets/icon (1).png" alt="Chemical Free" />
                <p>Chemical Free</p>
              </div>
            </div>

            <div className="col-4 col-md-2">
              <div className="circle-card">
                <img src="/assets/icon (2).png" alt="Packed Hygienically" />
                <p>Packed Hygienically</p>
              </div>
            </div>

            <div className="col-4 col-md-2">
              <div className="circle-card">
                <img src="/assets/icon (3).png" alt="Quality Check" />
                <p>Quality Check</p>
              </div>
            </div>

            <div className="col-4 col-md-2">
              <div className="circle-card">
                <img src="/assets/icon (4).png" alt="100% Natural" />
                <p>100% Natural</p>
              </div>
            </div>

            <div className="col-4 col-md-2">
              <div className="circle-card">
                <img src="/assets/icon (6).png" alt="Tender Pieces" />
                <p>Tender Pieces</p>
              </div>
            </div>

            <div className="col-4 col-md-2">
              <div className="circle-card">
                <img src="/assets/icon (5).png" alt="Chilled Not Frozen" />
                <p>Chilled Not Frozen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meetgram;
