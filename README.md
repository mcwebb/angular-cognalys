# Angular Cognalys Module
A simple Angular wrapper around the Cognalys REST API.

The only methods currently supported are for the phone number validation flow. But that's probably all anyone actually wants right?

## Installation
### Install with Bower
```bash
# from the terminal at the root of your project
bower install angular-cognalys --save
```
### Add to your module deps
```js
angular.module('xxxx', ['mcwebb.cognalys'])
```

## Example Use
### Set up
```js
angular.module('xxxx')
.config(function (CognalysProvider) {
	CognalysProvider.setCredentials({
		appId: 'xxxx',
		accessToken: 'xxxx'
	});
});
```
### Try Number
```js
angular.module('xxxx')
.controller('SignupController', function SignupController($scope, Cognalys) {
	$scope.submit = function () {
		Cognalys.verifyMobileNumber($scope.countryCode, $scope.phoneNumber)
		.then(function (response) {
			// Success - do something
		}, function (errors) {
			// Failure - do something with the errors
			for (var key in errors) {
				console.log('error code:' + key);
				console.log('error message:' + errors[key]);
			}
		});
	};
});
```
### Verify User's Verification
```js
angular.module('xxxx')
.controller('SignupController', function SignupController($scope, Cognalys) {
	$scope.verify = function () {
		Cognalys.confirmVerification($scope.verificationCode)
		.then(function (response) {
			// Success - do something
		}, function (errors) {
			// Failure - do something with the errors
			for (var key in errors) {
				console.log('error code:' + key);
				console.log('error message:' + errors[key]);
			}
		});
	};
});
```
