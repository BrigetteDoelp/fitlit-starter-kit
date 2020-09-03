# Cat-tivity Tracker

**Cat-tivity Tracker** is the purrrfect app to keep track of your health habits. It tracks daily, weekly, and all-time stats for how hydrated, active, and well-rested users are. It is designed in vanilla JavaScript using principles of Test Driven Development.

![Cat-tivity app main view](https://i.imgur.com/2JMHSRR.png)

## Setup & Installation

1. [Clone](git@github.com:BrigetteDoelp/fitlit-starter-kit.git) the repo
1. Change into the directory and install the project dependencies. 
1. Open the HTML page locally

```
git clone git@github.com:BrigetteDoelp/fitlit-starter-kit.git
cd [directory]
npm i
open src/index.html
```

## Wins & Challenges

* Naming class methods that perform similar actions but across different periods of time, and trying to keep them succinct yet descriptive.
* Organizing classes and their responsibilities in a sensible way. (More on this below)
* Breaking down complex logic for certain calculations. It helped to pseudo-code as granularly as possible and break down different steps into helper functions. Helper functions came in handy for writing methods that needed the same piece of information later on, as well as helped keep code DRYer and make it easier for other developers to understand.

### Under the Hood

**Organizing Classes:**
We felt it made sense to organize functionality for this project into 5 classes: a `User`, and 4 different repositories that each hold different datasets (`UserRepo`, `ActivityRepo`, `HydrationRepo`, `SleepRepo`).

Our thinking was that different users can be instantiated depending whose info you want to display on the DOM and data can be found or calculated depending what category of information you are looking for.

Each repository class is instantiated with a single dataset to perform most calculations. This reduces occurences of coupling as much as possible without creating one super class. For a few calculations in `SleepRepo`, `ActivityRepo` and `HydrationRepo` that compare data for multiple users, an array of users is taken in as an argument.

## Contributors

1. 👤 **Brigette Doelp**
- GitHub: [BrigetteDoelp](https://github.com/brigettedoelp)
1. 👤 **Hanna Kim**
- GitHub: [hannakim91](https://github.com/hannakim91)

## Additional Links
- [Project Board](https://github.com/BrigetteDoelp/fitlit-starter-kit/projects/1)
- [Wireframe](https://brigette636123.invisionapp.com/freehand/FitLit-Wireframe-r1Vd07KKY)
- [Specs](https://frontend.turing.io/projects/fitlit.html)
