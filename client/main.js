import { updateManifest } from '/imports/utils/manifestManager';

Meteor.startup(() => {
  // Initial update
  updateManifest();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      updateManifest();
    });
}); 