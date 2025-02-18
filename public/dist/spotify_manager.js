"use strict";
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("uploadForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (confirm("Are you sure you want to upload files? Any files you uploaded before will be deleted.")) {
            uploadFolder();
        }
    });
});
async function uploadFolder() {
    console.log('uploading');
    const input = document.getElementById("folderUpload");
    const files = input.files;
    if (files) {
        if (files.length === 0) {
            alert("No files selected!");
            return;
        }
        const filesArray = Array.from(files);
        const formData = new FormData();
        for (let file of filesArray) {
            formData.append("files", file); // Send each file
        }
        const response = await fetch("http://localhost:3000/api/upload-folder", {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        console.log(result);
    }
    else {
        alert("No files selected!");
    }
}
