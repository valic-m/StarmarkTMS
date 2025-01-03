// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\pages\fleet\AddTruck\components\VinDecodeResults.tsx

import React from 'react';

interface Props {
  decodeResult: any; // you can type more strictly if you have an interface
}

/**
 * A small component that displays the raw decode results (item.Variable + item.Value).
 * This is purely optional; you could place it anywhere or skip it entirely.
 */
const VinDecodeResults: React.FC<Props> = ({ decodeResult }) => {
  if (!decodeResult) return null;

  return (
    <div style={{ margin: '1em 0' }}>
      <h5>VIN Decode Results</h5>
      <ul>
        {decodeResult.map((item: any, idx: number) => (
          <li key={idx}>
            <strong>{item.Variable}</strong>: {item.Value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VinDecodeResults;
