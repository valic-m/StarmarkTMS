// File: src/components/forms/tmsforms/NewCustomerForm/Preview.tsx

import React from 'react';
import { Accordion } from 'react-bootstrap';
import SummaryTable from './SummaryTable';
import { CustomerFormData } from 'types/Customer';

interface PropertyDetails {
  property: string;
  value: string | number | boolean;
}

interface PreviewProps {
  formData: CustomerFormData;
}

const Preview: React.FC<PreviewProps> = ({ formData }) => {
  const generalInfo: PropertyDetails[] = [
    { property: 'Customer Name', value: formData.name || 'N/A' },
    { property: 'MC Number', value: formData.mc_number || 'N/A' },
    { property: 'SCAC', value: formData.scac || 'N/A' },
    { property: 'Address Street', value: formData.address_street || 'N/A' },
    { property: 'City', value: formData.city || 'N/A' }
  ];

  const contactInfo: PropertyDetails[] = [
    { property: 'Contact Name', value: formData.contact_name || 'N/A' },
    { property: 'Phone Number', value: formData.phone_number || 'N/A' },
    { property: 'Email', value: formData.email || 'N/A' }
  ];

  const creditInfo: PropertyDetails[] = [
    { property: 'Credit Limit', value: formData.credit_limit || 'N/A' },
    { property: 'Active Status', value: formData.is_active ? 'Yes' : 'No' }
  ];

  const accountsPayableInfo: PropertyDetails[] = [
    {
      property: 'Accounts Payable Contact',
      value: formData.accounts_payable_contact || 'N/A'
    },
    {
      property: 'Accounts Payable Phone',
      value: formData.accounts_payable_phone || 'N/A'
    },
    {
      property: 'Accounts Payable Email',
      value: formData.accounts_payable_email || 'N/A'
    },
    {
      property: 'Accounts Payable Address',
      value: formData.accounts_payable_address || 'N/A'
    },
    {
      property: 'Accounts Payable City',
      value: formData.accounts_payable_city || 'N/A'
    },
    {
      property: 'Accounts Payable State',
      value: formData.accounts_payable_state || 'N/A'
    },
    {
      property: 'Accounts Payable Zip',
      value: formData.accounts_payable_zip || 'N/A'
    }
  ];

  const agentInfo: PropertyDetails[] = [
    { property: 'Agent Name', value: formData.agent_name || 'N/A' },
    { property: 'Agent Phone', value: formData.agent_phone || 'N/A' },
    { property: 'Agent Email', value: formData.agent_email || 'N/A' }
  ];

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>General Information</Accordion.Header>
        <Accordion.Body>
          <SummaryTable tableData={generalInfo} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Contact Information</Accordion.Header>
        <Accordion.Body>
          <SummaryTable tableData={contactInfo} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Credit Information</Accordion.Header>
        <Accordion.Body>
          <SummaryTable tableData={creditInfo} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Accounts Payable Information</Accordion.Header>
        <Accordion.Body>
          <SummaryTable tableData={accountsPayableInfo} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Agent Information</Accordion.Header>
        <Accordion.Body>
          <SummaryTable tableData={agentInfo} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Preview;
