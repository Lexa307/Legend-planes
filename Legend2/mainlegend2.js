let scene,renderer,camera,group,geometry,material,plane,light;
/*global THREE*/

//let controls = new THREE.OrbitControls( camera ); 
//controls.update();
//let focPoint=new THREE.Vector3(115,72,0);
//controls.target=focPoint;

//let can=true;

let stage={
	zero:function(){
		let cnt=0;
		let offeset=0;
	for(let i=0; i<group.children.length;i++){
		if(cnt>3){
			cnt=0;
			offeset+=0.05;
		}
		cnt++;
			let dest= group.children[i].position.x - 100;
			TweenMax.to(group.children[i].position,1,{ease: Power2.easeOut,x:dest,delay:offeset});
		}
	},
	first:function(){
		let cnt=0;
		let offeset=0;
	for(let i=0; i<group.children.length;i++){
		if(cnt>3){
			cnt=0;
			offeset+=0.05;;
		}
		cnt++;
			let dest= group.children[i].position.x+ 100;
			TweenMax.to(group.children[i].position,1,{ease: Power2.easeOut,x:dest,delay:offeset});
			
		}
	}

};


scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );
 group = new THREE.Group();
 renderer = new THREE.WebGLRenderer( { alpha: true,antialias:true } );

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );

document.body.appendChild( renderer.domElement );

 geometry = new THREE.PlaneGeometry( 1.5, 7, 1 );
 material = new THREE.MeshStandardMaterial( {color: 0xD2AD75, side: THREE.DoubleSide, wireframe:false, metalness:1, emissive:0x463C31, transparent:true} );
 plane = new THREE.Mesh( geometry, material );

function randomFromTo(from,to){
	return Math.floor(from+Math.random()*(to+1-from));
}


 light = new THREE.PointLight();
scene.add(light);
// let pointLightHelper = new THREE.PointLightHelper( light );
// scene.add( pointLightHelper );
light.position.set(-87,136,164);


function newSecondaryGroup(world_X,world_Z,world_Y){
	for (let i=0;i<56;i+=7){
		for(let j=0;j<21;j+=8){
			let tmp = plane.clone();
			tmp.position.set(world_X+i+randomFromTo(-2,3),world_Y+j,world_Z);
			tmp.amplitude=0.01+Math.random()*(0.05-0.008);
    		group.add(tmp);
		}

	}
	scene.add(group);
}


camera.position.set(-75, -2.5, 50);
//var size = 10000;
//var divisions = 500;

//var gridHelper = new THREE.GridHelper( size, divisions );
//scene.add( gridHelper );
newSecondaryGroup(0,0,-10);
stage.zero();
//let f =setTimeout(function(){stage.first();},5000);
//let f1 =setTimeout(function(){stage.second();},15000);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	//controls.update();
	//if(can){
	for(let i=0; i<group.children.length;i++){
	   	group.children[i].rotation.y+=group.children[i].amplitude;
	}
	//}
}
animate();
