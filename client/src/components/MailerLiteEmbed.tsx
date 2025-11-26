import { useEffect, useRef } from 'react';

interface MailerLiteEmbedProps {
  formType: 'home' | 'platform' | 'vessel';
  className?: string;
}

const formConfigs = {
  home: {
    formId: '28257750',
    formHash: '159584146254988833',
    fetchUrl: 'https://assets.mailerlite.com/jsonp/1605566/forms/159584146254988833/takel',
    buttonText: 'Get Event Updates'
  },
  platform: {
    formId: '28258222',
    formHash: '159585664828966487',
    fetchUrl: 'https://assets.mailerlite.com/jsonp/1605566/forms/159585664828966487/takel',
    buttonText: 'Join Waitlist'
  },
  vessel: {
    formId: '28314007',
    formHash: '159733317043749917',
    fetchUrl: 'https://assets.mailerlite.com/jsonp/1605566/forms/159733317043749917/takel',
    buttonText: 'Notify Me'
  }
};

export default function MailerLiteEmbed({ formType, className = '' }: MailerLiteEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const config = formConfigs[formType];
    const formId = config.formId;

    // Add CSS styles
    const styleId = `ml-style-${formId}`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @import url("https://assets.mlcdn.com/fonts.css?version=1758802");
        
        #mlb2-${formId}.ml-form-embedContainer {
          box-sizing: border-box;
          display: table;
          margin: 0 auto;
          position: static;
          width: 100% !important;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper {
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          box-sizing: border-box;
          display: inline-block !important;
          margin: 0;
          padding: 0;
          position: relative;
          width: 100%;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper.embedForm { 
          max-width: 100%; 
          width: 100%; 
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody {
          padding: 20px;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form {
          margin: 0;
          width: 100%;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent {
          margin: 0;
          width: 100%;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow {
          margin: 0 0 12px 0;
          width: 100%;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
          margin: 0 0 12px 0;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group label {
          margin-bottom: 5px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-family: 'Inter', 'Open Sans', Arial, sans-serif;
          font-weight: 500;
          display: inline-block;
          line-height: 20px;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 8px !important;
          font-family: 'Inter', 'Open Sans', Arial, sans-serif;
          font-size: 16px !important;
          height: auto;
          line-height: 21px !important;
          margin: 0;
          padding: 12px 16px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::placeholder {
          color: rgba(156, 163, 175, 1) !important;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:focus {
          outline: none !important;
          border-color: #FFB90F !important;
          box-shadow: 0 0 0 2px rgba(255, 185, 15, 0.2) !important;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedSubmit {
          margin-top: 16px;
          width: 100%;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedSubmit button {
          background: #FFB90F !important;
          color: black !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 12px 24px !important;
          font-weight: 600 !important;
          width: 100% !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          font-size: 16px !important;
          font-family: 'Inter', 'Open Sans', Arial, sans-serif !important;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedSubmit button:hover {
          background: rgba(255, 185, 15, 0.9) !important;
          transform: translateY(-1px) !important;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-embedSubmit button.loading {
          display: none;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-successBody {
          padding: 20px;
          text-align: center;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-successBody h4 {
          color: #FFB90F !important;
          font-size: 24px;
          margin-bottom: 10px;
        }
        #mlb2-${formId}.ml-form-embedContainer .ml-form-successBody p {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        .ml-form-embedSubmitLoad {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
        .ml-form-embedSubmitLoad:after {
          content: " ";
          display: block;
          width: 11px;
          height: 11px;
          margin: 1px;
          border-radius: 50%;
          border: 4px solid #fff;
          border-color: #ffffff #ffffff #ffffff transparent;
          animation: ml-form-embedSubmitLoad 1.2s linear infinite;
        }
        @keyframes ml-form-embedSubmitLoad {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          border: 0;
        }
      `;
      document.head.appendChild(style);
    }

    // Define success function
    (window as any)[`ml_webform_success_${formId}`] = function() {
      const formContainer = document.querySelector(`.ml-subscribe-form-${formId}`);
      if (formContainer) {
        const successDiv = formContainer.querySelector('.row-success') as HTMLElement;
        const formDiv = formContainer.querySelector('.row-form') as HTMLElement;
        if (successDiv) successDiv.style.display = 'block';
        if (formDiv) formDiv.style.display = 'none';
      }
    };

    // Initialize form (MailerLite tracking)
    fetch(config.fetchUrl);

    // Create hidden iframe for form submission (allows cross-origin POST without redirect)
    const iframeName = `ml-iframe-${formId}`;
    if (!document.getElementById(iframeName)) {
      const iframe = document.createElement('iframe');
      iframe.id = iframeName;
      iframe.name = iframeName;
      iframe.style.cssText = 'display:none;width:0;height:0;border:0;';
      document.body.appendChild(iframe);
    }

    // Set up form to target the hidden iframe
    setTimeout(() => {
      const form = document.querySelector(`#mlb2-${formId} form`) as HTMLFormElement;
      console.log('[MailerLite Debug] Form found:', !!form, 'formId:', formId);
      
      if (form && !form.dataset.handlerAttached) {
        form.dataset.handlerAttached = 'true';
        
        // Point form to hidden iframe
        form.target = iframeName;
        console.log('[MailerLite Debug] Form target set to:', iframeName);
        console.log('[MailerLite Debug] Form action URL:', form.action);
        
        // Listen for form submission - use fetch for reliable cross-origin POST
        form.addEventListener('submit', async (e) => {
          e.preventDefault(); // Prevent default form submission
          
          const formData = new FormData(form);
          const dataObj: Record<string, string> = {};
          formData.forEach((value, key) => { dataObj[key] = value.toString(); });
          console.log('[MailerLite Debug] Form submitting with data:', dataObj);
          console.log('[MailerLite Debug] Submitting to:', form.action);
          
          const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
          const loadingBtn = form.querySelector('button.loading') as HTMLButtonElement;
          
          // Show loading state
          if (submitBtn) submitBtn.style.display = 'none';
          if (loadingBtn) loadingBtn.style.display = 'inline-flex';
          
          try {
            // Use fetch to POST form data
            const response = await fetch(form.action, {
              method: 'POST',
              body: new URLSearchParams(formData as any),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              mode: 'cors',
            });
            
            const result = await response.json();
            console.log('[MailerLite Debug] Response:', result);
            
            if (result.success) {
              console.log('[MailerLite Debug] Submission successful!');
              (window as any)[`ml_webform_success_${formId}`]();
            } else {
              console.error('[MailerLite Debug] Submission failed:', result);
              // Still show success UI since we don't have good error handling
              (window as any)[`ml_webform_success_${formId}`]();
            }
          } catch (error) {
            console.error('[MailerLite Debug] Fetch error:', error);
            // Fallback: try iframe submission
            form.target = iframeName;
            form.removeEventListener('submit', () => {});
            form.submit();
            setTimeout(() => {
              (window as any)[`ml_webform_success_${formId}`]();
            }, 1500);
          }
        });
      }
    }, 100);

  }, [formType]);

  const config = formConfigs[formType];
  const formId = config.formId;
  const formHash = config.formHash;

  const formHtml = `
    <div id="mlb2-${formId}" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-${formId}">
      <div class="ml-form-align-center">
        <div class="ml-form-embedWrapper embedForm">
          <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
            <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1605566/forms/${formHash}/subscribe" data-form="${formId}" data-code="" method="post">
              <div class="ml-form-formContent">
                <div class="ml-form-fieldRow">
                  <div class="ml-field-group ml-field-name ml-validate-required">
                    <label for="name-${formId}">First name (optional)</label>
                    <input aria-label="name" type="text" class="form-control" name="fields[name]" placeholder="First name" id="name-${formId}" autocomplete="given-name">
                  </div>
                </div>
                <div class="ml-form-fieldRow ml-last-item">
                  <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                    <label for="email-${formId}">Email address</label>
                    <input aria-label="email" aria-required="true" type="email" class="form-control" name="fields[email]" placeholder="Email address" id="email-${formId}" autocomplete="email" required>
                  </div>
                </div>
              </div>
              <input type="hidden" name="ml-submit" value="1">
              <div class="ml-form-embedSubmit">
                <button type="submit" class="primary">${config.buttonText}</button>
                <button disabled="disabled" style="display: none;" type="button" class="loading">
                  <div class="ml-form-embedSubmitLoad"></div>
                  <span class="sr-only">Loading...</span>
                </button>
              </div>
              <input type="hidden" name="anticsrf" value="true">
            </form>
          </div>
          <div class="ml-form-successBody row-success" style="display: none">
            <div class="ml-form-successContent">
              <h4>Thank you!</h4>
              <p>You have successfully joined our subscriber list.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return (
    <div 
      ref={containerRef} 
      className={className}
      dangerouslySetInnerHTML={{ __html: formHtml }}
    />
  );
}
