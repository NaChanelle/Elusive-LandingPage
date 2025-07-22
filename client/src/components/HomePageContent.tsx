// src/components/HomePageContent.jsx (or .tsx)
import React, { useState, useEffect } from 'react';
// If you use markdown in your content, you might need a markdown parser like 'marked'
// import { marked } from 'marked'; // npm install marked

const HomePageContent = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the content from home.json
    fetch('/content/home.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading content:", err);
        setError(err);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div className="text-center py-20 text-xl text-gray-600">Loading content...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-xl text-red-600">Error loading content: {error.message}</div>;
  }

  // Helper function to inject MailerLite/Tally scripts dynamically
  const injectScript = (src, id) => {
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      document.body.appendChild(script);
    }
  };

  // Helper to render forms
  const renderMailerLiteForm = (formId, embedDivId) => {
    if (!formId) return null;
    return (
      <div id={embedDivId}>
        <div data-ml-form={formId}></div>
        {/* Only load MailerLite script once */}
        {useEffect(() => {
          if (!window.mailerlite && !document.querySelector('script[src*="mailerlite"]')) {
            (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
            var c={ a:[], q:[]};return function(n){c.a.push(n);return function(){c.q.push(arguments);return c}}()}
            var x=f(),y=f();e?m[e]=x:m.mailerlite=x;m[e].c=y;m[e].f=r;r.k=e;r.load=f;
            }(window,document,'script','ml','mailerlite',{"v":"20230801"}));
          } else if (window.mailerlite && window.mailerlite.load) {
            window.mailerlite.load(); // Re-trigger form rendering if script already loaded
          }
        }, [formId])}
      </div>
    );
  };

  const renderTallyForm = (formId, embedDivId) => {
    if (!formId) return null;
    return (
      <div id={embedDivId}>
        <iframe
          data-tally-src={`https://tally.so/r/${formId}?transparentBackground=1`}
          width="100%"
          height="auto"
          frameBorder="0"
          scrolling="no"
          className="rounded-lg"
          title="Tally Form"
        ></iframe>
        {/* Only load Tally script once */}
        {useEffect(() => {
          if (!window.Tally && !document.querySelector('script[src*="tally.so/widgets/embed.js"]')) {
            var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};"undefined"!=typeof Tally?v():(d.querySelector('script[src="'+w+'"]')||d.head.appendChild(d.createElement("script")).src=w).addEventListener("load",v);
          } else if (window.Tally && window.Tally.loadEmbeds) {
            window.Tally.loadEmbeds(); // Re-trigger form rendering if script already loaded
          }
        }, [formId])}
      </div>
    );
  };


  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen flex items-center justify-center text-white p-4"
               style={{ backgroundImage: `url(${content.hero_image || 'https://placehold.co/1920x1080/cccccc/333333?text=Hero+Image'})` }}>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{content.hero_title}</h1>
          <p className="text-xl md:text-2xl mb-8">{content.hero_subtitle}</p>
          <a href={content.cta_button_link} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-lg">
            {content.cta_button_text}
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white" id="about-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">{content.about_title}</h2>
          {/* If using 'marked' for markdown parsing: */}
          {/* <div className="prose max-w-3xl mx-auto text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: marked(content.about_content) }}></div> */}
          {/* Otherwise, if content is plain HTML or text: */}
          <div className="prose max-w-3xl mx-auto text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.about_content }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">{content.feature1_title}</h3>
              <p className="text-gray-700">{content.feature1_description}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">{content.feature2_title}</h3>
              <p className="text-gray-700">{content.feature2_description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg shadow-md bg-green-100 border border-green-300">
            <h3 className="text-2xl font-semibold text-green-800 text-center mb-4">Join Our Newsletter!</h3>
            {renderMailerLiteForm(content.mailerlite_form1_id, 'mailerlite-form-1-embed')}
          </div>
          <div className="p-6 rounded-lg shadow-md bg-yellow-100 border border-yellow-300">
            <h3 className="text-2xl font-semibold text-yellow-800 text-center mb-4">Get Exclusive Offers!</h3>
            {renderMailerLiteForm(content.mailerlite_form2_id, 'mailerlite-form-2-embed')}
          </div>
          <div className="p-6 rounded-lg shadow-md bg-blue-100 border border-blue-300">
            <h3 className="text-2xl font-semibold text-blue-800 text-center mb-4">Have a Question? Contact Us!</h3>
            {renderTallyForm(content.tally_form1_id, 'tally-form-1-embed')}
          </div>
          <div className="p-6 rounded-lg shadow-md bg-purple-100 border border-purple-300">
            <h3 className="text-2xl font-semibold text-purple-800 text-center mb-4">RSVP for Our Event!</h3>
            {renderTallyForm(content.tally_form2_id, 'tally-form-2-embed')}
          </div>
        </div>
      </section>

      {/* Footer - You might want to make footer content editable too */}
      <footer className="bg-gray-800 text-white p-6 text-center shadow-inner mt-8">
          <div className="container mx-auto">
              <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
              <p className="text-xs mt-2">Designed with <span className="text-red-500">&hearts;</span> by Your Name | Powered by <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">React</a> & <a href="https://netlify.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Netlify</a></p>
          </div>
      </footer>
    </div>
  );
};

export default HomePageContent;
