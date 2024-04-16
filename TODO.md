+ 2 parts of the system: 
    + code: 
        + 1. You attach your code to the dev container 
            Using docker compose

    + image: 
        

+ Code - Container - Image 
    + 2 types of images: 
        + Develoment Image: 
            Have all the development tools  

        + Production Image: 
            Have all the development tools  

    + How working with development image should be (build the development image): 
        Pull the Dev Image from Docker Hub -> Create container from Image -> Change the code -> Changes reflect on the container -> Rebuild the image to agree that change 

        + Input:
            Old Dev Image  (Pull)

        + Output:
            New Dev Image (Push)

    + The Production Image gonna be build by GitHub Action: (but currently it's just me :v) : 
        Using multi-stage building

        Build react -> Nginx  @Current 

        (Optional) Bundle nodejs 
        

## TODO
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

        3. Multi-stage building:
            Bundle local the React Image
                -> Create Nginx image 

        4. Push the Bundled images @Current
            
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

