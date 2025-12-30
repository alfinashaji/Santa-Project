const submitBtn = document.getElementById("submitBtn");
const wishListDiv = document.getElementById("wishList");

let wishes = JSON.parse(localStorage.getItem("wishes")) || [];

// Render wishes
function renderWishes() {
  wishListDiv.innerHTML = "";
  wishes.forEach((w, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
      <div class="card ${w.replied ? "bg-light" : "bg-white"} shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-danger">${w.name}</h5>
          <p class="card-text">${w.wish}</p>
          ${
            w.replied
              ? '<span class="badge bg-success">✅ Replied</span>'
              : `<button class="btn btn-primary btn-sm" onclick="replyWish(${index})">Reply</button>`
          }
        </div>
      </div>
    `;
    wishListDiv.appendChild(card);
  });
}

// Add wish
submitBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const wish = document.getElementById("wish").value.trim();

  if (!name || !wish) return alert("Please enter your name and wish!");

  wishes.push({name, wish, replied: false});
  localStorage.setItem("wishes", JSON.stringify(wishes));
  document.getElementById("name").value = "";
  document.getElementById("wish").value = "";
  renderWishes();
});

// Reply to wish
function replyWish(index) {
  wishes[index].replied = true;
  localStorage.setItem("wishes", JSON.stringify(wishes));
  renderWishes();
}

// Initial render
renderWishes();
