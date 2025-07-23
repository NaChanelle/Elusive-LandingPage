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
  const saveButton = document.createElement('button');
  saveButton.innerHTML = '💾 Save to Website';
  saveButton.id = 'cms-save-button';
  saveButton.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
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
  `;
  
  saveButton.addEventListener('click', saveCurrentContent);
  saveButton.addEventListener('mouseenter', () => {
    saveButton.style.background = '#1d4ed8';
  });
  saveButton.addEventListener('mouseleave', () => {
    saveButton.style.background = '#2563eb';
  });
  
  document.body.appendChild(saveButton);
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
    // Find all form inputs in the CMS
    const inputs = document.querySelectorAll('input, textarea, select');
    const formData = {};
    let currentPage = 'unknown';
    
    // Try to determine current page from URL or breadcrumbs
    const pathMatch = window.location.hash.match(/\/([^\/]+)$/);
    if (pathMatch) {
      currentPage = pathMatch[1];
    }
    
    inputs.forEach(input => {
      if (input.name && input.value) {
        formData[input.name] = input.value;
      }
    });
    
    // Store the data globally
    if (Object.keys(formData).length > 0) {
      window.cmsData = {
        page: currentPage,
        data: formData,
        timestamp: new Date().toISOString()
      };
      
      console.log('Captured form data:', window.cmsData);
      
      // Update button to show data is ready
      const button = document.getElementById('cms-save-button');
      if (button && Object.keys(formData).length > 0) {
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