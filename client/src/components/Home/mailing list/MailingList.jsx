import React, { reactDOM, useContext, useState, useEffect} from 'react';
import {Router, Route, Link, RouteHandler} from 'react-router';
import { Redirect } from 'react-router';
import MailchimpSubscribe from 'react-mailchimp-subscribe';




const MailingList = () => {

  

  return (
    <div className="mc__form-container">
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status} 
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default MailingList;