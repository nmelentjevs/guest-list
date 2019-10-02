import React from 'react';

/// Styles
import '../styles/FlexCenterStyles.scss';

const FlexCenter = ({ classNames, children }) => (
  <div className={classNames}>{children}</div>
);

export default FlexCenter;
