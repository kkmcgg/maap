
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Panning and Color Display</title>
    <style>
        #container {
            width: 500px;
            height: 500px;
            overflow: hidden;
            position: relative;
            border: 1px solid #000;
        }

        #image {
            position: absolute;
            cursor: move;
        }

        #color-display {
            margin-top: 10px;
            width: 50px;
            height: 50px;
            border: 1px solid #000;
        }
    </style>
</head>
<body>
    <div id="container">
        <img id="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png" alt="Pan Image">
    </div>
    <div>
        <span>Color at mouse location:</span>
        <div id="color-display"></div>
    </div>

    <script>
        const image = document.getElementById('image');
        const colorDisplay = document.getElementById('color-display');
        let isDragging = false;
        let startX, startY, offsetX, offsetY;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        image.addEventListener('load', () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        });

        image.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            offsetX = image.offsetLeft;
            offsetY = image.offsetTop;
        });

        image.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                image.style.left = `${offsetX + dx}px`;
                image.style.top = `${offsetY + dy}px`;
            }

            const rect = image.getBoundingClientRect();
            const x = Math.floor(e.clientX - rect.left);
            const y = Math.floor(e.clientY - rect.top);
            const colorData = ctx.getImageData(x, y, 1, 1).data;
            const rgbaColor = `rgba(${colorData[0]}, ${colorData[1]}, ${colorData[2]}, ${colorData[3] / 255})`;
            colorDisplay.style.backgroundColor = rgbaColor;
        });

        image.addEventListener('mouseup', () => {
            isDragging = false;
        });

        image.addEventListener('mouseleave', () => {
            isDragging = false;
        });
    </script>
</body>
</html>
