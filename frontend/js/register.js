/**
 * JOB NEPAL — Registration Component Module
 * Extends & delegates multi-step form handling for Job Seekers and Companies
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if register module is loaded on registration views
  if (typeof initRegistrationModule === 'function') {
    initRegistrationModule();
  }
});
