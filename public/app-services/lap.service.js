(function () {
    'use strict';

    angular
        .module('app')
        .factory('LapService', LapService);

    LapService.$inject = ['$http'];
    function LapService($http) {
        var service = {};

       

        service.GetLaps = GetLaps;
        service.GetLapDetails = GetLapDetails;
        service.GetLapReport = GetLapReport;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        

        return service;

        function GetLaps(id) {
            return $http.get('/api/laps/' + id).then(handleSuccess, handleError('Error getting laps'));
        }

        function GetLapDetails(id) {
            return $http.get('/api/lap/' + id).then(handleSuccess, handleError('Error getting lap details'));
        }

         function GetLapReport(id) {
            return $http.get('/api/lap_report').then(handleSuccess, handleError('Error getting lap details'));
        }

        function Create(lap) {
            return $http.post('/api/laps', lap).then(handleSuccess, handleError('Error creating lap'));
        }

        function Update(lap) {
            return $http.put('/api/laps/' + lap.id, lap).then(handleSuccess, handleError('Error updating lap'));
        }

        function Delete(id) {
            return $http.delete('/api/laps/' + id).then(handleSuccess, handleError('Error deleting lap'));
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