export const Version = (options) => {

  let api = {};
  const defaults = {
    autoInit: false,
    url: 'https://api.github.com/repos/sebnitu/vrembem/contents/packages/vrembem/package.json?ref=master'
  };

  api.settings = { ...defaults, ...options };

  api.init = () => {
    // Set up our HTTP request
    const ajax = new XMLHttpRequest();

    // Get the container element
    const el = document.querySelector('[data-role="version"]');
    if (el) {
      // Setup our listener to process completed requests
      ajax.onload = function () {
        // Process our return data
        if (ajax.status >= 200 && ajax.status < 300) {
          // What do when the request is successful
          const response = JSON.parse(ajax.response);
          const decode = window.atob(response.content);
          const pkg = JSON.parse(decode);
          el.classList.remove('loading');
          el.classList.add('success');
          el.innerHTML = pkg.version;
        } else {
          // What do when the request fails
          el.classList.remove('loading');
          el.classList.add('error');
          el.innerHTML = 'Error!';
        }
      };

      // Create and send a GET request
      // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
      // The second argument is the endpoint URL
      ajax.open('GET', api.settings.url);
      ajax.send();
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};
