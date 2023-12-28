export class Cube {
    constructor(target) {
        this.container = target instanceof HTMLDocument ? target.body : target;
        this.COLOR_BG = "white";
        this.COLOR_CUBE = "black";
        this.SPEED_X = 0; // Rotation speed on X-axis
        this.SPEED_Y = 0; // Rotation speed on Y-axis
        this.SPEED_Z = 0; // Rotation speed on Z-axis

        this.POINT3D = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };

        this.init();
    }

    init() {
        // Set up the canvas and context
        this.canvas = this.container.ownerDocument.createElement("canvas");
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        // Dimensions
        this.h = this.container.clientHeight;
        this.w = this.container.clientWidth;
        this.canvas.height = this.h;
        this.canvas.width = this.w;

        // Styles
        this.ctx.fillStyle = this.COLOR_BG;
        this.ctx.strokeStyle = this.COLOR_CUBE;
        this.ctx.lineWidth = this.w / 50;
        this.ctx.lineCap = "round";

        // Cube parameters
        this.cx = this.w / 2;
        this.cy = this.h / 2;
        this.cz = 0;
        this.size = this.h / 4;
        this.vertices = [
            new this.POINT3D(this.cx - this.size, this.cy - this.size, this.cz - this.size),
            new this.POINT3D(this.cx + this.size, this.cy - this.size, this.cz - this.size),
            new this.POINT3D(this.cx + this.size, this.cy + this.size, this.cz - this.size),
            new this.POINT3D(this.cx - this.size, this.cy + this.size, this.cz - this.size),
            new this.POINT3D(this.cx - this.size, this.cy - this.size, this.cz + this.size),
            new this.POINT3D(this.cx + this.size, this.cy - this.size, this.cz + this.size),
            new this.POINT3D(this.cx + this.size, this.cy + this.size, this.cz + this.size),
            new this.POINT3D(this.cx - this.size, this.cy + this.size, this.cz + this.size)
        ];

        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // back face
            [4, 5], [5, 6], [6, 7], [7, 4], // front face
            [0, 4], [1, 5], [2, 6], [3, 7]  // connecting sides
        ];

        // Start the animation loop
        this.timeLast = 0;
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timeNow) {
        const timeDelta = timeNow - this.timeLast;
        this.timeLast = timeNow;

        // Clear canvas
        this.ctx.fillRect(0, 0, this.w, this.h);

        // Rotate the cube
        this.rotateCube(timeDelta);

        // Draw the cube
        this.drawCube();

        // Call the next frame
        requestAnimationFrame(this.loop.bind(this));
    }

    rotateCube(timeDelta) {
        // Rotate along Z-axis
        let angleZ = timeDelta * 0.001 * this.SPEED_Z * Math.PI * 2;
        this.vertices.forEach(v => {
            let dx = v.x - this.cx;
            let dy = v.y - this.cy;
            let x = dx * Math.cos(angleZ) - dy * Math.sin(angleZ);
            let y = dx * Math.sin(angleZ) + dy * Math.cos(angleZ);
            v.x = x + this.cx;
            v.y = y + this.cy;
        });

        // Rotate along X-axis
        let angleX = timeDelta * 0.001 * this.SPEED_X * Math.PI * 2;
        this.vertices.forEach(v => {
            let dy = v.y - this.cy;
            let dz = v.z - this.cz;
            let y = dy * Math.cos(angleX) - dz * Math.sin(angleX);
            let z = dy * Math.sin(angleX) + dz * Math.cos(angleX);
            v.y = y + this.cy;
            v.z = z + this.cz;
        });

        // Rotate along Y-axis
        let angleY = timeDelta * 0.001 * this.SPEED_Y * Math.PI * 2;
        this.vertices.forEach(v => {
            let dx = v.x - this.cx;
            let dz = v.z - this.cz;
            let x = dz * Math.sin(angleY) + dx * Math.cos(angleY);
            let z = dz * Math.cos(angleY) - dx * Math.sin(angleY);
            v.x = x + this.cx;
            v.z = z + this.cz;
        });
    }

    drawCube() {
        this.edges.forEach(edge => {
            this.ctx.beginPath();
            this.ctx.moveTo(this.vertices[edge[0]].x, this.vertices[edge[0]].y);
            this.ctx.lineTo(this.vertices[edge[1]].x, this.vertices[edge[1]].y);
            this.ctx.stroke();
        });
    }

    changeAngularVelocity(x, y, z) {
        this.SPEED_X = x;
        this.SPEED_Y = y;
        this.SPEED_Z = z;
    }

    changeXAxisAngularVelocity(x) {
        this.SPEED_X = x;
    }

    changeYAxisAngularVelocity(y) {
        this.SPEED_Y = y;
    }

    changeZAxisAngularVelocity(z) {
        this.SPEED_Z = z;
    }
}
