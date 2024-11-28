import api from '../api'; // Import the shared API handler
import { Customer } from '../types/Customer'; // Import the shared Customer type

// Fetch all customers
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await api('/api/customers/');
    if (Array.isArray(response.results)) {
      return response.results.map(mapServiceCustomerToCustomer);
    } else if (Array.isArray(response)) {
      return response.map(mapServiceCustomerToCustomer);
    }
    throw new Error('Unexpected API response format.');
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Fetch customer details by slug
export const getCustomerDetailsBySlug = async (
  slug: string
): Promise<Customer> => {
  try {
    const response = await api(`/api/customers/${slug}/`); // Use the slug for the URL
    return mapServiceCustomerToCustomer(response);
  } catch (error) {
    console.error(`Error fetching customer details for slug ${slug}:`, error);
    throw error;
  }
};

// Map service-specific Customer to shared Customer type
const mapServiceCustomerToCustomer = (serviceCustomer: any): Customer => {
  return {
    id: serviceCustomer.id,
    name: serviceCustomer.name,
    slug: serviceCustomer.slug || '', // Ensure slug is always a string
    email: serviceCustomer.email,
    contact_name: serviceCustomer.contact_name,
    phone: serviceCustomer.phone,
    priority: ['active', 'dnu', 'factoring'].includes(serviceCustomer.priority)
      ? (serviceCustomer.priority as 'active' | 'dnu' | 'factoring')
      : null,
    orders: serviceCustomer.orders || [],
    ratings: serviceCustomer.ratings || [],
    mc_number: serviceCustomer.mc_number,
    scac: serviceCustomer.scac,
    address_street: serviceCustomer.address_street,
    address_number: serviceCustomer.address_number,
    city: serviceCustomer.city,
    state: serviceCustomer.state,
    zip_code: serviceCustomer.zip_code,
    phone_number: serviceCustomer.phone_number,
    cell_number: serviceCustomer.cell_number,
    website: serviceCustomer.website,
    credit_limit: serviceCustomer.credit_limit,
    is_active: serviceCustomer.is_active,
    factoring: serviceCustomer.factoring,
    do_not_use: serviceCustomer.do_not_use,
    notes: serviceCustomer.notes,
    accounts_payable_contact: serviceCustomer.accounts_payable_contact,
    accounts_payable_phone: serviceCustomer.accounts_payable_phone,
    accounts_payable_email: serviceCustomer.accounts_payable_email,
    accounts_payable_address: serviceCustomer.accounts_payable_address,
    accounts_payable_city: serviceCustomer.accounts_payable_city,
    accounts_payable_state: serviceCustomer.accounts_payable_state,
    accounts_payable_zip: serviceCustomer.accounts_payable_zip,
    agent_name: serviceCustomer.agent_name,
    agent_phone: serviceCustomer.agent_phone,
    agent_email: serviceCustomer.agent_email,
    tax_id: serviceCustomer.tax_id,
    term_pay: serviceCustomer.term_pay,
    created_at: serviceCustomer.created_at,
    updated_at: serviceCustomer.updated_at
  };
};
