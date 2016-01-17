   // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = "798899974134-660pmvfnoohepluvt5g5qu5pujclbf62.apps.googleusercontent.com";

      var SCOPES = ['https://www.googleapis.com/auth/drive.metadata'];

      /**
       * Check if current user has authorized this application.
       */
      var checkAuth = function() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadDriveApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      var handleAuthClick = function(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Drive API client library.
       */
      function loadDriveApi() {
        gapi.client.load('drive', 'v3', listFiles);
      }

      /**
       * Print files.
       */
      function listFiles() {
        window.googleDriveFiles = [];
        var request = gapi.client.drive.files.list({
            'pageSize': 60,
            /* Get only google spreadsheets */
              'q': "mimeType='application/vnd.google-apps.spreadsheet'",
            'fields': "nextPageToken, files(id, name)"
          });
          request.execute(function(resp) {
            var files = resp.files;
            if (files && files.length > 0) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                 $( "#googleSheets" ).append( " <li><a href=\"/edit/?&key="+file.id+"\">"+file.name+"</a></li>" );
              }
            } else {
              alert('No files found.');
            }
          });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
     