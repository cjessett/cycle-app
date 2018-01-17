(function () {
    'use strict';

    angular
        .module('app')
        .factory('ParticipantService', ParticipantService);

    ParticipantService.$inject = ['$http'];
    function ParticipantService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetAllOrderById = GetAllOrderById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/participants').then(handleSuccess, handleError('Error getting all participant'));
        }

        function GetAllOrderById() {
            return $http.get('/api/participants_order_by_id').then(handleSuccess, handleError('Error getting all participant'));
        }

        function Create(participant) {
            return $http.post('/api/participants', participant).then(handleSuccess, handleError('Error creating participant'));
        }

        function Update(participant) {
            return $http.put('/api/participants/' + participant.id, participant).then(handleSuccess, handleError('Error updating participant'));
        }

        function Delete(id) {
            return $http.delete('/api/participants/' + id).then(handleSuccess, handleError('Error deleting participant'));
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