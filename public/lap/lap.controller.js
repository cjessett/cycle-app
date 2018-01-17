(function () {
    'use strict';

    angular
        .module('app')
        .controller('LapController', LapController);

  
    LapController.$inject = ['$location','UserService','$rootScope','LapService','FlashService'];
    function LapController($location,UserService, $rootScope,LapService,FlashService) {
        var vm = this;

        vm.GetLaps = GetLaps;
       
        vm.AddLap = AddLap;
        vm.RemoveLap = RemoveLap;
        vm.UpdateLap = UpdateLap;
        vm.laps = null;
        
        vm.newStartTime = "";
        vm.newEndTime="";
        vm.newLapNumber="";
        vm.rpId = $rootScope.rpId;
      

        initController();

         function initController() {
            GetLaps();
        }

       
        function GetLaps() {
             alert(vm.rpId);
             LapService.GetLaps(vm.rpId)
                .then(function (response) {
                    vm.laps = response;
                });
        };

        function AddLap() {
            LapService.Create({race_participant_id:vm.race_participant_id,lap_number:vm.newLapNumber,start_time:vm.newStartTime,end_time:vm.newEndTime}).then(function(response){
                if (response.success) {
                    vm.newStartTime = "";
                    vm.newEndTime="";
                    vm.newLapNumber="";
                    FlashService.Success("Lap Added");
                    GetLaps();
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function UpdateLap(lap){
            LapService.Update(lap).then(function(response){
                if (response.success) {
                    FlashService.Success("Lap Updated");
                    GetLaps();
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function RemoveLap(lap_id){
            LapService.Delete(lap_id).then(function(response){
                if (response.success) {
                    FlashService.Success("Lap Deleted");
                    GetLaps();
                } else {
                    FlashService.Error(response.message);
                }
            });
        }
    }

})();