
var app = {
    // Application Constructor
    initialize: function() {

     console.log('initialize');
     this.bindEvents();
     this.watchID = null;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
		  console.log('binding');

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		console.log('ready');

        //app.receivedEvent('deviceready');

		app.statusdiv = document.getElementById("status");

    app.startAccelWatch();
		window.addEventListener("batterycritical", app.battCrit, false);
		window.addEventListener("batterylow", app.battLow, false);
		window.addEventListener("batterystatus", app.battStat, false);
		document.getElementById("duploclique").addEventListener("dblclick",function(){
			alert('oi');
			console.log('duplo clique');
		},false);

  	window.addEventLister('dblclick', function(){
			alert('oi');
			console.log('duplo clique');
		}, false);


    },

//acceleration
  startAccelWatch: function(){
    var options = { frequency: 2000 };
    app.watchID = navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);
  },

  onSuccess: function(acceleration) {
        var element = document.getElementById('deviceAccel');
        element.innerHTML = 'Acceleration X: ' + acceleration.x + '\n' +
                            'Acceleration Y: ' + acceleration.y + '\n' +
                            'Acceleration Z: ' + acceleration.z + '\n' +
                            'Timestamp: '      + acceleration.timestamp + '\n';

    },

    onError: function(){
      app.statusdiv.innerHTML = "Acceleration Error!";
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    battCrit : function(info) {
		console.log('batcritico');
		navigator.notification.alert("Your battery is SUPER low!");
		app.drawStatus(info);
	},
    battLow : function(info) {
		console.log('batlow');
		navigator.notification.alert("Your battery is low!");
		app.drawStatus(info);
	},

    battStat : function(info) {
		console.log('batstat');
		app.drawStatus(info);
    },

    drawStatus : function(info){
		console.log('statusInfo');
        var s = "<p>O nível da bateria é: "+info.level + "%<br/>";
        if (info.isPlugged === true) {
            s += "Carregando!";
        }else {
            s += "Desconectado!";
        };
		s += "</p>";

		app.statusdiv.innerHTML = s;
        alert(info.level + "%");
	}

};
