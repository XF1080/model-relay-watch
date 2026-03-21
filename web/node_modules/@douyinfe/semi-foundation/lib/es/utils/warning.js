export default function warning(flag, info) {
  if (flag) {
    console.warn(`Warning: ${info}`);
  }
}