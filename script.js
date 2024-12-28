document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.left = '50px';
      img.style.top = '50px';
      img.draggable = false;

      const removeButton = document.createElement('button');
      removeButton.innerText = 'X';
      removeButton.onclick = () => img.remove();

      img.onclick = () => {
        const scale = prompt('Enter scale (e.g., 1.5 for 150%):', 1);
        if (scale) img.style.transform = `scale(${scale})`;
      };

      img.addEventListener('mousedown', (e) => {
        let offsetX = e.clientX - img.offsetLeft;
        let offsetY = e.clientY - img.offsetTop;

        const move = (event) => {
          img.style.left = `${event.clientX - offsetX}px`;
          img.style.top = `${event.clientY - offsetY}px`;
        };

        const stopMove = () => {
          document.removeEventListener('mousemove', move);
          document.removeEventListener('mouseup', stopMove);
        };

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', stopMove);
      });

      const container = document.createElement('div');
      container.style.position = 'relative';
      container.appendChild(img);
      container.appendChild(removeButton);

      document.getElementById('canvas').appendChild(container);
    };
    reader.readAsDataURL(file);
  }
});
