import "../styles/ContactPage.css";
import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Loader2, 
  Globe,
  AlertCircle,
  MessageSquareHeart,
  CheckCircle2
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  // State to track clipboard feedback
  const [copiedField, setCopiedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all fields before sending.",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });

      // Send the actual API request to our FastAPI backend
      const response = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();

      setStatus({
        type: "success",
        message: "Your message has been sent successfully! We'll reply soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Unable to send message. Please verify connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Determine helper validation tags
  const isNameValid = formData.name.trim().length > 0;
  const isEmailValid = validateEmail(formData.email);
  const isSubjectValid = formData.subject.trim().length > 0;
  const isMessageValid = formData.message.trim().length > 10;

  return (
    <div className="contact-page">
      {/* Background visual glowing elements */}
      <div className="glow-bubble bubble-1"></div>
      <div className="glow-bubble bubble-2"></div>
      
      <div className="contact-wrapper">
        <header className="contact-header">
          <div className="badge">
            <MessageSquareHeart size={14} className="badge-icon" />
            <span>Connect with us</span>
          </div>
          <h1>Get in Touch</h1>
          <p>
            Have a question, feedback, or custom request? Reach out to our support team and let's build something exceptional together.
          </p>
        </header>

        <div className="contact-container">
          {/* Info Section */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className="info-desc">
              Prefer direct communication? Copy our details or connect via social platforms.
            </p>

            <div className="info-cards-list">
              {/* Email Card */}
              <div className="info-card">
                <div className="card-icon-wrapper mail-glow">
                  <Mail size={20} className="card-icon" />
                </div>
                <div className="card-details">
                  <h3>Email</h3>
                  <p>support@snis.com</p>
                </div>
                <button 
                  type="button" 
                  className={`copy-btn ${copiedField === "email" ? "copied" : ""}`}
                  onClick={() => handleCopy("support@snis.com", "email")}
                  title="Copy email to clipboard"
                >
                  {copiedField === "email" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="info-card">
                <div className="card-icon-wrapper phone-glow">
                  <Phone size={20} className="card-icon" />
                </div>
                <div className="card-details">
                  <h3>Phone</h3>
                  <p>+94 71 234 5678</p>
                </div>
                <button 
                  type="button" 
                  className={`copy-btn ${copiedField === "phone" ? "copied" : ""}`}
                  onClick={() => handleCopy("+94 71 234 5678", "phone")}
                  title="Copy phone to clipboard"
                >
                  {copiedField === "phone" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Address Card */}
              <div className="info-card">
                <div className="card-icon-wrapper map-glow">
                  <MapPin size={20} className="card-icon" />
                </div>
                <div className="card-details">
                  <h3>Address</h3>
                  <p>University of Ruhuna, Sri Lanka</p>
                </div>
                <button 
                  type="button" 
                  className={`copy-btn ${copiedField === "address" ? "copied" : ""}`}
                  onClick={() => handleCopy("University of Ruhuna, Sri Lanka", "address")}
                  title="Copy address to clipboard"
                >
                  {copiedField === "address" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Social details */}
            <div className="socials-section">
              <h4>Social Profiles</h4>
              <div className="socials-links">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn linkedin" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn twitter" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-btn github" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://ruh.ac.lk" target="_blank" rel="noreferrer" className="social-icon-btn website" aria-label="Website">
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Card Section */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit} noValidate>
              <h2>Send a Message</h2>
              <p className="form-subtitle">Fill in the inputs below and we'll respond within 24 hours.</p>

              {status.message && (
                <div
                  className={`alert-box ${
                    status.type === "success"
                      ? "success-alert"
                      : "error-alert"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 size={18} className="alert-icon" />
                  ) : (
                    <AlertCircle size={18} className="alert-icon" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <div className="form-group-grid">
                {/* Name */}
                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="name-input">Name</label>
                    {formData.name && (
                      <span className={`validity-hint ${isNameValid ? "valid" : "invalid"}`}>
                        {isNameValid ? "Valid" : "Required"}
                      </span>
                    )}
                  </div>
                  <div className="input-wrapper">
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="email-input">Email</label>
                    {formData.email && (
                      <span className={`validity-hint ${isEmailValid ? "valid" : "invalid"}`}>
                        {isEmailValid ? "Email Valid" : "Invalid format"}
                      </span>
                    )}
                  </div>
                  <div className="input-wrapper">
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="subject-input">Subject</label>
                  {formData.subject && (
                    <span className={`validity-hint ${isSubjectValid ? "valid" : "invalid"}`}>
                      {isSubjectValid ? "Valid" : "Required"}
                    </span>
                  )}
                </div>
                <div className="input-wrapper">
                  <input
                    id="subject-input"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="message-input">Message</label>
                  {formData.message && (
                    <span className={`validity-hint ${isMessageValid ? "valid" : "invalid"}`}>
                      {isMessageValid ? "Valid" : "Min 10 characters"}
                    </span>
                  )}
                </div>
                <div className="input-wrapper">
                  <textarea
                    id="message-input"
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us details about your project or inquiry..."
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="spinner" size={18} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}