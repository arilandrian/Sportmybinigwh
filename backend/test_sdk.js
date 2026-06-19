import { Xendit } from 'xendit-node';
import dotenv from 'dotenv';
dotenv.config();

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY });
const { Invoice } = xenditClient;

async function test() {
  try {
    const invoice = await Invoice.createInvoice({
      data: {
        externalId: 'TEST-1234',
        amount: 150000,
        description: 'Test Booking',
        customer: {
          givenNames: 'Test',
          email: 'test@example.com'
        }
      }
    });
    console.log('Success:', invoice);
  } catch (err) {
    console.error('Xendit Node SDK Error:', err);
  }
}

test();
