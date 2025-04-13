import axios from 'axios';

const sendVerificationEmail = async (name, email, link) => {
  try {
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY, // not private key
      accessToken: process.env.EMAILJS_PRIVATE_KEY, // this is actually needed for secure backend usage
      template_params: {
        name,
        email,
        message: `Click the link to verify your email: ${link}`,
      },
    });

    console.log('✅ Email sent:', response.status);
  } catch (error) {
    console.error('❌ EmailJS failed:', error.response?.data || error.message);
    throw new Error('Failed to send email');
  }
};

export default sendVerificationEmail;
