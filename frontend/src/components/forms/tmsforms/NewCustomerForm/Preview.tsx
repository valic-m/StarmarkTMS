import React from 'react';
import { Accordion } from 'react-bootstrap';
import { PropertyDetails } from 'data/travel-agency/addProperty';
import SummaryTable from './SummaryTable';

interface PreviewProps {
  formData: Record<string, string | number | boolean | undefined>;
}

const Preview: React.FC<PreviewProps> = ({ formData }) => {
  const getValue = (key: string): string | number | boolean =>
    formData[key] ?? 'N/A';

  const generalInfo: PropertyDetails[] = [
    { property: 'Customer Name', value: getValue('name') as string | number },
    { property: 'MC Number', value: getValue('mc_number') as string | number },
    { property: 'SCAC', value: getValue('scac') as string | number },
    {
      property: 'Address Street',
      value: getValue('address_street') as string | number
    },
    { property: 'City', value: getValue('city') as string | number }
  ];

  const contactInfo: PropertyDetails[] = [
    {
      property: 'Contact Name',
      value: getValue('contact_name') as string | number
    },
    {
      property: 'Phone Number',
      value: getValue('phone_number') as string | number
    },
    { property: 'Email', value: getValue('email') as string | number }
  ];

  const creditInfo: PropertyDetails[] = [
    {
      property: 'Credit Limit',
      value: getValue('credit_limit') as string | number
    },
    { property: 'Active Status', value: getValue('is_active') ? 'Yes' : 'No' }
  ];

  const accountsPayableInfo: PropertyDetails[] = [
    {
      property: 'Accounts Payable Contact',
      value: getValue('accounts_payable_contact') as string | number
    },
    {
      property: 'Accounts Payable Phone',
      value: getValue('accounts_payable_phone') as string | number
    },
    {
      property: 'Accounts Payable Email',
      value: getValue('accounts_payable_email') as string | number
    },
    {
      property: 'Accounts Payable Address',
      value: getValue('accounts_payable_address') as string | number
    },
    {
      property: 'Accounts Payable City',
      value: getValue('accounts_payable_city') as string | number
    },
    {
      property: 'Accounts Payable State',
      value: getValue('accounts_payable_state') as string | number
    },
    {
      property: 'Accounts Payable Zip',
      value: getValue('accounts_payable_zip') as string | number
    }
  ];

  const agentInfo: PropertyDetails[] = [
    {
      property: 'Agent Name',
      value: getValue('agent_name') as string | number
    },
    {
      property: 'Agent Phone',
      value: getValue('agent_phone') as string | number
    },
    {
      property: 'Agent Email',
      value: getValue('agent_email') as string | number
    }
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
