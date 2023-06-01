/**
 * In order to avoid repeating code we deal with the error
 * messages in the renderError function, where we recieve
 * two parameters, the reason for the error and the element
 * which caused it.
 */
function renderError(status, element) {
  // The error message is shown next to the
  // input field causing the error
  const errorMsg = element.nextElementSibling;

  switch (status) {
    case "empty":
      errorMsg.textContent = "Can't be blank";
      element.style.borderColor = "red";
      break;
    case "invalid":
      errorMsg.textContent = "Invalid value";
      element.style.borderColor = "red";
      break;
    // The default behaviour is to "clean" the error message
    default:
      errorMsg.textContent = "";
      element.style.borderColor = null;
  }
}

const cardFormatValidation = (cardNumber) => {
  // To check if the card number is valid I compare the input
  // value to the 4 major credit card networks in the west
  const visaFormat = /^4\d{3}[-. ]?(\d{4}[-. ]?){3}$/;
  const masterCardFormat = /^5[1-5]\d{2}[-. ]?(\d{4}[-. ]?){3}$/;
  const americanExFormat = /^3[47]\d{2}[-. ]?\d{6}[-. ]?\d{5}$/;
  const discoverFormat =
    /^6011[-. ]?(\d{4}[-. ]?){3}$|^5\d{3}[-. ]?(\d{4}[-. ]?){3}$/;

  // If the validation is correct for any of the possible
  // formats it returns true, false when none pass
  return (
    visaFormat.test(cardNumber) ||
    masterCardFormat.test(cardNumber || americanExFormat.test(cardNumber)) ||
    discoverFormat.test(cardNumber)
  );
};

const validateName = (inputfullName) => {
  // We only check if the name field is empty
  if (inputfullName.value === "") {
    renderError("empty", inputfullName);
    return false;
  }

  // Every one of the validation functions "clean"
  // the error message if all the validations pass
  renderError("", inputfullName);
  return true;
};

const validateNumber = (inputcardNumber) => {
  // If desired, whitespaces can be removed with:
  // "element".value.replace(/\s/g, "")

  // Checking if the field is empty
  if (inputcardNumber.value === "") {
    renderError("empty", inputcardNumber);
    return false;
  }

  // Checking to see if the number format is valid
  if (!cardFormatValidation(inputcardNumber.value)) {
    renderError("invalid", inputcardNumber);
    return false;
  }
  renderError("", inputcardNumber);
  return true;
};

const validateDate = (inputMonth, inputYear) => {
  // I'm still thinking of a clean way of dealing
  // with the validation for the expiration date fields
  const errorDate = document.querySelector(".errorDate");
  // Cheking if the fields are empty
  if (inputMonth.value === "" || inputYear.value === "") {
    errorDate.textContent = "Can't be blank";
    inputMonth.style.borderColor = inputMonth.value === "" ? "red" : null;
    inputYear.style.borderColor = inputYear.value === "" ? "red" : null;
    return false;
  }

  // RegExp of valid values for month and year fields
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^[2-9]\d$/;

  // Checking to see if the date format is valid

  if (!monthRegex.test(inputMonth.value) || !yearRegex.test(inputYear.value)) {
    errorDate.textContent = "Invalid value";
    inputMonth.style.borderColor = monthRegex.test(inputMonth.value)
      ? null
      : "red";
    inputYear.style.borderColor = yearRegex.test(inputYear.value)
      ? null
      : "red";
    return false;
  }
  errorDate.textContent = "";
  inputMonth.style.borderColor = null;
  inputYear.style.borderColor = null;
  return true;
};

const validatecvc = (inputCVC) => {
  // Checking if field is empty
  if (inputCVC.value === "") {
    renderError("empty", inputCVC);
    return false;
  }

  // Checking to see if the cvc format is valid

  // RegExp of valid values for cvc field
  const cvcRegExp = /^\d{3,4}$/;

  if (!cvcRegExp.test(inputCVC.value)) {
    renderError("invalid", inputCVC);
    return false;
  }
  renderError("", inputCVC);
  return true;
};

// When the form is submitted, we activate the validation function
document.querySelector("form").addEventListener("submit", () => {
  const inputfullName = document.getElementById("inputFullName");
  const inputcardNumber = document.getElementById("inputCardNumber");
  const inputMonth = document.getElementById("inputMonth");
  const inputYear = document.getElementById("inputYear");
  const inputCVC = document.getElementById("inputCode");

  const nameValidated = validateName(inputfullName);
  const cardNumberValidated = validateNumber(inputcardNumber);
  const dateValidated = validateDate(inputMonth, inputYear);
  const cvcValidated = validatecvc(inputCVC);

  if (!nameValidated || !cardNumberValidated || !dateValidated || !cvcValidated)
    return;

  // In the future I want to add some animation to this event
  document.querySelector("main").classList.add("hide");
  document.querySelector(".completedMSG").classList.remove("hide");
});

// When the user presses the "continue" button it resets the app
document.getElementById("reset").addEventListener("click", function () {
  document.getElementById("inputFullName").value = null;
  document.getElementById("inputCardNumber").value = null;
  document.getElementById("inputMonth").value = null;
  document.getElementById("inputYear").value = null;
  document.getElementById("inputCode").value = null;

  document.querySelector(".name").textContent = "Jane Appleseed";
  document.querySelector(".numbers").textContent = "0000 0000 0000 0000";
  document.querySelector(".monthValue").textContent = "00";
  document.querySelector(".yearValue").textContent = "00";
  document.querySelector(".code").textContent = "000";

  document.querySelector("main").classList.remove("hide");
  document.querySelector(".completedMSG").classList.add("hide");
});

document.getElementById("inputFullName").addEventListener("input", (e) => {
  document.querySelector(".name").textContent = e.target.value;
});

document.getElementById("inputCardNumber").addEventListener("input", (e) => {
  document.querySelector(".numbers").textContent = e.target.value;
});
document.getElementById("inputMonth").addEventListener("input", (e) => {
  document.querySelector(".monthValue").textContent = e.target.value;
});

document.getElementById("inputYear").addEventListener("input", (e) => {
  document.querySelector(".yearValue").textContent = e.target.value;
});

document.getElementById("inputCode").addEventListener("input", (e) => {
  document.querySelector(".code").textContent = e.target.value;
});
