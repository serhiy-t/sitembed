function loadScript(url)
{
  return new Promise((resolve, reject) => {
    // adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // then bind the event to the callback function
    // there are several events for cross browser compatibility
    script.onreadystatechange = resolve;
    script.onload = resolve;

    // fire the loading
    head.appendChild(script);
  });
}

const isLocal = false;
const baseUrl = isLocal ? '' : 'https://cdn.jsdelivr.net/gh/stykhanskyy/sitembed/';

async function go() {
  await loadScript(baseUrl + 'deps/viz/viz.js');
  await loadScript(baseUrl + 'deps/viz/full.render.js');

  const scripts = document.querySelectorAll(`script[type='text/sitembed-graphviz']`);
  console.log(`Scripts found`, scripts);

  scripts.forEach(async (script) => {
    console.log(`Script source: `, script.innerHTML);

    const viz = new Viz();
    const element = await viz.renderImageElement(script.innerHTML);

    element.style.width = 'auto';
    element.style.height = 'auto';
    element.style.maxWidth = '100%';
    element.style.maxHeight = '100%';
    element.style.display = 'block';
    element.style.margin = 'auto';
    element.width = 'auto';
    element.height = 'auto';

    script.parentNode.replaceChild(element, script);
  });
}

window.addEventListener('load', go);