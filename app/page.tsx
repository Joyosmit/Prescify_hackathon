import { WalletConnection } from "@/components/wallet-connection"
import { ShieldCheck, Pill, Lock, ChevronDown } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 overflow-hidden">
      {/* Background image - faded into background */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" 
           style={{
             backgroundImage: "url('https://img.freepik.com/premium-photo/doctor-writing-prescription-blank-bottle-with-medical-table-close-up-hands_820340-22603.jpg')",
             filter: "grayscale(30%)"
           }}>
      </div>
      
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/90 via-white/90 to-purple-100/90 z-0"></div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 translate-x-1/3 translate-y-1/3 z-0"></div>
      
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-10">
        <div className="flex items-center">
          <Pill className="h-6 w-6 text-blue-600 mr-2" />
          <span className="text-xl font-semibold text-blue-600">Prescify</span>
        </div>
        <div className="hidden md:flex space-x-6 text-gray-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </nav>
      
      <main className="flex flex-col items-center justify-center p-8 md:p-24 pt-24 relative z-10">
        <div className="max-w-4xl w-full text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/80 p-3 rounded-full shadow-md backdrop-blur-sm">
                <Pill className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              <span className="text-blue-600">Prescify</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              The next generation of secure blockchain-based prescription management for healthcare professionals and patients
            </p>
            
            <div className="flex justify-center mb-16">
              <a href="#connect" className="animate-bounce text-blue-600 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-sm mb-1">Get Started</span>
                <ChevronDown className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Wallet Connection Section */}
          <div id="connect" className="mb-16">
            <center>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-8">Securely access your prescription information with blockchain technology</p>

              <WalletConnection />
            </div></center>
          </div>
          
          {/* Features Section */}
          <div id="features" className="my-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose Prescify?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-800 mb-3">Verified Credentials</h3>
                <p className="text-gray-600">All healthcare providers undergo a rigorous verification process to ensure authenticity and trust</p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-purple-500">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-800 mb-3">Secure & Private</h3>
                <p className="text-gray-600">Advanced blockchain technology ensures your medical data remains secure, tamper-proof, and private</p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-green-500">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Pill className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-800 mb-3">Seamless Experience</h3>
                <p className="text-gray-600">Connect your wallet once and access all features instantly across our entire ecosystem</p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="my-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 md:p-10 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your healthcare experience?</h2>
            <p className="mb-8 text-blue-100">Join thousands of doctors, patients, and pharmacists on Prescify</p>
            <a href="#connect" className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-50 transition-colors">
              Connect Now
            </a>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800/95 backdrop-blur-sm text-gray-300 py-10 px-8 relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Pill className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-lg font-medium text-white">Prescify</span>
            </div>
            <p className="text-sm text-gray-400">
              Revolutionizing prescription management with blockchain technology
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <p className="text-sm text-gray-400 mb-4">
              Have questions? Reach out to our support team for assistance.
            </p>
            <a href="mailto:support@prescify.io" className="text-blue-400 hover:text-blue-300 transition-colors">
              support@prescify.io
            </a>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Prescify. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
