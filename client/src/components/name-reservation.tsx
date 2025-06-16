import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertReservationSchema, type InsertReservation } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function NameReservation() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertReservation>({
    resolver: zodResolver(insertReservationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      investigationInterests: [],
      preferredRole: "",
      interests: "",
    },
  });

  const createReservation = useMutation({
    mutationFn: async (data: InsertReservation) => {
      const response = await apiRequest("POST", "/api/reservations", data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      toast({
        title: "Investigation Access Reserved!",
        description: `Welcome to the investigation, ${data.reservation.firstName}. You'll receive updates as we prepare to activate the portal.`,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Reservation Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertReservation) => {
    createReservation.mutate(data);
  };

  const investigationOptions = [
    { id: "august-event", label: "August Event" },
    { id: "vessel-app", label: "Vessel App" },
    { id: "all-updates", label: "All Updates" },
  ];

  const roleOptions = [
    { value: "cultural-curator-detective", label: "Cultural Curator-Detective" },
    { value: "immersive-experience-designer", label: "Immersive Experience Designer" },
    { value: "narrative-investigator", label: "Narrative Investigator" },
    { value: "community-collaborator", label: "Community Collaborator" },
  ];

  if (isSuccess) {
    return (
      <section id="reserve" className="py-20 bg-deep-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-black-mirror border border-neo-gold rounded-2xl p-12">
              <div className="w-16 h-16 bg-neo-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-deep-charcoal text-2xl font-bold">✓</span>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Investigation Access Secured</h2>
              <p className="text-lg text-gray-300 mb-6">
                Your place in the Cultural Codes Chronicles has been reserved. The investigation continues...
              </p>
              <Button
                onClick={() => setIsSuccess(false)}
                className="bg-neo-gold text-deep-charcoal hover:bg-neo-gold/90"
              >
                Reserve Another Investigation
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="py-20 bg-deep-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Reserve Your Investigation</h2>
          <p className="text-xl text-gray-300 mb-8">
            Secure your place in the cultural code chronicles. Be notified when tickets drop and the vessel launches.
          </p>
        </div>
        
        <div className="bg-black-mirror border border-neo-gold/30 rounded-2xl p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your first name"
                          {...field}
                          className="bg-medium-charcoal border-gray-600 text-white focus:border-neo-gold"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your last name"
                          {...field}
                          className="bg-medium-charcoal border-gray-600 text-white focus:border-neo-gold"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        className="bg-medium-charcoal border-gray-600 text-white focus:border-neo-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Investigation Interests */}
              <FormField
                control={form.control}
                name="investigationInterests"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Investigation Interests</FormLabel>
                    <div className="grid md:grid-cols-3 gap-4">
                      {investigationOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="investigationInterests"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, option.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== option.id
                                            )
                                          )
                                    }}
                                    className="border-gray-600 data-[state=checked]:bg-neo-gold data-[state=checked]:border-neo-gold"
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-gray-300 cursor-pointer">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferred Role */}
              <FormField
                control={form.control}
                name="preferredRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Preferred Investigation Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-medium-charcoal border-gray-600 text-white focus:border-neo-gold">
                          <SelectValue placeholder="Select your preferred role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-medium-charcoal border-gray-600">
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value} className="text-white hover:bg-black-mirror">
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Interests */}
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Tell us about your investigative interests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What cultural mysteries intrigue you? What stories need investigating?"
                        {...field}
                        className="bg-medium-charcoal border-gray-600 text-white focus:border-neo-gold"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={createReservation.isPending}
                className="w-full gradient-gold-red text-deep-charcoal py-4 text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105"
              >
                {createReservation.isPending 
                  ? "Securing Your Investigation..." 
                  : "Reserve Your Investigation Access"
                }
              </Button>
            </form>
          </Form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Your reservation secures priority access when tickets become available. 
              You'll receive exclusive updates about the investigation timeline.
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Integration Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-social-red/10 to-neo-gold/10 border-2 border-dashed border-neo-gold/50 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 border-2 border-neo-gold rounded-full mx-auto mb-6 flex items-center justify-center">
            <Link className="text-neo-gold" size={32} />
          </div>
          <h3 className="text-2xl font-serif font-semibold mb-4">Ticketing Platform Integration</h3>
          <p className="text-lg text-gray-300 mb-6">
            Direct ticketing and RSVP platform integration coming soon. Seamless access to all investigation portals and events.
          </p>
          <div className="inline-block bg-medium-charcoal text-neo-gold px-6 py-3 rounded-lg font-medium">
            Integration Portal - Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}
