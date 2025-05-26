// script.js
const imageInput = document.getElementById('imageInput');
const formatSelect = document.getElementById('formatSelect');
const convertBtn = document.getElementById('convertBtn');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('preview');

let img = new Image();

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    img.onload = () => {
      preview.src = event.target.result;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

convertBtn.addEventListener('click', () => {
  if (!img.src) {
    alert("Please upload an image first.");
    return;
  }

  const format = formatSelect.value;
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  canvas.toBlob((blob) => {
    const link = document.createElement('a');
    link.download = `converted.${format.split('/')[1]}`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, format);
});

  const dropContainer = document.getElementById("dropcontainer")
  const fileInput = document.getElementById("imageInput")

  dropContainer.addEventListener("dragover", (e) => {
    // prevent default to allow drop
    e.preventDefault()
  }, false)

  dropContainer.addEventListener("dragenter", () => {
    dropContainer.classList.add("drag-active")
  })

  dropContainer.addEventListener("dragleave", () => {
    dropContainer.classList.remove("drag-active")
  })

  dropContainer.addEventListener("drop", (e) => {
    e.preventDefault()
    dropContainer.classList.remove("drag-active")
    fileInput.files = e.dataTransfer.files
  })
