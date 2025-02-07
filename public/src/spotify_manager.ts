
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("uploadForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    uploadFolder();
  });
});

async function uploadFolder() {
  console.log('uploading')
  const input = document.getElementById("folderUpload") as HTMLInputElement;
  const files = input.files;
  if (files) {
    if (files.length === 0) {
      alert("No files selected!");
      return;
    }

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file); // Send each file
    }

    const response = await fetch("http://localhost:3000/upload-folder", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  } else {
    alert("No files selected!");
  }
}