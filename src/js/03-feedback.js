import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
const savedValues = localStorage.getItem(STORAGE_KEY);
const savedDataObject = JSON.parse(savedValues);

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form  textarea'),
};

refs.form.addEventListener('input', throttle(formStorage, 500));
refs.form.addEventListener('submit', submitForm);

reloadPage();

function formStorage(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function submitForm(e) {
  e.preventDefault();

  const savedDatas = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedDatas);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function reloadPage() {
  if (savedValues) {

    refs.input.value = savedDataObject.email || '';
    refs.textarea.value = savedDataObject.message || '';
  }
}
