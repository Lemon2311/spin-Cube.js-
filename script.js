import { Cube } from './cube.js';

    // Creating a Cube in the whole document
    const cube = new Cube(document);
    cube.changeAngularVelocity(0.5, 0.5, 0.5);//setting the angular velocity of the cube

    //creating a Cube in a specific div
    const divElement = document.getElementById('div');
    const cubeInDiv = new Cube(divElement);
    cubeInDiv.changeAngularVelocity(-0.1, -0.1, -0.1);//setting the angular velocity of the cube
