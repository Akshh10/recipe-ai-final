
import React from "react";
import { ArrowLeft, MessageCircle, Phone, Mail, FileText, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const HelpSupport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const faqItems = [
    {
      question: "How do I save a recipe?",
      answer: "To save a recipe, simply click on the heart icon on any recipe card or recipe detail page. You can view your saved recipes in the 'Saved Recipes' section of your profile."
    },
    {
      question: "Can I add custom ingredients?",
      answer: "Yes! When searching for recipes, you can add any ingredients you have on hand. As you type, the system will suggest common ingredients, but you can also add custom ones by typing them in and clicking 'Add' or pressing Enter."
    },
    {
      question: "How accurate is the ingredient matching?",
      answer: "Our algorithm tries to find recipes that use as many of your ingredients as possible. We'll show you which ingredients from your list are used in each recipe, as well as any additional ingredients you might need."
    },
    {
      question: "Can I filter recipes by dietary restrictions?",
      answer: "This feature is coming soon! In a future update, you'll be able to set dietary preferences in your profile and filter recipes accordingly."
    }
  ];
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you soon.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <header className="bg-white p-4 sticky top-0 z-10 flex items-center shadow-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/profile")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold font-heading">Help & Support</h1>
      </header>
      
      <main className="flex-1 p-4 max-w-md mx-auto">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-terracotta" />
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="bg-white rounded-lg overflow-hidden shadow">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="px-4 py-3 hover:bg-cream/10 font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2 text-forest/80 text-sm">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
              <MessageCircle className="h-5 w-5 text-terracotta" />
              Contact Us
            </h2>
            
            <form onSubmit={handleContactSubmit} className="space-y-4 bg-white rounded-lg shadow p-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <select id="subject" className="w-full border rounded-md p-2 bg-white">
                  <option>General Question</option>
                  <option>Technical Support</option>
                  <option>Billing Issue</option>
                  <option>Feature Request</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" placeholder="How can we help you?" className="min-h-32" />
              </div>
              
              <Button type="submit" className="w-full bg-terracotta hover:bg-terracotta/90">
                Send Message
              </Button>
            </form>
            
            <div className="mt-4 space-y-3 bg-white rounded-lg shadow p-4">
              <h3 className="font-medium">Other ways to reach us</h3>
              
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-terracotta" />
                <span>+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-terracotta" />
                <span>support@recipeai.example</span>
              </div>
              
              <Button variant="outline" className="w-full mt-2 flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit Help Center
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HelpSupport;
