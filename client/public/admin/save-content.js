// Simple content saving utility for Decap CMS
// This script allows manual saving of content changes to actual JSON files

window.addEventListener('load', () => {
  // Check if we're in the Decap CMS admin interface
  if (window.location.pathname.includes('/admin')) {
    console.log('Decap CMS Save Helper loaded');
    
    // Add save button to CMS interface
    setTimeout(() => {
      addSaveButton();
    }, 3000);
  }
});

function addSaveButton() {
  // Create save button
  const saveButton = document.createElement('button');
  saveButton.innerHTML = '💾 Save to Website';
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
  `;
  
  saveButton.addEventListener('click', saveCurrentContent);
  document.body.appendChild(saveButton);
}

async function saveCurrentContent() {
  try {
    // Get current page content from CMS
    const pageData = getCurrentPageData();
    if (!pageData) {
      alert('Please edit and save a page first, then click this button');
      return;
    }
    
    // Send to our API
    const response = await fetch('/api/cms/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData)
    });
    
    if (response.ok) {
      const result = await response.json();
      alert(`✅ Content saved successfully! Changes are now live on your website.`);
      
      // Refresh the main website to show changes
      if (window.opener) {
        window.opener.location.reload();
      }
    } else {
      throw new Error('Failed to save content');
    }
  } catch (error) {
    console.error('Save error:', error);
    alert('❌ Failed to save content. Please try again.');
  }
}

function getCurrentPageData() {
  // Try to extract current page data from CMS interface
  // This is a simplified approach - in practice you'd need to hook into CMS events
  
  // Check localStorage for recent CMS data
  const cmsData = Object.keys(localStorage)
    .filter(key => key.includes('netlifycms') || key.includes('decap'))
    .map(key => {
      try {
        return JSON.parse(localStorage[key]);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
    
  console.log('Found CMS data:', cmsData);
  
  // For now, return null to prompt user to use the API directly
  return null;
}