'use strict';

var ionicLocalForage = angular.module('IonicLocalForage', ['ionic']);

ionicLocalForage.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

ionicLocalForage.controller('mainController', function($scope, $ionicLoading, $ionicPopup){
  
    $scope.key = '';
    $scope.val = '';
    $scope.fetchKey = '';

    $scope.saveData = function(){
        console.log("key: " + $scope.key);
        console.log("value: " + $scope.val);
        if(isValidValue($scope.key)){
            localforage.setItem($scope.key, $scope.val);
            //alert('Data saved.');
            showPopupAlert('Data saved.');
        }else{
            //alert('Invalid data entered.');
            showPopupAlert('Invalid data entered.');
        }
    }

    $scope.fetchData = function(){
        showLoadingIndicator();
        if(isValidValue($scope.fetchKey)){
            localforage.getItem($scope.fetchKey).then(function(value) {
                hideLoadingIndicator();
                if(isValidValue(value)){
                    //showMessageAlert($scope.fetchKey, value);
                    showPopupAlert('Key: ' + $scope.fetchKey + '\nValue: ' + value);
                }else{
                    //alert('Data not found.');
                    showPopupAlert('Data not found.');
                }
            });
        }else{
            hideLoadingIndicator();
            //alert('Invalid data entered.');
            showPopupAlert('Invalid data entered.');
        }
    }

    $scope.resetData = function(){
        showLoadingIndicator();
        $scope.key = '';
        $scope.val = '';
        hideLoadingIndicator();
    }

    var isValidValue = function(value){
        if(typeof(value) !== 'undefined' && value !== null && value !== ''){
            return true;
        }
        return false;
    }
  
    var showMessageAlert = function(key, value){
        alert("Key: "+ key + "\nValue: " + value);
    }

    var showPopupAlert = function(msg){
        $ionicPopup.alert({
            title: 'IonicLocalForage',
            template: msg
       });
    }

    var showLoadingIndicator = function(){
        $ionicLoading.show({
            template: 'Loading...'
        });
    }

    var hideLoadingIndicator = function(){
        $ionicLoading.hide();
    }

});