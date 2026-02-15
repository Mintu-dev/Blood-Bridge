import React from "react";

function BloodType(){

    return(
      <div className="container">
  <div className="row justify-content-center">
    <div className="col-auto mt-5 text-center">
      <span
        className="fw-bold fs-5 rounded-pill px-4 py-2"
        style={{
          background:
            "linear-gradient(135deg, #fef2f2 0%, #fff1f2 50%, #fce7f3 100%)",
          color: "#FF5656",
        }}
      >
        Blood-Types
      </span>

      <h1 className="mt-4 fw-bold">𝑨𝒍𝒍 𝑩𝒍𝒐𝒐𝒅 𝑻𝒚𝒑𝒆𝒔 𝑾𝒆𝒍𝒄𝒐𝒎𝒆</h1>

      <p className="mt-3">
        Every blood type is valuable. Find your type and see who you can help.
      </p>
      
    </div>
  </div>
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col d-flex justify-content-center align-items-center">
      <div className="card mb-5 mt-4 text-center" style={{width: "6rem" , backgroundColor:"#DA3D20" , color:"#fff"}}>
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">A+</h5>
    <p className="card-text">35%</p>
     </div>
     </div>
     </div>

     <div className="col d-flex justify-content-center align-items-center">
      <div className="card mb-5 mt-4 text-center" style={{width: "6rem" , backgroundColor:"#DA3D20" , color:"#fff"}}>
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">A-</h5>
    <p className="card-text">6%</p>
     </div>
     </div>
     </div>
     <div className="col d-flex justify-content-center align-items-center">
      <div className="card mb-5 mt-4 text-center" style={{width: "6rem" , backgroundColor:"#DA3D20" , color:"#fff"}}>
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">B+</h5>
    <p className="card-text">8%</p>
     </div>
     </div>
     </div> <div className="col d-flex justify-content-center align-items-center">
      <div className="card mb-5 mt-4 text-center" style={{width: "6rem" , backgroundColor:"#F63049" , color:"#fff"}}>
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">B-</h5>
    <p className="card-text">2%</p>
     </div>
     </div>
     </div>  

     <div className="col d-flex justify-content-center align-items-center">
      <div className="card mb-5 mt-4 text-center" style={{width: "7rem" , backgroundColor:"#F63049" , color:"#fff"}}>
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">AB+</h5>
    <p className="card-text">3%</p>
     </div>
     </div>
     </div>

     <div className="col d-flex justify-content-center align-items-center">
      <div className="card mb-5 mt-4 text-center" style={{width: "6rem" , backgroundColor:"#F63049" , color:"#fff"}}>
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">AB-</h5>
    <p className="card-text">1%</p>
     </div>
     </div>
     </div>

      <div className="col d-flex justify-content-center align-items-center">
      <div className="card mb-5 mt-4 text-center" style={{width: "6rem" , backgroundColor:"#C40C0C" , color:"#fff"}}>
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">O+</h5>
    <p className="card-text">38%</p>
     </div>
     </div>
     </div>

     <div className="col d-flex justify-content-center align-items-center">
      <div className="card mb-5 mt-4 text-center" style={{width: "6rem" , backgroundColor:"#C40C0C" , color:"#fff"}}>
  <div className="card-body">
    <h5 className="card-title fs-2 fw-bold">O-</h5>
    <p className="card-text">7%</p>
     </div>
     </div>
     </div>

     

     
  
</div>


</div>

    )
}

export default BloodType;