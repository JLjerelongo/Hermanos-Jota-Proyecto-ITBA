// Configuración de códigos de país y formatos de teléfono
const countryFormats = {
  "+54": { format: "XXX XXX-XXXX", placeholder: "3455-6789" }, // Argentina
  "+1": { format: "XXX XXX-XXXX", placeholder: "555 123-4567" }, // USA/Canada
  "+34": { format: "XXX XXX XXX", placeholder: "612 345 678" }, // España
  "+33": { format: "X XX XX XX XX", placeholder: "1 23 45 67 89" }, // Francia
  "+49": { format: "XXX XXX XXXX", placeholder: "30 123 4567" }, // Alemania
  "+39": { format: "XXX XXX XXXX", placeholder: "02 123 4567" }, // Italia
  "+44": { format: "XXXX XXXXXX", placeholder: "20 7946 0958" }, // Reino Unido
  "+55": { format: "XX XXXXX-XXXX", placeholder: "11 98765-4321" }, // Brasil
  "+56": { format: "X XXXX XXXX", placeholder: "2 2123 4567" }, // Chile
  "+57": { format: "XXX XXX XXXX", placeholder: "1 234 5678" }, // Colombia
  "+58": { format: "XXX XXX-XXXX", placeholder: "212 123-4567" }, // Venezuela
  "+51": { format: "XXX XXX XXX", placeholder: "1 234 567" }, // Perú
  "+593": { format: "XX XXX XXXX", placeholder: "2 234 5678" }, // Ecuador
  "+591": { format: "X XXX XXXX", placeholder: "2 212 3456" }, // Bolivia
  "+595": { format: "XX XXX XXX", placeholder: "21 234 567" }, // Paraguay
  "+598": { format: "XX XXX XXXX", placeholder: "2 123 4567" }, // Uruguay
};

// Elementos del DOM
const form = document.getElementById("contactForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const countryCodeSelect = document.getElementById("countryCode");
const messageInput = document.getElementById("message");

// Elementos de error
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");

// Función para limpiar mensajes de error
function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.style.display = "none";
}

// Función para mostrar mensaje de error
function showError(errorElement, message) {
  errorElement.textContent = `* ${message}`;
  errorElement.style.display = "block";
}

// Validación de nombre y apellido
function validateName(name, fieldName) {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (!name.trim()) {
    return `${fieldName} es obligatorio`;
  }

  if (name.trim().length < 3) {
    return `${fieldName} debe tener al menos 3 caracteres`;
  }

  if (name.trim().length > 50) {
    return `${fieldName} no puede tener más de 50 caracteres`;
  }

  if (!nameRegex.test(name)) {
    return `${fieldName} solo puede contener letras`;
  }

  return "";
}

// Validación de email
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email.trim()) {
    return "El correo electrónico es obligatorio";
  }

  if (!emailRegex.test(email)) {
    return "El formato del correo electrónico no es válido";
  }

  // Validación adicional para dominios comunes
  const domain = email.split("@")[1];
  const validDomains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "live.com",
    "icloud.com",
    "aol.com",
  ];

  if (!validDomains.includes(domain.toLowerCase()) && !domain.includes(".")) {
    return "El dominio del correo electrónico no es válido";
  }

  return "";
}

// Validación de teléfono
function validatePhone(phone) {
  if (!phone.trim()) {
    return "El teléfono es obligatorio";
  }

  // Remover todos los caracteres no numéricos para la validación
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length < 7) {
    return "El teléfono debe tener al menos 7 dígitos";
  }

  if (cleanPhone.length > 15) {
    return "El teléfono no puede tener más de 15 dígitos";
  }

  return "";
}

// Formateo automático del teléfono
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "");
  const countryCode = countryCodeSelect.value;
  const format = countryFormats[countryCode].format;

  if (value.length === 0) return;

  let formattedValue = "";
  let valueIndex = 0;

  for (let i = 0; i < format.length && valueIndex < value.length; i++) {
    if (format[i] === "X") {
      formattedValue += value[valueIndex];
      valueIndex++;
    } else {
      formattedValue += format[i];
    }
  }

  input.value = formattedValue;
}

// Cambio de código de país
function onCountryCodeChange() {
  const countryCode = countryCodeSelect.value;
  const format = countryFormats[countryCode];

  phoneInput.placeholder = format.placeholder;
  phoneInput.value = "";
  clearError(phoneError);
}

// Validación en tiempo real
function setupRealTimeValidation() {
  // Validación de nombre
  firstNameInput.addEventListener("input", () => {
    const error = validateName(firstNameInput.value, "Nombre");
    if (error) {
      showError(firstNameError, error);
    } else {
      clearError(firstNameError);
    }
  });

  // Validación de apellido
  lastNameInput.addEventListener("input", () => {
    const error = validateName(lastNameInput.value, "Apellido");
    if (error) {
      showError(lastNameError, error);
    } else {
      clearError(lastNameError);
    }
  });

  // Validación de email
  emailInput.addEventListener("input", () => {
    const error = validateEmail(emailInput.value);
    if (error) {
      showError(emailError, error);
    } else {
      clearError(emailError);
    }
  });

  // Validación y formateo de teléfono
  phoneInput.addEventListener("input", () => {
    formatPhoneNumber(phoneInput);
    const error = validatePhone(phoneInput.value);
    if (error) {
      showError(phoneError, error);
    } else {
      clearError(phoneError);
    }
  });

  // Cambio de código de país
  countryCodeSelect.addEventListener("change", onCountryCodeChange);
}

// Validación del formulario completo
function validateForm() {
  let isValid = true;

  // Validar nombre
  const firstNameError = validateName(firstNameInput.value, "Nombre");
  if (firstNameError) {
    showError(document.getElementById("firstNameError"), firstNameError);
    isValid = false;
  }

  // Validar apellido
  const lastNameError = validateName(lastNameInput.value, "Apellido");
  if (lastNameError) {
    showError(document.getElementById("lastNameError"), lastNameError);
    isValid = false;
  }

  // Validar email
  const emailError = validateEmail(emailInput.value);
  if (emailError) {
    showError(document.getElementById("emailError"), emailError);
    isValid = false;
  }

  // Validar teléfono
  const phoneError = validatePhone(phoneInput.value);
  if (phoneError) {
    showError(document.getElementById("phoneError"), phoneError);
    isValid = false;
  }

  return isValid;
}

// Función para crear y mostrar el modal de éxito
function showSuccessModal() {
  // Crear el overlay (fondo gris)
  const overlay = document.createElement("div");
  overlay.className = "success-overlay";

  // Crear el modal
  const modal = document.createElement("div");
  modal.className = "success-modal";

  // Contenido del modal
  modal.innerHTML = `
    <div class="success-icon">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    </div>
    <h3 class="success-title">¡Mensaje enviado!</h3>
    <p class="success-message">Tu consulta ha sido recibida correctamente. Te responderemos a la brevedad.</p>
  `;

  // Agregar al DOM
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Mostrar con animación
  setTimeout(() => {
    overlay.classList.add("show");
    modal.classList.add("show");
  }, 10);

  // Ocultar después de 3 segundos
  setTimeout(() => {
    overlay.classList.remove("show");
    modal.classList.remove("show");

    // Remover del DOM después de la animación
    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.removeChild(modal);
    }, 300);
  }, 3000);
}

// Manejo del envío del formulario
function handleSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    // Mostrar el modal de éxito
    showSuccessModal();

    // Limpiar el formulario
    form.reset();
    clearError(firstNameError);
    clearError(lastNameError);
    clearError(emailError);
    clearError(phoneError);
    clearError(messageError);

    // Restaurar el formato inicial del teléfono
    onCountryCodeChange();
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  setupRealTimeValidation();
  form.addEventListener("submit", handleSubmit);

  // Configurar el formato inicial del teléfono
  onCountryCodeChange();
});
