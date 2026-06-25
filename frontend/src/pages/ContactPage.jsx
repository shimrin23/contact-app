import "../styles/ContactPage.css";
import { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
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
        message: "Please fill all fields.",
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

      const responseData = await response.json();

      setStatus({
        type: "success",
        message: "Message sent successfully!",
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
        message: "Failed to send message. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Contact Us</h1>

          <p>
            Have questions, feedback, or need support? We'd love to hear from
            you.
          </p>

          <div className="info-card">
            <h3>Email</h3>
            <p>support@snis.com</p>
          </div>

          <div className="info-card">
            <h3>Phone</h3>
            <p>+94 71 234 5678</p>
          </div>

          <div className="info-card">
            <h3>Address</h3>
            <p>University of Ruhuna, Sri Lanka</p>
          </div>
        </div>

        <div className="contact-form-card">
          <form onSubmit={handleSubmit}>
            <h2>Send a Message</h2>

            {status.message && (
              <div
                className={`alert ${
                  status.type === "success"
                    ? "success-alert"
                    : "error-alert"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}