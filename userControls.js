///////////////////////////////////////////////////////////////

var lastMouseX = 0, lastMouseY = 0;
var whichObj = 1;
///////////////////////////////////////////////////////////////
function obj(num){
  switch (num) {
    case 1: //body + cabin
    whichObj = 1;
    break;
    case 2: //front wheel
    whichObj = 2;
    break;
    case 3: //back wheel
    whichObj = 3;
    break;
    case 4: // pole in back + top
    whichObj = 4;
    break;
    case 5: // just pole top
    whichObj = 5;
    break;
    case 6: // just cabin
    whichObj = 6;
    break;
    case 7:
    whichObj = 7;
    break;
    default:

  }
}

function onDocumentMouseDown( event ) {
  event.preventDefault();
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'mouseout', onDocumentMouseOut, false );
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  lastMouseX = mouseX;
  lastMouseY = mouseY;

}

var axis = 1;
function setAxisOfRotation(num){
  switch (num) {
    case 1:
      axis = 1;
      break;
    case 2:
      axis = 2;
      break;
    case 3:
      axis = 3;
      break;
    default:

  }
}
function onDocumentMouseMove( event ) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  var diffX = mouseX - lastMouseX;
  var diffY = mouseY - lastMouseY;

  Z_angle = Z_angle + diffX/5;

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  switch (whichObj){
    case 1:
    if(axis == 1) {mMatrixBody = mat4.rotate(mMatrixBody, degToRad(diffY/5.0), [1, 0, 0]);}
    else if(axis == 2){mMatrixBody = mat4.rotate(mMatrixBody, degToRad(diffX/5.0), [0, 1, 0]);}
    else mMatrixBody = mat4.rotate(mMatrixBody, degToRad(diffX/5.0), [0, 0, 1]);
    break;
    case 6:
    if(axis == 1) {mMatrixCabin = mat4.rotate(mMatrixCabin, degToRad(diffY/5.0), [1, 0, 0]);}
    else if(axis == 2){mMatrixCabin = mat4.rotate(mMatrixCabin, degToRad(diffX/5.0), [0, 1, 0]);}
    else mMatrixCabin = mat4.rotate(mMatrixCabin, degToRad(diffX/5.0), [0, 0, 1]);

    break;
    case 2:
    if(axis == 1) {mMatrixFrontWheel = mat4.rotate(mMatrixFrontWheel, degToRad(diffY/5.0), [1, 0, 0]);}
    else if(axis == 2){mMatrixFrontWheel = mat4.rotate(mMatrixFrontWheel, degToRad(diffX/5.0), [0, 1, 0]);}
    else mMatrixFrontWheel = mat4.rotate(mMatrixFrontWheel, degToRad(diffX/5.0), [0, 0, 1]);

    break;
    case 3:
    if(axis == 1) {mMatrixBackWheel = mat4.rotate(mMatrixBackWheel, degToRad(diffY/5.0), [1, 0, 0]);}
    else if(axis == 2){mMatrixBackWheel = mat4.rotate(mMatrixBackWheel, degToRad(diffX/5.0), [0, 1, 0]);}
    else mMatrixBackWheel = mat4.rotate(mMatrixBackWheel, degToRad(diffX/5.0), [0, 0, 1]);

    break;
    case 4:
    if(axis == 1) {mMatrixPole = mat4.rotate(mMatrixPole, degToRad(diffY/5.0), [1, 0, 0]);}
    else if(axis == 2){mMatrixPole = mat4.rotate(mMatrixPole, degToRad(diffX/5.0), [0, 1, 0]);}
    else mMatrixPole = mat4.rotate(mMatrixPole, degToRad(diffX/5.0), [0, 0, 1]);

    break;
    case 5:
    if(axis == 1) {mMatrixPoleTop = mat4.rotate(mMatrixPoleTop, degToRad(diffY/5.0), [1, 0, 0]);}
    else if(axis == 2){mMatrixPoleTop = mat4.rotate(mMatrixPoleTop, degToRad(diffX/5.0), [0, 1, 0]);}
    else mMatrixPoleTop = mat4.rotate(mMatrixPoleTop, degToRad(diffX/5.0), [0, 0, 1]);

    break;
    default:
  }
  drawScene();
}



function moveCOI(dir){
  switch (dir) {
    case 1:   //up
    centerOfInterest[1] += .1;
    break;
    case 2: //down
    centerOfInterest[1] += -.1;
    break;
    case 3: //left
    centerOfInterest[0] += -.1;
    break;
    case 4: //right
    centerOfInterest[0] += .1;
    break;
    default:
  }
  drawScene();
}

function roll(dir){
  switch (dir) {
    case 1: //clockwise
    theta = theta + 1;
    viewUp[0] = Math.cos(degToRad(theta));
    viewUp[1] = Math.sin(degToRad(theta));
    break;
    case 2: //counterclockwise
    theta = theta - 1;
    viewUp[0] = Math.cos(degToRad(theta));
    viewUp[1] = Math.sin(degToRad(theta));
    break;
    default:
  }
  drawScene();
}


function onKeyDown(event) {

  switch(event.keyCode)  {
    case 102: //f
    case 70:  //F
    switch (whichObj){
      case 1:
        mMatrixBody = mat4.translate(mMatrixBody, [.1, 0, 0]);
      break;
      case 6:
        mMatrixCabin = mat4.translate(mMatrixCabin, [.1, 0, 0]);
      break;
      case 2:
        mMatrixFrontWheel = mat4.translate(mMatrixFrontWheel, [.1, 0, 0]);
      break;
      case 3:
        mMatrixBackWheel = mat4.translate(mMatrixBackWheel, [.1, 0, 0]);
      break;
      case 4:
        mMatrixPole = mat4.translate(mMatrixPole, [.1, 0, 0]);
      break;
      case 5:
        mMatrixPoleTop = mat4.translate(mMatrixPoleTop, [.1, 0, 0]);
      break;
      case 7:
        light_pos[2]+=.1;
      break;

      default:
    }
    break;

    case 98: //b
    case 66:  //B
    switch (whichObj){
      case 1:
        mMatrixBody = mat4.translate(mMatrixBody, [-.1, 0, 0]);
      break;
      case 6:
        mMatrixCabin = mat4.translate(mMatrixCabin, [-.1, 0, 0]);
      break;
      case 2:
        mMatrixFrontWheel = mat4.translate(mMatrixFrontWheel, [-.1, 0, 0]);
      break;
      case 3:
        mMatrixBackWheel = mat4.translate(mMatrixBackWheel, [-.1, 0, 0]);
      break;
      case 4:
        mMatrixPole = mat4.translate(mMatrixPole, [-.1, 0, 0]);
      break;
      case 5:
        mMatrixPoleTop = mat4.translate(mMatrixPoleTop, [-.1, 0, 0]);
      break;
      case 7:
        light_pos[2]-=.1;
      break;
      default:
    }
    break;





    case 117: //u
    case 85: //U
    switch (whichObj){
      case 1:
        mMatrixBody = mat4.translate(mMatrixBody, [0, .1, 0]);
      break;
      case 6:
        mMatrixCabin = mat4.translate(mMatrixCabin, [0, .1, 0]);
      break;
      case 2:
        mMatrixFrontWheel = mat4.translate(mMatrixFrontWheel, [0, .1, 0]);
      break;
      case 3:
        mMatrixBackWheel = mat4.translate(mMatrixBackWheel, [0, 0.1, 0]);
      break;
      case 4:
        mMatrixPole = mat4.translate(mMatrixPole,  [0, 0.1, 0]);
      break;
      case 5:
        mMatrixPoleTop = mat4.translate(mMatrixPoleTop,  [0, 0.1, 0]);
      break;
      case 7:
        light_pos[1]+=.1;
      break;
      default:
    }
    break;


    case 100: //d
    case 68:  //D
    switch (whichObj){
      case 1:
        mMatrixBody = mat4.translate(mMatrixBody, [0, -.1, 0]);
      break;
      case 6:
        mMatrixCabin = mat4.translate(mMatrixCabin, [0, -.1, 0]);
      break;
      case 2:
        mMatrixFrontWheel = mat4.translate(mMatrixFrontWheel, [0, -.1, 0]);
      break;
      case 3:
        mMatrixBackWheel = mat4.translate(mMatrixBackWheel, [0, -0.1, 0]);
      break;
      case 4:
        mMatrixPole = mat4.translate(mMatrixPole,  [0,-0.1, 0]);
      break;
      case 5:
        mMatrixPoleTop = mat4.translate(mMatrixPoleTop,  [0, -0.1, 0]);
      break;
      case 7:
        light_pos[1]+=-.1;
      break;
      default:
    }
    break;



    case 108: //l
    case 76: //L
    switch (whichObj){
      case 1:
        mMatrixBody = mat4.translate(mMatrixBody, [0, 0, -0.1]);
      break;
      case 6:
        mMatrixCabin = mat4.translate(mMatrixCabin, [0, 0, -0.1]);
      break;
      case 2:
        mMatrixFrontWheel = mat4.translate(mMatrixFrontWheel, [0, 0, -0.1]);
      break;
      case 3:
        mMatrixBackWheel = mat4.translate(mMatrixBackWheel, [0, 0, -0.1]);
      break;
      case 4:
        mMatrixPole = mat4.translate(mMatrixPole,  [0, 0, -0.1]);
      break;
      case 5:
        mMatrixPoleTop = mat4.translate(mMatrixPoleTop,  [0, 0, -0.1]);
      break;
      case 7:
        light_pos[0]-=.01;
      break;
      default:
    }
    break;
    case 114: //r
    case 82:  //R
    switch (whichObj){
      case 1:
        mMatrixBody = mat4.translate(mMatrixBody, [0, 0, 0.1]);
      break;
      case 6:
        mMatrixCabin = mat4.translate(mMatrixCabin, [0, 0, 0.1]);
      break;
      case 2:
        mMatrixFrontWheel = mat4.translate(mMatrixFrontWheel, [0, 0, 0.1]);
      break;
      case 3:
        mMatrixBackWheel = mat4.translate(mMatrixBackWheel, [0, 0, 0.1]);
      break;
      case 4:
        mMatrixPole = mat4.translate(mMatrixPole, [0, 0, 0.1]);
      break;
      case 5:
        mMatrixPoleTop = mat4.translate(mMatrixPoleTop,  [0, 0, 0.1]);
      break;
      case 7:
        light_pos[0]+=.01;
      break;
      default:
    }
    break;
    case 112: //p
    case 80: //P
      cameraMMatrix = mat4.rotate(cameraMMatrix, degToRad(1), [0,0,1]);
    break;
    case 113: //q
    case 81: //Q
      cameraMMatrix = mat4.rotate(cameraMMatrix, degToRad(1), [0,0,-1]);
    break;
  }
  drawScene();
}

function onDocumentMouseUp( event ) {
  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
