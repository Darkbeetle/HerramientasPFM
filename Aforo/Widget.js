
define(["dojo/dom",
"dojo/_base/lang",
"dojo/json",
"esri/config",
"esri/graphic",
"esri/geometry/Geometry",
"esri/geometry/Extent",
"esri/SpatialReference",
"esri/tasks/GeometryService",
"esri/tasks/AreasAndLengthsParameters",
"esri/toolbars/draw",
"esri/symbols/SimpleFillSymbol",'dojo/_base/declare', 'jimu/BaseWidget'],
  function(dom, lang, json, esriConfig, Graphic, Geometry, Extent, SpatialReference, GeometryService, AreasAndLengthsParameters, Draw, SimpleFillSymbol,declare, BaseWidget) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-Aforo',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      // postCreate: function() {
      //   this.inherited(arguments);
      //   console.log('postCreate');
      // },

      startup: function() {
          
      },

      //  console.log('startup');
      // },

      onOpen: function(){
        
        var tb = new Draw(this.map);
          tb.on("draw-end", lang.hitch(this, function (evtObj) {
            
                geometry = evtObj.geometry;
            
            console.log(evtObj,"geometry")
            var graphic = this.map.graphics.add(new Graphic(geometry, new SimpleFillSymbol()));
      
          
            var areasAndLengthParams = new AreasAndLengthsParameters();
            areasAndLengthParams.lengthUnit = GeometryService.UNIT_METER;
            areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;
            areasAndLengthParams.calculationType = "geodesic";
            geometryService.simplify([geometry], function(simplifiedGeometries) {
              areasAndLengthParams.polygons = simplifiedGeometries;
              geometryService.areasAndLengths(areasAndLengthParams);
            });
          }))
          tb.activate(Draw.POLYGON);
          var geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
          geometryService.on("areas-and-lengths-complete", this.outputAreaAndLength);
          
          

      },
      outputAreaAndLength: function(results){
        
        console.log("this",results)
        var result = results.result;
      console.log(json.stringify(result));
      dom.byId("area").innerHTML = result.areas[0].toFixed(3) + " m2";
      area2 = result.areas[0].toFixed(3)
      },

      calculoaforo: function(){
        var area = parseFloat(area2)
        console.log(area,area2)
        var distancia = parseFloat(dom.byId("distancia").value)
        console.log(distancia,"distancia")
        var calculo = area / distancia
        console.log(calculo)
        
        dom.byId("aforo").innerHTML = calculo + " personas";
        
        
      },
      limpiar : function(){
        this.map.graphics.clear();
      },
      // onClose: function(){
      //   var func = lang.hitch(tb, function(){
      //     console.log(func,"func")
      //   })
      //   func.deactivate()

          
        
        
      // },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });