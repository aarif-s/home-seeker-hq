
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Building, Users, Shield, Award, Clock, Globe } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rentmate-600 to-rentmate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">About RentMate</h1>
              <p className="text-xl opacity-90">
                Connecting students and accommodation providers across Germany since 2023.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600">
                RentMate was founded with a simple mission: to make finding accommodation easy, 
                safe, and accessible for everyone. We understand the challenges of finding the 
                perfect place to stay, especially for students and newcomers to Germany.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-rentmate-100 text-rentmate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community First</h3>
                <p className="text-gray-600">
                  We build and nurture communities of like-minded individuals seeking quality accommodations.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-rentmate-100 text-rentmate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
                <p className="text-gray-600">
                  Every listing is verified to ensure security and peace of mind for our users.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-rentmate-100 text-rentmate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Living</h3>
                <p className="text-gray-600">
                  We believe everyone deserves access to comfortable, affordable accommodation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80" 
                    alt="Team working together" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                  <p className="text-gray-600 mb-4">
                    RentMate began when our founders, former international students themselves, 
                    experienced firsthand the challenges of finding suitable accommodation in German cities.
                  </p>
                  <p className="text-gray-600 mb-4">
                    What started as a simple platform connecting students with spare rooms has 
                    grown into Germany's trusted accommodation marketplace for students, young 
                    professionals, and property owners alike.
                  </p>
                  <p className="text-gray-600">
                    Today, we help thousands of people find their perfect home away from home 
                    each month, with verified listings across all major German cities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Facts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">RentMate By The Numbers</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Users className="h-10 w-10 text-rentmate-600" />
                </div>
                <div className="text-4xl font-bold text-rentmate-600 mb-2">10,000+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Building className="h-10 w-10 text-rentmate-600" />
                </div>
                <div className="text-4xl font-bold text-rentmate-600 mb-2">5,000+</div>
                <div className="text-gray-600">Listings</div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Globe className="h-10 w-10 text-rentmate-600" />
                </div>
                <div className="text-4xl font-bold text-rentmate-600 mb-2">20+</div>
                <div className="text-gray-600">German Cities</div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Award className="h-10 w-10 text-rentmate-600" />
                </div>
                <div className="text-4xl font-bold text-rentmate-600 mb-2">4.8/5</div>
                <div className="text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
