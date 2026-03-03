const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const resultPara = document.getElementById("para");

let selectedImages = [];

// Image classes
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Initialize images
function loadImages() {
  imageContainer.innerHTML = "";
  selectedImages = [];
  resultPara.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  let images = [...imageClasses];

  // Choose random image to duplicate
  let duplicateIndex = Math.floor(Math.random() * imageClasses.length);
  images.push(imageClasses[duplicateIndex]);

  shuffle(images);

  images.forEach((cls, index) => {
    let img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.class = cls;
    img.id = "img" + (index + 1);

    img.addEventListener("click", handleClick);
    imageContainer.appendChild(img);
  });
}

// Handle image click
function handleClick(e) {
  const img = e.target;

  if (selectedImages.includes(img)) return;
  if (selectedImages.length >= 2) return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length >= 1) {
    resetBtn.style.display = "inline-block";
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset functionality
resetBtn.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resultPara.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
});

// Verify functionality
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [img1, img2] = selectedImages;

  if (img1.dataset.class === img2.dataset.class) {
    resultPara.textContent = "You are a human. Congratulations!";
  } else {
    resultPara.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Load on page start
loadImages();