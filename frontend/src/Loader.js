import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <DotLottieReact
        src="https://lottie.host/5c2ea211-e4e6-4628-a1f6-157b89fa5abf/1phmPKOAue.lottie"
        loop
        autoplay
        style={{ width: "250px" }}
      />
    </div>
  );
}

export default Loader;