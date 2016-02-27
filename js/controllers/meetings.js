

myApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', 
	             function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){

	             	var ref = new Firebase(FIREBASE_URL);
	             	var auth = $firebaseAuth(ref);

	             	auth.$onAuth(function(authUser){
                          if(authUser){
                               var meetingsref = new Firebase(FIREBASE_URL + "users/" + $rootScope.currentUser.$id +
                               	"/meetings");

                               var meetingInfo = $firebaseArray(meetingsref);

                               //Getting meeting data from Firebase as array
                               $scope.meetings = meetingInfo;


                               meetingInfo.$loaded().then(function(data){
                               	    $rootScope.howManyMeetings = meetingInfo.length;
                               }); // Make sure meeting data is loaded and how many meetings we have


                               meetingInfo.$watch(function(data){
                               	    $rootScope.howManyMeetings = meetingInfo.length;
                               	}); //Watch each time data changes and update the view

                               $scope.addMeeting = function(){

                               	   meetingInfo.$add({  //add new meeting to Firebase
                               	   	 name: $scope.meetingname,
                               	   	 date: Firebase.ServerValue.TIMESTAMP
                               	   }).then(function(){
                               	   	    $scope.meetingname = "";
                               	   }) //promise

                               } //addmeeting

                               
                               $scope.deleteMeeting = function(key){
                                    meetingInfo.$remove(key);
                               } //deteleMeeting

                          } //user authenticated
	             	}); //onAuth
}]); // controller