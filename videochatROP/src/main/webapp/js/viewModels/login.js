/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define([ 'knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils',
		'jquery' ], function(ko, app, moduleUtils, accUtils, $) {

	function LoginViewModel() {
		var self = this;
		self.userName = ko.observable("pepe");
		self.pwd = ko.observable("pepe");
		self.message = ko.observable("");
		
		self.goToRegister = function() {
			app.router.go( { path : 'register' } );
		}
		
		self.goToDevicesManager = function() {
			app.router.go( { path : 'devicesManager' } );
		}

		self.login = function() {
			self.message("Has pulsado login con estas credenciales: "
					+ self.userName() + "/" + self.pwd());
			var info = {
				name : self.userName(),
				pwd : self.pwd()
			};
			var data = {
				data : JSON.stringify(info),
				url : "login",
				type : "post",
				contentType : 'application/json',
				success : function(response) {
					app.user = response;
					app.router.go( { path : 'chat' } );
				},
				error : function(response) {
					alert("Error: " + response.responseJSON.error);
				}
			};
			$.ajax(data);
		}

		// Header Config
		self.headerConfig = ko.observable({
			'view' : [],
			'viewModel' : null
		});
		moduleUtils.createView({
			'viewPath' : 'views/header.html'
		}).then(function(view) {
			self.headerConfig({
				'view' : view,
				'viewModel' : app.getHeaderModel()
			})
		})

		// Below are a set of the ViewModel methods invoked by the oj-module component.
		// Please reference the oj-module jsDoc for additional information.

		/**
		 * Optional ViewModel method invoked after the View is inserted into the
		 * document DOM.  The application can put logic that requires the DOM being
		 * attached here.
		 * This method might be called multiple times - after the View is created
		 * and inserted into the DOM and after the View is reconnected
		 * after being disconnected.
		 */
		self.connected = function() {
			accUtils.announce('Dashboard page loaded.');
			document.title = "Dashboard";
			// Implement further logic if needed
		};

		/**
		 * Optional ViewModel method invoked after the View is disconnected from the DOM.
		 */
		self.disconnected = function() {
			// Implement if needed
		};

		/**
		 * Optional ViewModel method invoked after transition to the new View is complete.
		 * That includes any possible animation between the old and the new View.
		 */
		self.transitionCompleted = function() {
			// Implement if needed
		};
	}

	/*
	 * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
	 * return a constructor for the ViewModel so that the ViewModel is constructed
	 * each time the view is displayed.
	 */
	return LoginViewModel;
});
