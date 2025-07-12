import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Edit3, Save, Copy, Download, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ContentEditor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [content, setContent] = useState({
    brand: {
      name: "Elusive Origin",
      tagline: "Sacred container for culture, craft, and community",
      description: "An immersive cultural investigation platform where users can reserve access to upcoming events and participate in collaborative storytelling experiences."
    },
    comingSoon: {
      hero: {
        title: "The Investigation Begins",
        subtitle: "Something immersive is coming.",
        description: "Reserve your place in the sacred container where theories transform into collective truth.",
        ctaButton: "Reserve Your Investigation"
      },
      countdown: {
        title: "Investigation Countdown",
        description: "Until the mystery unfolds"
      }
    },
    vessel: {
      hero: {
        title: "Enter the Vessel",
        subtitle: "Your Cultural Investigation Companion",
        description: "The companion app that transforms how you engage with mystery, culture, and community. Launching August 2025."
      },
      mvpFeatures: {
        title: "Core MVP Features",
        subtitle: "Five essential features forming the foundation of your investigation experience"
      },
      earlyAccess: {
        title: "Secure Early Access",
        description: "Be among the first to enter the Vessel. Help us build the future of interactive storytelling."
      }
    }
  });

  const updateContent = (section: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const updateNestedContent = (section: string, subsection: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [subsection]: {
          ...prev[section as keyof typeof prev][subsection as keyof typeof prev[section as keyof typeof prev]],
          [field]: value
        }
      }
    }));
  };

  const exportContent = () => {
    const contentString = `export const siteContent = ${JSON.stringify(content, null, 2)};`;
    const blob = new Blob([contentString], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.ts';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Content Exported",
      description: "Your content has been downloaded as content.ts"
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard"
    });
  };

  const generateContentFile = () => {
    return `// Content Management System for Elusive Origin
// Edit this file to update all text content across the website

export const siteContent = ${JSON.stringify(content, null, 2)};`;
  };

  return (
    <div className="min-h-screen bg-deep-charcoal text-gray-100">
      {/* Header */}
      <div className="border-b border-neo-gold/20 bg-black-mirror">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setLocation("/")}
              className="flex items-center space-x-3 text-neo-gold hover:text-neo-gold/80 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Site</span>
            </button>
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-serif font-bold">Content Editor</h1>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={exportContent}
                  variant="outline"
                  size="sm"
                  className="border-neo-gold text-neo-gold hover:bg-neo-gold hover:text-deep-charcoal"
                >
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
                <Button 
                  onClick={() => copyToClipboard(generateContentFile())}
                  size="sm"
                  className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90"
                >
                  <Copy size={16} className="mr-2" />
                  Copy All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg text-gray-300 mb-4">
            Edit your website content below. Changes will be reflected when you update the content.ts file in your project.
          </h2>
          <div className="bg-neo-gold/10 border border-neo-gold/30 rounded-lg p-4">
            <p className="text-sm text-neo-gold">
              <strong>How to use:</strong> Edit the content below, then click "Copy All" or "Export" to get the updated content.ts file. 
              Replace the content in your shared/content.ts file with the exported version.
            </p>
          </div>
        </div>

        <Tabs defaultValue="brand" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black-mirror border border-gray-600">
            <TabsTrigger value="brand" className="text-white data-[state=active]:bg-neo-gold data-[state=active]:text-deep-charcoal">
              Brand
            </TabsTrigger>
            <TabsTrigger value="coming-soon" className="text-white data-[state=active]:bg-neo-gold data-[state=active]:text-deep-charcoal">
              Coming Soon
            </TabsTrigger>
            <TabsTrigger value="vessel" className="text-white data-[state=active]:bg-neo-gold data-[state=active]:text-deep-charcoal">
              Vessel
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-neo-gold data-[state=active]:text-deep-charcoal">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brand" className="mt-6">
            <Card className="bg-medium-charcoal border-gray-600">
              <CardHeader>
                <CardTitle className="text-neo-gold">Brand Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Brand Name</label>
                  <Input 
                    value={content.brand.name}
                    onChange={(e) => updateContent('brand', 'name', e.target.value)}
                    className="bg-deep-charcoal border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Tagline</label>
                  <Input 
                    value={content.brand.tagline}
                    onChange={(e) => updateContent('brand', 'tagline', e.target.value)}
                    className="bg-deep-charcoal border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Description</label>
                  <Textarea 
                    value={content.brand.description}
                    onChange={(e) => updateContent('brand', 'description', e.target.value)}
                    className="bg-deep-charcoal border-gray-600 text-white"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coming-soon" className="mt-6">
            <div className="grid gap-6">
              <Card className="bg-medium-charcoal border-gray-600">
                <CardHeader>
                  <CardTitle className="text-neo-gold">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Title</label>
                    <Input 
                      value={content.comingSoon.hero.title}
                      onChange={(e) => updateNestedContent('comingSoon', 'hero', 'title', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Subtitle</label>
                    <Input 
                      value={content.comingSoon.hero.subtitle}
                      onChange={(e) => updateNestedContent('comingSoon', 'hero', 'subtitle', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Description</label>
                    <Textarea 
                      value={content.comingSoon.hero.description}
                      onChange={(e) => updateNestedContent('comingSoon', 'hero', 'description', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">CTA Button Text</label>
                    <Input 
                      value={content.comingSoon.hero.ctaButton}
                      onChange={(e) => updateNestedContent('comingSoon', 'hero', 'ctaButton', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-medium-charcoal border-gray-600">
                <CardHeader>
                  <CardTitle className="text-neo-gold">Countdown Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Title</label>
                    <Input 
                      value={content.comingSoon.countdown.title}
                      onChange={(e) => updateNestedContent('comingSoon', 'countdown', 'title', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Description</label>
                    <Input 
                      value={content.comingSoon.countdown.description}
                      onChange={(e) => updateNestedContent('comingSoon', 'countdown', 'description', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vessel" className="mt-6">
            <div className="grid gap-6">
              <Card className="bg-medium-charcoal border-gray-600">
                <CardHeader>
                  <CardTitle className="text-neo-gold">Vessel Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Title</label>
                    <Input 
                      value={content.vessel.hero.title}
                      onChange={(e) => updateNestedContent('vessel', 'hero', 'title', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Subtitle</label>
                    <Input 
                      value={content.vessel.hero.subtitle}
                      onChange={(e) => updateNestedContent('vessel', 'hero', 'subtitle', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Description</label>
                    <Textarea 
                      value={content.vessel.hero.description}
                      onChange={(e) => updateNestedContent('vessel', 'hero', 'description', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-medium-charcoal border-gray-600">
                <CardHeader>
                  <CardTitle className="text-neo-gold">MVP Features Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Title</label>
                    <Input 
                      value={content.vessel.mvpFeatures.title}
                      onChange={(e) => updateNestedContent('vessel', 'mvpFeatures', 'title', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Subtitle</label>
                    <Textarea 
                      value={content.vessel.mvpFeatures.subtitle}
                      onChange={(e) => updateNestedContent('vessel', 'mvpFeatures', 'subtitle', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-medium-charcoal border-gray-600">
                <CardHeader>
                  <CardTitle className="text-neo-gold">Early Access Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Title</label>
                    <Input 
                      value={content.vessel.earlyAccess.title}
                      onChange={(e) => updateNestedContent('vessel', 'earlyAccess', 'title', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Description</label>
                    <Textarea 
                      value={content.vessel.earlyAccess.description}
                      onChange={(e) => updateNestedContent('vessel', 'earlyAccess', 'description', e.target.value)}
                      className="bg-deep-charcoal border-gray-600 text-white"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-6">
            <Card className="bg-medium-charcoal border-gray-600">
              <CardHeader>
                <CardTitle className="text-neo-gold">Raw Content JSON</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Advanced users can edit the raw JSON content directly. This gives you full control over all content fields.
                  </p>
                  <Textarea 
                    value={JSON.stringify(content, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setContent(parsed);
                      } catch (error) {
                        // Invalid JSON, don't update
                      }
                    }}
                    className="bg-deep-charcoal border-gray-600 text-white font-mono text-sm"
                    rows={20}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}