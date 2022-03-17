window.onload = function () {
  let editBtns = document.getElementsByClassName("edit-btn");
  let form = document.getElementById("my-form");
  [...editBtns].forEach((btn) => {
    btn.addEventListener("click", function (e) {
      let { name, phone, email, id } = e.target.dataset;
      form[0].value = name;
      form[1].value = phone;
      form[2].value = email;
      form[3].value = id;
      form[4].value = "update";
    });
  });
};
