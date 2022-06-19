jQuery.noConflict();

jQuery(document).ready(function($) {

  "use strict";

  $('#sidebarCollapse').on('click', function (event) {
    $('#sidebar').toggleClass('active');
  });

});