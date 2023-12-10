import React from 'react'
import Layout from './../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
            <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Greetings! I'm Ephrem, a Software Engineering student,
          specializing in MERN stack development.
          I'm dedicated to crafting innovative ecommerce applications for ALX projects.
          Join me on this exciting journey as we leverage the power of MongoDB,
          Express.js, React, and Node.js to create seamless and dynamic online experiences.
          Let's transform ideas into digital realities together!
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About