// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';
  document.getElementById('refreshOrder').addEventListener('click', function() {
    // Refresh all of the forecasts
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var orderList = JSON.parse(request.response).model;
          var html = [];
          orderList.map(function(item, idx){
            html.push(item.orderVo.seatName + "  " + item.totalPayVo.resultAmount +"元" +'<br/>');
          })
          document.getElementById('orderList').innerHTML = html.join("");

        }
      } 
    };
    request.open('GET', '/order/todayList');
    request.send();
  });
  
})();
