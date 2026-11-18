const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // Accept POST requests only
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const {
      fullName,
      phone,
      email,
      city,
      customerType,
      companyName,
      interest,
      message
    } = req.body || {};

    // Basic required-field validation
    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !city?.trim() ||
      !customerType
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields.'
      });
    }

    // Send enquiry notification to GRAY Mobility
    const { data, error } = await resend.emails.send({
      from: 'GRAY Mobility Website <website@graymobility.ai>',
      to: ['hello@graymobility.ai'],
      replyTo: email,
      subject: `New Website Enquiry – ${fullName}`,
      text: `
New enquiry received from the GRAY Mobility website.

Name: ${fullName}
Phone: ${phone}
Email: ${email}
City: ${city}
Enquiry Type: ${customerType}
Company: ${companyName || 'Not provided'}
Interest: ${interest || 'Not specified'}

Message:
${message || 'No additional message'}
      `
    });

    if (error) {
      console.error('Resend error:', error);

      return res.status(500).json({
        success: false,
        message: 'Unable to send enquiry.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully.'
    });

  } catch (error) {
    console.error('Enquiry API error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong.'
    });
  }
};
