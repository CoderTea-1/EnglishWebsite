document.addEventListener("DOMContentLoaded", () => {
          (d => {
                    const c_container = d.querySelector(".canvas-container")
                    const gl = {
                      renderer: new THREE.WebGLRenderer({ antialias: true, alpha: true }),
                      scene: new THREE.Scene(),
                      camera: new THREE.PerspectiveCamera(20, innerWidth / innerHeight, 1),
                      raycaster: new THREE.Raycaster(),
                      meshes: [],
                      floor: null,
                      group: new THREE.Object3D(),
                      grid: { cols: 20, rows: 20 }
                    };
                    
                    let mouseMoved = false
                    const mouse = new THREE.Vector2();
                  
                    const radians = degrees => degrees * Math.PI / 180;
                  
                    const distance = (x1, y1, x2, y2) => {
                      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                    };
                  
                    const map = (value, start1, stop1, start2, stop2) => {
                      return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
                    };
                  
                    const cylinder = {
                      geom: new THREE.CylinderGeometry(0.3, 0.3, 0.2, 64),
                      rotation: {
                        x: 0,
                        y: 0,
                        z: radians(-180)
                      }
                    };
                  
                    const cone = {
                      geom: new THREE.ConeGeometry(0.3, 0.5, 32),
                      rotation: {
                        x: 0,
                        y: 0,
                        z: radians(-180)
                      }
                    };
                  
                    const torus = {
                      geom: new THREE.TorusBufferGeometry(0.25, 0.08, 30, 200),
                      rotation: {
                        x: radians(90),
                        y: 0,
                        z: 0
                      }
                    };
                  
                    const geometries = [cylinder, cone, torus];
                  
                    const getTotalRows = col => (col % 2 === 0 ? gl.grid.cols : gl.grid.cols - 1);
                  
                    const addScene = () => {
                      gl.camera.position.set(0, 65, 0);
                      gl.camera.rotation.x = -1.57;
                  
                      gl.scene.add(gl.camera);
                  
                      createGrid();
                    };
                  
                    const addMaterial = () =>
                      new THREE.MeshPhysicalMaterial({
                        color: "#424242",
                        metalness: 1,
                        emissive: "#424242",
                        roughness: 1
                      });
                  
                    const randomGeo = () =>
                      geometries[Math.floor(Math.random() * geometries.length)];
                  
                    const meshGeoandMat = (geometry, material) => {
                      const mesh = new THREE.Mesh(geometry, material);
                  
                      mesh.castShadow = true;
                      mesh.receiveShadow = false;
                  
                      return mesh;
                    };
                  
                    const createGrid = () => {
                      const material = addMaterial();
                      const gutter = 4;
                  
                      for (let row = 0; row < gl.grid.rows; row++) {
                        gl.meshes[row] = [];
                        for (let index = 0; index < 1; index++) {
                          const totalCols = getTotalRows(row);
                          for (let col = 0; col < totalCols; col++) {
                            const geometry = randomGeo();
                            const mesh = meshGeoandMat(geometry.geom, material);
                  
                            mesh.position.y = 0;
                            mesh.position.x =
                              col + col * gutter + (totalCols === gl.grid.cols ? 0 : 2.5);
                            mesh.position.z = row + row * (index + 0.25);
                  
                            mesh.rotation.set(
                              geometry.rotation.x,
                              geometry.rotation.y,
                              geometry.rotation.z
                            );
                  
                            mesh.initialRotation = {
                              x: mesh.rotation.x,
                              y: mesh.rotation.y,
                              z: mesh.rotation.z
                            };
                  
                            gl.group.add(mesh);
                  
                            gl.meshes[row][col] = mesh;
                          }
                        }
                      }
                  
                      const centerX = -gl.grid.cols / 2 * gutter - 0.5;
                      const centerZ = -(gl.grid.rows / 2) - 0.5;
                  
                      gl.group.position.set(centerX, 0, centerZ);
                  
                      gl.scene.add(gl.group);
                  
                      addLight();
                      addFloor();
                      addRender();
                      update();
                    };
                  
                    const addLight = () => {
                      const amLight = new THREE.AmbientLight("#ffffff", 1);
                      gl.scene.add(amLight);
                  
                      const spotLight = new THREE.SpotLight("#563500", 1, 1000);
                      spotLight.position.set(0, 27, 0);
                      spotLight.castShadow = true;
                      gl.scene.add(spotLight);
                  
                      const rectLight = new THREE.RectAreaLight("#2d1c00", 1, 2000, 2000);
                      rectLight.position.set(5, 50, 50);
                      rectLight.lookAt(0, 0, 0);
                      gl.scene.add(rectLight);
                  
                      const pointLight = new THREE.PointLight("#FFDB9E", 1, 1000, 1);
                      pointLight.position.set(0, 10, -100);
                      gl.scene.add(pointLight);
                    };
                  
                    const addFloor = () => {
                      const geometry = new THREE.PlaneGeometry(100, 100);
                      const material = new THREE.ShadowMaterial({ opacity: 0.3 });
                      gl.floor = new THREE.Mesh(geometry, material);
                  
                      gl.floor.position.y = 0;
                      gl.floor.receiveShadow = true;
                      gl.floor.rotateX(-Math.PI / 2);
                  
                      gl.scene.add(gl.floor);
                    };
                  
                    const addRender = () => {
                      gl.renderer.setSize(innerWidth, innerHeight);
                      gl.renderer.setPixelRatio(devicePixelRatio);
                  
                      gl.renderer.shadowMap.enabled = true;
                      gl.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                  
                      d.querySelector(".canvas-container").append(gl.renderer.domElement);
                    };
                  
                    const update = () => {
                      gl.raycaster.setFromCamera(mouse, gl.camera);
                      const intersects = gl.raycaster.intersectObjects([gl.floor]);
                      if (mouseMoved) {
                        if (intersects.length > 0) {
                          const { x, z } = intersects[0].point;
                  
                          for (let row = 0; row < gl.grid.rows; row++) {
                            for (let index = 0; index < 1; index++) {
                              const totalCols = getTotalRows(row);
                              for (let col = 0; col < totalCols; col++) {
                                const mesh = gl.meshes[row][col];
                                const mouseDistance = distance(
                                  x,
                                  z,
                                  mesh.position.x + gl.group.position.x,
                                  mesh.position.z + gl.group.position.z
                                );
                                const y = map(mouseDistance, 7, 0, 0, 6);
                                TweenMax.to(mesh.position, 0.3, { y: y < 1 ? 1 : y });
                  
                                const scaleFactor = mesh.position.y / 1.2;
                  
                                const scale = scaleFactor < 1 ? 1 : scaleFactor;
                  
                                TweenMax.to(mesh.scale, 0.3, {
                                  ease: Expo.easeOut,
                                  x: scale,
                                  y: scale,
                                  z: scale
                                });
                  
                                TweenMax.to(mesh.rotation, 0.7, {
                                  ease: Expo.easeOut,
                                  x: map(
                                    mesh.position.y,
                                    -1,
                                    1,
                                    radians(270),
                                    mesh.initialRotation.x
                                  ),
                                  z: map(
                                    mesh.position.y,
                                    -1,
                                    1,
                                    radians(-90),
                                    mesh.initialRotation.z
                                  ),
                                  y: map(
                                    mesh.position.y,
                                    -1,
                                    1,
                                    radians(45),
                                    mesh.initialRotation.y
                                  )
                                });
                              }
                            }
                          }
                        }
                      }
                      resize();
                      render();
                      requestAnimationFrame(update);
                    };
                  
                    const resize = () => {
                      gl.camera.aspect = innerWidth / innerHeight;
                      gl.renderer.setClearColor(0x000000, 0);
                      gl.camera.updateProjectionMatrix();
                      gl.renderer.setSize(innerWidth, innerHeight);
                    };
                  
                    const render = () => gl.renderer.render(gl.scene, gl.camera);
                  
                    addScene();
                    c_container.addEventListener("mouseenter", () => { mouseMoved = true})
                    c_container.addEventListener("mousemove", e => {
                      mouse.x = e.clientX / innerWidth * 2 - 1;
                      mouse.y = -(e.clientY / innerHeight) * 2 + 1;
                    });
                  })(document);
                  
      });
      