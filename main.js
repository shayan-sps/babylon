//import * as BABYLON from 'babylonjs';
//import "@babylonjs/loaders/glTF";
//import 'babylonjs-loaders';

// Get the canvas DOM element
let canvas = document.getElementById('renderCanvas');

// Load the 3D engine
let engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});


// CreateScene function that creates and return the scene
let createScene = function(){
    let scene = new BABYLON.Scene(engine);

    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData('./assets/e.env', scene);
    scene.environmentTexture = hdrTexture;
    
    //scene.createDefaultEnvironment();


    /*
    // Create a FreeCamera
    let camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 1, -2), scene); //set its position to {x: 0, y: 5, z: -10}
    // Target the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0,1,0)); 
    // Attach the camera to the canvas
    camera.attachControl(canvas, false); 
    */

    /*
    // Create a FreeCamera
    let camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 1, -2), scene); //set its position to {x: 0, y: 5, z: -10}
    // Target the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0,1,0)); 
    // Attach the camera to the canvas
    camera.attachControl(canvas, false); 
    */

    // Parameters: name, alpha, beta, radius, target position, scene
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 1, new BABYLON.Vector3(0, 1, 0), scene);

    // Positions the camera overwriting alpha, beta, radius
    camera.setPosition(new BABYLON.Vector3(0, 1, -2));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    camera.panningSensibility = 0;

    // Create light
    let hemiLight = new BABYLON.HemisphericLight('hemiLight', new BABYLON.Vector3(0, 1, 1), scene);
    hemiLight.intensity = .7;

    // let dirLight = function(direction, color, intensity){
    // let dirLight = function(){

    //     let directionLight = new BABYLON.DirectionalLight('dirLight1', new BABYLON.Vector3(0, 1, -5), scene );
    //     let directionLightColor = new BABYLON.Color3(0, 1, 1);
    //     directionLight.diffuse = directionLightColor;
    //     directionLight.specular = directionLightColor;
    //     directionLight.intensity = 2;
    // }

    // dirLight();

    let directionLight = new BABYLON.DirectionalLight('dirLight1', new BABYLON.Vector3(0, 1, -5), scene );
    let directionLightColor = new BABYLON.Color3(0, 1, 1);
    directionLight.diffuse = directionLightColor;
    directionLight.specular = directionLightColor;
    directionLight.intensity = 2;


    //const shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight1);

    /*
    // Create a built-in "ground" shape;
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: 100, height: 100, subdivisions: 2, updatable: false
        }, scene);

    ground.material = new BABYLON.StandardMaterial("GroundMaterial", scene)
    ground.material.diffuseColor = BABYLON.Color3.White();
    */

    //let jack = BABYLON.SceneLoader.ImportMesh("", './assets/' , 'j.babylon' , scene, function(h){});

    // material
    let mat = new BABYLON.StandardMaterial("mat1", scene);
    mat.alpha = 1.0;
    mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    mat.backFaceCulling = false;
    //mat.wireframe = true;

    //BABYLON.SceneLoader.AppendAsync('./assets/j', 'babylon', scene);

    let hoodie = BABYLON.SceneLoader.ImportMesh("", './assets/' , 'hoodie.glb' , scene, function(h){
        let s = 1;
        h[0].scaling = new BABYLON.Vector3(s, s, s);

    });

    let cj = BABYLON.SceneLoader.ImportMesh("", './assets/' , 'cj.glb' , scene, function(h){
        let s = .2;
        h[0].scaling = new BABYLON.Vector3(s, s, s);
        h[0].position = new BABYLON.Vector3(1,.2,-.2);

    });

    /*
    let currentPosition = { x: 0, y: 0 };
		let clicked = false;
		canvas.addEventListener("pointerdown", function (evt) {
			currentPosition.x = evt.clientX;
			currentPosition.y = evt.clientY;
			clicked = true;
		});
				
        canvas.addEventListener("pointermove", function (evt) {
            if (!clicked) {
                return;
            }

            let dx = evt.clientX - currentPosition.x;
            let dy = evt.clientY - currentPosition.y;

            let angleX = dy * 0.01;
            let angleY = dx * 0.01;

            hoodie.rotation.y -= angleY;
            hoodie.rotation.x -= angleX;

            currentPosition.x = evt.clientX;
            currentPosition.y = evt.clientY;
        });
        
        canvas.addEventListener("pointerup", function (evt) {
            clicked = false;
        });
*/

    const back = BABYLON.SceneLoader.ImportMesh("", './assets/' , 'back.glb' , scene, function(h){
        let s = 2;
        h[0].scaling = new BABYLON.Vector3(s, s, s);
    });

    // Return the created scene
    return scene;
}
// call the createScene function
createScene();
let scene = createScene();

// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});
