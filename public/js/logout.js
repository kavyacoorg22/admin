
        function logout(event) {
          event.preventDefault();  // Prevent the default button behavior (though button doesn't navigate by default)
      
          console.log("Logout function triggered");
      
          fetch('/admin/logout', {
            method: 'POST',  // Use POST for logout
            credentials: 'same-origin'  // To include cookies if necessary
          })
          .then(response => {
            if (response.ok) {
              window.location.href = '/admin/signup';  // Redirect after successful logout
            } else {
              alert('Logout failed!');
            }
          })
          .catch(error => {
            console.error('Error during logout:', error);
          });
        }