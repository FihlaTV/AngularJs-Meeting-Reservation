

myApp.controller('CheckInsController', ['$scope', '$location', '$rootScope', '$routeParams', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', 
	             function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray, FIREBASE_URL){

	                $scope.whichmeeting = $routeParams.mId; 
                  $scope.whichuser= $routeParams.uId;
                  console.log("user "+$scope.whichuser);
                  console.log("meeting "+$scope.whichmeeting);


                  $scope.order = 'firstname';
                  $scope.direction = null;
                  $scope.query = ''; 
                  $scope.recordId = '';

                  var ref = new Firebase(FIREBASE_URL + "users/" + $scope.whichuser + "/meetings/" 
                                         + $scope.whichmeeting + "/checkins"); 



                  var checkinsList = $firebaseArray(ref);
                  
                  //Getting meeting data from Firebase as array
                  $scope.checkins = checkinsList;
                  console.log($scope.checkins)


                   $scope.addCheckin = function(){
                        var checkinsInfo = $firebaseArray(ref);

                        var myData = {
                              firstname: $scope.user.firstname,
                              lastname: $scope.user.lastname,
                              email: $scope.user.email,
                              date: Firebase.ServerValue.TIMESTAMP
                        }//myData

                        checkinsInfo.$add(myData).then(function(){
                              $location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting +
                                              '/checkinsList');
                        });
                   } //	CheckinInfo


                   $scope.deleteCheckin = function(id){
                        var refDel = new Firebase(FIREBASE_URL + "users/" + $scope.whichuser + "/meetings/" 
                                         + $scope.whichmeeting + "/checkins/" + id ); 

                        var record = $firebaseObject(refDel);

                        record.$remove(id);
                   }

                   $scope.pickRandom = function(){
                       var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
                       $scope.recordId =checkinsList.$keyAt(whichRecord);
                   }

                   $scope.showLove = function(myCheckin){
                        myCheckin.show = !myCheckin.show;

                        console.log(myCheckin.show);

                        if(myCheckin.userState == "expanded"){
                            myCheckin.userState = "";
                        }else{
                            myCheckin.userState == "expanded";
                        }
                   }



                   $scope.giveLove = function(myCheckin, myGift){
                         var refGift = new Firebase(FIREBASE_URL + "users/" + $scope.whichuser + "/meetings/" 
                                         + $scope.whichmeeting + "/checkins/" + myCheckin.$id + "/awards" ); 

                         var checkinsArray = $firebaseArray(refGift);

                         var myData = {
                             name: myGift,
                             date: Firebase.ServerValue.TIMESTAMP
                         }

                         checkinsArray.$add(myData);
                   }


}]); //checkinController