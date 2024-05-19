export function formatTimeDifference(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} saniye önce`;
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`;
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} saat önce`;
    }
  
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} gün önce`;
    }
  
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} hafta önce`;
    }
  
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ay önce`;
    }
  
    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInYears < 1) {
      return `${diffInMonths} ay önce`;
    }
  
    // Eğer fark bir yıldan fazlaysa tarihi formatlayarak döner
    return date.toLocaleDateString();
  }
  