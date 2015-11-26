// Define the tour!
var tour = {
    id: "welcome",
    steps: [
        {
            title: "How to register",
            content: "Press the log in button, enter your mensa id and choose a password.",
            target: "mnuRegister",
            placement: "right"
        }
        /*,
        {
            title: "My content",
            content: "Here is where I put my content.",
            target: document.querySelector("#content p"),
            placement: "bottom"
        }*/
    ]
};

// Start the tour!
setTimeout(function(){hopscotch.startTour(tour);}, 800);
