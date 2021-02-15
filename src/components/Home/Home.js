import React from "react";
import { Signin } from "../../components";
const Home = ({ setUser }) => {
  return (
    <>
      <div className="home-container">
        <Signin setUser={setUser} />
      </div>
    </>
  );
};

export default Home;
