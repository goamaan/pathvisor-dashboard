import React, { useContext } from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { UserContext } from '../Providers/UserProvider';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 40vh;
  border-color: #0080ff;
`;

const Loading = () => {
  const { loading } = useContext(UserContext);

  return (
    <div
      style={{
        textAlign: 'center'
      }}
    >
      <ScaleLoader
        css={override}
        height={50}
        width={5}
        radius={10}
        margin={3}
        color={'#4682b4'}
        loading={loading}
      />
    </div>
  );
};

export default Loading;
