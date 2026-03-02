import React, { useMemo, useRef, useState } from "react";
import Seo from "../components/Seo";
import Toast from "../components/Toast";
import services from "../data/services";
import { extras } from "../data/pricing";

const initialForm = {
  fullName: "",
  phoneNumber: "",
  gmailId: "",
  projectType: "",
  extras: [],
  projectDescription: "",
  projectPdf: null
};

const projectTypeOptions = [
  { name: "AI / Machine Learning Project", price: 4500, icon: "🤖", desc: "ML models, AI automation" },
  { name: "Website Development", price: 3000, icon: "🌐", desc: "Modern responsive websites" },
  { name: "Full Stack Application", price: 4000, icon: "⚡", desc: "Complete web applications" },
  { name: "Data Analytics Dashboard", price: 3500, icon: "📊", desc: "Data visualization & insights" },
  { name: "Hardware + Software Project", price: 6000, icon: "🔧", desc: "IoT & embedded systems" },
  { name: "Final Year Student Project", price: 2500, icon: "🎓", desc: "Academic projects" },
  { name: "Startup MVP", price: 4500, icon: "🚀", desc: "Launch your product fast" }
];

const extraPrices = {
  "SEO Optimization": 200,
  "Payment Gateway Integration": 300,
  "Admin Dashboard": 400,
  "Mobile Responsive Design": 200,
  "API Integration": 300,
  "Cloud Deployment Setup": 250,
  "Database Integration": 300,
  "User Authentication": 250,
  "Email Notifications": 150
};

const normalizePhone = (value) => value.replace(/[\s()-]/g, "");
const isValidPhone = (value) => /^\+?\d{10,15}$/.test(normalizePhone(value));

function GetQuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const fileRef = useRef(null);

  const apiBaseUrl = useMemo(() => {
    const value = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
    return value.replace(/\/$/, "");
  }, []);
  const maxUploadMb = useMemo(() => Number(process.env.REACT_APP_MAX_UPLOAD_MB || 10), []);

  const estimatedCost = useMemo(() => {
    const projectType = projectTypeOptions.find(p => p.name === formData.projectType);
    const baseCost = projectType ? projectType.price : 0;
    const extrasCost = formData.extras.reduce((sum, e) => sum + (extraPrices[e] || 0), 0);
    const total = baseCost + extrasCost;
    
    const maxCap = formData.projectType === "Hardware + Software Project" ? 10000 : 5000;
    const finalTotal = Math.min(total, maxCap);
    
    return { base: baseCost, extras: extrasCost, total: finalTotal };
  }, [formData.projectType, formData.extras]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectProjectType = (projectName) => {
    setFormData((prev) => ({ ...prev, projectType: projectName }));
  };

  const toggleExtra = (extra) => {
    setFormData((prev) => {
      const hasExtra = prev.extras.includes(extra);
      return {
        ...prev,
        extras: hasExtra 
          ? prev.extras.filter(e => e !== extra)
          : [...prev.extras, extra]
      };
    });
  };

  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFormData((prev) => ({ ...prev, projectPdf: null }));
      return;
    }

    if (file.type !== "application/pdf") {
      setFeedback({ type: "error", message: "Only PDF files are allowed." });
      event.target.value = "";
      return;
    }

    if (file.size > maxUploadMb * 1024 * 1024) {
      setFeedback({ type: "error", message: `PDF is too large. Maximum size is ${maxUploadMb} MB.` });
      event.target.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, projectPdf: file }));
    setFeedback({ type: "", message: "" });
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.fullName || !formData.phoneNumber || !formData.gmailId)) {
      setToastData({ message: 'Please fill all required fields', type: 'error' });
      setShowToast(true);
      return;
    }
    if (currentStep === 1 && !isValidPhone(formData.phoneNumber)) {
      setToastData({ message: 'Invalid phone number format', type: 'error' });
      setShowToast(true);
      return;
    }
    if (currentStep === 2 && !formData.projectType) {
      setToastData({ message: 'Please select a project type', type: 'error' });
      setShowToast(true);
      return;
    }
    setFeedback({ type: "", message: "" });
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setFeedback({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });
    setIsSubmitting(true);

    // Wake up backend if sleeping (Free tier)
    try {
      await fetch(`${apiBaseUrl}/health`, { method: 'GET' });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    } catch (e) {
      console.log('Waking up backend...');
    }

    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("phoneNumber", formData.phoneNumber.trim());
    payload.append("gmailId", formData.gmailId);
    payload.append("projectType", formData.projectType);
    payload.append("projectDescription", formData.projectDescription);

    formData.extras.forEach((item) => payload.append("extras", item));

    if (formData.projectPdf) {
      payload.append("projectPdf", formData.projectPdf);
    }

    try {
      const response = await fetch(`${apiBaseUrl}/submit-project`, {
        method: "POST",
        body: payload
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit project request.");
      }

      setToastData({ 
        message: '🎉 Success! Your project request has been submitted. We\'ll contact you within 24 hours.', 
        type: 'success' 
      });
      setShowToast(true);
      setFormData(initialForm);
      setCurrentStep(1);
      if (fileRef.current) fileRef.current.value = "";
    } catch (error) {
      setToastData({ 
        message: error.message || 'Unable to submit. Please try again.', 
        type: 'error' 
      });
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showToast && (
        <Toast 
          message={toastData.message} 
          type={toastData.type} 
          onClose={() => setShowToast(false)} 
        />
      )}
      <section className="section page-section">
      <Seo
        title="Get Project Quote | AITechPulze"
        description="Get instant quote for your AI, web development, or software project. Fast response guaranteed."
        canonicalPath="/get-quote"
      />
      <div className="container">
        <div className="section-head">
          <h1>Get Your Project Quote</h1>
          <p>Complete the steps below to receive a detailed quote</p>
        </div>

        {/* Progress Steps */}
        <div className="wizard-progress">
          <div className={`wizard-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <span>Contact Info</span>
          </div>
          <div className={`wizard-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span>Project Type</span>
          </div>
          <div className={`wizard-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Details</span>
          </div>
        </div>

        <div className="wizard-container">
          <form className="wizard-form" onSubmit={handleSubmit}>
            
            {/* Step 1: Contact Info */}
            {currentStep === 1 && (
              <div className="wizard-content">
                <h2>Let's start with your details</h2>
                <div className="form-grid">
                  <label>
                    Full Name *
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={updateField}
                      placeholder="John Doe"
                      required
                    />
                  </label>
                  <label>
                    Phone Number *
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={updateField}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </label>
                  <label>
                    Email Address *
                    <input
                      type="email"
                      name="gmailId"
                      value={formData.gmailId}
                      onChange={updateField}
                      placeholder="john@example.com"
                      required
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Project Type */}
            {currentStep === 2 && (
              <div className="wizard-content">
                <h2>What type of project do you need?</h2>
                <div className="project-type-grid">
                  {projectTypeOptions.map((project) => (
                    <div
                      key={project.name}
                      className={`project-type-card ${formData.projectType === project.name ? 'selected' : ''}`}
                      onClick={() => selectProjectType(project.name)}
                    >
                      <div className="project-icon">{project.icon}</div>
                      <h3>{project.name}</h3>
                      <p>{project.desc}</p>
                      <div className="project-price">Starting ₹{project.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Extras & Details */}
            {currentStep === 3 && (
              <div className="wizard-content">
                <h2>Add key features to your project</h2>
                <div className="features-card-grid">
                  {Object.keys(extraPrices).map((extra) => (
                    <div
                      key={extra}
                      className={`feature-card ${formData.extras.includes(extra) ? 'selected' : ''}`}
                      onClick={() => toggleExtra(extra)}
                    >
                      <div className="feature-check">
                        {formData.extras.includes(extra) && '✓'}
                      </div>
                      <div className="feature-icon">⚡</div>
                      <h4>{extra}</h4>
                      <div className="feature-price">+₹{extraPrices[extra].toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <h3 style={{marginTop: '2.5rem', marginBottom: '1rem'}}>Project Description *</h3>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={updateField}
                  rows="6"
                  placeholder="Describe your requirements, timeline, and expected outcomes..."
                  required
                />

                <div className="file-upload-section">
                  <h3>Upload Project Document (Optional)</h3>
                  <div className="file-upload-wrapper">
                    <input
                      ref={fileRef}
                      type="file"
                      id="file-upload"
                      accept="application/pdf"
                      onChange={onFileChange}
                      style={{display: 'none'}}
                    />
                    <label htmlFor="file-upload" className="file-upload-label">
                      <div className="file-upload-icon">📄</div>
                      <div className="file-upload-text">
                        {formData.projectPdf ? (
                          <>
                            <strong>{formData.projectPdf.name}</strong>
                            <span>Click to change file</span>
                          </>
                        ) : (
                          <>
                            <strong>Click to upload PDF</strong>
                            <span>or drag and drop (max {maxUploadMb}MB)</span>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Quote Summary */}
                <div className="final-quote-summary">
                  <h3>Your Quote Summary</h3>
                  <div className="quote-breakdown">
                    <div className="quote-item">
                      <span>Base Cost:</span>
                      <strong>₹{(estimatedCost.base || 0).toLocaleString()}</strong>
                    </div>
                    <div className="quote-item">
                      <span>Features:</span>
                      <strong>₹{(estimatedCost.extras || 0).toLocaleString()}</strong>
                    </div>
                    <div className="quote-total">
                      <span>Total Amount:</span>
                      <strong>₹{(estimatedCost.total || 0).toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {feedback.message && (
              <p className={`form-feedback ${feedback.type}`}>{feedback.message}</p>
            )}

            {/* Navigation Buttons */}
            <div className="wizard-actions">
              {currentStep > 1 && (
                <button type="button" className="btn btn-ghost" onClick={prevStep}>
                  ← Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next →
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner spinner-small" style={{marginRight: '8px'}}></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Live Price Display */}
          {formData.projectType && (
            <div className="live-quote-sidebar">
              <h3>Live Quote</h3>
              <div className="live-quote-amount">
                ₹{(estimatedCost.total || 0).toLocaleString()}
              </div>
              <div className="live-quote-details">
                <p><strong>{formData.projectType}</strong></p>
                {formData.extras.length > 0 && (
                  <p>{formData.extras.length} feature(s) added</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
}

export default GetQuotePage;
