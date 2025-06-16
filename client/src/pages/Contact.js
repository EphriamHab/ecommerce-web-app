import React from 'react';
import Layout from './../components/Layout/Layout';
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="Contact Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Get in Touch</h1>
          <p className="mt-3 text-justify">
            Have questions about our products or services? We're here to help. 
            Reach out to us anytime — we're available 24/7.
          </p>
          <p className="mt-3">
            <BiMailSend /> <strong>Email:</strong> ephremhabtamu2015@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> <strong>Phone:</strong> +251 977 018 301
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
