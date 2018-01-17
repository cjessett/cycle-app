(function () {
    'use strict';

    angular
        .module('app')
        .factory('RaceParticipantService', RaceParticipantService);

    RaceParticipantService.$inject = ['$http'];
    function RaceParticipantService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetAllOrderByTag = GetAllOrderByTag;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.EndLap = EndLap;

        return service;

        function GetAll(race_id) {
            return $http.get('/api/race_participants/' + race_id).then(handleSuccess, handleError('Error getting race participants'));
        }

        function GetAllOrderByTag(race_id) {
            return $http.get('/api/race_participants_order_by_tag/' + race_id).then(handleSuccess, handleError('Error getting race participants'));
        }


        function Create(race_participant) {
            return $http.post('/api/race_participants', race_participant).then(handleSuccess, handleError('Error creating race participant'));
        }

        function Update(race_participant) {
            return $http.put('/api/race_participants/' + race_participant.id, race_participant).then(handleSuccess, handleError('Error updating race participant'));
        }

        function Delete(id) {
            return $http.delete('/api/race_participants/' + id).then(handleSuccess, handleError('Error deleting race participant'));
        }

        function EndLap(id){
             return $http.put('/api/end_lap/' + id, {id:id}).then(handleSuccess, handleError('Error endig a lap'));
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