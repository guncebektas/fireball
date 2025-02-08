export const updateManifest = () => {
  const isDarkMode = localStorage.getItem('color-theme') === 'dark' || 
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const manifest = {
    ...JSON.parse(document.getElementById('manifest-placeholder').textContent),
    theme_color: isDarkMode ? '#121212' : '#fff',
    background_color: isDarkMode ? '#121212' : '#edf2f9'
  };

  const stringManifest = JSON.stringify(manifest);
  const blob = new Blob([stringManifest], {type: 'application/json'});
  const manifestURL = URL.createObjectURL(blob);
  
  const manifestLink = document.querySelector('link[rel="manifest"]');
  if (manifestLink) {
    manifestLink.href = manifestURL;
  }
};