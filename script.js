const overlay = document.querySelector('.overlay');
const video = document.querySelector('video');

const modelLoader = document.querySelector('#modelLoad');
const detStart = document.querySelector('#detStart');

const modelStatusIndicator = document.querySelector('.model-status');
const descriptor = document.querySelector('.video-descr');

const pageConsole = document.querySelector('.console');

let model = undefined

async function loadModel() {
  model = await cocoSsd.load();
  console.log('Model loaded');
  pageConsole.innerHTML += '<p>' + 'Model Loaded' + '</p>';
  console.log(model);
  //pageConsole.innerHTML += model + '\n';
  modelStatusIndicator.style.backgroundColor = 'darkgreen';
  modelStatusIndicator.innerHTML = 'Model loaded yay 🤗'
}

async function makePredictions() {
  if (model === undefined) {
    console.log('Error: model not downloaded, please wait')
  } else {
    let predictions = []
    predictions = await model.detect(video);
    if (predictions.length > 0) {
      // Erase all earlier preds
      overlay.innerHTML = "";
    }

    console.log(predictions);

    for (let p = 0; p < predictions.length; p++) {
      const highlight = document.createElement('div');
      highlight.innerHTML = predictions[p].class;
      highlight.setAttribute('class', 'highlight');
      highlight.style = "left: " + predictions[p].bbox[0] + "px;"
                      + "top: " + predictions[p].bbox[1] + "px;"
                      + "width: " + predictions[p].bbox[2] + "px;"
                      + "height: " + predictions[p].bbox[3] + "px;";
      overlay.appendChild(highlight);

      pageConsole.innerHTML += '<p>' + 'Detected: ' + predictions[p].class + '</p>';
    }

    window.requestAnimationFrame(makePredictions);

  }
}

modelLoader.addEventListener("click", loadModel);
detStart.addEventListener("click", () => {
	console.log('detStart button pressed');
	makePredictions();
});
