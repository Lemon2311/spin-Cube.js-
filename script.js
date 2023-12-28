import { Cube } from './cube.js';

window.addEventListener('DOMContentLoaded', () => {
    const cube = new Cube(document);
    cube.changeAngularVelocity(0.1, 0.1, 0.1);
});
