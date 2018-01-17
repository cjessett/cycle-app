(function () {
    'use strict';

    angular
        .module('app')
        .factory('RaceService', RaceService);

    RaceService.$inject = ['$http'];
    function RaceService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.StartRace = StartRace;
        service.StopRace = StopRace;
        service.GetRaceResults = GetRaceResults;

        return service;

        function GetAll() {
            return $http.get('/api/races').then(handleSuccess, handleError('Error getting all races'));
        }

        function Create(race) {
            return $http.post('/api/races', race).then(handleSuccess, handleError('Error creating race'));
        }

        function Update(race) {
            return $http.put('/api/races/' + race.id, race).then(handleSuccess, handleError('Error updating race'));
        }

        function Delete(id) {
            return $http.delete('/api/races/' + id).then(handleSuccess, handleError('Error deleting race'));
        }

        function StartRace(id) {
            return $http.put('/api/start_race/' + id).then(handleSuccess, handleError('Error Starting race'));
        }

        function StopRace(id) {
            return $http.put('/api/stop_race/' + id).then(handleSuccess, handleError('Error Stopping race'));
        }

        function GetRaceResults(id){
            return $http.get('/api/race_results/' + id).then(handleSuccess, handleError('Error getting race results'));
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