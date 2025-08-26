import { Link } from "react-router-dom";
import Footer from "../UserComponents/LandingPage/footer";
import Navbar from "../UserComponents/LandingPage/navbar";

const AboutPage = () => {
  return (
    <>
    <Navbar/>
      <div className="max-w-xl mx-auto my-10 px-6">
        <h1 className="text-4xl font-bold mb-5">About Us</h1>
        <div className="space-y-6">
          <p className="text-lg">
            Our trading platform was founded in 2005 with the goal of making
            investing accessible to everyone.
          </p>
          <p className="text-lg">
            Today, we serve millions of customers globally, providing them with
            the tools and resources they need to invest with confidence.
          </p>
          <p className="text-lg">
            At our core, we believe in transparency, security, and innovation.
            Our platform is designed to provide a seamless experience for our
            customers, whether they're new to investing or seasoned traders.
          </p>
        </div>
        <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/" className="text-white no-underline">
            Back
          </Link>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
