export default function isValidTimeZone(timeZone) {
  return ['string', 'number'].includes(typeof timeZone) && timeZone !== '';
}