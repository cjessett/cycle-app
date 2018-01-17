(function () {
    'use strict';

    angular
        .module('app')
        .factory('FormatService', FormatService);

    FormatService.$inject = ['$http'];
    function FormatService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/formats').then(handleSuccess, handleError('Error getting all formats'));
        }

        function Create(format) {
            return $http.post('/api/formats', format).then(handleSuccess, handleError('Error creating format'));
        }

        function Update(format) {
            return $http.put('/api/formats/' + format.id, format).then(handleSuccess, handleError('Error updating format'));
        }

        function Delete(id) {
            return $http.delete('/api/formats/' + id).then(handleSuccess, handleError('Error deleting format'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();