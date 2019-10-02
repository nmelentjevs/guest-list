import React from 'react';

const Heading = ({ size, text, fontFamily }) => (
  <h2
    className="email-heading"
    style={{ fontSize: size, fontFamily: { fontFamily } }}
  >
    {text}
  </h2>
);

export default Heading;
