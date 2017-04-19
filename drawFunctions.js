
var mat_ambient;
var mat_diffuse;
var mat_specular = [.9, .9, .9,1];
var mat_shine = [50];

function drawCube(matrix, nMatrix){
  mat_ambient = [0, 0, .025, 1];
  mat_diffuse= [0, 0, 1, 1];

  gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0);
  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);
  gl.uniform4f(shaderProgram.specular_coefUniform, mat_specular[0], mat_specular[1], mat_specular[2],1.0);
  gl.uniform1f(shaderProgram.shininess_coefUniform, mat_shine[0]);

  setMatrixUniforms(matrix, nMatrix);
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);

  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
  console.log(mat_diffuse);
  gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0);
}

function drawRect(matrix, nMatrix){
  mat_ambient = [0, 0, .025, 1];
  mat_diffuse= [0, 0, 1, 1];

  gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0);
  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);
  gl.uniform4f(shaderProgram.specular_coefUniform, mat_specular[0], mat_specular[1], mat_specular[2],1.0);
  gl.uniform1f(shaderProgram.shininess_coefUniform, mat_shine[0]);

  setMatrixUniforms(matrix, nMatrix);
  gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, rectVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  // gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexColorBuffer);
  // gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,rectVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);
  gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, rectVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rectVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, rectVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0);
  // gl.drawArrays(gl.LINE_LOOP, 0, cubeVertexPositionBuffer.numItems);
}


function drawCylinder(matrix, nMatrix){
  mat_ambient = [.025, 0, 0, 1];
  mat_diffuse= [1, 0, 0, 1];

  gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0);
  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);
  gl.uniform4f(shaderProgram.specular_coefUniform, mat_specular[0], mat_specular[1], mat_specular[2],1.0);
  gl.uniform1f(shaderProgram.shininess_coefUniform, mat_shine[0]);

  setMatrixUniforms(matrix, nMatrix);
  //draw top circle of cylinder
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderTopVertexPositionBuffer.itemSize, gl.FLOAT, false, 0,0);

  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderTopNormalVertexBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cylinderTopNormalVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, cylinderTopVertexPositionBuffer.numItems);
  // draw bottom circle of cylinder
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBottomVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderBottomVertexPositionBuffer.itemSize, gl.FLOAT, false, 0,0);
  // gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBottomVertexColorBuffer);
  // gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cylinderBottomVertexColorBuffer.itemSize, gl.FLOAT, false, 0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderBotNormalVertexBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cylinderBotNormalVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, cylinderBottomVertexPositionBuffer.numItems);


  // draw sides of cylinder
  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSidesVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cylinderSidesVertexPositionBuffer.itemSize, gl.FLOAT, false, 0,0);
  // gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSidesVertexColorBuffer);
  // gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cylinderSidesVertexColorBuffer.itemSize, gl.FLOAT, false, 0,0);

  gl.bindBuffer(gl.ARRAY_BUFFER, cylinderSidesNormalVertexBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cylinderSidesNormalVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, cylinderSidesVertexPositionBuffer.numItems);

}

function drawSphere(matrix, nMatrix){
  mat_ambient = [.025, .025, 0, 1];
  mat_diffuse= [1, 1, 0, 1];

  gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0);
  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);
  gl.uniform4f(shaderProgram.specular_coefUniform, mat_specular[0], mat_specular[1], mat_specular[2],1.0);
  gl.uniform1f(shaderProgram.shininess_coefUniform, mat_shine[0]);

  setMatrixUniforms(matrix, nMatrix);
  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, sphereVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0);

  gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, sphereVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, sphereVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0);
}
