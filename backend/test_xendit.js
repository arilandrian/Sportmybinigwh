import dotenv from 'dotenv';
dotenv.config();

const XENDIT_SECRET_KEY = process.env.XENDIT_SECRET_KEY;

const invoicePayload = {
  external_id: 'TEST-123',
  amount: 150000,
  description: `Test Booking`,
  currency: 'IDR',
  invoice_duration: 3600,
  customer: {
    given_names: 'Test',
    email: 'test@example.com'
  }
};

fetch('https://api.xendit.co/v2/invoices', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(XENDIT_SECRET_KEY + ':').toString('base64')
  },
  body: JSON.stringify(invoicePayload)
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
