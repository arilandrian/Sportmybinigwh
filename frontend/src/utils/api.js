const API_BASE = '/api';

export async function fetchVenues(type = '') {
  const query = type ? `?type=${type}` : '';
  const res = await fetch(`${API_BASE}/venues${query}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function fetchVenueById(id) {
  const res = await fetch(`${API_BASE}/venues/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function fetchVenueSlots(id, date) {
  const res = await fetch(`${API_BASE}/venues/${id}/slots?date=${date}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function createBooking(bookingData) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to create booking');
  return data.data;
}

export async function fetchBookingStatus(bookingId) {
  const res = await fetch(`${API_BASE}/bookings/${bookingId}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
