// Enhanced content saving utility for Decap CMS
window.cmsData = {}; // Store form data globally

window.addEventListener('load', () => {
  if (window.location.pathname.includes('/admin')) {
    console.log('Decap CMS Save Helper loaded');
    
    // Wait for CMS to fully load
    setTimeout(() => {
      addSaveButton();
      interceptCMSForms();
    }, 4000);
  }
});

function addSaveButton() {
  // Create container for buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    gap: 10px;
    flex-direction: column;
  `;
  
  // Save button
  const saveButton = document.createElement('button');
  saveButton.innerHTML = '💾 Save to Website';
  saveButton.id = 'cms-save-button';
  saveButton.style.cssText = `
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.2s;
    margin: 0;
  `;
  
  // Rollback button
  const rollbackButton = document.createElement('button');
  rollbackButton.innerHTML = '↶ Rollback Changes';
  rollbackButton.id = 'cms-rollback-button';
  rollbackButton.style.cssText = `
    background: #dc2626;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.2s;
    margin: 0;
  `;
  
  // Manual capture button for debugging
  const captureButton = document.createElement('button');
  captureButton.innerHTML = '🔍 Capture Data';
  captureButton.id = 'cms-capture-button';
  captureButton.style.cssText = `
    background: #7c3aed;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.2s;
    margin: 0;
  `;
  
  // Event listeners
  saveButton.addEventListener('click', saveCurrentContent);
  rollbackButton.addEventListener('click', rollbackChanges);
  captureButton.addEventListener('click', () => {
    captureFormData();
    alert('Data capture attempted - check console for details');
  });
  
  // Add hover effects
  [saveButton, rollbackButton, captureButton].forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
  });
  
  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(captureButton);
  buttonContainer.appendChild(rollbackButton);
  document.body.appendChild(buttonContainer);
}

function interceptCMSForms() {
  // Monitor for form changes in the CMS
  const observer = new MutationObserver(() => {
    captureFormData();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
  });
  
  // Also capture on input events
  document.addEventListener('input', captureFormData);
  document.addEventListener('change', captureFormData);
}

function captureFormData() {
  try {
    // Look for CMS-specific input patterns
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="url"], input[type="number"], textarea, select');
    const formData = {};
    let currentPage = 'landing'; // Default to landing
    
    // Better page detection from CMS breadcrumbs or URL
    const breadcrumbs = document.querySelector('[class*="breadcrumb"], [class*="nav"]');
    if (breadcrumbs && breadcrumbs.textContent.includes('Landing')) {
      currentPage = 'landing';
    } else if (breadcrumbs && breadcrumbs.textContent.includes('Coming Soon')) {
      currentPage = 'coming_soon';
    } else if (breadcrumbs && breadcrumbs.textContent.includes('Vessel')) {
      currentPage = 'vessel_teaser';
    }
    
    // Also check URL hash for page info
    if (window.location.hash.includes('landing')) currentPage = 'landing';
    if (window.location.hash.includes('coming_soon')) currentPage = 'coming_soon';
    if (window.location.hash.includes('vessel_teaser')) currentPage = 'vessel_teaser';
    
    inputs.forEach(input => {
      // Skip empty inputs and CMS system fields
      if (!input.value || input.value.trim() === '') return;
      if (input.type === 'hidden') return;
      
      // Try to get field name from various CMS patterns
      let fieldName = input.name || input.id || input.getAttribute('data-field-name');
      
      // Look for CMS field labels to map to field names
      const label = input.closest('[class*="field"]')?.querySelector('label');
      if (label && !fieldName) {
        // Convert label text to field name format
        fieldName = label.textContent
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '_');
      }
      
      if (fieldName && input.value) {
        formData[fieldName] = input.value;
      }
    });
    
    console.log('Detected page:', currentPage);
    console.log('Found inputs:', inputs.length);
    console.log('Captured fields:', Object.keys(formData));
    
    // Store the data globally
    if (Object.keys(formData).length > 0) {
      window.cmsData = {
        page: currentPage,
        data: formData,
        timestamp: new Date().toISOString()
      };
      
      // Update button to show data is ready
      const button = document.getElementById('cms-save-button');
      if (button) {
        button.innerHTML = '💾 Save to Website (' + Object.keys(formData).length + ' fields)';
        button.style.background = '#059669'; // Green when ready
      }
    }
  } catch (error) {
    console.log('Form capture error:', error);
  }
}

async function saveCurrentContent() {
  try {
    const button = document.getElementById('cms-save-button');
    button.innerHTML = '⏳ Saving...';
    button.style.background = '#f59e0b'; // Orange while saving
    
    if (!window.cmsData || !window.cmsData.data || Object.keys(window.cmsData.data).length === 0) {
      alert('No form data found. Please:\n1. Edit some fields in the CMS\n2. The button should turn green showing field count\n3. Then click Save to Website');
      button.innerHTML = '💾 Save to Website';
      button.style.background = '#2563eb';
      return;
    }
    
    console.log('Saving data:', window.cmsData);
    
    const response = await fetch('/api/cms/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(window.cmsData)
    });
    
    if (response.ok) {
      const result = await response.json();
      button.innerHTML = '✅ Saved!';
      button.style.background = '#16a34a'; // Bright green
      
      // Show success message
      alert('✅ Content saved successfully! Changes are now live on your website.');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        button.innerHTML = '💾 Save to Website';
        button.style.background = '#2563eb';
      }, 3000);
      
    } else {
      throw new Error('Failed to save content');
    }
  } catch (error) {
    console.error('Save error:', error);
    const button = document.getElementById('cms-save-button');
    button.innerHTML = '❌ Error';
    button.style.background = '#dc2626'; // Red
    
    alert('Failed to save content. Please check the console for details and try again.');
    
    setTimeout(() => {
      button.innerHTML = '💾 Save to Website';
      button.style.background = '#2563eb';
    }, 3000);
  }
}

async function rollbackChanges() {
  try {
    const button = document.getElementById('cms-rollback-button');
    button.innerHTML = '⏳ Rolling back...';
    button.style.background = '#f59e0b';
    
    const confirmed = confirm('Are you sure you want to rollback the last changes? This will restore the previous version of the content.');
    if (!confirmed) {
      button.innerHTML = '↶ Rollback Changes';
      button.style.background = '#dc2626';
      return;
    }
    
    const response = await fetch('/api/cms/rollback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page: window.cmsData?.page || 'landing' })
    });
    
    if (response.ok) {
      const result = await response.json();
      button.innerHTML = '✅ Rolled back!';
      button.style.background = '#16a34a';
      
      alert('✅ Changes rolled back successfully! The previous version has been restored.');
      
      // Reload the CMS to show reverted content
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } else {
      throw new Error('Failed to rollback changes');
    }
  } catch (error) {
    console.error('Rollback error:', error);
    const button = document.getElementById('cms-rollback-button');
    button.innerHTML = '❌ Error';
    button.style.background = '#dc2626';
    
    alert('Failed to rollback changes. Please try again.');
    
    setTimeout(() => {
      button.innerHTML = '↶ Rollback Changes';
      button.style.background = '#dc2626';
    }, 3000);
  }
}