export const fetchTickets = async () => {
  console.log('fetched')
  try {
    const response = await fetch('http://127.0.0.1:8000/api/tickets/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Incident[] = await response.json();
    return data
  } catch (error) {
    console.log(error.message)
  }
};