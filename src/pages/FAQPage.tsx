
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const faqs = [
  {
    category: "For Accommodation Seekers",
    questions: [
      {
        question: "How do I find accommodation on RentMate?",
        answer: "You can start by using our search feature on the homepage. Filter by location, price range, room type, and other preferences to find the perfect place. Once you find a listing you like, you can contact the provider directly through our platform."
      },
      {
        question: "Are the listings on RentMate verified?",
        answer: "Yes, we take verification seriously. All accommodation providers go through a verification process before their listings appear on our platform. However, we still recommend doing your own due diligence and visiting the property if possible before making any payments."
      },
      {
        question: "How do I apply for a room or apartment?",
        answer: "Once you find a listing you're interested in, click the 'Apply Now' or 'Contact Provider' button on the listing page. You'll be able to send a message to the provider, ask questions, and arrange viewings. Some providers may have their own application forms or requirements."
      },
      {
        question: "Is there an application fee?",
        answer: "RentMate does not charge any application fees for contacting providers or applying for accommodations. However, some providers might have their own application fees or deposits, which will be clearly stated in their listings."
      },
      {
        question: "What should I look out for in a listing?",
        answer: "Pay attention to details like included utilities, contract length, deposit requirements, house rules, and proximity to public transportation or your university/workplace. Also, check the images thoroughly and read reviews from previous tenants if available."
      }
    ]
  },
  {
    category: "For Accommodation Providers",
    questions: [
      {
        question: "How do I list my property on RentMate?",
        answer: "Click on the 'List Your Property' button on our homepage. You'll need to create an account, provide details about your property, upload high-quality photos, and set your terms and pricing. Once submitted, our team will review your listing before it goes live."
      },
      {
        question: "Is there a fee for listing my property?",
        answer: "Basic listings are free. We offer premium listing options with enhanced visibility and features for a small fee. You can upgrade your listing at any time from your dashboard."
      },
      {
        question: "How do I manage inquiries and applications?",
        answer: "All inquiries come directly to your dashboard and email. You can review applicant profiles, respond to messages, schedule viewings, and manage your listings all from your provider dashboard."
      },
      {
        question: "Can I set specific requirements for tenants?",
        answer: "Yes, you can specify preferences such as gender, smoking habits, or pet policies. However, please ensure your requirements comply with local housing laws and don't discriminate against protected groups."
      },
      {
        question: "How long does it take for my listing to be approved?",
        answer: "Most listings are reviewed and approved within 24-48 hours. If there are any issues or we need additional information, our team will contact you directly."
      }
    ]
  },
  {
    category: "Account & Payments",
    questions: [
      {
        question: "How do I create an account on RentMate?",
        answer: "Click the 'Sign Up' button in the top right corner of our website. You can create an account using your email, or sign up with Google or Facebook for quicker access."
      },
      {
        question: "Is my personal information safe?",
        answer: "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. For more details, please review our Privacy Policy."
      },
      {
        question: "How are payments handled between tenants and providers?",
        answer: "RentMate currently serves as a platform to connect tenants and providers. Payments for rent, deposits, or other fees are arranged directly between the two parties. We recommend using secure payment methods and getting receipts for all transactions."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account at any time from your account settings. Please note that this will remove all your data, including listings, messages, and saved favorites."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "The website isn't working properly. What should I do?",
        answer: "First, try refreshing your browser or clearing your cache. If problems persist, please contact our support team with details about the issue, including what browser and device you're using."
      },
      {
        question: "How do I report a suspicious listing or user?",
        answer: "Click the 'Report' button on the listing or user profile, or contact our support team directly. Please provide as much detail as possible about why you find the listing or user suspicious."
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer: "Click 'Login', then 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password."
      }
    ]
  }
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredFaqs(faqs);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = faqs.map(category => {
      const filteredQuestions = category.questions.filter(
        q => q.question.toLowerCase().includes(term) || q.answer.toLowerCase().includes(term)
      );
      return filteredQuestions.length > 0 ? { ...category, questions: filteredQuestions } : null;
    }).filter(Boolean) as typeof faqs;

    setFilteredFaqs(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rentmate-600 to-rentmate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl opacity-90">
                Find answers to common questions about using RentMate
              </p>
            </div>
          </div>
        </section>
        
        {/* Search Section */}
        <section className="py-10 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-grow"
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No matching questions found</h3>
                  <p className="text-gray-600 mb-4">
                    Try using different keywords or browse our categories below
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("");
                    setFilteredFaqs(faqs);
                  }}>
                    Show All FAQs
                  </Button>
                </div>
              ) : (
                filteredFaqs.map((category, idx) => (
                  <div key={idx} className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq, faqIdx) => (
                        <AccordionItem 
                          key={faqIdx} 
                          value={`${idx}-${faqIdx}`}
                          className="bg-white border rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-6 py-4 text-left font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 text-gray-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is ready to help with any other questions you might have
            </p>
            <Button asChild>
              <a href="/contact">Contact Support</a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQPage;
