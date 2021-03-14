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
      overlay.innerHTML = "";
    }

    console.log(predictions);
    // Filter out all persons
    let people = predictions.filter(pred => pred.class == "person");
    // Filter only vertical bounding boxes
    people = people.filter(person => person.bbox[3] > person.bbox[2]);
    console.log(people);

    // Draw outline for all people
    for (let p = 0; p < people.length; p++) {
      const highlight = document.createElement('div');
      highlight.innerHTML = people[p].class;
      highlight.setAttribute('class', 'highlight');
      highlight.style = "left: " + people[p].bbox[0] + "px;"
                      + "top: " + people[p].bbox[1] + "px;"
                      + "width: " + people[p].bbox[2] + "px;"
                      + "height: " + people[p].bbox[3] + "px;";
      overlay.appendChild(highlight);

      pageConsole.innerHTML += '<p>' + 'Detected: ' + people[p].class + '</p>';
    }

    window.requestAnimationFrame(makePredictions);

  }
}

modelLoader.addEventListener("click", loadModel);
detStart.addEventListener("click", () => {
	console.log('detStart button pressed');
	makePredictions();
});
