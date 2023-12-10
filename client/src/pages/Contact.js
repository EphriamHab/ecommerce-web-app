import React from 'react'
import Layout from './../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
        <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any question and information about prodduct feel free to call anytime we 24X7
            avialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : ephremhabtamu2015@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +251 977018301
          </p>
          {/* <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p> */}
        </div>
      </div>
    </Layout>
  )
}

export default Contact