import React from 'react';

interface PreviewProps {
  formData: { [key: string]: string };
}

const Preview: React.FC<PreviewProps> = ({ formData }) => {
  return (
    <div>
      <h4>Review Information</h4>
      <ul>
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Preview;
