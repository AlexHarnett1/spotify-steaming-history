


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("uploadForm") as HTMLFormElement;
  const fileInput = document.getElementById("fileInput") as HTMLInputElement;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!fileInput.files?.length) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  });

})