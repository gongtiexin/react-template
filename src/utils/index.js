export const isProduction = () => process.env.NODE_ENV === 'production';

export const browserRedirect = () => {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.includes('ipad');
  const bIsIphoneOs = sUserAgent.includes('iphone os');
  const bIsMidp = sUserAgent.includes('midp');
  const bIsUc7 = sUserAgent.includes('rv:1.2.3.4');
  const bIsUc = sUserAgent.includes('ucweb');
  const bIsAndroid = sUserAgent.includes('android');
  const bIsCE = sUserAgent.includes('windows ce');
  const bIsWM = sUserAgent.includes('windows mobile');
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    // phone
    return 'phone';
  }
  // pc
  return 'pc';
};
