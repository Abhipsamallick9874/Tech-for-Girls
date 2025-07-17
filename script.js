const form = document.getElementById('registration-form');
const whatsappShareBtn = document.getElementById('whatsapp-share');
const clickCountElement = document.getElementById('click-count');
const submitBtn = document.getElementById('submit-btn');
const successMessageElement = document.getElementById('success-message');

let clickCount = 0;
let submitted = localStorage.getItem('submitted');

if (submitted) {
  form.style.display = 'none';
  successMessageElement.style.display = 'block';
}

whatsappShareBtn.addEventListener('click', () => {
  clickCount++;
  clickCountElement.textContent = 'Click count: ${clickCount}/5';
  if (clickCount >= 5) {
    clickCountElement.textContent = 'Sharing complete. Please continue.';
  }
  const message = 'Hey Buddy, Join Tech For Girls Community';
  const whatsappUrl = 'https://wa.me/?text=${encodeURIComponent(message)}';
  window.open(whatsappUrl, '_blank');
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(clickCount<5){
        alert('Please share on whatsapp 5 times before submitting.')
        return;
    }
    const formData = new formData(form);
    /*Replace 'YOUR_GOOGLE_APP_SCRIPT_WEB_APP_URL' with your actual Google App url*/
    const url='YOUR_GOOGLE_APP_SCRIPT_WEB_APP_URL';
    fetch(url,{
        method:'POST',
        body:formData,
    })
    .then((Response)=>Response.json())
    .then((data)=>{
        if(data.result==='success'){
            localStorage.setItem('submitted','true');
            form.style.display='none';
            successMessageElement.style.display='block';
        }else{
            alert('Error submitting form,please try again.');
        }
    })
    .catch((error)=>{
        console.error(error);
        alert('Error submitting form,please try again.');
    });
});