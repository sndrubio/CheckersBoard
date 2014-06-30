(function ( mythree , $, undefined) {

whitePieces = [];
blackPieces = [];

mythree.init = function(hook) {

	var checkersToAnimate = undefined;

	//1. Create a renderer
	//like canvas contexts, it has an internal resolution
	var WIDTH = 400,
	  HEIGHT = 400;
	  
	//all three elements are in the THREE namespace
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0xD2B48C , 0);
	
	hook.append(renderer.domElement);
	
	//2. Create a Camera
	//Camera variables
	var VIEW_ANGLE = 65, //65 FOV is most 'natural' FOV
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,		//these elements are needed for cameras to
	  FAR = 10000;		//partition space correctly
	var camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);
	camera.position.z = 350;
	
	//3. Create a controls Object - TrackballControls
	var controls = new THREE.TrackballControls( camera );
	controls.target.set( 0, 0, 0 );

	//4. Create scene 

		scene = new THREE.Scene();
		scene.add(camera);

	
	
	//5. Create the checkersboard in a cube geometry.

		// Materials
      var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('img/checkers.jpg')
      });
		//Geometry	 
	  
	   var checkersBoard = new THREE.Mesh(new THREE.CubeGeometry(360, 360,20, 8, 8,0), material);
		scene.add( checkersBoard );



	// 6. Create arrays for black and white pieces in their initial position
	//6.1 Initial blackPositions of black pieces 
		initialBlackPositions=[];
		
		initialBlackPositions.push(new THREE.Vector3(-113,157 , 15));
		initialBlackPositions.push(new THREE.Vector3(-23,157 , 15));
		initialBlackPositions.push(new THREE.Vector3(63,157 , 15));
		initialBlackPositions.push(new THREE.Vector3(155,157 , 15));
		
		initialBlackPositions.push(new THREE.Vector3(-157,113 , 15));
		initialBlackPositions.push(new THREE.Vector3(-70,113, 15));
		initialBlackPositions.push(new THREE.Vector3(20,113 , 15));
		initialBlackPositions.push(new THREE.Vector3(110,113, 15));
		
		initialBlackPositions.push(new THREE.Vector3(-113,69 , 15));
		initialBlackPositions.push(new THREE.Vector3(-23,69 , 15));
		initialBlackPositions.push(new THREE.Vector3(63,69 , 15));
		initialBlackPositions.push(new THREE.Vector3(155,69 , 15));
		
		//6.2 Initial whitePositions of white pieces
		initialWhitePositions=[];
		
		initialWhitePositions.push(new THREE.Vector3(-157,-157 , 15));
		initialWhitePositions.push(new THREE.Vector3(-70,-157 , 15));
		initialWhitePositions.push(new THREE.Vector3(20,-157 , 15));
		initialWhitePositions.push(new THREE.Vector3(110,-157, 15));
		
		initialWhitePositions.push(new THREE.Vector3(-113,-113 , 15));
		initialWhitePositions.push(new THREE.Vector3(-23,-113 , 15));
		initialWhitePositions.push(new THREE.Vector3(63,-113 , 15));
		initialWhitePositions.push(new THREE.Vector3(153,-113, 15));
		
		initialWhitePositions.push(new THREE.Vector3(-157,-69 , 15));
		initialWhitePositions.push(new THREE.Vector3(-70,-69 , 15));
		initialWhitePositions.push(new THREE.Vector3(20,-69 , 15));
		initialWhitePositions.push(new THREE.Vector3(110,-69, 15));
	
	
	//7. Let's prepare the arrays and methods needed to be used in the randomize button.
		//7.1. Create an array with all the positions in the board.
			// 7.1.1 All black positions
				blackPositions=[];
					//1st row
					blackPositions.push(new THREE.Vector3(-113,157 , 15));
					blackPositions.push(new THREE.Vector3(-23,157 , 15));
					blackPositions.push(new THREE.Vector3(63,157 , 15));
					blackPositions.push(new THREE.Vector3(155,157 , 15));
					//2dn row
					blackPositions.push(new THREE.Vector3(-157,113 , 15));
					blackPositions.push(new THREE.Vector3(-70,113, 15));
					blackPositions.push(new THREE.Vector3(20,113 , 15));
					blackPositions.push(new THREE.Vector3(110,113, 15));
					//3th row
					blackPositions.push(new THREE.Vector3(-113,69 , 15));
					blackPositions.push(new THREE.Vector3(-23,69 , 15));
					blackPositions.push(new THREE.Vector3(63,69 , 15));
					blackPositions.push(new THREE.Vector3(155,69 , 15));
					//4th row
					blackPositions.push(new THREE.Vector3(-157,23 , 15));
					blackPositions.push(new THREE.Vector3(-70,23, 15));
					blackPositions.push(new THREE.Vector3(20, 23 , 15));
					blackPositions.push(new THREE.Vector3(110,23, 15));
					//5th row
					blackPositions.push(new THREE.Vector3(-113,-23 , 15));
					blackPositions.push(new THREE.Vector3(-23,-23, 15));
					blackPositions.push(new THREE.Vector3(66,-23 , 15));
					blackPositions.push(new THREE.Vector3(155,-23, 15));
					//6th row
					blackPositions.push(new THREE.Vector3(-157,-69 , 15));
					blackPositions.push(new THREE.Vector3(-70,-69 , 15));
					blackPositions.push(new THREE.Vector3(20,-69 , 15));
					blackPositions.push(new THREE.Vector3(110,-69, 15));
					//7th row
					blackPositions.push(new THREE.Vector3(-113,-113 , 15));
					blackPositions.push(new THREE.Vector3(-23,-113 , 15));
					blackPositions.push(new THREE.Vector3(63,-113 , 15));
					blackPositions.push(new THREE.Vector3(153,-113, 15));
					//8th
					blackPositions.push(new THREE.Vector3(-157,-157 , 15));
					blackPositions.push(new THREE.Vector3(-70,-157 , 15));
					blackPositions.push(new THREE.Vector3(20,-157 , 15));
					blackPositions.push(new THREE.Vector3(110,-157, 15));
			
				//7.1.2 All white positions
				whitePositions=[];
					//1st row
					whitePositions.push(new THREE.Vector3(-157,157 , 15));
					whitePositions.push(new THREE.Vector3(-70,157 , 15));
					whitePositions.push(new THREE.Vector3(20,157 , 15));
					whitePositions.push(new THREE.Vector3(110,157 , 15));
					//2dn row
					whitePositions.push(new THREE.Vector3(-113,113 , 15));
					whitePositions.push(new THREE.Vector3(-23,113, 15));
					whitePositions.push(new THREE.Vector3(63,113 , 15));
					whitePositions.push(new THREE.Vector3(155,113, 15));
					//3th row
					whitePositions.push(new THREE.Vector3(-157,69 , 15));
					whitePositions.push(new THREE.Vector3(-70,69 , 15));
					whitePositions.push(new THREE.Vector3(20,69 , 15));
					whitePositions.push(new THREE.Vector3(110,69 , 15));
					//4th row
					whitePositions.push(new THREE.Vector3(-113,23 , 15));
					whitePositions.push(new THREE.Vector3(-23,23, 15));
					whitePositions.push(new THREE.Vector3(66, 23 , 15));
					whitePositions.push(new THREE.Vector3(155,23, 15));
					//5th row
					whitePositions.push(new THREE.Vector3(-157,-23 , 15));
					whitePositions.push(new THREE.Vector3(-70,-23, 15));
					whitePositions.push(new THREE.Vector3(20,-23 , 15));
					whitePositions.push(new THREE.Vector3(110,-23, 15));
					//6th row
					whitePositions.push(new THREE.Vector3(-113,-69 , 15));
					whitePositions.push(new THREE.Vector3(-23,-69 , 15));
					whitePositions.push(new THREE.Vector3(66,-69 , 15));
					whitePositions.push(new THREE.Vector3(155,-69, 15));
					//7th row
					whitePositions.push(new THREE.Vector3(-157,-113 , 15));
					whitePositions.push(new THREE.Vector3(-70,-113 , 15));
					whitePositions.push(new THREE.Vector3(20, -113 , 15));
					whitePositions.push(new THREE.Vector3(110,-113, 15));
					//8th
					whitePositions.push(new THREE.Vector3(-113,-157 , 15));
					whitePositions.push(new THREE.Vector3(-23,-157 , 15));
					whitePositions.push(new THREE.Vector3(63,-157 , 15));
					whitePositions.push(new THREE.Vector3(153,-157, 15));
	
	
		//7.2. Create a method for shuffle the positions. This method will be called later.
	
		
		function random(array) {
			for (var i = 0; i < array.length - 1; i++) {
				var j = Math.floor(Math.random() * (i + 1));
				var aux= array[i];
				array[i] = array[j];
				array[j] = aux;
			}
			return array;
		}
	
	
	
	
	
	//8. Create json  geometry loader. 
	// The piece will be load
	loader = new THREE.JSONLoader();
	loader.load( "data/piece.json", function( geometry ) {
		
		//Create one white piece in each initial position
		for(var i=0; i<initialWhitePositions.length; i++){
			
				mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color: 0xCDA776}) );
				//modify mesh position, scale, rotation here in
				//this callback
				
				mesh.scale.set( 30, 30, 30 );
				
				mesh.rotation.x += Math.PI;
				mesh.rotation.y += Math.PI/2;
				mesh.rotation.z += Math.PI/2;
				
				mesh.position=initialWhitePositions[i];
				
				whitePieces.push(mesh);
				//add it to the scene
				scene.add(mesh);	
		}
		
		//Create one black piece in each initial position
		for(var i=0; i<initialBlackPositions.length; i++){
			
				mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color: 0x880000}) );
				//modify mesh position, scale, rotation here in
				//this callback
				
				mesh.scale.set( 30, 30, 30 );
				
				mesh.rotation.x += Math.PI;
				mesh.rotation.y += Math.PI/2;
				mesh.rotation.z += Math.PI/2;

				mesh.position=initialBlackPositions[i];
				
				blackPieces.push(mesh);

				//add it to the scene
				scene.add(mesh);	
		}

		
		
			// Crate a button for randomize
	var button = $('<button type="button" class="randomize" id="randomize" style"float-left"> Randomize </button>');
			hook.append(button);
			
			$(button).on("click", function(){
				
				//Use shuffle method for white positions
				random(whitePositions);
				//animation for black pieces. 
				//position: current position of the black pieces
				//target: we have to move black pieces to white squares.
				$.each(blackPieces, function (key, value){
					
					var position = { x : value.position.x, y: value.position.y };
					var target = { x : whitePositions[key].x, y:  whitePositions[key].y };
					var tween = new TWEEN.Tween(position).to(target, 1000);
					
					
					tween.onUpdate(function(){
						value.position.x= this.x;
						value.position.y= this.y;
						
					});
				
					tween.easing(TWEEN.Easing.Elastic.InOut);

					tween.start();
				
					//if we don't want to use the animation, we should use the following code and uncomment the code above.
					//blackPieces[i].position = whitePositions[i];
					
				});
				
				
				//use shuffle method for black positions
				random(blackPositions);
				//animation for white pieces. 
				//position: current position of the white pieces
				//target: we have to move white pieces to black squares.
				$.each(whitePieces, function (key, value){
				
					var position = { x : value.position.x, y: value.position.y };
					var target = { x : blackPositions[key].x, y: blackPositions[key].y };
					var tween = new TWEEN.Tween(position).to(target, 1000);
					
					
						
					tween.onUpdate(function(){
						value.position.x= this.x;
						value.position.y= this.y;
						
					});
					//console.log(blackPieces[i]);
				
					tween.easing(TWEEN.Easing.Elastic.InOut);

					tween.start();
				
					//if we don't want to use the animation, we should use the following code and uncomment the code above.
					//whitePieces[i].position = blackPositions[i];
					
				});
				
			});
			
 } );
	
    
	
	//9. Create a button for changing checkers board
	
		var button = $('<button type="button" class="changeBoard" id="changeBoard" > Change board color </button>');
			hook.append(button);
	  
			$(button).on("click", function(){
				 
				 checkersBoard.material.map = THREE.ImageUtils.loadTexture('img/checkers2.jpg');
				 checkersBoard.material.needsUpdate = true;
			});

	//1. Create  a light
	var pointLight =
	  new THREE.PointLight(0xFFFFFF);
	  
	  //three.js has a vector class to set all variables at one time
	pointLight.position = new THREE.Vector3(0, 0, 250);
    
	//add to the scene
	scene.add(pointLight);	
	
	//11. Tell Three to render
	//this function will be called over and over and over
	function renderLoop() {
		renderer.render(scene, camera);
		controls.update();
		window.requestAnimationFrame(renderLoop);
		TWEEN.update();
	}
	
	window.requestAnimationFrame(renderLoop);

}

})(window.mythree = window.mythree || {} , jQuery)
