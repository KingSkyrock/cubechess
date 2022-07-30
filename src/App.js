import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import * as P from './Pieces';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.main = React.createRef();

    this.renderer;
    this.scene;
    this.camera;
    this.controls;
    this.mouse;
    this.raycaster;
    this.plane;

    this.selected = null;
    this.canMoveTo = [];
    //this.canMoveToGrid;

    this.cubeSidesGeometries = {
      posY: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negY: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      posX: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negX: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      posZ: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negZ: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]
    };
    this.pieceGeometries = {
      posY: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negY: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      posX: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negX: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      posZ: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negZ: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]
    };

    this.board = {
      posY: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negY: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      posX: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negX: [[null, null, null, null], [null, new P.Rook(P.WHITE), null, null], [null, null, null, null], [null, null, null, null]],
      posZ: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
      negZ: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]
    };

    this.state = {

    }
  };

  createPieces() {
    for (var [side, arr] of Object.entries(this.pieceGeometries)) {
      for (var i in arr) {
        for (var j in arr[i]) {
          if (this.pieceGeometries[side][i][j] instanceof THREE.Mesh) {
            this.scene.remove(this.pieceGeometries[side][i][j]);
          }
        }
      }
    }
    for (var [side, arr] of Object.entries(this.board)) {
      for (var i in arr) {
        for (var j in arr[i]) {
          if (this.board[side][i][j] instanceof P.Rook) {
            var color;
            if (this.board[side][i][j].color == P.WHITE) {
              color = 0xFFFFFF;
            } else {
              color = 0x000000;
            }
            this.pieceGeometries[side][i][j] = new THREE.Mesh(new THREE.PlaneGeometry(25, 25), new THREE.MeshPhongMaterial({ color: color, emissive: 0x000000, side: THREE.DoubleSide, flatShading: true }));
            if (side == "posZ") {
              this.pieceGeometries[side][i][j].position.set(-75 + 50 * j, 75 - 50 * i, 101);
            } else if (side == "negZ") {
              this.pieceGeometries[side][i][j].position.set(75 - 50 * j, 75 - 50 * i, -101);
            } else if (side == "posX") {
              this.pieceGeometries[side][i][j].position.set(101, 75 - 50 * i, 75 - 50 * j);
              this.pieceGeometries[side][i][j].rotation.y = Math.PI / 2;
            } else if (side == "negX") {
              this.pieceGeometries[side][i][j].position.set(-101, 75 - 50 * i, -75 + 50 * j);
              this.pieceGeometries[side][i][j].rotation.y = Math.PI / 2;
            } else if (side == "posY") {
              this.pieceGeometries[side][i][j].position.set(-75 + 50 * j, 101, -75 + 50 * i);
              this.pieceGeometries[side][i][j].rotation.x = Math.PI / 2;
            } else if (side == "negY") {
              this.pieceGeometries[side][i][j].position.set(-75 + 50 * j, -101, 75 - 50 * i);
              this.pieceGeometries[side][i][j].rotation.x = Math.PI / 2;
            }
            this.pieceGeometries[side][i][j].piece = true;
            this.scene.add(this.pieceGeometries[side][i][j]);
          }
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove', evt => this.onMouseMove(evt));
    window.addEventListener('mousedown', evt => this.onMouseDown(evt));
    window.addEventListener('resize', evt => this.onResize(evt));

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    
    this.createPieces();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xaaaaaa, 1);

    this.main.current.appendChild(this.renderer.domElement);

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.noPan = true;
    this.controls.minDistance = 200;
    this.controls.maxDistance = 5000;
    this.controls.rotateSpeed = 5;
    this.controls.zoomSpeed = 0.5;

    for (var [side, arr] of Object.entries(this.cubeSidesGeometries)) {
      for (var i in arr) {
        for (var j in arr[i]) {          
          this.cubeSidesGeometries[side][i][j] = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({ color: this.getSideColor(i, j, side), emissive: 0x000000, side: THREE.DoubleSide, flatShading: true }));
          if (side == "posZ") {
            this.cubeSidesGeometries[side][i][j].position.set(-75 + 50 * j, 75 - 50 * i, 100);
          } else if (side == "negZ") {
            this.cubeSidesGeometries[side][i][j].position.set(75 - 50 * j, 75 - 50 * i, -100);
          } else if (side == "posX") {
            this.cubeSidesGeometries[side][i][j].position.set(100, 75 - 50 * i, 75 - 50 * j);
            this.cubeSidesGeometries[side][i][j].rotation.y = Math.PI / 2;
          } else if (side == "negX") {
            this.cubeSidesGeometries[side][i][j].position.set(-100, 75 - 50 * i, -75 + 50 * j);
            this.cubeSidesGeometries[side][i][j].rotation.y = Math.PI / 2;
          } else if (side == "posY") {
            this.cubeSidesGeometries[side][i][j].position.set(-75 + 50 * j, 100, -75 + 50 * i);
            this.cubeSidesGeometries[side][i][j].rotation.x = Math.PI / 2;
          } else if (side == "negY") {
            this.cubeSidesGeometries[side][i][j].position.set(-75 + 50 * j, -100, 75 - 50 * i);
            this.cubeSidesGeometries[side][i][j].rotation.x = Math.PI / 2;
          }
          this.scene.add(this.cubeSidesGeometries[side][i][j]);
        }
      }
    }

    //this.scene.add(new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshPhongMaterial({ color: 0x654321, emissive: 0x000000, side: THREE.DoubleSide, flatShading: true })));

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0, 2);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0, 2);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0, 2);
    lights[3] = new THREE.PointLight(0xffffff, 1, 0, 2);
    lights[4] = new THREE.PointLight(0xffffff, 1, 0, 2);
    lights[5] = new THREE.PointLight(0xffffff, 1, 0, 2);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(0, -200, 0);
    lights[2].position.set(200, 0, 0);
    lights[3].position.set(-200, 0, 0);
    lights[4].position.set(0, 0, -200);
    lights[5].position.set(0, 0, 200);
    for (var i of lights) {
      this.scene.add(i);
    }

    this.camera.position.z = 300;
    this.controls.update();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderThreeJS();
  }

  renderThreeJS() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    requestAnimationFrame(this.renderThreeJS.bind(this));

    this.createPieces();
  }

  onResize(evt) {
    evt.preventDefault();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  onMouseMove(evt) {
    evt.preventDefault();

    this.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    var intersects = this.raycaster.intersectObject(this.scene, true);
    
    this.updateSideColors();

    if (intersects.length > 0) {
      for (var [side, arr] of Object.entries(this.cubeSidesGeometries)) {
        for (var i in arr) {
          for (var j in arr[i]) {
            if (intersects[0].object.uuid == this.cubeSidesGeometries[side][i][j].uuid) {
              intersects[0].object.material.color.set(0x156289)
            } else if (intersects[0].object.piece && this.pieceGeometries[side][i][j] && intersects[0].object.uuid == this.pieceGeometries[side][i][j].uuid) {
              this.cubeSidesGeometries[side][i][j].material.color.set(0x156289)
            }
          }
        }
      }
    }
  }

  onMouseDown(evt) {
    evt.preventDefault();

    this.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    var intersects = this.raycaster.intersectObject(this.scene, true);
    if (intersects.length > 0) {
      for (var [side, arr] of Object.entries(this.cubeSidesGeometries)) {
        for (var i in arr) {
          for (var j in arr[i]) {
            if (intersects[0].object.uuid == this.cubeSidesGeometries[side][i][j].uuid) {
              this.handleClick(side, j, i);
            } else if (intersects[0].object.piece && this.pieceGeometries[side][i][j] && intersects[0].object.uuid == this.pieceGeometries[side][i][j].uuid) {
              this.handleClick(side, j, i);
            }
          }
        }
      }
    }
  }

  handleClick(side, x, y) {
    if (this.board[side][y][x] instanceof P.Piece) {
      this.selected = {side: side, x: x, y: y};
      this.canMoveTo = this.board[side][y][x].getMovement(side, x, y, this.board);
    } else if (this.selected != null) {
      for (var [side2, arr] of Object.entries(this.canMoveTo)) {
        var moved;
        for (var i in arr) {
          if (side2 == side && arr[i][1] == y && arr[i][0] == x) {
            this.board[side][y][x] = this.board[this.selected.side][this.selected.y][this.selected.x];
            this.board[this.selected.side][this.selected.y][this.selected.x] = null;
            this.selected = null;
            this.canMoveTo = null;

            moved = true;
            break;
          }
        }
        if (moved) break;
      }
    } else {
      this.selected = null;
    }
    this.updateSideColors();
  }

  updateSideColors() {
    for (var [side, arr] of Object.entries(this.cubeSidesGeometries)) {
      for (var i in arr) {
        for (var j in arr[i]) {
          this.cubeSidesGeometries[side][i][j].material.color.set(this.getSideColor(i, j, side));
        }
      }
    }
  }

  getSideColor(i, j, side) {
    var color;
    if (side == "posX" || side == "negX" || side == "negY" || side == "posY") {
      if (i % 2) {
        if (j % 2) {
          color = 0xc6a27e;
        } else {
          color = 0xf8dfa1;
        }
      } else {
        if (j % 2) {
          color = 0xf8dfa1;
        } else {
          color = 0xc6a27e;
        }
      }
    } else if (side == "posZ" || side == "negZ") {
      if (i % 2) {
        if (j % 2) {
          color = 0xf8dfa1;
        } else {
          color = 0xc6a27e;
        }
      } else {
        if (j % 2) {
          color = 0xc6a27e;
        } else {
          color = 0xf8dfa1;
        }
      }
    }

    if (this.canMoveTo != null) {
      for (var [side2, arr] of Object.entries(this.canMoveTo)) {
        for (var c of arr) {
          if (side == side2 && c[0] == j && c[1] == i) {
            color = 0x00FF00;
          }
        }
      }
    }
    
    
    return color;
  }

  render() {
    return (
      <div ref={this.main} className='main'>
       
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
