
  
  
  document.getElementById('loginform').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log('Form submitted'); // This will confirm the form submission handler is triggered
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Assuming the server sends a JSON response
        Swal.fire('Success', data.message, 'success').then(() => {
          window.location.href = '/admin/dashboard'; // Redirect after the alert is closed
        });
        
      } else {
        const error = await response.json(); // Assuming error message is returned as JSON
        Swal.fire('Error', error.message, 'error'); // Display error message
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire('Error', 'An error occurred. Please try again.', 'error'); // Handle any network or other errors
    }
  });
