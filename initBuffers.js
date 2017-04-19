//Cube:
var cubeVertexPositionBuffer,
cubeVertexIndexBuffer,
cubeVertexNormalBuffer;

function initCube(){
  var vertices = [
    // top
    0.5,  0.5,  0.5, //0       0
    -0.5,  0.5,  -0.5, //1      1
    -0.5,  0.5, 0.5, //2         2
    .5, .5, -0.5, //3           3

    // bot
    0.5,  -0.5, 0.5, //4        4
    -0.5, -0.5, -0.5, //5        5
    -0.5, -0.5, 0.5, //6        6
    0.5,  -0.5, -0.5, //7        7

    // right side
    .5,.5,-.5, //3              8
    .5,.5,.5, //0              9
    .5,-.5,.5, //4              10
    .5,-.5,-.5, //7             11

    // left side
    -.5,.5,-.5, //1             12
    -.5,.5,.5, //2              13
    -.5,-.5,-.5, //5            14
    -.5,-.5,.5, //6             15

    // front
    -.5,.5,-.5, //1             16
    -.5,-.5,-.5,//5             17
    .5,.5,-.5, //3              18
    .5,-.5,-.5, //7             19

    // back
    -.5,.5,.5, //2              20
    -.5,-.5,.5, //6             21
    .5,.5,.5, //0              22
    .5,-.5,.5 //4               23
  ];

  var normals = [
    //top
    0,1,0,
    0,1,0,
    0,1,0,
    0,1,0,
    //bot
    0,-1,0,
    0,-1,0,
    0,-1,0,
    0,-1,0,
    //right
    1,0,0,
    1,0,0,
    1,0,0,
    1,0,0,
    //left
    -1,0,0,
    -1,0,0,
    -1,0,0,
    -1,0,0,
    //front
    0,0,-1,
    0,0,-1,
    0,0,-1,
    0,0,-1,
    //back
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
  ];

  var indices = [
    //top
    0,1,2,
    0,1,3,
    //bot
    4,5,6,
    5,4,7,
    //right
    9,8,10,
    8,10,11,
    //left
    12,13,15,
    12,14,15,
    //front
    17,16,19,
    16,18,19,
    //back
    20,22,23,
    20,23,21
  ];

  cubeVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  cubeVertexPositionBuffer.itemSize = 3;
  cubeVertexPositionBuffer.numItems = vertices.length/3;

  cubeVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  cubeVertexIndexBuffer.itemsize = 1;
  cubeVertexIndexBuffer.numItems = indices.length;

  cubeVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  cubeVertexNormalBuffer.itemSize = 3;
  cubeVertexNormalBuffer.numItems = normals.length /3;
}



//Rect:
var rectVertexPositionBuffer,
// rectVertexColorBuffer,
rectVertexIndexBuffer,
rectVertexNormalBuffer;

function initRect(){
  var vertices = [
    // top
    1.5,  0.5,  0.75, //0       0
    -1.5,  0.5,  -0.75, //1      1
    -1.5,  0.5, 0.75, //2         2
    1.5, .5, -0.75, //3           3

    // bot
    1.5,  -0.5, 0.75, //4        4
    -1.5, -0.5, -0.75, //5        5
    -1.5, -0.5, 0.75, //6        6
    1.5,  -0.5, -0.75, //7        7

    // right side
    1.5,.5,-.75, //3              8
    1.5,.5,.75, //0              9
    1.5,-.5,.75, //4              10
    1.5,-.5,-.75, //7             11

    // left side
    -1.5,.5,-.75, //1             12
    -1.5,.5,.75, //2              13
    -1.5,-.5,-.75, //5            14
    -1.5,-.5,.75, //6             15

    // front
    -1.5,.5,-.75, //1             16
    -1.5,-.5,-.75,//5             17
    1.5,.5,-.75, //3              18
    1.5,-.5,-.75, //7             19

    // back
    -1.5,.5,.75, //2              20
    -1.5,-.5,.75, //6             21
    1.5,.5,.75, //0              22
    1.5,-.5,.75 //4               23
  ];



  // var colors = [
  //   1.0, 0.0, 0.0, 1.0,
  //   0.0, 1.0, 0.0, 1.0,
  //   0.0, 0.0, 1.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   0.0, 1.0, 0.0, 1.0,
  //   0.0, 0.0, 1.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   0.0, 1.0, 0.0, 1.0,
  //   0.0, 0.0, 1.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   0.0, 1.0, 0.0, 1.0,
  //   0.0, 0.0, 1.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   0.0, 1.0, 0.0, 1.0,
  //   0.0, 0.0, 1.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0,
  //   0.0, 1.0, 0.0, 1.0,
  //   0.0, 0.0, 1.0, 1.0,
  //   1.0, 0.0, 0.0, 1.0
  // ];

  var indices = [
    //top
    0,1,2,
    0,1,3,
    //bot
    4,5,6,
    5,4,7,
    //right
    9,8,10,
    8,10,11,
    //left
    12,13,15,
    12,14,15,
    //front
    16,19,18,
    16,17,19,
    //back
    20,22,23,
    20,23,21
  ];


  var normals = [
    //top
    0,1,0,
    0,1,0,
    0,1,0,
    0,1,0,
    //bot
    0,-1,0,
    0,-1,0,
    0,-1,0,
    0,-1,0,
    //right
    1,0,0,
    1,0,0,
    1,0,0,
    1,0,0,
    //left
    -1,0,0,
    -1,0,0,
    -1,0,0,
    -1,0,0,
    //front
    0,0,-1,
    0,0,-1,
    0,0,-1,
    0,0,-1,
    //back
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
  ];


  rectVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  rectVertexPositionBuffer.itemSize = 3;
  rectVertexPositionBuffer.numItems = 8;

  rectVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rectVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  rectVertexIndexBuffer.itemsize = 1;
  rectVertexIndexBuffer.numItems = 36;

  rectVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  rectVertexNormalBuffer.itemSize = 3;
  rectVertexNormalBuffer.numItems = normals.length /3;
  //
  // rectVertexColorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexColorBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  // rectVertexColorBuffer.itemSize = 4;
  // rectVertexColorBuffer.numItems = 8;

}


//Cylinder
var cylinderTopVertexPositionBuffer,
// cylinderTopVertexColorBuffer,
cylinderTopNormalVertexBuffer;

var cylinderBotVertexPositionBuffer,
// cylinderBotVertexColorBuffer,
cylinderBotNormalVertexBuffer;

var cylinderSidesVertexPositionBuffer,
// cylinderSidesVertexColorBuffer,
cylinderSidesNormalVertexBuffer;

var cylinderHeight = 1,
degrees = 1;

var cylinderWallNormals = [];

function initCylinder(){

  var normals = [];
  var vertices1 = getCircleVertices(degrees, cylinderHeight/2);

  for(var i=0;i<vertices1.length; i++){
    normals.push(0);
    normals.push(1);
    normals.push(0);
  }

  // colors = [];
  // for (var i=0; i<vertices1.length;i++){
  //   if(i%2==0){
  //     colors.push(1);colors.push(0);colors.push(0);
  //   }else{
  //     colors.push(1);colors.push(0);colors.push(1);
  //   }
  // };

  cylinderTopNormalVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopNormalVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  cylinderTopNormalVertexBuffer.itemSize = 3;
  cylinderTopNormalVertexBuffer.numItems = normals.length /3;

  cylinderTopVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices1), gl.STATIC_DRAW);
  cylinderTopVertexPositionBuffer.itemSize = 3;
  cylinderTopVertexPositionBuffer.numItems = vertices1.length / 3;

  // cylinderTopVertexColorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopVertexColorBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  // cylinderTopVertexColorBuffer.itemSize = 3;
  // cylinderTopVertexColorBuffer.numItems = colors.length/3;


  var vertices2 = getCircleVertices(degrees, -cylinderHeight/2);

  normals = [];
  for(var i=0;i<vertices2.length;i++){
    normals.push(0);
    normals.push(-1);
    normals.push(0);
  }

  cylinderBotNormalVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBotNormalVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  cylinderBotNormalVertexBuffer.itemSize = 3;
  cylinderBotNormalVertexBuffer.numItems = normals.length /3;

  cylinderBottomVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBottomVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);
  cylinderBottomVertexPositionBuffer.itemSize = 3;
  cylinderBottomVertexPositionBuffer.numItems = vertices2.length / 3;

  var vertices3 = getCylinderWallVertices(vertices1, vertices2);

  cylinderSidesVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSidesVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices3), gl.STATIC_DRAW);
  cylinderSidesVertexPositionBuffer.itemSize = 3;
  cylinderSidesVertexPositionBuffer.numItems = vertices3.length / 3;

  cylinderSidesNormalVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSidesNormalVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cylinderWallNormals), gl.STATIC_DRAW);
  cylinderSidesNormalVertexBuffer.itemSize = 3;
  cylinderSidesNormalVertexBuffer.numItems = cylinderWallNormals.length /3;
}

function getCircleVertices(degrees, yVal, r=.25){
  var currentDegree = 0;
  // var r = .25;
  var array = [
    0,yVal,0,
  ];
  while(currentDegree != 360){
    array.push(r * Math.cos(currentDegree));
    array.push(yVal);
    array.push(r * Math.sin(currentDegree));
    currentDegree += degrees;
  }
  return array;
}

function getCylinderWallVertices(vertices1, vertices2){
  var vertices = [];
  var x, y, z;
  for (var k = 3; k<vertices1.length/3;k+=3){
    x = vertices1[k];
    y = vertices1[k+1];
    z = vertices1[k+2];

    cylinderWallNormals.push(x);
    cylinderWallNormals.push(0);
    cylinderWallNormals.push(z);

    vertices.push(x);
    vertices.push(y);
    vertices.push(z);

    x = vertices2[k];
    y = vertices2[k+1];
    z = vertices2[k+2];

    cylinderWallNormals.push(x);
    cylinderWallNormals.push(0);
    cylinderWallNormals.push(z);

    vertices.push(x);
    vertices.push(y);
    vertices.push(z);
  }

  return vertices;
}

//Sphere
var sphereVertexPositionBuffer,
sphereVertexIndexBuffer,
// sphereVertexColorBuffer,
sphereVertexNormalBuffer,
sphereNormals = [];

function initSphere(){
  var numLat = 30,
  numLong = 30,
  radius = .5;

  vertices = getSphereVertices(radius, numLat, numLong);
  indices = getSphereIndices(numLat, numLong);
  // colors = [];

  sphereVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  sphereVertexPositionBuffer.itemSize = 3;
  sphereVertexPositionBuffer.numItems = vertices.length/3;

  sphereVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  sphereVertexIndexBuffer.itemSize = 1;
  sphereVertexIndexBuffer.numItems = indices.length;


  // for (var i=0; i<vertices.length;i++){
  //   if(i%2==0)
  //   {colors.push(0);colors.push(0);colors.push(1);colors.push(1);}
  //   else {
  //     colors.push(1);colors.push(0);colors.push(1);colors.push(1);
  //   }
  // }

  // sphereVertexColorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexColorBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  // sphereVertexColorBuffer.itemSize = 4;
  // sphereVertexColorBuffer.numItems = colors.length/4;

  sphereVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphereNormals), gl.STATIC_DRAW);
  sphereVertexNormalBuffer.itemSize = 3;
  sphereVertexNormalBuffer.numItems = sphereNormals.length /3;
}

function getSphereVertices(radius, numLat,numLong){
  var vertexPositionData = [];
  for (var i = 0; i <= numLat; i++) {
    var theta = i * Math.PI / numLat;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (var j = 0; j <= numLong; j++) {
      var phi = j * 2 * Math.PI / numLong;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1 - (j / numLong);
      var v = 1 - (i / numLat);

      sphereNormals.push(x);
      sphereNormals.push(y);
      sphereNormals.push(z);
      vertexPositionData.push(radius * x);
      vertexPositionData.push(radius * y);
      vertexPositionData.push(radius * z);
    }
  }
  return vertexPositionData;
}

function getSphereIndices(numLat, numLong){
  var indices = [];
  for (var i = 0; i < numLat; i++) {
    for (var j = 0; j < numLong; j++) {
      var k = (i * (numLong + 1)) + j;
      var l = k + numLong + 1;
      indices.push(k);
      indices.push(l);
      indices.push(k + 1);

      indices.push(l);
      indices.push(l + 1);
      indices.push(k + 1);
    }
  }
  return indices;
}
