import Footer from "../UserComponents/LandingPage/footer";


function ContactDetails() {
  return (
    <div className="p-4">
    
      <div className="mb-4">
        <h2 className="font-bold mb-2">Contact Details:</h2>
        <div className="mb-2">
          <span className="font-bold">Email: </span>
          <a href="mailto:kkalyan2312@gmail.com" className="text-blue-500">kkalyan2312@gmail.com</a>
        </div>
        <div className="mb-2">
          <span className="font-bold">Phone: </span>
          <a href="tel:+918886081842" className="text-blue-500">+918886081842</a>
        </div>
        <div className="mb-2">
          <span className="font-bold">Address: </span>
          <span>India</span>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>

    </div>
  );
}

export default ContactDetails;
