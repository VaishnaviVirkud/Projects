//navigation hide
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a){
    a.addEventListener("click", function(){
        navCollapse.classList.remove("show");
    })
})


//contact-form
/*

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwJyKrmu2wNrXxzhr2ddQgUW2vBHukgDrGHhqxmw1aj51fmsSef1hdoWtKD6QLhHpXJiQ/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
*/

//form submitted alert

/*function Submitted(){
    alert("We are connected!!!")
}*/

function Submitted() {
    var txt;
    if (confirm("We are now connected!!!")) {
      txt = "Connected";
    } else {
      txt = "Please try to connect again :) ";
    }
    document.getElementById("form-btn").innerHTML = txt;
  }