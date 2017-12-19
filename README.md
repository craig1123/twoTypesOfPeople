# Two Types of People
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Yin_yang.svg/200px-Yin_yang.svg.png">
</p>
There are many different types of people and personalities in this world. However, it's sometimes easiest to divide us into two specific groups. Find out your personality type as you take this simple and fun quiz.

Personalities are based off of the [Big Five personality traits](https://en.wikipedia.org/wiki/Big_Five_personality_traits)

* Openness to experience (inventive/curious vs. consistent/cautious)
* Conscientiousness (efficient/organized vs. easy-going/careless)
* Extraversion (outgoing/energetic vs. solitary/reserved)
* Agreeableness (friendly/compassionate vs. challenging/detached)
* Neuroticism (sensitive/nervous vs. secure/confident)


---

## Get Started

* `yarn` will install all the dependencies
* `yarn build` This will create a 'dist' folder containing js and css folders/files as well as an index.html that you can use to test these scripts locally.
* `yarn start` This will start a local development server on port 3000.

We are using `firebase` for the database which stores gender, ageGroup, US state, and the options people have selected. You will need to make a `keys.js` file in the `config` folder and contact Craig Walker for the secrets.
`localStorage` is used to save people's session and where they're at in the quiz/if they've already taken it.
`Redux` for state management of the current session.
`React` for the javascript/UI framework.
`React-router` for the routing


---

## ToDo:

### Landing Page
* Make the design appealing
* Adequately explain what the test is
* Go into the big 5 personalities BRIEFLY and explain that we'll find your personality by picking between two items
* Have them check if they're male or female, age group (0-17, 18-26, 27-35, 35-50, 51-64, 65+)
* If they're in the process of taking the test, make sure the button says, 'Continue Test' and send them to the correct question. If they've finished the test, send them to the results page.

### Questions Page
* Collect all the options/pictures
* Add in the gender and age group stats
* Once all of the options are selected, send them to the results page

### Results Page
* Give them a graph of the BIG 5 with all their points added together
* Write an accurate description of each of the big 5
* Show stats of how everyone ranked, male and female, age group.

### Miscellaneous
* Contact Jorge to use his images
