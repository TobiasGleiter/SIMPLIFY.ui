const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const userName = user_name.shadowRoot.querySelector('input').value;
  const userMail = user_mail.shadowRoot.querySelector('input').value;
  const userMessage = user_message.shadowRoot.querySelector('textarea').value;
  const userSex = user_sex.shadowRoot.querySelector('select').value;

  console.log('Form data:', userName, userMail, userSex, userMessage);
});
