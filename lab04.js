var gl;
var shaderProgram;

var mMatrixFrontWheel,
mMatrixBackWheel,
mMatrixBody,
mMatrixCabin,
mMatrixPole,
mMatrixPoleTop;

var centerOfInterest,
viewUp,
theta=90;

// set up the parameters for lighting
var light_ambient = [0.1,0.1,0.1,1];
var light_diffuse = [.8,.8,.8,1];
var light_specular = [1,1,1,1];
var light_pos = [0,0,-10,1];   // eye space position



//////////// Init OpenGL Context etc. ///////////////

function initGL(canvas) {
  try {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {
  }
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
}

////////////////    Initialize VBO  ////////////////////////

function initBuffers() {
  initCube();
  initCylinder();
  initSphere();
  initRect();
}

///////////////////////////////////////////////////////////////

var cameraMMatrix;
var vMatrix = mat4.create(); // view matrix
var mMatrix = mat4.create();  // model matrix
var pMatrix = mat4.create();  //projection matrix
var nMatrix = mat4.create(); //normal matrix
var Z_angle = 0.0;

function setMatrixUniforms(model, normals) {
  gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
  gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, model);
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, normals);
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

///////////////////////////////////////////////////////////////

function drawScene() {

  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  mat4.perspective(60, 1.0, 0.1, 100, pMatrix);  // set up the projection matrix
  vMatrix = mat4.lookAt([0,0,10], centerOfInterest, viewUp, vMatrix);	// set up the view matrix, multiply into the modelview matrix
  vMatrix = mat4.multiply(vMatrix, cameraMMatrix);


  gl.uniform4f(shaderProgram.light_posUniform,light_pos[0], light_pos[1], light_pos[2], light_pos[3]);
  gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0);
  gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0);
  gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2],1.0);

  var mMatrixStack = [];

  mat4.identity(mMatrix);
  mMatrix = mat4.multiply(mMatrix, mMatrixBody);

  mat4.identity(nMatrix);
  nMatrix = mat4.multiply(nMatrix, vMatrix);
  nMatrix = mat4.multiply(nMatrix, mMatrix);
  nMatrix = mat4.inverse(nMatrix);
  nMatrix = mat4.transpose(nMatrix);

  drawRect(mMatrix, nMatrix);

  mMatrix = mat4.multiply(mMatrix, mMatrixCabin);

  mat4.identity(nMatrix);
  nMatrix = mat4.multiply(nMatrix, vMatrix);
  nMatrix = mat4.multiply(nMatrix, mMatrix);
  nMatrix = mat4.inverse(nMatrix);
  nMatrix = mat4.transpose(nMatrix);
  drawCube(mMatrix, nMatrix);

  //set model rel to body
  mat4.identity(mMatrix);
  mMatrix = mat4.multiply(mMatrix, mMatrixBody);
  mMatrix = mat4.multiply(mMatrix, mMatrixFrontWheel);
  mMatrix = mat4.rotate(mMatrix, degToRad(-90), [1,0,0]);

  mat4.identity(nMatrix);
  nMatrix = mat4.multiply(nMatrix, vMatrix);
  nMatrix = mat4.multiply(nMatrix, mMatrix);
  nMatrix = mat4.inverse(nMatrix);
  nMatrix = mat4.transpose(nMatrix);
  drawCylinder(mMatrix,nMatrix);

  //set model rel to body
  mat4.identity(mMatrix);
  mMatrix = mat4.multiply(mMatrix, mMatrixBody);
  mMatrix = mat4.multiply(mMatrix, mMatrixBackWheel);
  mMatrix = mat4.rotate(mMatrix, degToRad(-90), [1,0,0]);
  mat4.identity(nMatrix);
  nMatrix = mat4.multiply(nMatrix, vMatrix);
  nMatrix = mat4.multiply(nMatrix, mMatrix);
  nMatrix = mat4.inverse(nMatrix);
  nMatrix = mat4.transpose(nMatrix);

  drawCylinder(mMatrix,nMatrix);

  //set model rel to body
  mat4.identity(mMatrix);
  mMatrix = mat4.multiply(mMatrix, mMatrixBody);
  mMatrix = mat4.multiply(mMatrix, mMatrixPole);
  mMatrix = mat4.scale(mMatrix, [.5,1,.5])

  mat4.identity(nMatrix);
  nMatrix = mat4.multiply(nMatrix, vMatrix);
  nMatrix = mat4.multiply(nMatrix, mMatrix);
  nMatrix = mat4.inverse(nMatrix);
  nMatrix = mat4.transpose(nMatrix);
  drawCylinder(mMatrix,nMatrix);

  mMatrix = mat4.scale(mMatrix, [2,1,2])
  mMatrix = mat4.scale(mMatrix, [.45,.45,.45])
  mMatrix = mat4.multiply(mMatrix, mMatrixPoleTop);

  mat4.identity(nMatrix);
  nMatrix = mat4.multiply(nMatrix, vMatrix);
  nMatrix = mat4.multiply(nMatrix, mMatrix);
  nMatrix = mat4.inverse(nMatrix);
  nMatrix = mat4.transpose(nMatrix);

  drawSphere(mMatrix,nMatrix);

}


///////////////////////////////////////////////////////////////

function webGLStart() {
  var canvas = document.getElementById("lab03-canvas");
  initGL(canvas);
  initShaders();

  centerOfInterest = [0,0,0];
  viewUp = [0,1,0];

  gl.enable(gl.DEPTH_TEST);


  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);


  shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
  shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
  shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");

  shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
  shaderProgram.light_ambientUniform = gl.getUniformLocation(shaderProgram, "light_ambient");
  shaderProgram.light_diffuseUniform = gl.getUniformLocation(shaderProgram, "light_diffuse");
  shaderProgram.light_specularUniform = gl.getUniformLocation(shaderProgram, "light_specular");

  shaderProgram.ambient_coefUniform = gl.getUniformLocation(shaderProgram, "ambient_coef");
  shaderProgram.diffuse_coefUniform = gl.getUniformLocation(shaderProgram, "diffuse_coef");
  shaderProgram.specular_coefUniform = gl.getUniformLocation(shaderProgram, "specular_coef");
  shaderProgram.shininess_coefUniform = gl.getUniformLocation(shaderProgram, "mat_shininess");


  initBuffers();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  document.addEventListener('mousedown', onDocumentMouseDown,
  false);

  document.addEventListener('keydown', onKeyDown, false);

  cameraMMatrix = mat4.create();
  mat4.identity(cameraMMatrix);

  mMatrixBody = mat4.create();
  mat4.identity(mMatrixBody);

  mMatrixCabin = mat4.create();
  mat4.identity(mMatrixCabin);
  mMatrixCabin = mat4.translate(mMatrixCabin, [.5,1,0]);

  mMatrixFrontWheel = mat4.create();
  mat4.identity(mMatrixFrontWheel);
  mMatrixFrontWheel = mat4.translate(mMatrixFrontWheel, [1,-.85,0]);

  mMatrixBackWheel = mat4.create();
  mat4.identity(mMatrixBackWheel);
  mMatrixBackWheel = mat4.translate(mMatrixBackWheel, [-1,-.85,0]);

  mMatrixPole = mat4.create();
  mat4.identity(mMatrixPole);
  mMatrixPole = mat4.translate(mMatrixPole, [-1,1,0]);

  mMatrixPoleTop = mat4.create();
  mat4.identity(mMatrixPoleTop);
  mMatrixPoleTop = mat4.translate(mMatrixPoleTop, [-0.125,1.25,0]);





  drawScene();
}
