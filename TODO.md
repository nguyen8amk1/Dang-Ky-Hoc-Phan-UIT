## TODO
Steps: 
    + Local: 
        ./build_dev_image.sh -> ./dev-compose.sh   


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

