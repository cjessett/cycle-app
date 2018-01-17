(function () {
    'use strict';

    angular
        .module('app')
        .factory('TeamMemberService', TeamMemberService);

    TeamMemberService.$inject = ['$http'];
    function TeamMemberService($http) {
        var service = {};

        service.GetMembers = GetMembers;
        service.Create = Create;
        service.Delete = Delete;

        return service;

        function GetMembers(team_id) {
            return $http.get('/api/team_members/' + team_id).then(handleSuccess, handleError('Error getting team members'));
        }

        function Create(team_member) {
            return $http.post('/api/team_members', team_member).then(handleSuccess, handleError('Error creating team member'));
        }

       
        function Delete(id) {
            return $http.delete('/api/team_members/' + id).then(handleSuccess, handleError('Error deleting team member'));
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