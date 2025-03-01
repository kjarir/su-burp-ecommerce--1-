"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({ title: "Message Sent", description: "We've received your message and will get back to you soon!" });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast({ title: "Error", description: "There was an issue sending your message.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="px-4 py-12 mx-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">We'd love to hear from you.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mt-12">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Full Name", id: "name", type: "text", placeholder: "John Doe" },
                { label: "Phone Number", id: "phone", type: "text", placeholder: "eg: 0123456789" },
                { label: "Email", id: "email", type: "email", placeholder: "john@example.com" },
              ].map(({ label, id, type, placeholder }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id}>{label}</Label>
                  <Input id={id} name={id} type={type} placeholder={placeholder} value={formData[id]} onChange={handleChange} required />
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="How can we help?" value={formData.message} onChange={handleChange} rows={5} required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}</Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach us directly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Phone, title: "Phone", details: "+91 8454909458", extra: "Mon-Sat, 9am - 6pm" },
                { icon: Mail, title: "Email", details: "info@suburp.com", extra: "support@suburp.com" },
                { icon: MapPin, title: "Address", details: "1803, Aafiyah Heights, Dimtimkar road, Nagpada, Mumbai - 400008" },
              ].map(({ icon: Icon, title, details, extra }) => (
                <div key={title} className="flex items-start space-x-4">
                  <Icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{details}</p>
                    {extra && <p className="text-sm text-muted-foreground">{extra}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}