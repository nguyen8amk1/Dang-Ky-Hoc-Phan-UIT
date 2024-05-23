## How authentication routing basically works: 
1. Have a global user authentication context
2. Pages check the global user authentication context to render data accordingly

## TODO
What we actually need in this lich thi iteration: [] (4h)
    Make the routing work [X] (10m) 
    1 single page with 2 steps - conditional rendering (**WITH SLIDING ANIMATIONS??**) : --Page State Machine
        -> Implement the basic page state machine [X] (2h)
        Step 1 -- that let's the user input the thong tin dkhp  (1h) [X] -- Component State Machine
        Step 2 -- Lich thi Preview  -- Component State Machine
            with 2 buttons/actions: 
                1. go back and input another one [X]
                2. protected -- generate google calendar 
                    -- Private Action State machine [] (1h) @Later
                    -> Show the login modal when user try to click the generate button [X]
                    -> Actually make the login works, since the AuthProvider kinda broken [] @Current
    
    
+ Make the lich thi site pretty (4h) [] @Next
    Sliding animation 
    Proper positioning 



Clean the Project structure to a more basic structure: 
    + components
    + pages 

0. thong tin dkhp parser [X] 
    -> Write a form for the thongtindkhp input [X] 
    output the format that we use for the google calendar generator [X]
        ie. the format that store in the localstrorage

4.  1. Connect the front end with the backend through localhost [] @Next
        just to make sure it works

    2. Go with nginx with the prod version @Next
    
5. Map out how things will behave in XState [] (2h) @Current
    **EVERY STATE IN A ROUTING_STATE_MACHINE SHOULD BE A PAGE** 
    + **FIRST DETERMINE WHAT'S A STATE AND EVENT REPRESENT IN THAT STATE MACHINE**: 
        + vd:    
            + 1. Routing state machine 
                + a state:  a page 
                + an event: a navigation 
                
            + 2. Authentication state machine
                + a state: global authentication value 
                    (vd: logged in, logged out, pending verification)
                + an event: CRUD operations to the global authentication value 
                    (vd: login, logout, token refresh)

            + 3. Page Behaviour state machine 
                + a state: a snapshot of what components are currently shown
                    (vd: loading, error, content display)
                
                + an event: trigger that changes the list of displayed components 
                    -> deciding what component to render when an trigger come
                     (vd: fetching data, handling user input, receiving an error).

            + 4. A component behaviour state machine: 
                + a state: a value that store the current "state" of the component
                    (vd: toggled on/off, expanded/collapsed, active/inactive).

                + an event: an action/trigger that changes the component state
                    (vd: user clicks a button, data is received from a parent component, a timeout occurs).



6. Push to Production Environment to test stuff [] @Next
    There might be a problem i need to fix 

-> All we need is another page in the series of pages in the original Nalendar app 
1 more feature 

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
                Make the Result Display working [X]
                    + NOTE: 
                        there are 2 things that is important when displaying the result 
                            ->  the rowDataHocTrenTruong 
                                the rowspan of the subject -> need a function to calculate the rowspan based on the information given

            **SO MANY GLOBAL STATES, I FUCKING HATE IT**
                Upload the tkb HTML [X]  
                   -> SelectExcelButton: reader.onload method 
                Parse it [X]
                Show it on the tkb list [X] 
                
            Lodash: parition

        2. Have the rest of the private route working [] 
            Xep lop [] @Next
                Get the ui in place first
            Ket qua [] @Next

+ Better Google Session Management
    + Get new access token [] @Next
    + Sign Out [X]

+ Design UI/UX for the current features, i.e: html ->  google calendar 
    + Homepage 
    + Features page 
        + 1 feature
            convert tkb html to google calendar
    + Web app page 

    Step 1: Draw sitemap (10m)
        Homepage
            Features Page
                Web app

    Step 2: Draw wireframe: 
        1. Homepage and also Features (30p) [X]
            Header 
                Logo and navigation 
            Footer
        3. Web app (1h)

    Step 3: Create layout: 
        1. Homepage
        3. Web app 

+ Implement the stub web pages 
    + Homepage [X] (1h)
        -> Just render a simple homepage 
        // TODO: whats the navbar gonna have 
        // Logo 
        // Home 
        // About
        // Contact
        // Sign in with google button 

    + Web app page [] (1h) 
        0. Login Dialog [X] 
        1. Submit your TKB HTML [X]
            1.1. Tutorial Dialog [] @Later

        2. The tkb view [X] 

        3. Create an app bar for the user info [X]
            Basically just the other app bar [X]
            Integrate it into the Web app [X]

        4. Create a login with google button [X]
        5. Create a user info avatar thing [X]

    + Implement the correct Routing, 
        and routing protection 
        -> Mapping these features with the original page

        + Routing: 
            /: Home
            /gcg : GoogleCalendarGenerator


        1. User go to homepage [X]
            -> (Old) User go to localhost:3000 

        2. User click 'thu ngay' -> thu ngay is just a navlink to the /gcg [X]
            -> go to web app page 

            3. Web app display Login -> User login 
                -> (Old) User click login button 

            4. Web app display Submit TKB

        3. User click 'dang nhap voi google' [X] 
                make the sign in with google button works
                -> (Old) User click login button 

        4. User click 'thu ngay' [X]
            5. Web app display 

        + Make the prerequisite checking (vd: authentication, file uploaded) on sites work correctly
            + Sign in button changing on homepage header and web app header [X] 
                -> have a method to check the context user logged in context 

            + Login form checking on /gcg [X]

        + Make the file upload works [X]
            1. Checking file uploaded on the submit step [] 
            2. Printout the content of the uploaded file [X] 

        + Change the GCG 2 steps into a normal navigation [X] 

        + Make the Change TKB name form [] 
        + Merge the SubmitTKB with Select tkb [X] 
        + Make the generated TKB works [X] 
            
        + Make sure everything works nicely [] 
            + the upload file
                have loading

            + the show calendar
                have loading, skeleton

            + the generate calendar 
                have loading [X]
                have finish status [X] 
                change calendar's name option [] @Later

        + Refine the UI 
            + Avatar: 
                + Remove all the redundancy 
                    just leave the logout option
                + Better positioned avatar on the web app bar 

            + Logo: 
                + Have a proper logo 
                + Click on logo to go right back to the homepage
                
            + Disable the responsive appbar for now 

            + Reposition all the loading into a backdrop

            + Separate all the sections in the homepage

            + Choose better color for text, background

            + Create a ABOUT, CONTACT Section in the homepage
                -> When click -> automatically slide to that Section 

            + Show the calendar link for user to quickly navigate to the Google calendar after finish generating it

            + Better calendar UI 

        + Fix bugs: 
            + The finish status kinda sketchy, when dialog close event the status change then close. [] 

            + Some time create tkb only create the Calendar but not the event 
                -> The few first passes work perfectly
                -> But then things start to break 

            + Merge the format between the old and the new tkb localstorage stuff 

            + Fix all the fixme: 
                the big fixme in the login system 

            + After logout the localstorage data not cleared

            + The user Avatar only appear once right after the login [X]


        + Publish the google app @Later 

        + Draw the Client as a tree to see the dependency chain 

**THE ROUTING WON'T COLLIDE WITH THE APP LOGIC(STATE MACHINE) IF THE ROUTE GO TO THE PAGE THAT SHOULDN'T BE VISITED, THE LOGIC WILL HANDLE THE REDIRECT**
    https://xstatebyexample.com/authentication/
    **FOR NOW JUST HANDLE THE GLOBAL STATES THE "NORMAL" WAY**
        + Move the app to use the custom PrivateRoute [] (30m) 
            Map out how the routing should work, since we're not having login page 
            -> Replace the <Navigate login> to a login modal  

            Add the logic to do the transition between step 1 and step 2 in a more "state machine way" @Next

        + Refactor the components file system [X] (1h)

        + How our app currently works: 
            + User login with google 
                + Store user information in localStorage 
            + If haven't login show the login button on the appbar
            + Only homepage accessible without login 

            + All web app page need login to work 
                + 1. Submit TKB HTML page: 
                    + If not login -> Display login modal  
                + 2. Generate Google Calendar page
                    + If not login 
                        -> 1.Display login modal  
                        -> 2. After login redirect back to step 1  
                            

**YOU UI/NAVIGATION/OTHER THINGS ONLY REACT TO THE STATE MACHINE, 
STATE MACHINE NOT REALLY MATTER TO ANYTHINGS THAT YOU ARE CODING**
            Navigation:  
            Call the checkloginservices and checking for the authmachine state
                Logged in or logged out-> Homepage
                Logged in -> 
                    Webapppage
                        Submit tkb 
                        Generate google calendar

+ List out the missing parts of our websites: 
    SEO: google analytic ?? 
    CI: GitHub Actions
    CD: Ansible
    Monitoring: Prometheus
    Web app performance: 
    Security: 

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

**JUST USE THE STATE MACHINE AS A DIAGRAM THEN IMPLEMENT IT NATIVELY IN REACT USING USESTATE** 


## Bug 
        This is a big Bug:
            Something wrong with the routing 
            the expected behaviour would be it's rendering the login 
            whenever user navigate to a protected page
            but it's just navigate back to the root 

            + When you navigate using the "thu ngay" button, it does show the login modal [] 

                But when you navigate using the url directly, it's just navigate right back to the root

                + Maybe changing the order of the routes element a bit 
            -> Not a problem of private route 

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


+ Calendar creation 
    put a button in result 
        -> if click -> generate google calendar  [X]
            2 functions have to have:  
                + create new event
                    -> api url: 
                + create new calendar
                    -> api url: 



1. an xlsx reader (we already have the base in uit-tool) [X] 
        -> Problem: 
            We need a backend to be able to do the auto xlsx service  
        -> Solution: 
            We just gonna work on the backend and process the xlsx [X] 
                1. Setup the backend dev.sh  [X] (1h)
                2. Process the xlsx info into a format that easy to map [X] 
            then send the pre-processes xlxs info to the front end 
            
    -> Output to frontend: lich thi info 

2. (Frontend) a mapping mechanism that 
    map class name and lich thi info [X]
        But currently we just gonna test on the backend
    + NOTE: 
        The class information already stored in the local storage
