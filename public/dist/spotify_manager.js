"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        if (!((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a.length)) {
            console.error("No file selected.");
            return;
        }
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        try {
            const response = yield fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });
            const result = yield response.json();
            console.log("Upload successful:", result);
        }
        catch (error) {
            console.error("Upload failed:", error);
        }
    }));
});
