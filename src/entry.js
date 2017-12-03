// Webpack entry point
import './docs/styles.scss'
import Layout from './examples/layout.html'
import Home from './examples/home.md'

var root = document.getElementById('root');
root.innerHTML = Layout;

var content = document.getElementById('content');
content.innerHTML = Home;
