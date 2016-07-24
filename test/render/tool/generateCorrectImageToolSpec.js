var instanceTool = (function(){
    return {
        getInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, range / 2 - this._getVal(index + 1, count) * range, range / 2 - this._getVal(index+ 2, count) * range);
        },
        getShadowInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, 60, 0);
        },
        getInstanceRotation:function(index, count){
            var val = this._getVal(index, count);

            return wd.Vector3.create(90 * val, 90 * val,0);
        },
        getInstanceScale:function(index, count){
            return wd.Vector3.create(3,3,3);
        },
        _getVal:function(index, count){
            //if(index % 2 === 0){
            //    if(isRevert){
            //        return mathTestUtils.toFixed(1 - (index) / count, 3);
            //    }
            //
            //    return mathTestUtils.toFixed((index) / count, 3);
            //}
            //else{
            //    if(isRevert){
            //        return mathTestUtils.toFixed((index) / count, 3);
            //    }
            //
            //    return mathTestUtils.toFixed(1 - (index) / count, 3);
            //}
            return randomTool.getFixedRandomNum(index);
        }
    }
})();

describe("generate correct image tool", function () {
    var tester;

    //function body(assetParentDirPath, done){
    //}

    function body(initFunc){
        if(initFunc){
            initFunc();
        }

        initSample();


        tester.init();

        function initSample() {
            var director = wd.Director.getInstance();

            var models = createModels();
            var ground = createGround();

            director.scene.addChild(ground);
            director.scene.addChildren(models);
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createPointLight());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createModels(){
            var arr = [],
                model = createSphere(),
                range = 300,
                count = 2;

            model.transform.position = wd.Vector3.create(60, 20, 0);

            arr.push(model);

            var sourceInstanceComponent = model.getComponent(wd.SourceInstance);

            for(var i = 0; i < count; i++){
                var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

//                instance.transform.position = wd.Vector3.create(range / 2 - Math.random() * range, range / 2 - Math.random() * range, range / 2 - Math.random() * range);
//                instance.transform.position = wd.Vector3.create(range / 2 - Math.random() * range, 60, 0);
//                instance.transform.rotate(90 * Math.random(), 90 * Math.random(),0);
//                instance.transform.scale = wd.Vector3.create(3,3,3);


                instance.transform.position = instanceTool.getShadowInstancePosition(i, range, count);


//
//                var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
//                    this.transform.rotate(0, 0, Math.random() * 10);
//                }, instance));
//
//                instance.addComponent(action);
//
//
                arr.push(instance);
            }

            return arr;
        }


        function createSphere(){
            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 16;
//            material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
            material.shading = wd.EShading.SMOOTH;


            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 20;
            geometry.segment = 20;


            var gameObject = wd.GameObject.create();

            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);

            gameObject.name = "sphere";


            var sourceInstanceComponent = wd.SourceInstance.create();

            gameObject.addComponent(sourceInstanceComponent);


            var shadow = wd.Shadow.create();
            shadow.cast = true;
            shadow.receive = true;

            gameObject.addComponent(shadow);





            var boxChild1 = createBox();
            var boxChild2 = createBox();
            var boxChild21 = createBox();

            gameObject.addChild(boxChild1);
            gameObject.addChild(boxChild2);

            boxChild2.addChild(boxChild21);


            boxChild1.transform.translate(50, 0, 0);
            boxChild2.transform.translate(-50, 0, 0);

            boxChild21.transform.translate(-60, 0, 0);






            gameObject.transform.translate(wd.Vector3.create(-30, 20, 0));


//            boxChild1.transform.translate(wd.Vector3.create(20, 10, 30));
//            boxChild1.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


            return gameObject;

        }

        function createBox(){
            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.color = wd.Color.create("#666666");
            material.shininess = 16;


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 10;
            geometry.height = 10;
            geometry.depth = 10;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);



            //var action = wd.RepeatForever.create(wd.CallFunc.create(function(gameObject){
            //    gameObject.transform.rotate(0, 1, 0);
            //}));
            //
            //gameObject.addComponent(action);

            return gameObject;
        }

        function createGround(){
//            var map = wd.LoaderManager.getInstance().get("ground").toTexture();
//            map.name = "groundMap";
//            map.wrapS = wd.ETextureWrapMode.REPEAT;
//            map.wrapT = wd.ETextureWrapMode.REPEAT;
//            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 32;
//            material.diffuseMap = map;


            var plane = wd.PlaneGeometry.create();
            plane.width = 200;
            plane.height = 200;
            plane.material = material;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(plane);

            gameObject.name = "ground";




            var shadow = wd.Shadow.create();
            shadow.cast = false;
            shadow.receive = true;

            gameObject.addComponent(shadow);




            gameObject.transform.translate(wd.Vector3.create(1,1,1));


            return gameObject;
        }

        function createAmbientLight() {
            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        }

        function createPointLight() {
            var SHADOW_MAP_WIDTH = 1024,
                SHADOW_MAP_HEIGHT = 1024;
//            var listArr = boxArr.concat(groundArr);

            var pointLightComponent = wd.PointLight.create();
            pointLightComponent.color = wd.Color.create("#ffffff");
            pointLightComponent.intensity = 2;
            pointLightComponent.rangeLevel = 11;
            pointLightComponent.castShadow = true;
            pointLightComponent.shadowCameraNear = 0.1;
            pointLightComponent.shadowCameraFar = 1000;
            pointLightComponent.shadowBias = 0.01;
            pointLightComponent.shadowDarkness = 0.2;
            pointLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
            pointLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

//            pointLightComponent.shadowRenderList = {
//                px:listArr,
//                nx:listArr,
//                py:listArr,
//                ny:listArr,
//                pz:listArr,
//                nz:listArr
//            };

            var pointSphereMaterial = wd.BasicMaterial.create();
            pointSphereMaterial.color = wd.Color.create("#ffffff");

            var geometry = wd.SphereGeometry.create();
            geometry.material = pointSphereMaterial;
            geometry.radius = 1;
            geometry.segment = 20;


            var pointLight = wd.GameObject.create();
            pointLight.addComponent(pointLightComponent);
            pointLight.addComponent(geometry);
            pointLight.addComponent(wd.MeshRenderer.create());



            pointLight.transform.translate(wd.Vector3.create(0, 50, 50));

            return pointLight;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 1000;

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.theta = Math.PI / 4;
            controller.distance = 200;

            camera.addComponent(controller);

            return camera;
        }

    }


    //beforeEach(function (done) {
    beforeEach(function () {
        tester = SceneTester.create();

        renderTestTool.prepareContext();

        //tester.execBody(body, done);
        body();
    });
    afterEach(function () {
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:1,
                    imageName:"instance_shadow_pointLight.png"
                }
            ]
        );
    });
});

