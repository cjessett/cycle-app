(function () {
    'use strict';

    angular
        .module('app')
        .controller('TeamMemberController', TeamMemberController);

    TeamMemberController.$inject = ['$location','UserService','$rootScope','TeamService','RaceService','FlashService','ParticipantService','TeamMemberService'];
    
    function TeamMemberController($location,UserService,$rootScope,TeamService,RaceService,FlashService,ParticipantService,TeamMemberService) {
        var vm = this;

       
        vm.user = null;
        vm.races = null;
        vm.teams = null;
        vm.members = null;
        vm.participants = null;

        vm.selectedRace = null;
        vm.selectedTeam = null;
        vm.selectedParticipant ="";
        vm.AddTeamMember = AddTeamMember;
        vm.DeleteTeamMember = DeleteTeamMember;
        vm.GetTeams = GetTeams;
        vm.GetRaces = GetRaces;
        vm.GetParticipants = GetParticipants;
        vm.GetTeamMembers = GetTeamMembers;
        

        initController();

         function initController() {
            loadCurrentUser();
            GetRaces();
            GetParticipants();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

       
        function GetRaces(){
            RaceService.GetAll().then(function(response){
                vm.races = response;
                if(vm.races.length > 0)
                {
                    vm.selectedRace = vm.races[0];
                    GetTeams();
                }
            });
        }

         function GetTeams(){
            vm.teams = null;
            if(!vm.selectedRace) return;
            TeamService.GetTeamsByRace(vm.selectedRace.id).then(function(response){
                vm.teams = response;
                if(vm.teams.length > 0)
                {
                    vm.selectedTeam = vm.teams[0];
                    GetTeamMembers();
                }
            });
        }

         function GetParticipants(){
            ParticipantService.GetAll().then(function(response){
                vm.participants = response;
            });
        }

        function GetTeamMembers(){
            vm.members = null;
            if(!vm.selectedTeam) return;
            TeamMemberService.GetMembers(vm.selectedTeam.id).then(function(response){
                vm.members = response;
            });
        }

        function AddTeamMember()
        {
            
            TeamMemberService.Create({team_id:vm.selectedTeam.id,participant_id:vm.selectedParticipant}).then(function(response){
                if (response.success) {
                    vm.selectedName="";
                    FlashService.Success("Team Member Added");
                    GetTeamMembers();
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function DeleteTeamMember(id)
        {
            TeamMemberService.Delete(id).then(function(response){
                if (response.success) {
                    FlashService.Success("Team Member Deleted");
                    GetTeamMembers();
                } else {
                    FlashService.Error(response.message);
                }
            });
        }
    }

})();