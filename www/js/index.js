/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 function Escanear(){
    cordova.plugins.barcodeScanner.scan(
            
        function (result) {
            if(result.cancelled != true){
                if (navigator.onLine) {
                    var datos = {
                        idCredencial: result.text
                    }   
                    $.post("http://190.60.211.17/Fontan/index.php/registro_control/generarRegistroControl", datos)
                    .done(function( data ) {
                        console.log(data)
                        
                        if($.trim(data) != "[]"){
                            var jsonUsuario = JSON.parse(data);
                            $("#pMensaje").html(jsonUsuario[0].Mensaje);
                            $('#popup').fadeIn('slow');
                            window.setTimeout(function() {
                                $('#popup').fadeOut('slow');    
                                Escanear();
                            }, 3000);
                        }else{
                            $("#pMensaje").html("Credencial no existe o esta actualmente inactiva");
                            $('#popup').fadeIn('slow');
                            window.setTimeout(function() {  
                                $('#popup').fadeOut('slow');                            
                                Escanear();
                            }, 3000);
                        }
                      
                    });
                }else {
                    alert('Usted no tiene conexion a internet en estos momentos. Por favor verifiquela antes de iniciar sesión.')
                }
            }
        },
        function (error) {
            console.log("Scanning failed: " + error);
        },
        {
            "preferFrontCamera" : false, // iOS and Android 
            "showFlipCameraButton" : true, // iOS and Android 
            "showTorchButton" : true, // iOS and Android 
            "disableAnimations" : true, // iOS 
            "prompt" : "", // supported on Android only 
            "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
            "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device 
        }
    )
    
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.getElementById('scan').addEventListener('click', this.scan, false);
        //document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
		Escanear();
        console.log('Received Event: ' + id);
    }/*,

    scan: function() {
        console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("info").innerHTML = result.text;
            console.log(result);
        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    },*/


};