import React from 'react';
import Layout from './../components/Layout/Layout';

const Policy = () => {
  return (
    <Layout title={'Privacy Policy'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2>Privacy Policy</h2>
          <p>
            We respect your privacy. Your personal information is safe with us and will only be
            used to improve our services, process your orders, and communicate with you.
          </p>
          <p>
            We do not share or sell your data. By using our site, you agree to this policy.
            We may update it occasionally.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
