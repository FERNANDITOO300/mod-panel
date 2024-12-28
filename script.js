const canvas = document.getElementById("canvas");
const fileInput = document.getElementById("fileInput");
const addMediaButton = document.getElementById("addMediaButton");

addMediaButton.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("image") ? "img" : "video";

    const element = document.createElement(type);
    element.src = url;
    element.classList.add("media");
    element.draggable = true;
    element.style.width = "200px"; // Tamaño inicial
    element.style.top = "50px";
    element.style.left = "50px";

    if (type === "video") {
        element.autoplay = true;
        element.loop = true;
        element.muted = true;
    }

    canvas.appendChild(element);

    // Drag and Drop
    element.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", null);
        element.dataset.offsetX = e.offsetX;
        element.dataset.offsetY = e.offsetY;
    });

    canvas.addEventListener("dragover", (e) => e.preventDefault());

    canvas.addEventListener("drop", (e) => {
        e.preventDefault();
        const offsetX = e.target.dataset.offsetX || 0;
        const offsetY = e.target.dataset.offsetY || 0;
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
    });
});
