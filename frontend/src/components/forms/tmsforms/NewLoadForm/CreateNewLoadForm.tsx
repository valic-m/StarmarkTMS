import React, { useState } from 'react';
import LoadInformation from './LoadInformation';
import TrailerSpecifications from './TrailerSpecifications';
import ShipmentDetails from './ShipmentDetails';
import PickupDropoffDetails from './PickupDropoffDetails';
import AdditionalInformation from './AdditionalInformation';
import { useWizardFormContext } from 'providers/WizardFormProvider';
import Button from 'components/base/Button';
import { LoadFormData } from 'types/LoadFormData';
import pdfParse from 'pdf-parse';

const CreateNewLoadForm: React.FC = () => {
  const { formData, setFormData, validation } = useWizardFormContext<LoadFormData>();
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfData = await pdfParse(Buffer.from(arrayBuffer));

      const parsedData = extractLoadData(pdfData.text);
      if (parsedData) {
        setFormData((prev) => ({ ...prev, ...parsedData }));
      }
    } catch (error) {
      setPdfError('Error reading PDF file.');
      console.error('PDF Parsing Error:', error);
    }
  };

  const extractLoadData = (textContent: string): Partial<LoadFormData> => {
    const customerMatch = textContent.match(/Customer:\s*(.+)/);
    const rateMatch = textContent.match(/Rate:\s*\$([\d,.]+)/);
    const referenceNumberMatch = textContent.match(/Reference Number:\s*(\S+)/);

    return {
      customer: customerMatch?.[1] || '',
      rate: rateMatch ? parseFloat(rateMatch[1].replace(/,/g, '')) : undefined,
      referenceNumber: referenceNumberMatch?.[1] || '',
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h5>Upload Rate Confirmation PDF</h5>
      <input type="file" accept=".pdf" onChange={handlePdfUpload} />
      {pdfError && <p style={{ color: 'red' }}>{pdfError}</p>}

      <LoadInformation formData={formData} onChange={handleInputChange} validation={validation || false} />
      <TrailerSpecifications formData={formData} onChange={handleInputChange} validation={validation || false} />
      <ShipmentDetails formData={formData} onChange={handleInputChange} validation={validation || false} />
      <PickupDropoffDetails formData={formData} onChange={handleInputChange} validation={validation || false} />
      <AdditionalInformation formData={formData} onChange={handleInputChange} validation={validation || false} />

      <Button variant="primary" type="submit">Create Load</Button>
    </div>
  );
};

export default CreateNewLoadForm;
