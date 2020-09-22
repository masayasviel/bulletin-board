class Canvas {
    constructor() {
        this.width = 500;
        this.height = 300;
        this.currentColor = "#000000";

        this.canvas = document.getElementById("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        
        this.init();

        let x = 0;
        let y = 0;
        let isDrawing = false;

        const dragEnd = e => {
            if (isDrawing) {
                this.draw(x, y, e.offsetX, e.offsetY);
                x = 0;
                y = 0;
                isDrawing = false;
            }
        };

        this.canvas.addEventListener("mousedown", e => {
            x = e.offsetX;
            y = e.offsetY;
            isDrawing = true;
        });
        this.canvas.addEventListener("mouseup", dragEnd);
        this.canvas.addEventListener("mouseout", dragEnd);
        this.canvas.addEventListener("mousemove", e => {
            if (isDrawing) {
                this.draw(x, y, e.offsetX, e.offsetY);
                x = e.offsetX;
                y = e.offsetY;
            }
        });
    }
    init() {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineWidth = 3
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    changeColor(colorCode) {
        this.currentColor = colorCode;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.init();
    }
    exportImage() {
        const canvasImage = this.canvas.toDataURL("image/jpeg");
        return canvasImage;
    }
}