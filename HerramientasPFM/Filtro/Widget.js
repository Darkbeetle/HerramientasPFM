
define(["dojo/dom",'dojo/_base/declare', 'jimu/BaseWidget',"esri/layers/FeatureLayer"],
  function(dom,declare, BaseWidget,FeatureLayer) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-Filtro',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      // postCreate: function() {
      //   this.inherited(arguments);
      //   console.log('postCreate');
      // },

      // startup: function() {
      //  this.inherited(arguments);
      //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      //  console.log('startup');
      // },

      onOpen: function(){
        console.log(this.map,"map")

      },
      FiltroInteres: function(){
        var layer1 = this.map.getLayer("PI_Turistas_FINAL_4521");
        console.log("layer", layer1)
        var inputinteres = dom.byId("interes").value
        var subtipointeres = layer1.setDefinitionExpression(`subtipo='${inputinteres}'`)
      },
      FiltroOcio: function(){
        var layer2 = this.map.getLayer("PI_Turistas_FINAL_7825");
        var inputocio = dom.byId("ocio").value
        var subtipoocio = layer2.setDefinitionExpression(`subtipo='${inputocio}'`)
      },
      
      Borrar: function(){
        
        document.getElementById("interes").value = "";
        document.getElementById("ocio").value = "";
        
        var layer1 = this.map.getLayer("PI_Turistas_FINAL_4521")
        layer1.setDefinitionExpression(layer1.defaultDefinitionExpression)
        var layer2 = this.map.getLayer("PI_Turistas_FINAL_7825")
        layer2.setDefinitionExpression(layer2.defaultDefinitionExpression)
        
      },
      

      // onClose: function(){
      //   console.log('onClose');
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