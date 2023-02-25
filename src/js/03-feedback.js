const formData = JSON.parse(saveValue)  {};

const refs = {
  form: document.querySelector(`.feedback-form`),
  input: document.querySelector(`.feedback-form input`),
  textarea: document.querySelector(`.feedback-form textarea`),
}

refs.form.addEventListener('input', throttle(onInput));
refs.form.addEventListener('submit', throttle(onFromSubmit));

function onInput(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFromSubmit(event) {
  event.preventDefault();

  const saveData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(saveData);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  delete formData.email;
  delete formData.message;
}

function onLoad() {
    refs.input.value = formData?.email || '';
    refs.textarea.value = formData?.message || '';
}

document.addEventListener('DOMContentLoaded', onLoad);