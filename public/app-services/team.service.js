(function () {
    'use strict';

    angular
        .module('app')
        .factory('TeamService', TeamService);

    TeamService.$inject = ['$http'];
    function TeamService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetTeamsByRace = GetTeamsByRace;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/teams').then(handleSuccess, handleError('Error getting all teams'));
        }

        function GetTeamsByRace(race_id) {
            return $http.get('/api/teams/' + race_id).then(handleSuccess, handleError('Error getting teams by Race'));
        }

        function Create(team) {
            return $http.post('/api/teams', team).then(handleSuccess, handleError('Error creating team'));
        }

        function Update(team) {
            return $http.put('/api/teams/' + team.id, team).then(handleSuccess, handleError('Error updating team'));
        }

        function Delete(id) {
            return $http.delete('/api/teams/' + id).then(handleSuccess, handleError('Error deleting team'));
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