export const formatNumber = (number, decimals = 3) => {
  if (number == null) return '';
  return Number(number).toFixed(decimals);
};

export const iso3ToIso2 = {
  GER: 'DE',
  FRA: 'FR',
  USA: 'US',
  GBR: 'GB',
  ITA: 'IT',
  ESP: 'ES',
  RUS: 'RU',
  CHN: 'CN',
  JPN: 'JP',
  KOR: 'KR',
};

export const getStatusBadgeClass = (status) => {
  if (!status) return '';
  return status.toLowerCase() === 'wait' ? 'wait' : 'go';
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}; 