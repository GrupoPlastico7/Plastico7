//declarar las letiables de nuestra app. 
let scene, camera, renderer, clock, deltaTime, totalTime;

let arToolkitSource, arToolkitContext;

let mesh1, mesh2;
let market1, market2;
let mouse = new THREE.Vector2();
let INTERSECTED;
let objects = [];
let sprite1,sprite2,sprite3,sprite4,sprite5;
let canvas1, context1, texture1;
let markerRoot1,markerRoot2,markerRoot3,markerRoot4,markerRoot5;

let RhinoMesh, RhinoMesh2;

init(); // llamado de la funcion principal que se encarga de hacer casi  todo en la app
animate();

function init() {
///////CREACION DE UNA ESCENA///////////////////
scene = new THREE.Scene();
// mouse = new THREE.Vector2();

///////CREACION DE UNA CAMARA///////////////////
camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
//agrego la camara a mi escena 
scene.add(camera);

//raycaster
raycaster = new THREE.Raycaster();

///////CREACION LUCES///////////////////
let lightSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.1),
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    })
);

0
//luz principal
let light = new THREE.PointLight(0xffffff, 1, 100); //creo nueva luz 
light.position.set(0, 4, 4); //indico la posicion de la luz 
light.castShadow = true; //activo la capacidad de generar sombras.
light.shadow.mapSize.width = 4096; //resolucion mapa de sombras ancho 
light.shadow.mapSize.height = 4096;// resolucion mapa de sombras alto


lightSphere.position.copy(light);


//agrego objetos luz a mi escena 
scene.add(light);
scene.add(lightSphere);

///////CREACION DEL RENDERER///////////////////
renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setClearColor(new THREE.Color('lightgrey'), 0)
renderer.setSize(1920, 1080);
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = '0px'
renderer.domElement.style.left = '0px'
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

///////CREACION DE UN COUNTER///////////////////
clock = new THREE.Clock();
deltaTime = 0;
totalTime = 0;

////////////////////////////////////////////////////////////
// setup arToolkitSource
////////////////////////////////////////////////////////////

arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam',
});

function onResize() {
    arToolkitSource.onResize()
    arToolkitSource.copySizeTo(renderer.domElement)
    if (arToolkitContext.arController !== null) {
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
    }
}

arToolkitSource.init(function onReady() {
    onResize()
});

// handle resize event
window.addEventListener('resize', function () {
    onResize()
});

////////////////////////////////////////////////////////////
// setup arToolkitContext
////////////////////////////////////////////////////////////	

// create atToolkitContext
arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'data/camera_para.dat',
    detectionMode: 'mono'
});

// copy projection matrix to camera when initialization complete
arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

    /////////////////////////////////////////////////
    //Marker setup
    /////////////////////////////////////////////////

    markerRoot1 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot1); // agregamos el grupo a la escena. 
    markerRoot1.name = "markerRoot1"

    //Creamos nuestro marcador 
    let markerControl = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {

        type: 'pattern', patternUrl: './data/pattern-mark1.patt',
    });
    
    markerRoot2 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot2); // agregamos el grupo a la escena.
    markerRoot2.name = "markerRoot2" 

    //Creamos nuestro marcador 
    let markerControl2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {

        type: 'pattern', patternUrl: './data/pattern-mark2.patt',
    });

    markerRoot3 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot3); // agregamos el grupo a la escena.
    markerRoot3.name = "markerRoot3" 

    //Creamos nuestro marcador 
    let markerControl3 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot3, {

        type: 'pattern', patternUrl: './data/pattern-mark3.patt',
    });

    markerRoot4 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot4); // agregamos el grupo a la escena.
    markerRoot4.name = "markerRoot4" 

    //Creamos nuestro marcador 
    let markerControl4 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot4, {

        type: 'pattern', patternUrl: './data/pattern-mark4.patt',
    });

    markerRoot5 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot5); // agregamos el grupo a la escena.
    markerRoot5.name = "markerRoot5"  

    //Creamos nuestro marcador 
    let markerControl5 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot5, {

        type: 'pattern', patternUrl: './data/pattern-mark5.patt',
    });

    markerRoot6 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot6); // agregamos el grupo a la escena.
    markerRoot6.name = "markerRoot6" 

    //Creamos nuestro marcador 
    let markerControl6 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot6, {

        type: 'pattern', patternUrl: './data/pattern-mark6.patt',
    });

    markerRoot7 = new THREE.Group(); //creamos un grupo de objetos
    scene.add(markerRoot7); // agregamos el grupo a la escena.
    markerRoot7.name = "markerRoot6" 

    //Creamos nuestro marcador 
    let markerControl7 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot7, {

        type: 'pattern', patternUrl: './data/pattern-mark7.patt',
    });

    /////////////////////////////////////////////////
    //GEOMETRY
    /////////////////////////////////////////////////
    
    ///CODIGO ANTIGUO///


//paso 1 - creo geometria 
let box = new THREE.CubeGeometry(.5, .5, .5); //plantilla para crear geometrias cubo

//Paso 2 - creo materiales
//material 1
let matBox01 = new THREE.MeshLambertMaterial(
    {
        color: Math.random() * 0xffffff,
        side: THREE.DoubleSide
    }
);

//material 2
let matBox02 = new THREE.MeshLambertMaterial(
    {
        color: Math.random() * 0xffffff,
        side: THREE.DoubleSide
    }
);

let matBox03 = new THREE.MeshLambertMaterial(
    {
        color: Math.random() * 0xffffff,
        side: THREE.DoubleSide
    }
);

let matBox04 = new THREE.MeshLambertMaterial(
    {
        color: Math.random() * 0xffffff,
        side: THREE.DoubleSide
    }
);

let matBox05 = new THREE.MeshLambertMaterial(
    {
        color: Math.random() * 0xffffff,
        side: THREE.DoubleSide
    }
);


//paso 3 - Creo Meshes

//mesh1
mesh1 = new THREE.Mesh(box, matBox01);
mesh1.position.y = .25;
mesh1.name = 'Población atendida por gestion de residuos /Población atendida'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

//mesh2
mesh2 = new THREE.Mesh(box, matBox02);
mesh2.position.y = .25;
mesh2.name = 'depositos sanitarios en Chile'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

mesh3 = new THREE.Mesh(box, matBox03);
mesh3.position.y = .25;
mesh3.name = 'Uso de plástico por empresa'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

mesh4 = new THREE.Mesh(box, matBox04);
mesh4.position.y = .25;
mesh4.name = 'Reemplazo de áridos por plástico'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

mesh5 = new THREE.Mesh(box, matBox05);
mesh5.position.y = .25;
mesh5.name = 'Encapsulamiento de plástico'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

///////CREACION ELEMENTOS TEXTO//////////////////////
//CREACION DE CANVAS 
canvas1 = document.createElement('canvas');
context1 = canvas1.getContext('2d');
context1.font = "Bold 14px Arial";
context1.fillStyle = "rgba(0,0,0,5)";
context1.fillText('Hello', 0, 0);

//los contenidos del canvas seran usados como textura 
texture1 = new THREE.Texture(canvas1);
texture1.needsUpdate = true;

//creacion del sprite
var spriteMaterial = new THREE.SpriteMaterial(
    {
        map: texture1
    }
)
sprite1 = new THREE.Sprite(spriteMaterial);
sprite1.scale.set(1, 0.5, 1);
sprite1.position.set(10, 10, 0);

sprite2 = new THREE.Sprite(spriteMaterial);
sprite2.scale.set(1, 0.5, 1);
sprite2.position.set(10, 10, 0);

sprite3 = new THREE.Sprite(spriteMaterial);
sprite3.scale.set(1, 0.5, 1);
sprite3.position.set(10, 10, 0);

sprite4 = new THREE.Sprite(spriteMaterial);
sprite4.scale.set(2, 1, 2);
sprite4.position.set(10, 10, 0);

sprite5 = new THREE.Sprite(spriteMaterial);
sprite5.scale.set(2, 1, 2);
sprite5.position.set(10, 10, 0);

////////////AGREGAMOS OBJETOS A ESCeNA Y ARRAY OBJECTS

objects.push(mesh1);

objects.push(mesh2);

objects.push(mesh3);

objects.push(mesh4);

objects.push(mesh5);

//agregamos nuestros objetos a la escena mediante el objeto marker1

markerRoot1.add(sprite1);

markerRoot2.add(sprite2);

markerRoot3.add(sprite3);

markerRoot4.add(sprite4);

markerRoot5.add(sprite5);

//////////EVENT LISTERNERS/////////////////////////////////
document.addEventListener('mousemove', onDocumentMouseMove, false);// detecta movimiento del mouse





    ///CODIGO ANTIGUO///
    //Creo una geometria cubo
    let geo1 = new THREE.CubeGeometry(.75, .75, .75); // crear la plantilla
    //creo material 
    let material1 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }); //creamos el material 

    //Creo una geometria 
    let geo2 = new THREE.CubeGeometry(.75, .75, .75); // crear la plantilla
    //creo material 
    let material2 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }); //creamos el material

    //////////////MESH1//////////////////////////////////////////
    //creo un mesh con la geometria y el material 
    mesh1 = new THREE.Mesh(geo1, material1); //nuestro mesh 
    //CAMBIO LA POSICION DE MI MESH 
    mesh1.position.y = 0.5;
    mesh1.position.z = -0.3;

    //activo el recibir y proyectar sombras en otros meshes
    mesh1.castShadow = true;
    mesh1.receiveShadow = true;

    //////////////MESH2//////////////////////////////////////////
    //creo un mesh con la geometria y el material 
    mesh2 = new THREE.Mesh(geo2, material2); //nuestro mesh 
    //CAMBIO LA POSICION DE MI MESH 
    mesh2.position.x = 0.75;
    mesh2.position.y = 1.0;
    //activo el recibir y proyectar sombras en otros meshes
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;


    //markerRoot1.add(mesh1); //esta linea agrega el cubo a mi grupo y finalmente se puede ver en la escena 
    //markerRoot1.add(mesh2); //agregando el mesh 2 a mi escena

    ////////////////////PISO////////////////
    let floorGeometry = new THREE.PlaneGeometry(20, 20);
    let floorMaterial = new THREE.ShadowMaterial();
    floorMaterial.opacity = 0.25;

    let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    markerRoot1.add(floorMesh);


    /////// OBJ IMPORT/////////////////////
    function onProgress(xhr) { console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) { console.log("ha ocurrido un error") };

    //////OBJETO RHINO 1///////////////
    new THREE.MTLLoader()
        .setPath('models/Mapa/')
        .load('base.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('models/Mapa/')
                .load('base.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(.05,.05,.05);
                    RhinoMesh.castShadow = true;
                    RhinoMesh.receiveShadow = true;

                    markerRoot1.add(RhinoMesh);
                }, onProgress, onError);
        });
            
    new THREE.MTLLoader()
        .setPath('models/Mapa/')
        .load('pibr.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('models/Mapa/')
                .load('pibr.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(.05,.05,.05);
                    RhinoMesh.castShadow = true;
                    RhinoMesh.receiveShadow = true;
                    RhinoMesh.rotation.set(0,0,0);
                    RhinoMesh.position.set(0,0,0);

                    markerRoot2.add(RhinoMesh);
                }, onProgress, onError);
        });            

    new THREE.MTLLoader()
        .setPath('models/Mapa/')
        .load('depositosr.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('models/Mapa/')
                .load('depositosr.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(.05,.05,.05);
                    RhinoMesh.castShadow = true;
                    RhinoMesh.receiveShadow = true;
                    RhinoMesh.rotation.set(0,0,0);
                    RhinoMesh.position.set(0,0,0);

                    markerRoot3.add(RhinoMesh);
                }, onProgress, onError);
        });   

    new THREE.MTLLoader()
        .setPath('models/Bloques_Mesh/')
        .load('Bloques_Concreto.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('models/Bloques_Mesh/')
                .load('Bloques_Concreto.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(.15,.15,.15);
                    RhinoMesh.castShadow = true;
                    RhinoMesh.receiveShadow = true;
                    RhinoMesh.rotation.set(0,0,0);
                    RhinoMesh.position.set(0,0,0);

                    markerRoot4.add(RhinoMesh);
                }, onProgress, onError);
        });   

    new THREE.MTLLoader()
        .setPath('models/botellas/')
        .load('botellas_r2.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('models/botellas/')
                .load('botellas_r2.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(.01,.01,.01);
                    RhinoMesh.castShadow = false;
                    RhinoMesh.receiveShadow = false;
                    RhinoMesh.rotation.set(0,0,0);
                    RhinoMesh.position.set(0,0,0);

                    markerRoot5.add(RhinoMesh);
                }, onProgress, onError);
        });  
    new THREE.MTLLoader()
        .setPath('models/Mapa Global/')
        .load('Mapa Global.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('models/Mapa Global/')
                .load('Mapa Global.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(.01,.01,.01);
                    RhinoMesh.castShadow = false;
                    RhinoMesh.receiveShadow = false;
                    RhinoMesh.rotation.set(0,0,0);
                    RhinoMesh.position.set(0,0,0);

                    markerRoot6.add(RhinoMesh);
                }, onProgress, onError);
        });  
    
        new THREE.MTLLoader()
        .setPath('models/Proyectos/')
        .load('Proyectos.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('models/Proyectos/')
                .load('Proyectos.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(.01,.01,.01);
                    RhinoMesh.castShadow = false;
                    RhinoMesh.receiveShadow = false;
                    RhinoMesh.rotation.set(0,0,0);
                    RhinoMesh.position.set(0,0,0);

                    markerRoot7.add(RhinoMesh);
                }, onProgress, onError);
        });  
    // //////OBJETO RHINO 2///////////////
    // new THREE.MTLLoader()
    //     .setPath('models/')
    //     .load('model2.mtl', function (materials) {
    //         materials.preload();
    //         new THREE.OBJLoader()
    //             .setMaterials(materials)
    //             .setPath('models/')
    //             .load('model2.obj', function (group) {
    //                 RhinoMesh2 = group.children[0];
    //                 RhinoMesh2.material.side = THREE.DoubleSide;
    //                 RhinoMesh2.scale.set(1, 1, 1);
    //                 RhinoMesh2.castShadow = true;
    //                 RhinoMesh2.receiveShadow = true;

    //                 markerRoot1.add(RhinoMesh2);
    //             }, onProgress, onError);
    //     });
}


function onDocumentMouseMove(event) {
    event.preventDefault();
    sprite1.position.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0);
    sprite1.renderOrder = 999;
    sprite1.onBeforeRender = function (renderer) { renderer.clearDepth(); }
    sprite2.position.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0);
    sprite2.renderOrder = 999;
    sprite2.onBeforeRender = function (renderer) { renderer.clearDepth(); }
    sprite3.position.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0);
    sprite3.renderOrder = 999;
    sprite3.onBeforeRender = function (renderer) { renderer.clearDepth(); }
    sprite4.position.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0);
    sprite4.renderOrder = 999;
    sprite4.onBeforeRender = function (renderer) { renderer.clearDepth(); }
    sprite5.position.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0);
    sprite5.renderOrder = 999;
    sprite5.onBeforeRender = function (renderer) { renderer.clearDepth(); }

    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1); //mouse pos

    raycaster.setFromCamera(mouse, camera); //creo el rayo que va desde la camara , pasa por el frustrum 
    let intersects = raycaster.intersectObjects(objects, true); //buscamos las intersecciones

    if (intersects.length > 0) {
        if (intersects[0].object != INTERSECTED) {
            if (INTERSECTED) {
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.setHex(0xffff00);

            if (INTERSECTED.name) {
                context1.clearRect(0, 0, 10, 10);
                let message = INTERSECTED.name;
                let metrics = context1.measureText(message);
                let width = metrics.width;
                context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                context1.fillRect(0, 0, width + 8, 20 + 8);
                context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                context1.fillRect(2, 2, width + 4, 20 + 4);
                context1.fillStyle = "rgba(0,0,0,1)"; // text color
                context1.fillText(message, 4, 20);
            
            }
            else {
                context1.clearRect(0, 0, 10, 10);
            
            }
        }

    }
    //si no encuentra intersecciones
    else {
        if (INTERSECTED) {
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex); //devolviendo el color original al objeto            
        }
        INTERSECTED = null;
        context1.clearRect(0, 0, 300, 300);
    
    }
}


function update() {
    //actualiza contenido de nuestra app AR
    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    deltaTime = clock.getDelta();
    totalTime += deltaTime; // totalTime =  totalTime + deltaTime 
    update();
    render();
}