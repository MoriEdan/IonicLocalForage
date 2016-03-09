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
  
    //data model to insert
    $scope.key = '';
    $scope.val = '';

    //data model to fetch
    $scope.fetchKey = '';

    //data model to update
    $scope.updateKey = '';
    $scope.updateVal = '';

    //data model to delete
    $scope.deleteKey = '';

    $scope.saveData = function(){
        showLoadingIndicator();
        if(isValidValue($scope.key)){
            hideLoadingIndicator();
            localforage.setItem($scope.key, $scope.val);
            showPopupAlert('Data saved.');
        }else{
            hideLoadingIndicator();
            showPopupAlert('Invalid data entered.');
        }
    }

    $scope.fetchData = function(){
        showLoadingIndicator();
        if(isValidValue($scope.fetchKey)){
            localforage.getItem($scope.fetchKey).then(function(value) {
                hideLoadingIndicator();
                if(isValidValue(value)){
                    showPopupAlert('Key: ' + $scope.fetchKey + '<br>Value: ' + value);
                }else{
                    showPopupAlert('Data not found.');
                }
            });
        }else{
            hideLoadingIndicator();
            showPopupAlert('Invalid data entered.');
        }
    }

    $scope.resetData = function(){
        showLoadingIndicator();
        $scope.key = '';
        $scope.val = '';
        hideLoadingIndicator();
    }

    $scope.updateData = function(){
        showLoadingIndicator();
        if(isValidValue($scope.updateKey) && isValidValue($scope.updateData)){
            localforage.getItem($scope.updateKey).then(function(value) {
                hideLoadingIndicator();
                if(isValidValue(value)){
                    localforage.setItem($scope.updateKey, $scope.updateVal);
                    showPopupAlert('Data updated.');
                }else{
                    showPopupAlert('Data not found.');
                }
            });
        }else{
            hideLoadingIndicator();
            showPopupAlert('Invalid data inserted');
        }
    }

    $scope.removeData = function(){
        showLoadingIndicator();
        if(isValidValue($scope.deleteKey)){
            localforage.getItem($scope.deleteKey).then(function(value) {
                if(isValidValue(value)){
                    localforage.removeItem($scope.deleteKey, function(data){
                        hideLoadingIndicator();
                        showPopupAlert('Data removed');
                    });
                }else{
                    hideLoadingIndicator();
                    showPopupAlert('Data not found.');
                }
            });
        }else{
            hideLoadingIndicator();
            //alert('Invalid data entered.');
            showPopupAlert('Invalid data entered.');
        }
    }

    $scope.clearDatabase = function(){
        showLoadingIndicator();
        localforage.clear(function(data){
            hideLoadingIndicator();
            showPopupAlert('Database cleared.');
        });
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