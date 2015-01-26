/*
 * Part of mcwebb/angular-cognalys
 * Coypyright 2015 Matthew Webb <matthewowebb@gmail.com>
 * MIT License
 */
angular.module('mcwebb.cognalys', [])
.provider('Cognalys', function () {
	var apiEndpoint = 'https://www.cognalys.com/api/v1/';

	var credentials = {
		appId: '',
		accessToken: ''
	};

	var getUrl = function (method, params) {
		var sParams = '',
			base = apiEndpoint +
				method +
				'/?app_id=' +
				credentials.appId +
				'&access_token=' +
				credentials.accessToken;

		for (var name in params) {
			sParams += '&' +
				name +
				'=' +
				params[name];
		}
		return base + sParams;
	};

	this.setCredentials = function (o) {
		credentials.appId = o.appId;
		credentials.accessToken = o.accessToken;
	};

	this.$get = function ($http, $q) {
		var cache = [];
		return {
			verifyMobileNumber: function (cc, number) {
				var q = $q.defer();
				$http.get(getUrl('otp', {
					mobile: cc + number
				}))
				.success(function (data) {
					if (data.status == 'success') {
						cache.push(data);
						q.resolve(data);
					} else {
						if (typeof data.errors === 'object')
							q.reject(data.errors);
						else q.reject({
							500: 'An unknown error occured'
						});
					}
				})
				.error(function () {
					q.reject({
						500: 'An unknown error occured'
					});
				});
				return q.promise;
			},
			confirmVerification: function (otp_end) {
				var q = $q.defer(),
					latest = cache.pop();
				$http.get(getUrl('otp/confirm', {
					keymatch: latest.keymatch,
					otp: latest.otp_start + otp_end
				})).success(function (data) {
					if (data.status == 'success') {
						cache.push(data);
						q.resolve(data);
					} else {
						if (typeof data.errors === 'object')
							q.reject(data.errors);
						else q.reject({
							500: 'An unknown error occured'
						});
					}
				})
				.error(function () {
					q.reject({
						500: 'An unknown error occured'
					});
				});
				return q.promise;
			}
		};
	};
});
