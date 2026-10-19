# acelexia

im creating a game similar to kanzide go, a Japanese character recognition game, but featuring character recognition and comprehension for chinese, english and math. 

target audience : dyslexic kids aging from k3 to p6 in hong kong.




part [A] UI : im using visual studio

1. home1 page (main UI)

- a button for users to sign up (direct to blank page)

- a button for users to log in (direct to another blank page)

- a button called 'trial' directing to 'home2 page'

2. home2 page

- a button to direct users to a new blank page upload their dyslexia report

- a button to direct users to take our dyslexia test on a 'take test'page

3. take test page

- questions from question bank(qb), see part A5

- input buttons for age group, user name

- after the test, direct them to a 'result page' 

4. result page

- which shows results in 3 aspects(chi eng math) in radar chart

- the attributes of each radar charts are assigned according to the question types from qb

5. qb (question bank)

- qb is a folder with 3 sub-folders (chi eng math)

- chi, eng, math contains subfolders named after question types(qt), see part [B]

6. game page

- see part [C]




part [B] : qt, question types include the following

1. character / word recognition (chi and eng)

- input : speech to text

2. paragraph comprehension (chi and eng)

- mc questions with 4 pictures and a 3-4 line text, users have to choose the most suitable picture

3. basic arithmetic calculation (math)

4. situation type question (math)

- ask the user to write down the expression and explain each term using speech to text

- for higher levels, write expression and calculate answer with full steps, explain each step and term using speech to text




part [C] game page :

1. the users user name, grade, and level will be displayed on top of the page as well as the settings button(directing to a blank page called 'settings')

2. there will be a 'world map' containing buttons directing to different 'worlds' , each with a different theme (eg. 'aquatic world' page, 'forest hunt' page, 'fire world' page etc)

3. within each world page, there are 3 boss towers, each representing one subject (chi eng math), with a button refering to a new page

4. the new tower page will be named after the grade, theme and tower (eg. the primary school grade4 math tower of the aquatic world will be called the G4aquaticMATH page)

5. each tower page consists of buttons to different levels, from level 1 to 500, users will be directed to a dynamic page called 'play' page

6. 'play' page will change according to your grade, theme, subject. but will follow a protocol, see part [D]




part [D] protocol : for basic settings,

keep these features below for each level from the original game :

1. words are shown on figure resembling some object (eg. demons, fish, fire), and gradually flows out from the screen with a countdown

2. users can score a point by inputting in the correct pronunciation of the word

3. the demon-shaped figure will look defeated (eg. 😵) and move away from the screen (eg. downwards) when the input is correct

4. the theme and context of the game is to defeat evil bosses by scoring, and have different levels within the same theme

5. users can use the skip button, but only once on each word/question(eg. if the user skip the word 'apple' they cannot skip it if the word 'apple' appears again)

6. wrong input will not do anything, no deducting scores. it will only wait until the user skips that question or the timer runs out

7. the structure of the game is : choose your year group/grade -> choose the subject(chi eng math) -> choose map having different themes/quests -> continue the game(play lv26 if they passed lv25)

add the feature :

1. apart from defeating evil bosses, add more variety in themes with even myth legends as seperate hidden quest or limited events (eg. greek gods, christmas with elves and Santa, traditional chinese festivals)

2. for all character recognition and word identification, change the input method from typing to voice recognition using a large button with a microphone sign at the bottom of the screen




part [E] library :

1. speech to text for Mandarin, Cantonese and English

2. dictionary data set in both chinese and English

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://acelexia.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/99eedd47-83c6-4826-bbb5-c1695f481704).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
