(function () {
    'use strict';

    angular
        .module('app')
        .controller('TeamController', TeamController);

    TeamController.$inject = ['$location','UserService','$rootScope','TeamService','RaceService','FlashService'];
    
    function TeamController($location,UserService,$rootScope,TeamService,RaceService,FlashService) {
        var vm = this;

        vm.GetAll = GetAll;
        vm.user = null;
        vm.races = null;

        vm.selectedRace="";
        vm.selectedName="";
        vm.selectedGender="F";
        vm.AddTeam = AddTeam;
        vm.DeleteTeam = DeleteTeam;
        vm.UpdateTeam = UpdateTeam;

        initController();

         function initController() {
            loadCurrentUser();
            GetAll();
            GetRaces();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function GetAll() {
             TeamService.GetAll()
                .then(function (response) {
                    vm.teams = response;
                });
        }

        function GetRaces(){
            RaceService.GetAll().then(function(response){
                vm.races = response;
            });
        }

        function AddTeam()
        {
            TeamService.Create({race_id:vm.selectedRace,name:vm.selectedName,gender:vm.selectedGender}).then(function(response){
                if (response.success) {
                    vm.selectedRace="";
                    vm.selectedName="";
                    vm.selectedGender="F";
                    FlashService.Success("Team Added");
                    GetAll();
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

         function UpdateTeam(team)
        {
            TeamService.Update(team).then(function(response){
                if (response.success) {
                    FlashService.Success("Team Updated");
                    GetAll();
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function DeleteTeam(id)
        {
            TeamService.Delete(id).then(function(response){
                if (response.success) {
                    FlashService.Success("Team Deleted");
                    GetAll();
                } else {
                    FlashService.Error(response.message);
                }
            });
        }
    }

})();