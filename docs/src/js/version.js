const url = 'https://api.github.com/repos/sebnitu/vrembem/contents/packages/vrembem/package.json?ref=master';
const ajax = new XMLHttpRequest();
const el = document.querySelector('[data-role="version"]');
if (el) {
  ajax.onload = function () {
    if (ajax.status >= 200 && ajax.status < 300) {
      const response = JSON.parse(ajax.response);
      const decode = window.atob(response.content);
      const pkg = JSON.parse(decode);
      el.classList.remove('loading');
      el.classList.add('success');
      el.innerHTML = pkg.version;
    } else {
      el.classList.remove('loading');
      el.classList.add('error');
      el.innerHTML = 'Error!';
    }
  };
  ajax.open('GET', url);
  ajax.send();
}
