
(() => {
  const form = document.getElementById('enquiryForm');
  const type = document.getElementById('customerType');
  const companyWrap = document.getElementById('companyField');
  const companyInput = document.getElementById('companyName');
  const consent = document.getElementById('consent');
  const consentError = document.getElementById('consentError');
  const overlay = document.getElementById('successOverlay');
  const closeButton = document.getElementById('successClose');
  const submitButton = form.querySelector('button[type="submit"]');

  // Status message for sending errors
  const statusMessage = document.createElement('p');
  statusMessage.setAttribute('role', 'status');
  statusMessage.setAttribute('aria-live', 'polite');
  statusMessage.className = 'form-status';

  const submitRow = form.querySelector('.form-submit-row');
  form.insertBefore(statusMessage, submitRow);

  document.getElementById('year').textContent =
    new Date().getFullYear();

  function updateCompanyField() {
    const isCompany = type.value === 'Company / Business';

    companyWrap.classList.toggle('is-hidden', !isCompany);
    companyInput.required = isCompany;

    if (!isCompany) {
      companyInput.value = '';
      clearFieldError(companyInput);
    }
  }

  function clearFieldError(input) {
    const field = input.closest('.form-field');
    if (!field) return;

    field.classList.remove('has-error');

    const error = field.querySelector('.field-error');
    if (error) error.textContent = '';

    input.removeAttribute('aria-invalid');
  }

  function setFieldError(input, message) {
    const field = input.closest('.form-field');

    field.classList.add('has-error');

    const error = field.querySelector('.field-error');
    if (error) error.textContent = message;

    input.setAttribute('aria-invalid', 'true');
  }

  function validateField(input) {
    clearFieldError(input);

    const value = input.value.trim();

    if (input.required && !value) {
      setFieldError(input, 'Please complete this field.');
      return false;
    }

    if (!value) return true;

    if (input.name === 'fullName' && value.length < 2) {
      setFieldError(input, 'Please enter your full name.');
      return false;
    }

    if (input.name === 'phone') {
      const digits = value.replace(/\D/g, '');

      if (digits.length < 7 || digits.length > 15) {
        setFieldError(
          input,
          'Enter a valid phone number, including country code.'
        );
        return false;
      }
    }

    if (input.name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailPattern.test(value)) {
        setFieldError(input, 'Enter a valid email address.');
        return false;
      }
    }

    if (input.name === 'companyName' && value.length < 2) {
      setFieldError(
        input,
        'Please enter your company or organisation name.'
      );
      return false;
    }

    return true;
  }

  type.addEventListener('change', updateCompanyField);

  form.querySelectorAll(
    'input:not([type="checkbox"]), select, textarea'
  ).forEach(input => {

    input.addEventListener('blur', () => validateField(input));

    input.addEventListener('input', () => {
      if (input.closest('.form-field')?.classList.contains('has-error')) {
        validateField(input);
      }
    });

    input.addEventListener('change', () => {
      if (input.closest('.form-field')?.classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  consent.addEventListener('change', () => {
    if (consent.checked) {
      consentError.textContent = '';
    }
  });

  function openSuccess() {
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    closeButton.focus();
  }

  function closeSuccess() {
    overlay.hidden = true;
    document.body.classList.remove('modal-open');
    window.location.href = 'index.html#contact';
  }

  // Actual backend email submission
  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (submitButton.disabled) return;

    let valid = true;

    const fields = [
      ...form.querySelectorAll(
        '.form-field input[required], .form-field select[required]'
      )
    ];

    fields.forEach(input => {
      if (!validateField(input)) valid = false;
    });

    consentError.textContent = '';

    if (!consent.checked) {
      consentError.textContent =
        'Please confirm your consent before submitting.';
      valid = false;
    }

    if (!valid) {
      const firstInvalid =
        form.querySelector('[aria-invalid="true"]') || consent;

      firstInvalid.focus();
      firstInvalid.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      return;
    }

    statusMessage.textContent = '';

    // Collect enquiry details
    const enquiryData = {
      fullName: form.elements.fullName.value.trim(),
      phone: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim(),
      city: form.elements.city.value.trim(),
      customerType: form.elements.customerType.value,
      companyName: form.elements.companyName.value.trim(),
      interest: form.elements.interest.value,
      message: form.elements.message.value.trim()
    };

    // Prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(enquiryData)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to submit your enquiry.'
        );
      }

      // Email sent successfully
      form.reset();
      updateCompanyField();

      form.querySelectorAll('.form-field').forEach(field => {
        field.classList.remove('has-error');
      });

      form.querySelectorAll('.field-error').forEach(error => {
        error.textContent = '';
      });

      consentError.textContent = '';
      statusMessage.textContent = '';

      openSuccess();

    } catch (error) {
      console.error('Enquiry submission error:', error);

      statusMessage.textContent =
        error.message ||
        'Unable to send your enquiry. Please try again.';

    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML =
        'Submit enquiry <span>↗</span>';
    }
  });

  closeButton.addEventListener('click', closeSuccess);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeSuccess();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !overlay.hidden) {
      closeSuccess();
    }
  });

  updateCompanyField();

})();
