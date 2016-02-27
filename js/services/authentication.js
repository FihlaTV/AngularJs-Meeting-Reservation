
myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', '$location', '$firebaseObject',
	          function($rootScope, $firebaseAuth, FIREBASE_URL, $location, $firebaseObject){

	          	  var ref = new Firebase(FIREBASE_URL);
                var auth = $firebaseAuth(ref);

                auth.$onAuth(function(authUser){
                   if(authUser){
                   	  var userRef = new Firebase(FIREBASE_URL + "users/" + authUser.uid);
                   	  var userObj = $firebaseObject(userRef);
                   	  $rootScope.currentUser = userObj;
                   }else{
                   	   $rootScope.currentUser = "";
                   }
                });

                return{
                    login: function(user){
                    	auth.$authWithPassword({
                    		email: user.email,
                    		password: user.password
                    	}).then(function(regUser){
                            $location.path('/meetings');
                    	}).catch(function(error){
                            $rootScope.message = error.message;
                    	});
                        $rootScope.message = "Welcome " + user.email;
                    },//Login,

                    logout: function(){
                         $rootScope.message = "";
                         $rootScope.currentUser = "";
                         return auth.$unauth();
                    }, //logout

                    requireAuth: function(){
                          return auth.$requireAuth();
                    }, //require Authentication

                    register: function(user){
                            auth.$createUser({  //Add or create a new user in Firebase
                  					    		email: user.email,
                  					    		password: user.password
                  					    	}).then(function(regUser){
                                                   //Add user profile info from above
                                                  var regRef = new Firebase(FIREBASE_URL + "users").
                                                   child(regUser.uid).set({
                                                   	date: Firebase.ServerValue.TIMESTAMP,
                                                   	regUser: regUser.uid,
                                                   	firstname: user.firstname,
                                                   	lastname: user.lastname,
                                                   	email: user.email
                                                   });

                  					            $rootScope.message = "Hello " + user.firstname + ", Thank you for registering";
                  					    	}).catch(function(error){
                  					            $rootScope.message = error.message;
                  					    	}); //Create user
                    }//Register
                };

	          }]); //factory