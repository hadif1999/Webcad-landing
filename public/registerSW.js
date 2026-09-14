// Compatibility for an already cached Dashboard shell. Only refresh an existing worker.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration('/').then((registration) => registration?.update()).catch(() => {});
}
