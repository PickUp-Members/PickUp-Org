// Currency formatter for LKR
export const formatLKR = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Time remaining for auctions
export const timeRemaining = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;
  if (diff < 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${days ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s`;
};

// Bid increment validator
export const getMinBid = (currentBid = 0, minIncrement = 1000) => currentBid + minIncrement;

// Format date
export const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-LK', { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
});

// Status badge colors
export const getStatusColor = (status) => {
  const colors = {
    ACTIVE: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    ENDED: 'bg-gray-100 text-gray-800',
    DELIVERED: 'bg-blue-100 text-blue-800',
    LOST: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};