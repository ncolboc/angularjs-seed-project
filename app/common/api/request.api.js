angular.module('common.api',[]).factory('requestApiService', function($http, $q,apiBaseUrl) {

    return {

        /**
         * retrieve column's name from excel file
         *
         * @returns {*}
         */
        getColumnsFromFile: function (filename) {

            return $q(function (resolve, reject) {
                $http.get(apiBaseUrl + "api/columns",{params: {filename: filename}})
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (data) {
                        reject(data);
                    });
            });
        }

    };
});
