import React from 'react';
import Layout from './../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={"About Us - E-commerce App"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="About Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2 className="text-center mb-3">About This Project</h2>
          <p className="text-justify">
            Hello! I'm Ephrem, a passionate Software Engineering student with a focus on full-stack
            development using the MERN stack (MongoDB, Express.js, React, and Node.js).
            This e-commerce platform is part of my ALX project portfolio, built to deliver a smooth,
            responsive, and engaging online shopping experience.
          </p>
          <p className="text-justify mt-3">
            Through this project, I aim to solve real-world problems with scalable and user-friendly
            digital solutions. Thank you for visiting — let's build the future of commerce together!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
