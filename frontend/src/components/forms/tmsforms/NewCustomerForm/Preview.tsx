import React from 'react';

interface ReviewFormProps {
  formData: any;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData }) => (
  <div>
    <h4>Review and Submit</h4>
    <pre>{JSON.stringify(formData, null, 2)}</pre>
  </div>
);

export default ReviewForm;
