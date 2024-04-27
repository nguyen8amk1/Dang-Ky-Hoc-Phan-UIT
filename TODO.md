## How authentication routing basically works: 
1. Have a global user authentication context
2. Pages check the global user authentication context to render data accordingly

## TODO
+ Steps: 
    + Local: 
        ./build_dev_image.sh -> ./dev-compose.sh   
    + Local dev problem: 
        I need options to decide:
            + when to dev local 
            + when to push 
    
        -> I Need to mimic my git workflow for my ci/cd workflow 
            -> Shell code 
            Dev flow 
            -> `dev.sh`

        + Start: 
            + 1. run the docker container
        + Development: 
            + 2. connect to the docker container to write the code 
                + (Optional --update, install new dependencies) 
                    + 2.1 rebuild the image 
                        (go into the package.json and change the packages)
                        -> the reinstallation of the dependencies is long as fuck
                            need to find a way to cut down the time 
                            https://stackoverflow.com/questions/47243471/docker-compose-for-local-development-installing-dependencies
                    + 2.2 re-run the docker container 
                    + 2.3 back to step 1 - run the docker container

        + (--commit) Commit: 
            + 3. rebuild (commiting) the image 
            -> **DON'T HAVE TO DO THE LOCAL COMMIT ANY MORE**
            -> **THE IMAGE FROM NOW ON IS JUST AN ENVIRONMENT, HAVE DEPENDENCIES ON THE SRC FOLDER**

        + (--push) Push: 
            + 4. push the image to Docker Hub

-> ./dev.sh -> gonna run Start and Development 
-> ./dev.sh --update -> gonna run the 2.1 
-> ./dev.sh --commit -> 3. rebuild the image 
-> ./dev.sh --push -> 4. push the image to docker hub 


-> ./prod.sh --build or -b 
-> ./prod.sh --run or -r 


+ Normal flow of git to production  
    1. Merge the code to dev branch 
        push the dev to docker hub 
    2. Merge the dev branch to production branch
        1. Build the production image 
        2. Push the production image 

    3. Deploy the damn thing 
        1. prod_deploy.sh

+ Collaboration git flow: 
    **Code -> Image**

    + **NOTE**: 
        + dev-image:
            represent the **RUNNABLE HEAD OF THE DEV-BRANCH**

    + 1. (Git) Pull code from dev branch -> (Docker) pull the dev-image 
        -> Coder A pull the code from the dev branch  
            -> Coder A pull the dev-image
        -> Coder B pull the code from the dev branch 
            -> Coder B pull the dev-image

    + 2. (Git) Branch the code to develop features -> (Docker) use the dev-image as a base to their new image
        -> Coder A branch feature A
            -> Coder A use the dev-image as a base to create (local)feature-A-dev-image

        -> Coder B branch feature B
            -> Coder B use the dev-image as a base to create (local)feature-B-dev-image

    + 3. (Git) Pull request to Merge the code to dev branch -> (Docker) Push the image to Docker Hub 
        -> Coder A create a pull request to merge feature A to dev branch 
            -> Push Image feature-A-dev-image to Docker Hub 

        -> Coder B create a pull request to merge feature B to dev branch 
            -> Push Image feature-B-dev-image to Docker Hub 

    + 4. (Git) Manager review the pull request -> (Docker) Manager pull the feature-dev-image to test 
        -> Review feature A pull request 
            -> Manager pull the feature-A-dev-image to test 

        -> Review feature B pull request 
            -> Manager pull the feature-A-dev-image to test 

    + 5.1. If pull request good, merge the code to dev branch 
        -> 1. GitHub Action take the merged code to build a new Image
        -> 2. GitHub Action Push the new dev-image to the Docker Hub

+ Private Route and TKB Intergration: 
    + Analysis: 
        2 things need to combine 
            -> 2 variables, each have 2 values 0, 1
            + 1st var: 
                + no tkb private route 
                + have tkb private route 
            + 2nd var: 
                + stub authen
                + firebase authen
        -> 
            no tkb private route - stub authen
            no tkb private route - firebase authen
            have tkb private route - stub authen
            have tkb private route - firebase authen

    + 1. no tkb private route - stub authen 
        -> 1st branch
        -> Simpify the ui since we don't really need most of it 
            + What we actually need: 
                + Public: a Google login button page 
                    + Private: a blank page
            
    + 2. no tkb private route - firebase authen 
        -> 2nd branch = merge with 1st branch 
        -> 1. Add the firebase authentication to the login button 
                1. Have a global user authentication context (firebase context) [X]
                2. Pages check the global user authentication context to render data accordingly (read the context in the private route) [X]

        -> 2. Show the user information in the Account Route 
        -> 3. Manage the user session 
            1. After logging in, store the access token to local storage [X]

    + 4. have tkb private route - firebase authen 
        1. Have the private Chon file Excel [X]
            Make the upload button 100% works []
                Upload the tkb HTML [] @Current
                   -> SelectExcelButton: reader.onload method 
                Parse it []
                Show it on the tkb list []

        2. Have the rest of the private route working [] 
            Xep lop [] @Next
                Get the ui in place first
            Ket qua [] @Next

+ Better Session Management @Next 

+ Make the server works as well (Nginx related) 
    + Problem: 
        + Local dev: 
            api and app connect through localhost hosting
            not through Nginx 

        + Prod: 
            api and app connect through nginx 

            -> Different api url -> use as env vars

    + Having undefined Error but we are very very close @Later 


+ Work on the our web
    + Local: 
        Local dev volumes @Later

        1. Build the images  
            Using Local Docker Compose
            Dockerize [X] 
                React Hello world  
                Nodejs Hello world  

            -> Build Prod React Hello Images -> Nginx

        2. Run the images on local using the local docker-compose

        3. Multi-stage building: [X]
            Bundle local the React Image
                -> Create Nginx image 

        4. Push the Bundled images [X]
            
    + Production: 
        1. Pull the images
        2. Run with docker compose with production docker-compose
            -> Run react app in Nginx 


    + Make a working prototype of our web [] (1d) @Next
        mostly work on react router dom 
            protect the app with a firebase authentication
        port the server side nodejs code into 



+ Nginx Subdomain reverse proxy  
    https://www.youtube.com/watch?v=9t9Mp0BGnyI

+ API Domain Certificates HTTPs @Next

+ Docker development environment @Next
    https://guillaumejacquart.medium.com/node-js-docker-workflow-12febcc0eed8
    https://github.com/daniil/full-stack-js-docker-tutorial
    https://www.docker.com/blog/how-to-setup-your-local-node-js-development-environment-using-docker/

+ Adding Certificates to Docker container @Next
    https://stackoverflow.com/questions/26028971/docker-container-ssl-certificates

+ Local to VPS workflow @Next 
   

+ Move the working code to some branches []

+ Setup the VPS []

+ Deploy our own simple api and front end @Later

+ Make all the docker production work into 1 single command  
    Current state: 
        the Front end need to be build first then dockerize


+ Backend:
    Setup Docker Mysql database ver 5.7 [] 

    Setup HTTPs [] 
        Test using an SSR site   


    API Subdomain []

+ Frontend: 
    Dockerize Simple React app [] @Next

    Connect the React to the API (HTTPs) []
    Cloudflare ?? 

+ Setup the Monitor, Google Analytic and stuff []

+ Migrate the working code to this project []


** SEPARATE THE EXCEL READING LOGIC TO A PLUGIN ARCHITECTURE **[]
    -> Multiple plugin reading format (google docs, excel) 
    for multiple university as well (any place really)

+ Tu hoc adding UI: 
    -> including Chu Nhat 

## DONE
Setup the Git Repo [] 
    Nalendar [X]
    Branches  [X]

+ Buying all the materials [] 
    Backend: 
        Domain Name [X]
        VPS [X]
        SSL [] 
        -> Cloudflare ?? Let's encrypt SSL
        Read how Linux hosting books works ? @Next
        Read about DNS ? 

+ Make React local development possible [X]
    through dev docker compose 
    But when installing new packages -> rebuild the image
        -> docker compose up --build
