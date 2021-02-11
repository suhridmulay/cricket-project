# CRICKET PROJECT

## Task
Our task will be to separately identify and outline various players on a field

## Roadmap
- [x] Ability to identify players in a field
- [ ] Ability to separate different classes of players
    - [x] Separate player classes via bounding boxes
    - [ ] Separate relevant frames of the video
- [ ] Separate video into frames which are desired and those which aren't
    - [ ] Planned Classes of frames
        - [ ] Run up begin
        - [ ] Run up end
        - [ ] Shot begin
        - [ ] Shot end
        - [ ] Other

## Usage
1. Drop your desired video file into ````res/media```` folder (create if directory not present). Rename the video to vid.mp4
2. Start a http-server in the current directory (i.e. the directory where this readme is located)
3. Navigate to the localhost adress pointed by the http server from your web browser, (firefox recommended)
4. Load Model using the Load Model button
5. Once the model is loaded start the video and click on make predictions, the web browser will start outlining people.

* Note: the detection is done entirely on the client side and depends completely on the machine used. 