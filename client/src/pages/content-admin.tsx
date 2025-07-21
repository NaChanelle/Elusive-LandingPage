import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContent } from "@/hooks/useContent";
import { useToast } from "@/hooks/use-toast";
import { Save, Download, Upload, Eye } from "lucide-react";

export default function ContentAdmin() {
  const { data: homeContent, refetch: refetchHome } = useContent("home");
  const { data: vesselContent, refetch: refetchVessel } = useContent("vessel");
  const [editingContent, setEditingContent] = useState<any>({});
  const { toast } = useToast();

  const handleSave = async (contentType: string) => {
    try {
      const response = await fetch(`/api/content/${contentType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingContent[contentType] || {}),
      });

      if (response.ok) {
        toast({
          title: "Content Saved",
          description: `${contentType} content has been updated successfully.`,
        });
        
        // Refetch the content
        if (contentType === 'home') refetchHome();
        if (contentType === 'vessel') refetchVessel();
      } else {
        throw new Error('Failed to save content');
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Could not save content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadContent = (contentType: string, content: any) => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${contentType}-content.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, contentType: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target?.result as string);
          setEditingContent(prev => ({
            ...prev,
            [contentType]: content
          }));
          toast({
            title: "File Loaded",
            description: "Content loaded successfully. Click save to apply changes.",
          });
        } catch (error) {
          toast({
            title: "Invalid File",
            description: "Please upload a valid JSON file.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const updateNestedValue = (contentType: string, path: string, value: any) => {
    setEditingContent(prev => {
      const updated = { ...prev };
      if (!updated[contentType]) {
        updated[contentType] = contentType === 'home' ? homeContent : vesselContent;
      }
      
      const keys = path.split('.');
      let current = updated[contentType];
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-deep-charcoal text-gray-100">
      <div className="border-b border-neo-gold/20 bg-black-mirror">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-neo-gold rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-neo-gold rounded-full"></div>
              </div>
              <span className="text-2xl font-serif font-bold">Content Admin</span>
            </div>
            <Button 
              onClick={() => window.open('/dynamic', '_blank')}
              variant="outline"
              className="border-neo-gold text-neo-gold hover:bg-neo-gold hover:text-deep-charcoal"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Dynamic Page
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="home" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-black-mirror border border-neo-gold/30">
            <TabsTrigger value="home" className="data-[state=active]:bg-neo-gold data-[state=active]:text-deep-charcoal">
              Home Content
            </TabsTrigger>
            <TabsTrigger value="vessel" className="data-[state=active]:bg-neo-gold data-[state=active]:text-deep-charcoal">
              Vessel Content
            </TabsTrigger>
          </TabsList>

          {/* Home Content Tab */}
          <TabsContent value="home" className="space-y-6">
            <Card className="bg-black-mirror border-neo-gold/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-neo-gold">Home Page Content</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage the content for the dynamic coming soon page
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => downloadContent('home', homeContent)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <label className="inline-flex">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Import
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => handleFileUpload(e, 'home')}
                      className="hidden"
                    />
                  </label>
                  <Button
                    onClick={() => handleSave('home')}
                    className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90"
                    size="sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hero Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neo-gold">Hero Section</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-title">Title</Label>
                      <Input
                        id="hero-title"
                        value={editingContent.home?.hero?.title || homeContent?.hero?.title || ''}
                        onChange={(e) => updateNestedValue('home', 'hero.title', e.target.value)}
                        className="bg-medium-charcoal border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Subtitle</Label>
                      <Input
                        id="hero-subtitle"
                        value={editingContent.home?.hero?.subtitle || homeContent?.hero?.subtitle || ''}
                        onChange={(e) => updateNestedValue('home', 'hero.subtitle', e.target.value)}
                        className="bg-medium-charcoal border-gray-600"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hero-description">Description</Label>
                    <Textarea
                      id="hero-description"
                      value={editingContent.home?.hero?.description || homeContent?.hero?.description || ''}
                      onChange={(e) => updateNestedValue('home', 'hero.description', e.target.value)}
                      className="bg-medium-charcoal border-gray-600"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Event Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neo-gold">Event Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input
                        id="event-title"
                        value={editingContent.home?.event?.title || homeContent?.event?.title || ''}
                        onChange={(e) => updateNestedValue('home', 'event.title', e.target.value)}
                        className="bg-medium-charcoal border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-location">Location</Label>
                      <Input
                        id="event-location"
                        value={editingContent.home?.event?.location || homeContent?.event?.location || ''}
                        onChange={(e) => updateNestedValue('home', 'event.location', e.target.value)}
                        className="bg-medium-charcoal border-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Forms Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neo-gold">Forms Configuration</h3>
                  <div>
                    <Label htmlFor="mailerlite-form-id">MailerLite Form ID</Label>
                    <Input
                      id="mailerlite-form-id"
                      value={editingContent.home?.forms?.mailerlite_form_id || homeContent?.forms?.mailerlite_form_id || ''}
                      onChange={(e) => updateNestedValue('home', 'forms.mailerlite_form_id', e.target.value)}
                      className="bg-medium-charcoal border-gray-600"
                      placeholder="Enter your MailerLite form ID"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vessel Content Tab */}
          <TabsContent value="vessel" className="space-y-6">
            <Card className="bg-black-mirror border-neo-gold/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-neo-gold">Vessel Page Content</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage the content for the Vessel teaser page
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => downloadContent('vessel', vesselContent)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <label className="inline-flex">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Import
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => handleFileUpload(e, 'vessel')}
                      className="hidden"
                    />
                  </label>
                  <Button
                    onClick={() => handleSave('vessel')}
                    className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90"
                    size="sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neo-gold">Form Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="early-access-form">Early Access Tally Form ID</Label>
                      <Input
                        id="early-access-form"
                        value={editingContent.vessel?.forms?.early_access_tally_id || vesselContent?.forms?.early_access_tally_id || ''}
                        onChange={(e) => updateNestedValue('vessel', 'forms.early_access_tally_id', e.target.value)}
                        className="bg-medium-charcoal border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="feedback-form">Feedback Tally Form ID</Label>
                      <Input
                        id="feedback-form"
                        value={editingContent.vessel?.forms?.feedback_tally_id || vesselContent?.forms?.feedback_tally_id || ''}
                        onChange={(e) => updateNestedValue('vessel', 'forms.feedback_tally_id', e.target.value)}
                        className="bg-medium-charcoal border-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">
                    <strong>Note:</strong> The Vessel page uses the existing React components. 
                    This content management system is designed for the dynamic content pages. 
                    To edit the main Vessel page, modify the React components directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}