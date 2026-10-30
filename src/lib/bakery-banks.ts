// AI-prepared practice mapped to EDB 2017 primary learning units; teacher review remains important.
import type {BakeryQuestion} from "./bakery-bank-schema";
export const BAKERY_SYLLABUS_SOURCE="https://www.edb.gov.hk/attachment/en/curriculum-development/kla/ma/curr/pmc2017_e.pdf";
export const BAKERY_UNITS:Record<string,string[]>={"P1": ["1N1", "1N2", "1N3", "1N4", "1M1", "1M2", "1M3", "1M4", "1S1", "1S2", "1S3"], "P2": ["2N1", "2N2", "2N3", "2N4", "2N5", "2N6", "2M1", "2M2", "2M3", "2S1", "2S2", "2S3", "2S4", "2D1"], "P3": ["3N1", "3N2", "3N3", "3N4", "3N5", "3M1", "3M2", "3M3", "3M4", "3M5", "3S1", "3S2", "3D1"], "P4": ["4N1", "4N2", "4N3", "4N4", "4N5", "4N6", "4N7", "4N8", "4M1", "4M2", "4S1", "4S2", "4S3", "4D1"], "P5": ["5N1", "5N2", "5N3", "5N4", "5N5", "5A1", "5A2", "5M1", "5M2", "5S1", "5S2", "5D1"], "P6": ["6N1", "6N2", "6N3", "6N4", "6A1", "6M1", "6M2", "6M3", "6M4", "6M5", "6S1", "6D1", "6D2", "6D3", "6D4"]};
export const BAKERY_BANKS:Record<string,BakeryQuestion[]>={
 "K3": [
  {
   "unit": "K3-count",
   "topic": "Counting objects",
   "prompt": "A tray holds these buns: bun, bun, bun, bun, bun, bun, bun. How many buns are on the tray?",
   "parts": [
    "Buns on one tray",
    "Count each listed bun once",
    "Number of buns"
   ],
   "labels": [
    "Object group",
    "Counting rule",
    "Unknown count"
   ],
   "formula": "Count all listed buns once",
   "formulas": [
    "Count all listed buns once",
    "Count only the first bun",
    "Count only the last bun"
   ],
   "answer": "7",
   "explanation": "Counting the listed buns gives 7.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-count",
   "topic": "Counting selected objects",
   "prompt": "On a kitchen table are: egg, spoon, egg, egg, spoon, egg. How many eggs are there?",
   "parts": [
    "Eggs and spoons listed",
    "Count eggs only",
    "Number of eggs"
   ],
   "labels": [
    "Mixed collection",
    "Target object",
    "Unknown selected count"
   ],
   "formula": "Count only the eggs in the list",
   "formulas": [
    "Count only the eggs in the list",
    "Count only the spoons in the list",
    "Count every item in the list"
   ],
   "answer": "4",
   "explanation": "The list contains 4 eggs and 2 spoons.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-count",
   "topic": "Counting empty spaces",
   "prompt": "Six cupcake cases are listed in order: filled, empty, empty, filled, empty, filled. How many cases are empty?",
   "parts": [
    "Six listed cupcake cases",
    "Empty cases only",
    "Number of empty cases"
   ],
   "labels": [
    "Collection examined",
    "Condition to count",
    "Unknown empty count"
   ],
   "formula": "Count entries marked empty",
   "formulas": [
    "Count entries marked empty",
    "Count all listed cases",
    "Count only the first empty case"
   ],
   "answer": "3",
   "explanation": "Three entries are marked empty.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-count",
   "topic": "Counting sequence",
   "prompt": "A child counts buns in order and says, '1, 2, 3, __, 5.' What number belongs in the gap?",
   "parts": [
    "1, 2, 3, __, 5",
    "Count forward by one",
    "Missing spoken number"
   ],
   "labels": [
    "Counting sequence",
    "Sequence rule",
    "Unknown number"
   ],
   "formula": "Say the number after 3 when counting forward",
   "formulas": [
    "Say the number after 3 when counting forward",
    "Say the number before 3 when counting forward",
    "Repeat the number 3"
   ],
   "answer": "4",
   "explanation": "The counting order is 1, 2, 3, 4, 5.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-add",
   "topic": "Combining food groups",
   "prompt": "A plate has 3 round biscuits and 2 star biscuits. How many biscuits are on the plate altogether?",
   "parts": [
    "3 round biscuits",
    "2 star biscuits",
    "Biscuits altogether"
   ],
   "labels": [
    "First group",
    "Second group",
    "Unknown total"
   ],
   "formula": "3 + 2",
   "formulas": [
    "3 + 2",
    "3 - 2",
    "3 + 3"
   ],
   "answer": "5",
   "explanation": "Combining 3 biscuits and 2 biscuits gives 5.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-add",
   "topic": "Adding one",
   "prompt": "A cook has 4 eggs in a bowl and adds 1 more egg. How many eggs are in the bowl now?",
   "parts": [
    "4 eggs at first",
    "1 egg added",
    "Eggs now"
   ],
   "labels": [
    "Starting amount",
    "Increase",
    "Unknown new amount"
   ],
   "formula": "4 + 1",
   "formulas": [
    "4 + 1",
    "4 - 1",
    "4 + 4"
   ],
   "answer": "5",
   "explanation": "One more than 4 is 5.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-add",
   "topic": "Finding a missing addend",
   "prompt": "A baker has put 4 buns in a box. The box needs 7 buns altogether. How many more buns should the baker add?",
   "parts": [
    "4 buns already packed",
    "7 buns wanted altogether",
    "Buns to add"
   ],
   "labels": [
    "Known addend",
    "Required total",
    "Unknown addend"
   ],
   "formula": "Find the number that makes 4 + □ = 7",
   "formulas": [
    "Find the number that makes 4 + □ = 7",
    "Find the total of 4 + 7",
    "Find the number that makes 7 + □ = 4"
   ],
   "answer": "3",
   "explanation": "4 + 3 = 7, so the baker should add 3 buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-add",
   "topic": "Combining recipe amounts",
   "prompt": "A fruit cup recipe uses 2 strawberry pieces and 6 banana pieces. How many fruit pieces are used?",
   "parts": [
    "2 strawberry pieces",
    "6 banana pieces",
    "Fruit pieces used"
   ],
   "labels": [
    "First ingredient count",
    "Second ingredient count",
    "Unknown combined count"
   ],
   "formula": "2 + 6",
   "formulas": [
    "2 + 6",
    "6 - 2",
    "2 + 2"
   ],
   "answer": "8",
   "explanation": "There are 2 + 6 = 8 fruit pieces.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-subtract",
   "topic": "Taking away",
   "prompt": "A tray has 9 buns. A customer buys 4 of them. How many buns are left on the tray?",
   "parts": [
    "9 buns at first",
    "4 buns bought",
    "Buns left"
   ],
   "labels": [
    "Starting count",
    "Removed count",
    "Unknown remaining count"
   ],
   "formula": "9 - 4",
   "formulas": [
    "9 - 4",
    "9 - 3",
    "9 - 5"
   ],
   "answer": "5",
   "explanation": "Taking 4 from 9 leaves 5 buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-subtract",
   "topic": "Comparing quantities",
   "prompt": "One plate has 6 cookies and another has 4 cookies. How many more cookies are on the first plate?",
   "parts": [
    "First plate: 6 cookies",
    "Second plate: 4 cookies",
    "Extra cookies on the first plate"
   ],
   "labels": [
    "Larger count",
    "Smaller count",
    "Unknown difference"
   ],
   "formula": "6 - 4",
   "formulas": [
    "6 - 4",
    "6 + 4",
    "6 - 1"
   ],
   "answer": "2",
   "explanation": "Matching four cookies on each plate leaves 2 extra on the first plate.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-subtract",
   "topic": "Finding how many were removed",
   "prompt": "A bowl held 8 strawberries. After a cook used some, 3 remained. How many strawberries did the cook use?",
   "parts": [
    "8 strawberries at first",
    "3 strawberries remain",
    "Strawberries used"
   ],
   "labels": [
    "Original count",
    "Final count",
    "Unknown removed count"
   ],
   "formula": "8 - 3",
   "formulas": [
    "8 - 3",
    "8 - 1",
    "3 + 3"
   ],
   "answer": "5",
   "explanation": "The cook used 5 strawberries because 8 - 5 = 3.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-subtract",
   "topic": "Finding a shortage",
   "prompt": "A baker needs 10 paper cases for cupcakes but has only 7. How many more paper cases are needed?",
   "parts": [
    "10 cases needed",
    "7 cases available",
    "Extra cases needed"
   ],
   "labels": [
    "Required count",
    "Available count",
    "Unknown shortage"
   ],
   "formula": "10 - 7",
   "formulas": [
    "10 - 7",
    "10 - 1",
    "7 - 1"
   ],
   "answer": "3",
   "explanation": "The baker is short of 10 - 7 = 3 cases.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-shapes",
   "topic": "Recognising a circle",
   "prompt": "A flat cookie has a perfectly round outline, with no straight sides and no corners. Is its outline a circle, square, triangle or rectangle?",
   "parts": [
    "Perfectly round cookie outline",
    "No straight sides or corners",
    "Shape name"
   ],
   "labels": [
    "Object outline",
    "Shape clues",
    "Unknown shape"
   ],
   "formula": "Recognise a round outline with no corners as a circle",
   "formulas": [
    "Recognise a round outline with no corners as a circle",
    "Recognise three straight sides as a triangle",
    "Recognise four equal straight sides and square corners as a square"
   ],
   "answer": "Circle",
   "explanation": "A circle is round and has no straight sides or corners.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-shapes",
   "topic": "Recognising a square",
   "prompt": "A flat cracker has four equal straight sides and four square corners. Which is the most specific name for its outline: circle, square, triangle or rectangle?",
   "parts": [
    "Four equal straight sides",
    "Four square corners",
    "Most specific shape name"
   ],
   "labels": [
    "Side clue",
    "Corner clue",
    "Unknown shape"
   ],
   "formula": "Recognise four equal sides and four square corners as a square",
   "formulas": [
    "Recognise four equal sides and four square corners as a square",
    "Recognise three straight sides as a triangle",
    "Recognise a round outline with no corners as a circle"
   ],
   "answer": "Square",
   "explanation": "Four equal sides and four square corners identify a square.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-shapes",
   "topic": "Recognising a triangle",
   "prompt": "A flat sandwich piece has exactly three straight sides and three corners. Is its outline a circle, square, triangle or rectangle?",
   "parts": [
    "Three straight sides",
    "Three corners",
    "Sandwich outline name"
   ],
   "labels": [
    "Side count",
    "Corner count",
    "Unknown shape"
   ],
   "formula": "Recognise three straight sides as a triangle",
   "formulas": [
    "Recognise three straight sides as a triangle",
    "Recognise a round outline with no corners as a circle",
    "Recognise four equal straight sides and square corners as a square"
   ],
   "answer": "Triangle",
   "explanation": "A triangle has three straight sides and three corners.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "K3-shapes",
   "topic": "Recognising a rectangle",
   "prompt": "A flat cake label has four square corners, two equal long sides and two equal short sides. Is its outline a circle, square, triangle or rectangle?",
   "parts": [
    "Two long sides and two short sides",
    "Four square corners",
    "Cake label shape"
   ],
   "labels": [
    "Side-length clue",
    "Corner clue",
    "Unknown shape"
   ],
   "formula": "Recognise four square corners with two long and two short sides as a rectangle",
   "formulas": [
    "Recognise four square corners with two long and two short sides as a rectangle",
    "Recognise four equal sides and four square corners as a square",
    "Recognise three straight sides as a triangle"
   ],
   "answer": "Rectangle",
   "explanation": "The label has four square corners, but its long and short sides are unequal, so it is a rectangle rather than a square.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  }
 ],
 "P1": [
  {
   "unit": "1N1",
   "topic": "Counting to 20",
   "prompt": "A bakery tray contains exactly these items: bun, bun, bun, bun, bun, bun, bun, bun. Each listed item is one bun. How many buns are on the tray?",
   "parts": [
    "The listed buns",
    "Count each bun once",
    "Number of buns"
   ],
   "labels": [
    "Objects to count",
    "Counting rule",
    "Unknown total"
   ],
   "formula": "Count each listed bun once",
   "formulas": [
    "Count each listed bun once",
    "Count only the first bun",
    "Count each listed bun twice"
   ],
   "answer": "8",
   "explanation": "Counting the eight listed buns gives 8.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N1",
   "topic": "Number order to 20",
   "prompt": "A baker numbers bread trays in counting order: 13, 14, __, 16. What number belongs on the blank tray?",
   "parts": [
    "13, 14, __, 16",
    "Count forward by one",
    "Blank tray number"
   ],
   "labels": [
    "Given sequence",
    "Number rule",
    "Missing number"
   ],
   "formula": "Find the number immediately after 14",
   "formulas": [
    "Find the number immediately after 14",
    "Find the number immediately before 14",
    "Find the number immediately after 16"
   ],
   "answer": "15",
   "explanation": "The counting order is 13, 14, 15, 16.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N1",
   "topic": "Ordinal position",
   "prompt": "Five cakes stand in a row. From your left to your right, they are lemon, chocolate, banana, strawberry and coconut. Count from your left, starting with 1. What position number is the strawberry cake?",
   "parts": [
    "Start at your left",
    "Strawberry cake",
    "Its position number"
   ],
   "labels": [
    "Counting direction",
    "Target cake",
    "Unknown position"
   ],
   "formula": "Count positions from the left, starting with 1",
   "formulas": [
    "Count positions from the left, starting with 1",
    "Count positions from the right, starting with 1",
    "Count all cakes in the row"
   ],
   "answer": "4",
   "explanation": "Lemon is 1, chocolate is 2, banana is 3 and strawberry is 4.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N1",
   "topic": "Comparing numbers to 20",
   "prompt": "One bakery basket holds 12 rolls. Another holds 16 rolls. What is the larger number of rolls?",
   "parts": [
    "12 rolls",
    "16 rolls",
    "Larger number"
   ],
   "labels": [
    "First quantity",
    "Second quantity",
    "Comparison target"
   ],
   "formula": "Choose the greater of 12 and 16",
   "formulas": [
    "Choose the greater of 12 and 16",
    "Choose the smaller of 12 and 16",
    "Count forward one from 12"
   ],
   "answer": "16",
   "explanation": "16 is greater than 12.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N2",
   "topic": "Basic addition",
   "prompt": "A baker puts 7 plain buns and 5 sesame buns into an empty basket. How many buns are in the basket altogether?",
   "parts": [
    "7 plain buns",
    "5 sesame buns",
    "Buns altogether"
   ],
   "labels": [
    "First group",
    "Second group",
    "Unknown total"
   ],
   "formula": "7 + 5",
   "formulas": [
    "7 + 5",
    "7 - 5",
    "7 + 4"
   ],
   "answer": "12",
   "explanation": "Adding the two groups gives 7 + 5 = 12 buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N2",
   "topic": "Basic subtraction",
   "prompt": "A tray has 15 biscuits. A customer buys 6 of them. How many biscuits remain on the tray?",
   "parts": [
    "15 biscuits at first",
    "6 biscuits bought",
    "Biscuits remaining"
   ],
   "labels": [
    "Starting quantity",
    "Quantity removed",
    "Unknown remainder"
   ],
   "formula": "15 - 6",
   "formulas": [
    "15 - 6",
    "15 - 5",
    "6 + 5"
   ],
   "answer": "9",
   "explanation": "Taking away 6 from 15 leaves 9 biscuits.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N2",
   "topic": "Finding a missing addition amount",
   "prompt": "A cook has 8 eggs in a bowl. She adds some more eggs and then has 13 eggs. How many eggs did she add?",
   "parts": [
    "8 eggs at first",
    "13 eggs at the end",
    "Eggs added"
   ],
   "labels": [
    "Starting quantity",
    "Final quantity",
    "Unknown increase"
   ],
   "formula": "13 - 8",
   "formulas": [
    "13 - 8",
    "13 - 5",
    "8 + 5"
   ],
   "answer": "5",
   "explanation": "The increase is 13 - 8 = 5 eggs.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N2",
   "topic": "Finding a difference",
   "prompt": "A bakery makes 14 cheese rolls and 9 vegetable rolls. How many more cheese rolls than vegetable rolls does it make?",
   "parts": [
    "14 cheese rolls",
    "9 vegetable rolls",
    "How many more"
   ],
   "labels": [
    "Larger group",
    "Smaller group",
    "Unknown difference"
   ],
   "formula": "14 - 9",
   "formulas": [
    "14 - 9",
    "14 - 5",
    "9 - 5"
   ],
   "answer": "5",
   "explanation": "The difference is 14 - 9 = 5 rolls.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N3",
   "topic": "Tens and ones",
   "prompt": "A bakery has 4 full bags of biscuits, with 10 biscuits in each bag, and 6 loose biscuits. What number of biscuits does this represent?",
   "parts": [
    "4 groups of ten",
    "6 loose biscuits",
    "Number represented"
   ],
   "labels": [
    "Tens",
    "Ones",
    "Unknown number"
   ],
   "formula": "40 + 6",
   "formulas": [
    "40 + 6",
    "4 + 6",
    "60 + 4"
   ],
   "answer": "46",
   "explanation": "Four tens and six ones make 46.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N3",
   "topic": "Counting in tens",
   "prompt": "A baker marks biscuit totals on a packing sheet: 20, 30, 40, __. The totals increase by ten each time. What is the next total?",
   "parts": [
    "20, 30, 40",
    "Increase by ten",
    "Next biscuit total"
   ],
   "labels": [
    "Given totals",
    "Counting step",
    "Missing total"
   ],
   "formula": "40 + 10",
   "formulas": [
    "40 + 10",
    "40 + 1",
    "40 - 10"
   ],
   "answer": "50",
   "explanation": "Ten more than 40 is 50.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N3",
   "topic": "Comparing numbers to 100",
   "prompt": "The bakery's stock table is: bread rolls — 62; buns — 26; muffins — 45. What is the smallest stock number?",
   "parts": [
    "62, 26 and 45",
    "Find the smallest",
    "Smallest stock number"
   ],
   "labels": [
    "Numbers to compare",
    "Comparison rule",
    "Unknown minimum"
   ],
   "formula": "Choose the least of 62, 26 and 45",
   "formulas": [
    "Choose the least of 62, 26 and 45",
    "Choose the greatest of 62, 26 and 45",
    "Choose the number between the other two in size"
   ],
   "answer": "26",
   "explanation": "26 is less than both 45 and 62.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N3",
   "topic": "Counting across a ten",
   "prompt": "Bakery order tickets are numbered consecutively: 58, 59, __, 61. What number is missing?",
   "parts": [
    "58, 59, __, 61",
    "One more each time",
    "Missing ticket number"
   ],
   "labels": [
    "Ticket sequence",
    "Counting rule",
    "Unknown number"
   ],
   "formula": "59 + 1",
   "formulas": [
    "59 + 1",
    "59 - 1",
    "59 + 10"
   ],
   "answer": "60",
   "explanation": "The number after 59 and before 61 is 60.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N4",
   "topic": "Two-digit addition",
   "prompt": "A bakery prepares 23 pineapple buns in the morning and 14 more in the afternoon. How many pineapple buns does it prepare altogether?",
   "parts": [
    "23 morning buns",
    "14 afternoon buns",
    "Buns altogether"
   ],
   "labels": [
    "First amount",
    "Second amount",
    "Unknown total"
   ],
   "formula": "23 + 14",
   "formulas": [
    "23 + 14",
    "23 - 14",
    "23 + 4"
   ],
   "answer": "37",
   "explanation": "23 + 14 = 37 pineapple buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N4",
   "topic": "Two-digit subtraction",
   "prompt": "A cook has 58 dumplings ready. She serves 26 of them. How many dumplings are left?",
   "parts": [
    "58 dumplings ready",
    "26 dumplings served",
    "Dumplings left"
   ],
   "labels": [
    "Starting amount",
    "Amount removed",
    "Unknown remainder"
   ],
   "formula": "58 - 26",
   "formulas": [
    "58 - 26",
    "58 + 26",
    "58 - 20"
   ],
   "answer": "32",
   "explanation": "58 - 26 = 32 dumplings remain.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N4",
   "topic": "Finding an amount added",
   "prompt": "A bakery has 34 empty cake boxes. A delivery brings more boxes, making 59 boxes altogether. How many boxes arrive in the delivery?",
   "parts": [
    "34 boxes before delivery",
    "59 boxes after delivery",
    "Boxes delivered"
   ],
   "labels": [
    "Initial amount",
    "Final amount",
    "Unknown addition"
   ],
   "formula": "59 - 34",
   "formulas": [
    "59 - 34",
    "59 + 34",
    "59 - 30"
   ],
   "answer": "25",
   "explanation": "The delivery contains 59 - 34 = 25 boxes.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1N4",
   "topic": "Comparing two-digit quantities",
   "prompt": "For two orders, a baker makes 76 small cookies and 42 large cookies. How many fewer large cookies than small cookies are there?",
   "parts": [
    "76 small cookies",
    "42 large cookies",
    "How many fewer large cookies"
   ],
   "labels": [
    "Larger quantity",
    "Smaller quantity",
    "Unknown difference"
   ],
   "formula": "76 - 42",
   "formulas": [
    "76 - 42",
    "76 - 40",
    "42 + 6"
   ],
   "answer": "34",
   "explanation": "There are 76 - 42 = 34 fewer large cookies.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M1",
   "topic": "Comparing lengths directly",
   "prompt": "A breadstick and a pastry strip lie straight beside each other. Their left ends line up. The breadstick's right end extends beyond the pastry strip's right end. Which item is longer?",
   "parts": [
    "Left ends line up",
    "Breadstick extends farther right",
    "Longer item"
   ],
   "labels": [
    "Fair comparison setup",
    "Observed end position",
    "Unknown item"
   ],
   "formula": "With starting ends aligned, choose the item extending farther",
   "formulas": [
    "With starting ends aligned, choose the item extending farther",
    "With starting ends aligned, choose the item ending sooner",
    "Compare the colours of the items"
   ],
   "answer": "breadstick",
   "explanation": "With the left ends aligned, the farther right end shows the greater length.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M1",
   "topic": "Comparing distances intuitively",
   "prompt": "You stand at one end of a straight kitchen counter. The sugar jar is just in front of you, and the oil bottle is at the far end of the counter. Which object is nearer to you?",
   "parts": [
    "Your standing position",
    "Sugar nearby; oil at the far end",
    "Nearer object"
   ],
   "labels": [
    "Reference point",
    "Observed positions",
    "Unknown object"
   ],
   "formula": "Choose the object closer to the same standing position",
   "formulas": [
    "Choose the object closer to the same standing position",
    "Choose the object farther from the same standing position",
    "Compare the heights of the containers"
   ],
   "answer": "sugar jar",
   "explanation": "The sugar jar is just in front of you, so it is nearer.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M1",
   "topic": "Recognising equal lengths",
   "prompt": "Two straight strips of baking paper lie beside each other. Their left ends line up, and their right ends also line up. Is the first strip longer, shorter or the same length as the second?",
   "parts": [
    "Left ends match",
    "Right ends match",
    "Length relationship"
   ],
   "labels": [
    "Starting-end observation",
    "Finishing-end observation",
    "Unknown comparison"
   ],
   "formula": "Matching ends at both sides show equal lengths",
   "formulas": [
    "Matching ends at both sides show equal lengths",
    "A farther finishing end shows a longer strip",
    "An earlier finishing end shows a shorter strip"
   ],
   "answer": "same length",
   "explanation": "Both pairs of ends line up, so the strips have the same length.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M1",
   "topic": "Comparing distances from a common point",
   "prompt": "A mixing bowl, a spoon and a whisk lie on the same straight line on a counter. Starting at the bowl and moving away, you reach the spoon first and then the whisk. Which utensil is farther from the bowl?",
   "parts": [
    "Mixing bowl",
    "Spoon first, then whisk",
    "Farther utensil"
   ],
   "labels": [
    "Reference object",
    "Observed order",
    "Unknown utensil"
   ],
   "formula": "Along the same line, choose the utensil reached later from the bowl",
   "formulas": [
    "Along the same line, choose the utensil reached later from the bowl",
    "Along the same line, choose the utensil reached first from the bowl",
    "Compare the widths of the utensils"
   ],
   "answer": "whisk",
   "explanation": "The whisk lies beyond the spoon, so it is farther from the bowl.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M2",
   "topic": "Values of Hong Kong coins",
   "prompt": "A customer pays for a sandwich using one HK$5 coin and one HK$2 coin. How many Hong Kong dollars does the customer pay?",
   "parts": [
    "One HK$5 coin",
    "One HK$2 coin",
    "Dollars paid"
   ],
   "labels": [
    "First coin value",
    "Second coin value",
    "Unknown payment"
   ],
   "formula": "5 + 2",
   "formulas": [
    "5 + 2",
    "5 - 2",
    "1 + 1"
   ],
   "answer": "7",
   "explanation": "The coin values total HK$7.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M2",
   "topic": "Finding change",
   "prompt": "A bun costs HK$6. A customer pays with a HK$10 coin. How many Hong Kong dollars should the customer receive in change?",
   "parts": [
    "HK$6 price",
    "HK$10 paid",
    "Change in dollars"
   ],
   "labels": [
    "Cost",
    "Payment",
    "Unknown change"
   ],
   "formula": "10 - 6",
   "formulas": [
    "10 - 6",
    "10 + 6",
    "10 - 1"
   ],
   "answer": "4",
   "explanation": "Change is payment minus cost: 10 - 6 = HK$4.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M2",
   "topic": "Making an exact payment",
   "prompt": "A loaf costs HK$7. A customer has put down one HK$5 coin and must add exactly one more coin to pay the exact price. What must the added coin's value be, in Hong Kong dollars?",
   "parts": [
    "HK$7 loaf price",
    "HK$5 already put down",
    "Value of added coin"
   ],
   "labels": [
    "Required payment",
    "Amount already supplied",
    "Unknown coin value"
   ],
   "formula": "7 - 5",
   "formulas": [
    "7 - 5",
    "7 + 5",
    "5 - 1"
   ],
   "answer": "2",
   "explanation": "HK$7 - HK$5 = HK$2, so one HK$2 coin is needed.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M2",
   "topic": "Reading and comparing price tags",
   "prompt": "A bakery price table shows: loaf — HK$8; muffin — HK$5; bun — HK$3. Which item costs the least?",
   "parts": [
    "Loaf $8; muffin $5; bun $3",
    "Choose the lowest price",
    "Least expensive item"
   ],
   "labels": [
    "Price information",
    "Selection rule",
    "Unknown item"
   ],
   "formula": "Compare the prices and choose the item with the smallest price",
   "formulas": [
    "Compare the prices and choose the item with the smallest price",
    "Compare the prices and choose the item with the largest price",
    "Choose the first item in the table"
   ],
   "answer": "bun",
   "explanation": "HK$3 is the lowest price, and it is the bun's price.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M3",
   "topic": "Measuring with improvised units",
   "prompt": "A baker measures a straight pastry strip with identical paper clips. Six clips placed lengthwise, end to end without gaps or overlaps, exactly match the strip. How long is the strip in paper-clip units?",
   "parts": [
    "Identical paper clips",
    "6 clips exactly cover the strip",
    "Length in paper-clip units"
   ],
   "labels": [
    "Measuring unit",
    "Measurement count",
    "Unknown length"
   ],
   "formula": "Count the identical paper clips spanning the strip",
   "formulas": [
    "Count the identical paper clips spanning the strip",
    "Count only the gaps between the clips",
    "Count both ends of every clip"
   ],
   "answer": "6",
   "explanation": "Six identical clips span the strip, so its length is 6 paper-clip units.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M3",
   "topic": "Comparing measured lengths",
   "prompt": "Using the same cube edge as a unit, a cook measures a spatula as 9 units long and a spoon as 5 units long. How many units longer is the spatula?",
   "parts": [
    "Spatula: 9 units",
    "Spoon: 5 units",
    "Extra length in units"
   ],
   "labels": [
    "Longer measurement",
    "Shorter measurement",
    "Unknown difference"
   ],
   "formula": "9 - 5",
   "formulas": [
    "9 - 5",
    "9 + 5",
    "9 - 1"
   ],
   "answer": "4",
   "explanation": "The measurements use the same unit, so the difference is 9 - 5 = 4 units.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M3",
   "topic": "Measuring distance with equal units",
   "prompt": "On a kitchen floor, a straight route from the oven marker to the sink marker covers exactly 5 equal square tiles in one row. Each tile's side is one distance unit, and there are no gaps between tiles. What is the distance in tile-side units?",
   "parts": [
    "One tile side",
    "5 tiles along the route",
    "Distance in tile-side units"
   ],
   "labels": [
    "Distance unit",
    "Unit count",
    "Unknown distance"
   ],
   "formula": "Count the tile sides spanning the straight route",
   "formulas": [
    "Count the tile sides spanning the straight route",
    "Count all four sides of every tile",
    "Count only the joins between tiles"
   ],
   "answer": "5",
   "explanation": "The route spans five tile sides, so the distance is 5 units.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M3",
   "topic": "Comparing distances measured in the same unit",
   "prompt": "A cook measures straight distances from a mixing bowl using the same measuring stick each time. The distance table is: bowl to flour tin — 4 stick-lengths; bowl to egg basket — 7 stick-lengths. Which container is farther from the bowl?",
   "parts": [
    "Flour tin: 4 stick-lengths",
    "Egg basket: 7 stick-lengths",
    "Farther container"
   ],
   "labels": [
    "First distance",
    "Second distance",
    "Unknown container"
   ],
   "formula": "Choose the container with the larger distance measured in the same unit",
   "formulas": [
    "Choose the container with the larger distance measured in the same unit",
    "Choose the container with the smaller distance measured in the same unit",
    "Choose the first container listed"
   ],
   "answer": "egg basket",
   "explanation": "7 stick-lengths is farther than 4 stick-lengths.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M4",
   "topic": "Reading o'clock",
   "prompt": "On the bakery's analogue clock, the long minute hand points to 12 and the short hour hand points to 3. What time does it show? Use 'o'clock'.",
   "parts": [
    "Minute hand at 12",
    "Hour hand at 3",
    "Clock time"
   ],
   "labels": [
    "Minute-hand information",
    "Hour-hand information",
    "Unknown time"
   ],
   "formula": "Read the hour hand and use o'clock when the minute hand points to 12",
   "formulas": [
    "Read the hour hand and use o'clock when the minute hand points to 12",
    "Read the hour hand and use half past when the minute hand points to 12",
    "Use the minute-hand number as the hour"
   ],
   "answer": "3 o'clock",
   "explanation": "The minute hand at 12 means o'clock, and the hour hand gives 3.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M4",
   "topic": "Reading half past",
   "prompt": "A kitchen analogue clock has its long minute hand at 6 and its short hour hand halfway between 7 and 8. What time does it show? Use 'half past'.",
   "parts": [
    "Minute hand at 6",
    "Hour hand between 7 and 8",
    "Clock time"
   ],
   "labels": [
    "Minute-hand information",
    "Hour-hand information",
    "Unknown time"
   ],
   "formula": "Use half past and name the hour the short hand has passed",
   "formulas": [
    "Use half past and name the hour the short hand has passed",
    "Use half past and name the next hour",
    "Use o'clock and name the minute-hand number"
   ],
   "answer": "half past 7",
   "explanation": "The minute hand at 6 means half past; the hour hand has passed 7.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M4",
   "topic": "Hour-hand position at half past",
   "prompt": "A baker sets a teaching clock to half past 8 to show the bread collection time. Between which two numbers should the short hour hand be?",
   "parts": [
    "Half past 8",
    "Short hour hand",
    "Two numbers around the hand"
   ],
   "labels": [
    "Given time",
    "Target hand",
    "Unknown position"
   ],
   "formula": "At half past, place the hour hand halfway between the named hour and the next hour",
   "formulas": [
    "At half past, place the hour hand halfway between the named hour and the next hour",
    "At half past, place the hour hand exactly on the named hour",
    "At half past, place the hour hand on 6"
   ],
   "answer": "between 8 and 9",
   "explanation": "At half past 8, the hour hand is halfway from 8 to 9.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1M4",
   "topic": "Minute-hand position at o'clock",
   "prompt": "The bakery closes at 5 o'clock. On an analogue clock showing this time, which number does the long minute hand point to?",
   "parts": [
    "5 o'clock",
    "Long minute hand",
    "Number it points to"
   ],
   "labels": [
    "Given time",
    "Target hand",
    "Unknown clock number"
   ],
   "formula": "For an o'clock time, place the minute hand on 12",
   "formulas": [
    "For an o'clock time, place the minute hand on 12",
    "For an o'clock time, place the minute hand on 6",
    "For an o'clock time, place the minute hand on the hour number"
   ],
   "answer": "12",
   "explanation": "The minute hand points to 12 at every o'clock time.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S1",
   "topic": "Recognising a cylinder",
   "prompt": "A handle-free rolling pin has two equal flat circular ends joined by one curved surface. Its thickness stays the same from end to end. What 3-D shape is it?",
   "parts": [
    "Two equal flat circular ends",
    "One curved surface",
    "Rolling pin's shape"
   ],
   "labels": [
    "End-face feature",
    "Joining-surface feature",
    "Unknown solid"
   ],
   "formula": "Recognise a cylinder from two equal circular ends and a curved surface",
   "formulas": [
    "Recognise a cylinder from two equal circular ends and a curved surface",
    "Recognise a cone from one circular base and one pointed end",
    "Recognise a sphere from a completely round surface with no flat faces"
   ],
   "answer": "cylinder",
   "explanation": "A cylinder has two equal circular ends and a curved surface.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S1",
   "topic": "Recognising a cone",
   "prompt": "A solid pastry mould has one flat circular base. Its curved surface narrows to a single point at the opposite end. What 3-D shape is it?",
   "parts": [
    "One flat circular base",
    "Curved surface narrowing to a point",
    "Mould's shape"
   ],
   "labels": [
    "Base feature",
    "Pointed-surface feature",
    "Unknown solid"
   ],
   "formula": "Recognise a cone from a circular base and a curved surface ending at a point",
   "formulas": [
    "Recognise a cone from a circular base and a curved surface ending at a point",
    "Recognise a cylinder from two equal circular ends",
    "Recognise a pyramid from a flat base and triangular faces"
   ],
   "answer": "cone",
   "explanation": "The circular base and curved surface meeting at a point identify a cone.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S1",
   "topic": "Recognising a pyramid",
   "prompt": "A bakery's solid display ornament has one square base and four flat triangular faces. The triangular faces meet at one top point. What 3-D shape is it?",
   "parts": [
    "One square base",
    "Four triangular faces meeting at a point",
    "Ornament's shape"
   ],
   "labels": [
    "Base feature",
    "Side-face feature",
    "Unknown solid"
   ],
   "formula": "Recognise a pyramid from a base and triangular faces meeting at a point",
   "formulas": [
    "Recognise a pyramid from a base and triangular faces meeting at a point",
    "Recognise a cone from a circular base and curved surface",
    "Recognise a cube from six equal square faces"
   ],
   "answer": "pyramid",
   "explanation": "A square base with triangular faces meeting at a point forms a pyramid.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S1",
   "topic": "Recognising a sphere",
   "prompt": "A cook makes a perfectly round dough ball, equally wide in every direction. It has no flat faces and no pointed ends. What 3-D shape is it?",
   "parts": [
    "Perfectly round ball",
    "No flat faces or pointed ends",
    "Dough ball's shape"
   ],
   "labels": [
    "Overall form",
    "Surface feature",
    "Unknown solid"
   ],
   "formula": "Recognise a sphere from a perfectly round ball with no flat faces",
   "formulas": [
    "Recognise a sphere from a perfectly round ball with no flat faces",
    "Recognise a cylinder from two flat circular ends",
    "Recognise a cone from a circular base and pointed end"
   ],
   "answer": "sphere",
   "explanation": "A perfectly round ball has the shape of a sphere.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S2",
   "topic": "Recognising a triangle",
   "prompt": "A flat sandwich label has a closed outline made of exactly three straight sides. It has three corners. What 2-D shape is the label?",
   "parts": [
    "Three straight sides",
    "Three corners",
    "Label's shape"
   ],
   "labels": [
    "Side feature",
    "Corner feature",
    "Unknown flat shape"
   ],
   "formula": "Recognise a triangle by its three straight sides",
   "formulas": [
    "Recognise a triangle by its three straight sides",
    "Recognise a square by four equal sides and square corners",
    "Recognise a circle by its round curved outline"
   ],
   "answer": "triangle",
   "explanation": "A closed flat shape with three straight sides is a triangle.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S2",
   "topic": "Recognising a square",
   "prompt": "A flat cake-box sticker has four equal straight sides and four square corners, like the corners of a sheet of paper. What 2-D shape is it?",
   "parts": [
    "Four equal straight sides",
    "Four square corners",
    "Sticker's shape"
   ],
   "labels": [
    "Side feature",
    "Corner feature",
    "Unknown flat shape"
   ],
   "formula": "Recognise a square by four equal straight sides and four square corners",
   "formulas": [
    "Recognise a square by four equal straight sides and four square corners",
    "Recognise a triangle by three straight sides",
    "Recognise a circle by a round curved outline"
   ],
   "answer": "square",
   "explanation": "Four equal straight sides and four square corners identify a square.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S2",
   "topic": "Recognising a rectangle",
   "prompt": "A flat recipe card has two equal long sides and two equal short sides. All four sides are straight, and all four corners are square corners. What 2-D shape is the card?",
   "parts": [
    "Two long sides and two short sides",
    "Four square corners",
    "Recipe card's shape"
   ],
   "labels": [
    "Side-length feature",
    "Corner feature",
    "Unknown flat shape"
   ],
   "formula": "Recognise a rectangle by opposite equal sides and four square corners",
   "formulas": [
    "Recognise a rectangle by opposite equal sides and four square corners",
    "Recognise a square by four equal sides and four square corners",
    "Recognise a triangle by three straight sides"
   ],
   "answer": "rectangle",
   "explanation": "The card has the straight sides and square corners of a rectangle; its long and short sides differ.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S2",
   "topic": "Recognising a circle and curved outline",
   "prompt": "A flat bakery seal is perfectly round. Its outline is one continuous curve with no straight sides and no corners. What 2-D shape is the seal?",
   "parts": [
    "Perfectly round curved outline",
    "No straight sides or corners",
    "Seal's shape"
   ],
   "labels": [
    "Boundary feature",
    "Absent features",
    "Unknown flat shape"
   ],
   "formula": "Recognise a circle by its perfectly round curved outline",
   "formulas": [
    "Recognise a circle by its perfectly round curved outline",
    "Recognise a square by four equal straight sides",
    "Recognise a triangle by three straight sides"
   ],
   "answer": "circle",
   "explanation": "A perfectly round flat shape with a curved outline is a circle.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S3",
   "topic": "Left position",
   "prompt": "You face a bakery shelf. From your left to your right, the objects are a flour tin and then a sugar jar. Is the flour tin to the left or to the right of the sugar jar?",
   "parts": [
    "Your view facing the shelf",
    "Flour tin before sugar jar from left to right",
    "Flour tin relative to sugar jar"
   ],
   "labels": [
    "Observer viewpoint",
    "Given arrangement",
    "Unknown position"
   ],
   "formula": "Use the observer's left-to-right order to locate the flour tin",
   "formulas": [
    "Use the observer's left-to-right order to locate the flour tin",
    "Reverse the observer's left and right",
    "Compare the heights of the containers"
   ],
   "answer": "left",
   "explanation": "In your left-to-right view, the flour tin is on the sugar jar's left.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S3",
   "topic": "Right position",
   "prompt": "You face a kitchen wall. From your left to your right, the appliances are the oven, the mixer and the fridge. Is the fridge to the left or to the right of the mixer?",
   "parts": [
    "Your view facing the wall",
    "Oven, mixer, fridge from left to right",
    "Fridge relative to mixer"
   ],
   "labels": [
    "Observer viewpoint",
    "Given arrangement",
    "Unknown position"
   ],
   "formula": "Locate the fridge after the mixer in the observer's left-to-right order",
   "formulas": [
    "Locate the fridge after the mixer in the observer's left-to-right order",
    "Reverse the observer's left and right",
    "Compare the appliances' sizes"
   ],
   "answer": "right",
   "explanation": "The fridge comes after the mixer from your left to your right, so it is on the right.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S3",
   "topic": "Behind position",
   "prompt": "You face a kitchen counter. A bowl and a cake stand are directly in line with you. The bowl is nearer to you, and the cake stand is farther away, directly beyond the bowl. From your viewpoint, is the cake stand in front of or behind the bowl?",
   "parts": [
    "Your view facing the counter",
    "Bowl nearer; cake stand directly farther away",
    "Cake stand relative to bowl"
   ],
   "labels": [
    "Observer viewpoint",
    "Near-far arrangement",
    "Unknown position"
   ],
   "formula": "From the observer's viewpoint, identify the object directly farther away as behind",
   "formulas": [
    "From the observer's viewpoint, identify the object directly farther away as behind",
    "From the observer's viewpoint, identify the object directly farther away as in front",
    "Use the objects' heights to decide front and behind"
   ],
   "answer": "behind",
   "explanation": "The cake stand is directly beyond the bowl from your viewpoint, so it is behind the bowl.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "1S3",
   "topic": "Between position",
   "prompt": "You face a bakery counter. Three items stand in one row. From your left to your right, they are a loaf, a cake and a pie. Where is the cake in relation to the loaf and the pie?",
   "parts": [
    "Your view facing the counter",
    "Loaf, cake, pie from left to right",
    "Cake relative to the other two"
   ],
   "labels": [
    "Observer viewpoint",
    "Given row",
    "Unknown position"
   ],
   "formula": "Identify the middle item in the row as between the two end items",
   "formulas": [
    "Identify the middle item in the row as between the two end items",
    "Identify the leftmost item in the row",
    "Identify the rightmost item in the row"
   ],
   "answer": "between the loaf and the pie",
   "explanation": "The cake is in the middle, with the loaf on one side and the pie on the other.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  }
 ],
 "P2": [
  {
   "unit": "2N1",
   "topic": "Place value in 3-digit numbers",
   "prompt": "A bakery packs 372 biscuits into full boxes of 100, then full bags of 10, leaving loose biscuits.",
   "parts": [
    "How many full boxes are packed?",
    "How many full bags are packed after the boxes?",
    "How many biscuits remain loose?"
   ],
   "labels": [
    "Boxes",
    "Bags",
    "Loose biscuits"
   ],
   "formula": "Read the hundreds, tens and ones digits of 372.",
   "formulas": [
    "Read the hundreds, tens and ones digits of 372.",
    "Read the digits in reverse order.",
    "Add all three digits for each answer."
   ],
   "answer": "a) 3; b) 7; c) 2",
   "explanation": "372 is 3 hundreds, 7 tens and 2 ones.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N1",
   "topic": "Building 3-digit numbers",
   "prompt": "Each full carton holds 100 cupcake cases and each full sleeve holds 10. Order A has 4 cartons and 6 loose cases. Order B has 4 cartons and 6 sleeves. Order C has 6 cartons and 4 loose cases.",
   "parts": [
    "How many cases are in Order A?",
    "How many cases are in Order B?",
    "How many cases are in Order C?"
   ],
   "labels": [
    "Order A",
    "Order B",
    "Order C"
   ],
   "formula": "Number of cases = cartons × 100 + sleeves × 10 + loose cases.",
   "formulas": [
    "Number of cases = cartons × 100 + sleeves × 10 + loose cases.",
    "Number of cases = cartons × 10 + sleeves × 100 + loose cases.",
    "Number of cases = cartons + sleeves + loose cases."
   ],
   "answer": "a) 406; b) 460; c) 604",
   "explanation": "Use zero for an empty place: 400 + 6, 400 + 60 and 600 + 4.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N1",
   "topic": "Ordering 3-digit numbers",
   "prompt": "Three bakery branches made these numbers of bread rolls: Harbour 285, Hill 258, Market 528.",
   "parts": [
    "What is the smallest number made?",
    "What is the middle number when ordered from smallest to largest?",
    "What is the largest number made?"
   ],
   "labels": [
    "Smallest",
    "Middle",
    "Largest"
   ],
   "formula": "Compare hundreds first, then tens, then ones.",
   "formulas": [
    "Compare hundreds first, then tens, then ones.",
    "Compare only the ones digits.",
    "Add each number's digits and order the sums."
   ],
   "answer": "a) 258; b) 285; c) 528",
   "explanation": "The correct order is 258 < 285 < 528.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N1",
   "topic": "Counting across place-value boundaries",
   "prompt": "Bakery order tickets use consecutive whole numbers, increasing by 1.",
   "parts": [
    "Which ticket comes immediately after 699?",
    "Which ticket comes immediately before 500?",
    "Which ticket is between 809 and 811?"
   ],
   "labels": [
    "Next ticket",
    "Previous ticket",
    "Between tickets"
   ],
   "formula": "Count forwards or backwards in steps of 1.",
   "formulas": [
    "Count forwards or backwards in steps of 1.",
    "Count forwards or backwards in steps of 10.",
    "Reverse the digits of each ticket number."
   ],
   "answer": "a) 700; b) 499; c) 810",
   "explanation": "Adding or subtracting 1 gives the neighbouring ticket number.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N2",
   "topic": "3-digit addition and subtraction",
   "prompt": "A bakery makes 236 rolls in the morning and 148 in the afternoon. It then sells 127 rolls. It wants to have 300 rolls left for an evening order.",
   "parts": [
    "How many rolls were made altogether?",
    "How many rolls remain after the sale?",
    "How many more rolls must be made for the evening order?"
   ],
   "labels": [
    "Total made",
    "Remaining",
    "Extra needed"
   ],
   "formula": "Total = 236 + 148; remaining = total − 127; extra = 300 − remaining.",
   "formulas": [
    "Total = 236 + 148; remaining = total − 127; extra = 300 − remaining.",
    "Total = 236 − 148; remaining = total + 127; extra = 300 + remaining.",
    "Total = 236 + 148; remaining = total + 127; extra = remaining − 300."
   ],
   "answer": "a) 384; b) 257; c) 43",
   "explanation": "236 + 148 = 384, 384 − 127 = 257, and 300 − 257 = 43.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N2",
   "topic": "Finding missing quantities",
   "prompt": "For three separate baking jobs: A needs 390 cherries and already has 245; B has 267 paper cases left after using 128; C starts with 480 raisins and has 315 left after decorating.",
   "parts": [
    "How many more cherries does A need?",
    "How many paper cases did B have at first?",
    "How many raisins did C use?"
   ],
   "labels": [
    "Missing cherries",
    "Starting cases",
    "Used raisins"
   ],
   "formula": "A = 390 − 245; B = 267 + 128; C = 480 − 315.",
   "formulas": [
    "A = 390 − 245; B = 267 + 128; C = 480 − 315.",
    "A = 390 + 245; B = 267 − 128; C = 480 + 315.",
    "A = 390 − 245; B = 267 − 128; C = 480 − 315."
   ],
   "answer": "a) 145; b) 395; c) 165",
   "explanation": "Subtract to find a shortage or amount used; add back the used cases to find the starting amount.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N2",
   "topic": "Comparing quantities",
   "prompt": "A bakery display contains 562 bread rolls, 387 buns and 245 tarts.",
   "parts": [
    "How many more rolls than buns are there?",
    "How many fewer tarts than buns are there?",
    "How many more rolls than tarts are there?"
   ],
   "labels": [
    "Roll–bun difference",
    "Bun–tart difference",
    "Roll–tart difference"
   ],
   "formula": "For each comparison, subtract the smaller quantity from the larger quantity.",
   "formulas": [
    "For each comparison, subtract the smaller quantity from the larger quantity.",
    "For each comparison, add the two quantities.",
    "For each comparison, use only the difference between the ones digits."
   ],
   "answer": "a) 175; b) 142; c) 317",
   "explanation": "562 − 387 = 175, 387 − 245 = 142, and 562 − 245 = 317.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N2",
   "topic": "Adding and subtracting several quantities",
   "prompt": "A kitchen has 680 raisins. Three batches of buns need 124, 235 and 118 raisins respectively.",
   "parts": [
    "How many raisins do all three batches need?",
    "How many raisins remain after making only the first two batches?",
    "How many raisins remain after making all three batches?"
   ],
   "labels": [
    "Total needed",
    "After two batches",
    "After three batches"
   ],
   "formula": "Needed = 124 + 235 + 118; after two = 680 − 124 − 235; after three = 680 − needed.",
   "formulas": [
    "Needed = 124 + 235 + 118; after two = 680 − 124 − 235; after three = 680 − needed.",
    "Needed = 124 + 235 + 118; after two = 680 − 124 + 235; after three = 680 + needed.",
    "Needed = 124 + 235 − 118; after two = 680 + 124 + 235; after three = 680 − needed."
   ],
   "answer": "a) 477; b) 321; c) 203",
   "explanation": "The batches need 477 raisins altogether; subtract the quantities used from 680.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N3",
   "topic": "Multiplication as equal groups",
   "prompt": "A baker fills 6 trays with 4 buns on each tray. For the next order, the baker fills 7 trays with 4 buns on each tray.",
   "parts": [
    "How many buns are in the first order?",
    "How many buns are in the next order?",
    "How many buns does the extra tray add?"
   ],
   "labels": [
    "First order",
    "Next order",
    "Extra tray"
   ],
   "formula": "First = 6 × 4; next = 7 × 4; extra = 1 × 4.",
   "formulas": [
    "First = 6 × 4; next = 7 × 4; extra = 1 × 4.",
    "First = 6 + 4; next = 7 + 4; extra = 7 − 6.",
    "First = 6 × 4; next = 7 × 4; extra = 7 + 6."
   ],
   "answer": "a) 24; b) 28; c) 4",
   "explanation": "Each tray is one group of 4 buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N3",
   "topic": "Multiplication in recipes",
   "prompt": "One small cake needs 3 cherries, 2 biscuit sticks and 5 chocolate buttons. A baker makes 8 identical cakes.",
   "parts": [
    "How many cherries are needed?",
    "How many biscuit sticks are needed?",
    "How many chocolate buttons are needed?"
   ],
   "labels": [
    "Cherries",
    "Biscuit sticks",
    "Chocolate buttons"
   ],
   "formula": "Multiply each amount for one cake by 8.",
   "formulas": [
    "Multiply each amount for one cake by 8.",
    "Add 8 to each amount for one cake.",
    "Subtract each amount for one cake from 8."
   ],
   "answer": "a) 24; b) 16; c) 40",
   "explanation": "8 × 3 = 24, 8 × 2 = 16, and 8 × 5 = 40.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N3",
   "topic": "Multiplication arrays",
   "prompt": "A rectangular baking tray holds 5 rows of cookies with 6 cookies in every row. One whole row is removed. Then one cookie is removed from each of the 4 remaining rows.",
   "parts": [
    "How many cookies were on the full tray?",
    "How many remain after removing one whole row?",
    "How many remain after both removals?"
   ],
   "labels": [
    "Full array",
    "Four rows",
    "Smaller array"
   ],
   "formula": "Full = 5 × 6; four rows = 4 × 6; smaller array = 4 × 5.",
   "formulas": [
    "Full = 5 × 6; four rows = 4 × 6; smaller array = 4 × 5.",
    "Full = 5 + 6; four rows = 4 + 6; smaller array = 4 + 5.",
    "Full = 5 × 6; four rows = 5 × 5; smaller array = 5 × 4."
   ],
   "answer": "a) 30; b) 24; c) 20",
   "explanation": "Multiply rows by cookies per row at each stage.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N3",
   "topic": "Finding missing multiplication factors",
   "prompt": "A baker records three equal-group arrangements: 7 boxes hold 35 muffins altogether; some trays holding 6 buns each hold 48 buns altogether; 9 identical cakes use 27 strawberries altogether.",
   "parts": [
    "How many muffins are in each box?",
    "How many trays are used?",
    "How many strawberries are on each cake?"
   ],
   "labels": [
    "Muffins per box",
    "Number of trays",
    "Strawberries per cake"
   ],
   "formula": "Complete the multiplication facts: 7 × ? = 35; ? × 6 = 48; 9 × ? = 27.",
   "formulas": [
    "Complete the multiplication facts: 7 × ? = 35; ? × 6 = 48; 9 × ? = 27.",
    "Find the missing amounts using 35 − 7, 48 − 6 and 27 − 9.",
    "Find the missing amounts using 35 + 7, 48 + 6 and 27 + 9."
   ],
   "answer": "a) 5; b) 8; c) 3",
   "explanation": "7 × 5 = 35, 8 × 6 = 48, and 9 × 3 = 27.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N4",
   "topic": "Place value in 4-digit numbers",
   "prompt": "A bakery warehouse has 4608 paper cake cases.",
   "parts": [
    "What is the value of the digit 4?",
    "What is the value of the digit 6?",
    "What is the value of the digit 8?"
   ],
   "labels": [
    "Thousands value",
    "Hundreds value",
    "Ones value"
   ],
   "formula": "Multiply each digit by the value of its place.",
   "formulas": [
    "Multiply each digit by the value of its place.",
    "Give each digit its face value only.",
    "Treat the leftmost digit as ones and count places from left to right."
   ],
   "answer": "a) 4000; b) 600; c) 8",
   "explanation": "4 is in the thousands place, 6 in the hundreds place and 8 in the ones place.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N4",
   "topic": "Composing 4-digit numbers",
   "prompt": "Cake cases come in cartons of 1000, boxes of 100 and sleeves of 10. Delivery A has 3 cartons, 2 boxes and 5 loose cases. Delivery B has 3 cartons and 5 sleeves. Delivery C has 5 cartons, 3 boxes and 2 sleeves.",
   "parts": [
    "How many cases are in Delivery A?",
    "How many cases are in Delivery B?",
    "How many cases are in Delivery C?"
   ],
   "labels": [
    "Delivery A",
    "Delivery B",
    "Delivery C"
   ],
   "formula": "Cases = cartons × 1000 + boxes × 100 + sleeves × 10 + loose cases.",
   "formulas": [
    "Cases = cartons × 1000 + boxes × 100 + sleeves × 10 + loose cases.",
    "Cases = cartons × 100 + boxes × 10 + sleeves + loose cases.",
    "Cases = cartons + boxes + sleeves + loose cases."
   ],
   "answer": "a) 3205; b) 3050; c) 5320",
   "explanation": "Place each quantity in its correct place, using zeros for missing places.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N4",
   "topic": "Ordering 4-digit numbers",
   "prompt": "Three bakeries made 4075, 4507 and 4057 biscuits during a festival.",
   "parts": [
    "What is the smallest production number?",
    "What is the middle production number?",
    "What is the largest production number?"
   ],
   "labels": [
    "Smallest production",
    "Middle production",
    "Largest production"
   ],
   "formula": "Compare digits from the thousands place towards the ones place.",
   "formulas": [
    "Compare digits from the thousands place towards the ones place.",
    "Compare only the last two digits.",
    "Order the numbers by the sum of their digits."
   ],
   "answer": "a) 4057; b) 4075; c) 4507",
   "explanation": "All have 4 thousands; comparing the remaining places gives 4057 < 4075 < 4507.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N4",
   "topic": "4-digit number sequences",
   "prompt": "A bakery labels delivery boxes with consecutive whole-number codes.",
   "parts": [
    "What code comes immediately after 2999?",
    "What code comes immediately before 6000?",
    "What code lies between 7089 and 7091?"
   ],
   "labels": [
    "Following code",
    "Preceding code",
    "Missing code"
   ],
   "formula": "Use steps of 1, carrying or exchanging across place-value boundaries when needed.",
   "formulas": [
    "Use steps of 1, carrying or exchanging across place-value boundaries when needed.",
    "Use steps of 10 for every neighbouring code.",
    "Change only the last digit and never change another place."
   ],
   "answer": "a) 3000; b) 5999; c) 7090",
   "explanation": "The neighbouring codes differ by exactly 1.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N5",
   "topic": "4-digit stock calculations",
   "prompt": "A bakery has 2458 paper bags. A delivery adds 1765 bags. The bakery then uses 1386 bags.",
   "parts": [
    "How many bags are there after the delivery?",
    "How many remain after use?",
    "How many more bags are needed to bring the remaining stock to 4000?"
   ],
   "labels": [
    "Delivered stock",
    "Remaining stock",
    "Restock amount"
   ],
   "formula": "Stock = 2458 + 1765; remaining = stock − 1386; restock = 4000 − remaining.",
   "formulas": [
    "Stock = 2458 + 1765; remaining = stock − 1386; restock = 4000 − remaining.",
    "Stock = 2458 − 1765; remaining = stock + 1386; restock = 4000 + remaining.",
    "Stock = 2458 + 1765; remaining = stock + 1386; restock = remaining − 4000."
   ],
   "answer": "a) 4223; b) 2837; c) 1163",
   "explanation": "Add the delivery, subtract bags used, then subtract the remaining stock from 4000.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N5",
   "topic": "Missing 4-digit quantities",
   "prompt": "A bakery checks three separate records. A: a delivery raises its cake-case stock from 2785 to 5000. B: after using 1648 bags, 2357 remain. C: an order for 6000 biscuits has 3875 finished.",
   "parts": [
    "How many cake cases were delivered in A?",
    "How many bags were there at first in B?",
    "How many biscuits still need making in C?"
   ],
   "labels": [
    "Delivery size",
    "Original bag stock",
    "Unfinished biscuits"
   ],
   "formula": "A = 5000 − 2785; B = 2357 + 1648; C = 6000 − 3875.",
   "formulas": [
    "A = 5000 − 2785; B = 2357 + 1648; C = 6000 − 3875.",
    "A = 5000 + 2785; B = 2357 − 1648; C = 6000 + 3875.",
    "A = 5000 − 2785; B = 2357 − 1648; C = 6000 − 3875."
   ],
   "answer": "a) 2215; b) 4005; c) 2125",
   "explanation": "Find increases and unfinished amounts by subtraction; recover original stock by addition.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N5",
   "topic": "Comparing 4-digit totals",
   "prompt": "During a fair, a bakery sells 5032 rolls, 2786 buns and 1968 tarts.",
   "parts": [
    "How many more rolls than buns are sold?",
    "How many more buns than tarts are sold?",
    "How many buns and tarts are sold altogether?"
   ],
   "labels": [
    "Roll–bun difference",
    "Bun–tart difference",
    "Combined buns and tarts"
   ],
   "formula": "First difference = 5032 − 2786; second difference = 2786 − 1968; combined = 2786 + 1968.",
   "formulas": [
    "First difference = 5032 − 2786; second difference = 2786 − 1968; combined = 2786 + 1968.",
    "First difference = 5032 + 2786; second difference = 2786 + 1968; combined = 2786 − 1968.",
    "First difference = 5032 − 1968; second difference = 2786 − 1968; combined = 5032 + 1968."
   ],
   "answer": "a) 2246; b) 818; c) 4754",
   "explanation": "Subtract for each difference and add for the combined total.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N5",
   "topic": "Several 4-digit quantities",
   "prompt": "A bakery has 8000 cupcake cases. Three festival orders use 1250, 2375 and 1860 cases.",
   "parts": [
    "How many cases do the first two orders use?",
    "How many cases do all three orders use?",
    "How many cases remain after all three orders?"
   ],
   "labels": [
    "First two orders",
    "All orders",
    "Cases remaining"
   ],
   "formula": "First two = 1250 + 2375; all = first two + 1860; remaining = 8000 − all.",
   "formulas": [
    "First two = 1250 + 2375; all = first two + 1860; remaining = 8000 − all.",
    "First two = 2375 − 1250; all = first two + 1860; remaining = 8000 + all.",
    "First two = 1250 + 2375; all = first two − 1860; remaining = 8000 − all."
   ],
   "answer": "a) 3625; b) 5485; c) 2515",
   "explanation": "3625 + 1860 = 5485 cases used, leaving 8000 − 5485 = 2515.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N6",
   "topic": "Division as equal sharing",
   "prompt": "A baker shares 24 cookies equally among 6 plates. Separately, 35 cherries are shared equally among 5 cakes, and 18 strawberries equally among 3 bowls.",
   "parts": [
    "How many cookies go on each plate?",
    "How many cherries go on each cake?",
    "How many strawberries go in each bowl?"
   ],
   "labels": [
    "Cookies per plate",
    "Cherries per cake",
    "Strawberries per bowl"
   ],
   "formula": "Amount in each group = total amount ÷ number of equal groups.",
   "formulas": [
    "Amount in each group = total amount ÷ number of equal groups.",
    "Amount in each group = total amount − number of groups.",
    "Amount in each group = total amount + number of groups."
   ],
   "answer": "a) 4; b) 7; c) 6",
   "explanation": "24 ÷ 6 = 4, 35 ÷ 5 = 7, and 18 ÷ 3 = 6.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N6",
   "topic": "Division as grouping",
   "prompt": "A baker packs 32 buns with 4 in each bag, 54 tarts with 6 in each box, and 21 muffins with 7 on each tray. Nothing is left over.",
   "parts": [
    "How many bags are needed?",
    "How many boxes are needed?",
    "How many trays are needed?"
   ],
   "labels": [
    "Bags needed",
    "Boxes needed",
    "Trays needed"
   ],
   "formula": "Number of groups = total items ÷ items in each group.",
   "formulas": [
    "Number of groups = total items ÷ items in each group.",
    "Number of groups = total items − items in each group.",
    "Number of groups = total items + items in each group."
   ],
   "answer": "a) 8; b) 9; c) 3",
   "explanation": "32 ÷ 4 = 8, 54 ÷ 6 = 9, and 21 ÷ 7 = 3.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N6",
   "topic": "Using division to plan batches",
   "prompt": "A recipe uses 8 cherries for one cake. A baker has 48 cherries and uses all of them. The finished cakes are packed equally into 2 boxes.",
   "parts": [
    "How many cakes can be made?",
    "How many cakes go in each box?",
    "How many cherries are used for the cakes in each box?"
   ],
   "labels": [
    "Cakes made",
    "Cakes per box",
    "Cherries per box"
   ],
   "formula": "Cakes = 48 ÷ 8; cakes per box = cakes ÷ 2; cherries per box = 48 ÷ 2.",
   "formulas": [
    "Cakes = 48 ÷ 8; cakes per box = cakes ÷ 2; cherries per box = 48 ÷ 2.",
    "Cakes = 48 − 8; cakes per box = cakes − 2; cherries per box = 48 − 2.",
    "Cakes = 48 ÷ 8; cakes per box = cakes + 2; cherries per box = 48 − 8."
   ],
   "answer": "a) 6; b) 3; c) 24",
   "explanation": "48 cherries make 6 cakes; two equal boxes contain 3 cakes and 24 cherries each.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2N6",
   "topic": "Comparing equal-sharing plans",
   "prompt": "A baker has 36 biscuits. Plan A shares them equally among 4 boxes. Plan B shares the same 36 biscuits equally among 6 boxes.",
   "parts": [
    "How many biscuits are in each box under Plan A?",
    "How many biscuits are in each box under Plan B?",
    "How many more biscuits per box does Plan A give?"
   ],
   "labels": [
    "Plan A share",
    "Plan B share",
    "Share difference"
   ],
   "formula": "A = 36 ÷ 4; B = 36 ÷ 6; difference = A − B.",
   "formulas": [
    "A = 36 ÷ 4; B = 36 ÷ 6; difference = A − B.",
    "A = 36 − 4; B = 36 − 6; difference = A − B.",
    "A = 36 ÷ 4; B = 36 ÷ 6; difference = A + B."
   ],
   "answer": "a) 9; b) 6; c) 3",
   "explanation": "The shares are 9 and 6 biscuits, so Plan A gives 3 more per box.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M1",
   "topic": "Choosing length units",
   "prompt": "A baker chooses between centimetres and metres for three sensible measurements: a teaspoon is about 15 units long, a kitchen is about 6 units long, and a cookie is about 5 units wide.",
   "parts": [
    "Which unit suits the teaspoon?",
    "Which unit suits the kitchen?",
    "Which unit suits the cookie?"
   ],
   "labels": [
    "Teaspoon unit",
    "Kitchen unit",
    "Cookie unit"
   ],
   "formula": "Use centimetres for small objects and metres for room-sized lengths.",
   "formulas": [
    "Use centimetres for small objects and metres for room-sized lengths.",
    "Use metres for small objects and centimetres for room-sized lengths.",
    "Use metres for every measurement."
   ],
   "answer": "a) centimetres; b) metres; c) centimetres",
   "explanation": "A spoon and cookie are small; a kitchen is measured on a metre scale.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M1",
   "topic": "Measuring from ruler readings",
   "prompt": "Three straight kitchen tools lie along centimetre rulers. A spatula runs from the 3 cm mark to the 25 cm mark. A pastry brush runs from 5 cm to 19 cm. A dough scraper runs from 2 cm to 11 cm.",
   "parts": [
    "How long is the spatula?",
    "How long is the pastry brush?",
    "How long is the dough scraper?"
   ],
   "labels": [
    "Spatula length",
    "Brush length",
    "Scraper length"
   ],
   "formula": "Length = end reading − start reading.",
   "formulas": [
    "Length = end reading − start reading.",
    "Length = end reading + start reading.",
    "Length = end reading, regardless of the start reading."
   ],
   "answer": "a) 22 cm; b) 14 cm; c) 9 cm",
   "explanation": "Subtract the starting mark from the ending mark for each tool.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M1",
   "topic": "Comparing kitchen distances",
   "prompt": "From the bakery's packing table, the oven is 7 m away, the sink is 3 m away and the store cupboard is 9 m away.",
   "parts": [
    "Which object is nearest to the packing table?",
    "Which object is farthest from the packing table?",
    "How much farther away is the cupboard than the sink?"
   ],
   "labels": [
    "Nearest object",
    "Farthest object",
    "Distance difference"
   ],
   "formula": "Compare the distances; subtract 3 m from 9 m for the difference.",
   "formulas": [
    "Compare the distances; subtract 3 m from 9 m for the difference.",
    "Treat the largest distance as nearest; add 3 m and 9 m for the difference.",
    "Treat the smallest distance as farthest; subtract 7 m from 9 m for the difference."
   ],
   "answer": "a) sink; b) store cupboard; c) 6 m",
   "explanation": "3 m is the shortest distance and 9 m is the longest; their difference is 6 m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M1",
   "topic": "Metres and centimetres",
   "prompt": "A bakery has a 2 m ribbon for a cake box. It cuts off 75 cm, then another 50 cm. Use 1 m = 100 cm.",
   "parts": [
    "How long was the ribbon in centimetres at first?",
    "How much ribbon is cut off altogether?",
    "How much ribbon remains?"
   ],
   "labels": [
    "Original centimetres",
    "Total cut",
    "Ribbon remaining"
   ],
   "formula": "Original = 2 × 100 cm; cut = 75 cm + 50 cm; remaining = original − cut.",
   "formulas": [
    "Original = 2 × 100 cm; cut = 75 cm + 50 cm; remaining = original − cut.",
    "Original = 2 × 10 cm; cut = 75 cm + 50 cm; remaining = original + cut.",
    "Original = 2 × 100 cm; cut = 75 cm − 50 cm; remaining = original − cut."
   ],
   "answer": "a) 200 cm; b) 125 cm; c) 75 cm",
   "explanation": "2 m is 200 cm; 125 cm is removed, leaving 75 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M2",
   "topic": "Reading analogue clocks",
   "prompt": "Three bakery clocks show morning times. Clock A has its minute hand at 3 and its hour hand just past 8. Clock B has its minute hand at 6 and its hour hand halfway between 9 and 10. Clock C has its minute hand at 9 and its hour hand between 10 and 11, nearer 11.",
   "parts": [
    "Write Clock A's time digitally.",
    "Write Clock B's time digitally.",
    "Write Clock C's time digitally."
   ],
   "labels": [
    "Clock A time",
    "Clock B time",
    "Clock C time"
   ],
   "formula": "Count 5 minutes per clock number and read the hour already passed.",
   "formulas": [
    "Count 5 minutes per clock number and read the hour already passed.",
    "Use the minute-hand number as the number of minutes.",
    "Use the next hour whenever the hour hand is between two numbers."
   ],
   "answer": "a) 8:15 a.m.; b) 9:30 a.m.; c) 10:45 a.m.",
   "explanation": "Minute-hand positions 3, 6 and 9 mean 15, 30 and 45 minutes past the hour.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M2",
   "topic": "Understanding digital times",
   "prompt": "The bakery's morning schedule is: mix dough at 7:05 a.m., fill trays at 7:20 a.m., and start baking at 7:40 a.m.",
   "parts": [
    "How many minutes past 7 does mixing start?",
    "How many minutes past 7 does tray filling start?",
    "How many minutes past 7 does baking start?"
   ],
   "labels": [
    "Mixing minutes",
    "Filling minutes",
    "Baking minutes"
   ],
   "formula": "Read the two digits after the colon as minutes past the hour.",
   "formulas": [
    "Read the two digits after the colon as minutes past the hour.",
    "Read the digits before the colon as minutes.",
    "Multiply the digits after the colon by 5."
   ],
   "answer": "a) 5 minutes; b) 20 minutes; c) 40 minutes",
   "explanation": "In a digital time, the digits after the colon show minutes.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M2",
   "topic": "Short cooking durations",
   "prompt": "A baker starts mixing at 9:10 a.m. and finishes at 9:25 a.m. Baking starts immediately and finishes at 9:45 a.m.",
   "parts": [
    "How long does mixing take?",
    "How long does baking take?",
    "How long do mixing and baking take altogether?"
   ],
   "labels": [
    "Mixing duration",
    "Baking duration",
    "Total duration"
   ],
   "formula": "Mixing = 25 − 10 minutes; baking = 45 − 25 minutes; total = 45 − 10 minutes.",
   "formulas": [
    "Mixing = 25 − 10 minutes; baking = 45 − 25 minutes; total = 45 − 10 minutes.",
    "Mixing = 25 + 10 minutes; baking = 45 + 25 minutes; total = 45 + 10 minutes.",
    "Mixing = 25 − 10 minutes; baking = 45 − 10 minutes; total = 45 − 25 minutes."
   ],
   "answer": "a) 15 minutes; b) 20 minutes; c) 35 minutes",
   "explanation": "All events occur during the same hour, so subtract their minute readings.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M2",
   "topic": "Finding cooking start and finish times",
   "prompt": "Three separate kitchen jobs take place in the morning. A: biscuits enter the oven at 10:20 and bake for 15 minutes. B: buns must finish at 11:50 and bake for 20 minutes. C: icing starts at 8:05 and takes 10 minutes.",
   "parts": [
    "When do the biscuits finish?",
    "When must the buns enter the oven?",
    "When does icing finish?"
   ],
   "labels": [
    "Biscuit finish",
    "Bun start",
    "Icing finish"
   ],
   "formula": "Add duration to find a finish time; subtract duration from a finish time to find a start time.",
   "formulas": [
    "Add duration to find a finish time; subtract duration from a finish time to find a start time.",
    "Subtract duration for every answer.",
    "Add duration for every answer."
   ],
   "answer": "a) 10:35 a.m.; b) 11:30 a.m.; c) 8:15 a.m.",
   "explanation": "20 + 15 = 35, 50 − 20 = 30, and 5 + 10 = 15 minutes past the given hours.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M3",
   "topic": "Hong Kong banknote denominations",
   "prompt": "A bakery till contains a HK$20 note issued by HSBC, a HK$20 note issued by Bank of China (Hong Kong), and a HK$50 note issued by Standard Chartered Bank.",
   "parts": [
    "What is the value of the HSBC note?",
    "What is the value of the Bank of China (Hong Kong) note?",
    "What is the total value of all three notes?"
   ],
   "labels": [
    "First note value",
    "Second note value",
    "Total note value"
   ],
   "formula": "Use each printed denomination regardless of issuer; add the three values.",
   "formulas": [
    "Use each printed denomination regardless of issuer; add the three values.",
    "Count each banknote as HK$1 regardless of denomination.",
    "Use only the largest denomination as the total."
   ],
   "answer": "a) HK$20; b) HK$20; c) HK$90",
   "explanation": "Notes with the same denomination have the same value; 20 + 20 + 50 = 90.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M3",
   "topic": "Counting banknotes",
   "prompt": "A bakery's till has 3 HK$100 notes, 2 HK$50 notes and 4 HK$20 notes.",
   "parts": [
    "What is the value of the HK$100 notes?",
    "What is the combined value of the HK$50 and HK$20 notes?",
    "What is the value of all the notes?"
   ],
   "labels": [
    "Hundred-dollar subtotal",
    "Other-note subtotal",
    "Till total"
   ],
   "formula": "First = 100 + 100 + 100; other = 50 + 50 + 20 + 20 + 20 + 20; total = first + other.",
   "formulas": [
    "First = 100 + 100 + 100; other = 50 + 50 + 20 + 20 + 20 + 20; total = first + other.",
    "First = 100 + 3; other = 50 + 2 + 20 + 4; total = first + other.",
    "First = 100; other = 50 + 20; total = first + other."
   ],
   "answer": "a) HK$300; b) HK$180; c) HK$480",
   "explanation": "The subtotals are HK$300, HK$100 and HK$80, giving HK$480 altogether.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M3",
   "topic": "Paying and receiving change",
   "prompt": "At a bakery, a cake costs HK$68 and a loaf costs HK$24. A customer buys one of each and pays with one HK$100 note.",
   "parts": [
    "What is the total cost?",
    "How much change is due?",
    "If the customer buys only the cake with the same note, how much change is due?"
   ],
   "labels": [
    "Purchase total",
    "Two-item change",
    "Cake-only change"
   ],
   "formula": "Total = 68 + 24; two-item change = 100 − total; cake-only change = 100 − 68.",
   "formulas": [
    "Total = 68 + 24; two-item change = 100 − total; cake-only change = 100 − 68.",
    "Total = 68 − 24; two-item change = 100 + total; cake-only change = 100 + 68.",
    "Total = 68 + 24; two-item change = 100 − 68; cake-only change = 100 − total."
   ],
   "answer": "a) HK$92; b) HK$8; c) HK$32",
   "explanation": "The two items cost HK$92; subtract each purchase total from HK$100.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2M3",
   "topic": "Exchanging equal money values",
   "prompt": "A bakery cashier makes three separate exchanges without changing the total value: one HK$100 note into HK$20 notes; one HK$500 note into HK$100 notes; one HK$1000 note into HK$500 notes.",
   "parts": [
    "How many HK$20 notes are received?",
    "How many HK$100 notes are received?",
    "How many HK$500 notes are received?"
   ],
   "labels": [
    "Twenty-dollar notes",
    "Hundred-dollar notes",
    "Five-hundred-dollar notes"
   ],
   "formula": "Count equal-value notes until their sum equals the note being exchanged.",
   "formulas": [
    "Count equal-value notes until their sum equals the note being exchanged.",
    "Always exchange one note for one note regardless of denomination.",
    "Subtract the new denomination from the old denomination to find the number of notes."
   ],
   "answer": "a) 5; b) 5; c) 2",
   "explanation": "Five HK$20 notes make HK$100; five HK$100 notes make HK$500; two HK$500 notes make HK$1000.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S1",
   "topic": "Prisms and their faces",
   "prompt": "A closed cake box is a cube. A closed sandwich box is a triangular prism with 2 triangular faces and 3 rectangular faces.",
   "parts": [
    "How many flat faces does the cube have?",
    "What shape is each face of the cube?",
    "How many flat faces does the triangular prism have altogether?"
   ],
   "labels": [
    "Cube face count",
    "Cube face shape",
    "Prism face count"
   ],
   "formula": "Identify the cube's faces and count all flat faces of the triangular prism.",
   "formulas": [
    "Identify the cube's faces and count all flat faces of the triangular prism.",
    "Count corners instead of faces.",
    "Count only the bottom face of each box."
   ],
   "answer": "a) 6; b) square; c) 5",
   "explanation": "A cube has 6 square faces; the triangular prism has 2 + 3 = 5 flat faces.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S1",
   "topic": "Pyramid faces and bases",
   "prompt": "A solid chocolate decoration is a square-based pyramid: it has one square base and four triangular side faces meeting at a top point.",
   "parts": [
    "What shape is the base?",
    "How many triangular side faces are there?",
    "How many flat faces are there altogether?"
   ],
   "labels": [
    "Base shape",
    "Side-face count",
    "Total face count"
   ],
   "formula": "Identify the base and count the base together with all side faces.",
   "formulas": [
    "Identify the base and count the base together with all side faces.",
    "Ignore the base when counting all flat faces.",
    "Count the top point as an extra flat face."
   ],
   "answer": "a) square; b) 4; c) 5",
   "explanation": "The pyramid has one square base and four triangular side faces, making five flat faces.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S1",
   "topic": "Cylinder surfaces",
   "prompt": "A closed biscuit tin is an ideal cylinder with two flat circular ends and one curved surface.",
   "parts": [
    "How many flat faces does it have?",
    "What shape is each flat face?",
    "How many curved surfaces does it have?"
   ],
   "labels": [
    "Flat-face count",
    "Flat-face shape",
    "Curved-surface count"
   ],
   "formula": "Distinguish the cylinder's two flat ends from its curved surface.",
   "formulas": [
    "Distinguish the cylinder's two flat ends from its curved surface.",
    "Treat the curved surface as another circular flat face.",
    "Count only the top of the closed tin."
   ],
   "answer": "a) 2; b) circle; c) 1",
   "explanation": "A cylinder has two flat circular faces and one curved surface.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S1",
   "topic": "Cones and spheres",
   "prompt": "A solid sugar decoration is an ideal cone with a flat circular base. A chocolate ball is an ideal sphere.",
   "parts": [
    "How many flat faces does the cone have?",
    "How many curved surfaces does the cone have?",
    "How many flat faces does the sphere have?"
   ],
   "labels": [
    "Cone flat faces",
    "Cone curved surfaces",
    "Sphere flat faces"
   ],
   "formula": "Count flat faces separately from curved surfaces for each solid.",
   "formulas": [
    "Count flat faces separately from curved surfaces for each solid.",
    "Count the cone's tip as a flat face.",
    "Treat every curved surface as a flat face."
   ],
   "answer": "a) 1; b) 1; c) 0",
   "explanation": "A cone has one flat base and one curved surface; a sphere has no flat faces.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S2",
   "topic": "Recognising right angles",
   "prompt": "A baker examines three flat objects: a rectangular baking tray, a square napkin and a circular plate.",
   "parts": [
    "How many right-angle corners does the tray have?",
    "How many right-angle corners does the napkin have?",
    "How many angles does the circular plate's outline have?"
   ],
   "labels": [
    "Tray right angles",
    "Napkin right angles",
    "Plate angles"
   ],
   "formula": "Count square corners; a smooth circular outline has no angles.",
   "formulas": [
    "Count square corners; a smooth circular outline has no angles.",
    "Count every object as having four angles.",
    "Count the centre of each object as an angle."
   ],
   "answer": "a) 4; b) 4; c) 0",
   "explanation": "Rectangles and squares have four right angles; a circle has no corners.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S2",
   "topic": "Comparing angles with a right angle",
   "prompt": "Three pairs of straight biscuit sticks meet at a point. In A, one stick points right and one points up. In B, one points right and one slopes halfway between right and up. In C, one points right and one points up-left. Consider the smaller opening in each pair.",
   "parts": [
    "Is angle A smaller than, equal to or larger than a right angle?",
    "Is angle B smaller than, equal to or larger than a right angle?",
    "Is angle C smaller than, equal to or larger than a right angle?"
   ],
   "labels": [
    "Angle A comparison",
    "Angle B comparison",
    "Angle C comparison"
   ],
   "formula": "Compare each opening with the square corner formed by an upward and a rightward stick.",
   "formulas": [
    "Compare each opening with the square corner formed by an upward and a rightward stick.",
    "Compare only the lengths of the sticks.",
    "Treat all pairs of meeting sticks as right angles."
   ],
   "answer": "a) equal to a right angle; b) smaller than a right angle; c) larger than a right angle",
   "explanation": "A forms a square corner; B opens less and C opens more.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S2",
   "topic": "Angle size and arm length",
   "prompt": "A baker makes three icing marks. Each has one straight arm pointing right and one pointing up from the same point. Mark A has two 2 cm arms, B has two 5 cm arms, and C has a 2 cm arm and a 5 cm arm.",
   "parts": [
    "What kind of angle is Mark A?",
    "Is B's angle smaller than, equal to or larger than A's?",
    "Is C's angle smaller than, equal to or larger than A's?"
   ],
   "labels": [
    "Angle type",
    "Long-arm comparison",
    "Unequal-arm comparison"
   ],
   "formula": "Compare the opening between the arms, not their lengths.",
   "formulas": [
    "Compare the opening between the arms, not their lengths.",
    "Treat longer arms as making a larger angle.",
    "Treat unequal arm lengths as making a smaller angle."
   ],
   "answer": "a) right angle; b) equal to A's; c) equal to A's",
   "explanation": "All three openings are right angles; changing arm lengths does not change angle size.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S2",
   "topic": "Ordering angle openings",
   "prompt": "Three pairs of straight cake-decorating sticks meet at a point. Pair A forms a right angle. Pair B has a smaller opening than A. Pair C has a larger opening than A. Compare these stated openings.",
   "parts": [
    "Which pair has the smallest angle?",
    "Which pair has the largest angle?",
    "Which pair has the middle-sized angle?"
   ],
   "labels": [
    "Smallest angle",
    "Largest angle",
    "Middle angle"
   ],
   "formula": "Order the openings using B < A < C.",
   "formulas": [
    "Order the openings using B < A < C.",
    "Order the openings using A < B < C.",
    "Order the openings using C < A < B."
   ],
   "answer": "a) Pair B; b) Pair C; c) Pair A",
   "explanation": "B is smaller than the right angle A, while C is larger than A.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S3",
   "topic": "Four cardinal directions",
   "prompt": "On a bakery floor plan, north is up. The oven is directly above the mixing table, the sink directly to its right, the fridge directly below it and the shelves directly to its left.",
   "parts": [
    "In which direction is the oven from the mixing table?",
    "In which direction is the sink from the mixing table?",
    "In which direction are the shelves from the mixing table?"
   ],
   "labels": [
    "Oven direction",
    "Sink direction",
    "Shelf direction"
   ],
   "formula": "With north up, right is east, down is south and left is west.",
   "formulas": [
    "With north up, right is east, down is south and left is west.",
    "With north up, right is west and left is east.",
    "With north up, down is north and up is south."
   ],
   "answer": "a) north; b) east; c) west",
   "explanation": "Translate the stated positions using the four compass directions.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S3",
   "topic": "Opposite directions",
   "prompt": "A bakery's flour store is directly east of its kitchen. Its loading bay is directly south of its kitchen. Its cake counter is directly west of its kitchen.",
   "parts": [
    "In which direction is the kitchen from the flour store?",
    "In which direction is the kitchen from the loading bay?",
    "In which direction is the kitchen from the cake counter?"
   ],
   "labels": [
    "Return from flour store",
    "Return from loading bay",
    "Return from counter"
   ],
   "formula": "Reverse each direction: east and west are opposites; north and south are opposites.",
   "formulas": [
    "Reverse each direction: east and west are opposites; north and south are opposites.",
    "Keep the original direction when reversing the journey.",
    "Replace east with north, south with east and west with south."
   ],
   "answer": "a) west; b) north; c) east",
   "explanation": "Looking back from the destination reverses the stated direction.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S3",
   "topic": "Direction and facing",
   "prompt": "A baker stands at a workbench facing north. The oven is directly on the baker's right, the sink directly on the baker's left and the fridge directly behind the baker.",
   "parts": [
    "In which direction is the oven?",
    "In which direction is the sink?",
    "In which direction is the fridge?"
   ],
   "labels": [
    "Right-hand object",
    "Left-hand object",
    "Object behind"
   ],
   "formula": "When facing north, right is east, left is west and behind is south.",
   "formulas": [
    "When facing north, right is east, left is west and behind is south.",
    "When facing north, right is west, left is east and behind is south.",
    "When facing north, right is south, left is north and behind is east."
   ],
   "answer": "a) east; b) west; c) south",
   "explanation": "Use the baker's stated north-facing position to identify the other directions.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S3",
   "topic": "Directions along a delivery route",
   "prompt": "A bread cart starts at the packing room. It travels 4 m east to a doorway, then 3 m north to a counter, then 4 m west to a cupboard.",
   "parts": [
    "In which direction is the doorway from the packing room?",
    "In which direction is the counter from the doorway?",
    "In which direction is the cupboard from the packing room?"
   ],
   "labels": [
    "First leg",
    "Second leg",
    "Final relative direction"
   ],
   "formula": "Follow the stated directions; equal eastward and westward distances cancel.",
   "formulas": [
    "Follow the stated directions; equal eastward and westward distances cancel.",
    "Use the final travel direction as the direction from the starting point.",
    "Treat eastward and westward travel as movement in the same direction."
   ],
   "answer": "a) east; b) north; c) north",
   "explanation": "The 4 m east and 4 m west movements cancel, leaving the cupboard 3 m north of the start.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S4",
   "topic": "Recognising quadrilaterals",
   "prompt": "Three flat pastry-cutter outlines are described. A is a closed shape with exactly 4 straight sides. B is a closed shape with exactly 3 straight sides. C is a closed shape with 3 straight sides and 1 curved side.",
   "parts": [
    "Which outline is a quadrilateral?",
    "How many straight sides does that quadrilateral have?",
    "How many corners does that quadrilateral have?"
   ],
   "labels": [
    "Quadrilateral choice",
    "Straight-side count",
    "Corner count"
   ],
   "formula": "A quadrilateral is a closed shape with four straight sides and four corners.",
   "formulas": [
    "A quadrilateral is a closed shape with four straight sides and four corners.",
    "Any closed shape with four boundary pieces is a quadrilateral, even with a curved piece.",
    "A quadrilateral is a closed shape with three straight sides."
   ],
   "answer": "a) A; b) 4; c) 4",
   "explanation": "Only A has exactly four straight sides forming a closed outline.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S4",
   "topic": "Squares and rectangles",
   "prompt": "Biscuit A is a flat quadrilateral with four equal straight sides and four right angles. Biscuit B is a flat quadrilateral with four right angles, two sides of 8 cm and two sides of 5 cm.",
   "parts": [
    "What is the most specific shape name for Biscuit A?",
    "What is the shape name for Biscuit B?",
    "How many straight sides do the two biscuits have altogether?"
   ],
   "labels": [
    "Equal-sided biscuit",
    "Unequal-sided biscuit",
    "Combined side count"
   ],
   "formula": "Identify shapes using side lengths and right angles; count four sides for each.",
   "formulas": [
    "Identify shapes using side lengths and right angles; count four sides for each.",
    "Call every four-sided biscuit a square regardless of side lengths.",
    "Identify shapes using only their sizes and ignore their corners."
   ],
   "answer": "a) square; b) rectangle; c) 8",
   "explanation": "Four equal sides and four right angles give a square; B is a non-square rectangle. Each has four sides.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S4",
   "topic": "Straight and curved paths",
   "prompt": "On a flat cake board, two icing dots are joined by three paths. Path A is the straight line segment and is 12 cm long. Path B is a curved path 16 cm long. Path C is a curved path 19 cm long.",
   "parts": [
    "Which path is shortest?",
    "How much longer is Path B than Path A?",
    "How much longer is Path C than Path A?"
   ],
   "labels": [
    "Shortest path",
    "First extra length",
    "Second extra length"
   ],
   "formula": "The line segment is the shortest path between the dots; subtract 12 cm from each curved length.",
   "formulas": [
    "The line segment is the shortest path between the dots; subtract 12 cm from each curved length.",
    "Choose the most curved path as shortest; add 12 cm to each curved length.",
    "Choose the longest listed path as shortest; subtract 16 cm from 19 cm for both differences."
   ],
   "answer": "a) Path A; b) 4 cm; c) 7 cm",
   "explanation": "The straight segment is shortest; 16 − 12 = 4 and 19 − 12 = 7.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2S4",
   "topic": "Completing a quadrilateral outline",
   "prompt": "A baker pipes three straight sides of a rectangular icing frame: 8 cm right, then 5 cm down, then 8 cm left. The frame is still open.",
   "parts": [
    "In which direction must the final straight side go to close the rectangle?",
    "How long must that final side be?",
    "How many straight sides will the completed frame have?"
   ],
   "labels": [
    "Closing direction",
    "Closing length",
    "Completed side count"
   ],
   "formula": "Join the two open ends with a straight side equal to the opposite 5 cm side.",
   "formulas": [
    "Join the two open ends with a straight side equal to the opposite 5 cm side.",
    "Add another 8 cm side to the right.",
    "Join the open ends with a curved line and count it as a straight side."
   ],
   "answer": "a) up; b) 5 cm; c) 4",
   "explanation": "The final side goes 5 cm up to the starting point, completing four straight sides.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2D1",
   "topic": "Reading a pictogram",
   "prompt": "A bakery records cakes sold. Pictogram table: Chocolate | ● ● ● ● ●; Lemon | ● ● ●; Carrot | ● ● ● ●. Key: each ● represents 1 cake.",
   "parts": [
    "How many chocolate cakes were sold?",
    "How many cakes were sold altogether?",
    "How many more chocolate cakes than lemon cakes were sold?"
   ],
   "labels": [
    "Chocolate count",
    "Total sales",
    "Sales difference"
   ],
   "formula": "Count one cake per symbol; add counts for the total and subtract counts for the difference.",
   "formulas": [
    "Count one cake per symbol; add counts for the total and subtract counts for the difference.",
    "Count each symbol as two cakes.",
    "Count only the category names instead of the symbols."
   ],
   "answer": "a) 5; b) 12; c) 2",
   "explanation": "The counts are 5, 3 and 4; their total is 12 and 5 − 3 = 2.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2D1",
   "topic": "Comparing pictogram categories",
   "prompt": "Children choose a cooking-club snack. Pictogram table: Bread roll | ● ● ● ●; Muffin | ● ● ● ● ● ●; Tart | ● ●. Key: each ● represents 1 child's choice. Each child chooses one snack.",
   "parts": [
    "Which snack is chosen most often?",
    "Which snack is chosen least often?",
    "How many children choose either a bread roll or a tart?"
   ],
   "labels": [
    "Most popular",
    "Least popular",
    "Combined choices"
   ],
   "formula": "Compare row symbol counts; add the bread-roll and tart counts.",
   "formulas": [
    "Compare row symbol counts; add the bread-roll and tart counts.",
    "Choose the first row as most popular and the last row as least popular without counting.",
    "Compare the lengths of the snack names instead of counting symbols."
   ],
   "answer": "a) Muffin; b) Tart; c) 6",
   "explanation": "Muffin has 6 choices, tart has 2, and bread roll plus tart gives 4 + 2 = 6.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2D1",
   "topic": "Constructing a pictogram from a table",
   "prompt": "A kitchen records trays baked. Table: Monday | 3 trays; Tuesday | 5 trays; Wednesday | 4 trays. A new pictogram will use one square symbol for each tray.",
   "parts": [
    "How many symbols belong in Monday's row?",
    "How many more symbols belong in Tuesday's row than Monday's?",
    "How many symbols will the whole pictogram contain?"
   ],
   "labels": [
    "Monday symbols",
    "Extra Tuesday symbols",
    "Total symbols"
   ],
   "formula": "Use one symbol per tray; subtract for the row difference and add for the total.",
   "formulas": [
    "Use one symbol per tray; subtract for the row difference and add for the total.",
    "Use one symbol for each day regardless of trays baked.",
    "Use two symbols per tray and double every count."
   ],
   "answer": "a) 3; b) 2; c) 12",
   "explanation": "Monday needs 3 symbols, Tuesday needs 2 more, and 3 + 5 + 4 = 12 symbols are needed.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "2D1",
   "topic": "Organising and updating data",
   "prompt": "A bakery organises unsorted order slips into this table: Bun | 4 orders; Tart | 2 orders; Muffin | 3 orders. A pictogram uses one ● per order. Two new tart orders then arrive; no other orders change.",
   "parts": [
    "How many tart orders are there after the update?",
    "How many symbols must be added to the tart row?",
    "How many orders are there altogether after the update?"
   ],
   "labels": [
    "Updated tart count",
    "Added symbols",
    "Updated total"
   ],
   "formula": "New tart count = 2 + 2; added symbols = 2; new total = 4 + new tart count + 3.",
   "formulas": [
    "New tart count = 2 + 2; added symbols = 2; new total = 4 + new tart count + 3.",
    "New tart count = 2 − 2; added symbols = 0; new total = 4 + new tart count + 3.",
    "New tart count = 2 + 2; added symbols = 4; new total = 4 + 2 + 3."
   ],
   "answer": "a) 4; b) 2; c) 11",
   "explanation": "Only the tart category changes: it rises from 2 to 4, and the total rises from 9 to 11.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  }
 ],
 "P3": [
  {
   "unit": "3N1",
   "topic": "Place value in 5-digit numbers",
   "prompt": "A bakery's stock record shows 34726 paper cases. What is the value of the digit 4?",
   "parts": [
    "Stock number: 34726",
    "Digit to examine: 4",
    "Find this digit's value."
   ],
   "labels": [
    "Recorded number",
    "Target digit",
    "Place value"
   ],
   "formula": "4 × 1000",
   "formulas": [
    "4 × 1000",
    "4 × 100",
    "4 × 10000"
   ],
   "answer": "4000",
   "explanation": "The digit 4 is in the thousands place, so its value is 4000.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N1",
   "topic": "Composing a 5-digit number",
   "prompt": "A bakery records its total number of cake decorations as 5 ten-thousands, 2 thousands, 3 hundreds, 0 tens and 8 ones. Write the total.",
   "parts": [
    "5 ten-thousands and 2 thousands",
    "3 hundreds, 0 tens and 8 ones",
    "Write the whole number."
   ],
   "labels": [
    "Larger place values",
    "Smaller place values",
    "Composed number"
   ],
   "formula": "50000 + 2000 + 300 + 8",
   "formulas": [
    "50000 + 2000 + 300 + 8",
    "50000 + 2000 + 30 + 8",
    "50000 + 200 + 3000 + 8"
   ],
   "answer": "52308",
   "explanation": "Adding the place values gives 52308.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N1",
   "topic": "Comparing 5-digit numbers",
   "prompt": "Three bakery branches made 58019, 58109 and 57999 buns last month. What was the greatest number made by one branch?",
   "parts": [
    "Branch totals: 58019, 58109, 57999",
    "Compare from the highest place value.",
    "Find the greatest total."
   ],
   "labels": [
    "Numbers to compare",
    "Comparison method",
    "Greatest number"
   ],
   "formula": "Compare digits from left to right and select the greatest number",
   "formulas": [
    "Compare digits from left to right and select the greatest number",
    "Select the number with the greatest ones digit",
    "Select the smallest number"
   ],
   "answer": "58109",
   "explanation": "58109 exceeds 58019 in the hundreds place and exceeds 57999 in the thousands place.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N1",
   "topic": "Counting backwards in tens",
   "prompt": "A bakery has 40003 cake labels. It uses 10 labels. How many labels remain?",
   "parts": [
    "Starting stock: 40003 labels",
    "Labels used: 10",
    "Find the remaining stock."
   ],
   "labels": [
    "Starting number",
    "Decrease",
    "Resulting number"
   ],
   "formula": "40003 − 10",
   "formulas": [
    "40003 − 10",
    "40003 + 10",
    "40003 − 100"
   ],
   "answer": "39993",
   "explanation": "Counting back one ten from 40003 gives 39993.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N2",
   "topic": "Multiplying to find a total quantity",
   "prompt": "A bakery packs 126 biscuits into each carton. How many biscuits are in 3 full cartons?",
   "parts": [
    "126 biscuits per carton",
    "3 full cartons",
    "Find the total biscuits."
   ],
   "labels": [
    "Quantity per group",
    "Number of groups",
    "Total quantity"
   ],
   "formula": "126 × 3",
   "formulas": [
    "126 × 3",
    "126 + 3",
    "126 ÷ 3"
   ],
   "answer": "378",
   "explanation": "Three groups of 126 biscuits contain 378 biscuits.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N2",
   "topic": "Multiplying to find a cost",
   "prompt": "One box of egg tarts costs HK$24. What is the cost of 4 boxes at the same price?",
   "parts": [
    "HK$24 per box",
    "4 boxes bought",
    "Find the total cost."
   ],
   "labels": [
    "Unit price",
    "Purchase quantity",
    "Total cost"
   ],
   "formula": "24 × 4",
   "formulas": [
    "24 × 4",
    "24 + 4",
    "24 − 4"
   ],
   "answer": "HK$96",
   "explanation": "Four boxes cost 24 × 4 = HK$96.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N2",
   "topic": "Multiplying to find a total length",
   "prompt": "Each cake box needs 35 cm of ribbon. How many centimetres of ribbon are needed for 6 boxes, with no extra ribbon?",
   "parts": [
    "35 cm for each box",
    "6 boxes to decorate",
    "Find the total ribbon length."
   ],
   "labels": [
    "Length per item",
    "Item count",
    "Combined length"
   ],
   "formula": "35 × 6",
   "formulas": [
    "35 × 6",
    "35 + 6",
    "35 − 6"
   ],
   "answer": "210 cm",
   "explanation": "Six lengths of 35 cm total 210 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N2",
   "topic": "Multiplicative comparison",
   "prompt": "Bakery A makes 124 rolls. Bakery B makes 3 times as many rolls as Bakery A. How many rolls does Bakery B make?",
   "parts": [
    "Bakery A: 124 rolls",
    "Bakery B: 3 times as many",
    "Find Bakery B's production."
   ],
   "labels": [
    "Reference quantity",
    "Multiplying factor",
    "Compared quantity"
   ],
   "formula": "124 × 3",
   "formulas": [
    "124 × 3",
    "124 + 3",
    "124 − 3"
   ],
   "answer": "372",
   "explanation": "Three times 124 is 372 rolls.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N3",
   "topic": "Division by equal sharing",
   "prompt": "A baker shares 84 cookies equally among 7 boxes. How many cookies go into each box?",
   "parts": [
    "84 cookies altogether",
    "7 equal boxes",
    "Find cookies per box."
   ],
   "labels": [
    "Total quantity",
    "Number of groups",
    "Quantity per group"
   ],
   "formula": "84 ÷ 7",
   "formulas": [
    "84 ÷ 7",
    "84 × 7",
    "84 − 7"
   ],
   "answer": "12",
   "explanation": "84 ÷ 7 = 12 cookies in each box.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N3",
   "topic": "Division by grouping",
   "prompt": "A bakery has 96 buns. Each tray holds exactly 6 buns. How many full trays are needed?",
   "parts": [
    "96 buns to arrange",
    "6 buns per tray",
    "Find the number of trays."
   ],
   "labels": [
    "Total items",
    "Group size",
    "Group count"
   ],
   "formula": "96 ÷ 6",
   "formulas": [
    "96 ÷ 6",
    "96 − 6",
    "96 × 6"
   ],
   "answer": "16",
   "explanation": "There are 16 groups of 6 in 96.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N3",
   "topic": "Dividing a 3-digit quantity",
   "prompt": "A chef divides 375 g of dough equally into 5 portions. What is the weight of each portion?",
   "parts": [
    "375 g of dough",
    "5 equal portions",
    "Find each portion's weight."
   ],
   "labels": [
    "Total weight",
    "Portion count",
    "Weight per portion"
   ],
   "formula": "375 ÷ 5",
   "formulas": [
    "375 ÷ 5",
    "375 − 5",
    "375 × 5"
   ],
   "answer": "75 g",
   "explanation": "375 ÷ 5 = 75 g per portion.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N3",
   "topic": "Remainders",
   "prompt": "A baker packs 53 muffins into boxes holding 6 muffins each. After filling as many boxes as possible, how many muffins are left unpacked?",
   "parts": [
    "53 muffins available",
    "6 muffins in each full box",
    "Find the unpacked remainder."
   ],
   "labels": [
    "Dividend",
    "Divisor",
    "Remainder"
   ],
   "formula": "Find the remainder of 53 ÷ 6",
   "formulas": [
    "Find the remainder of 53 ÷ 6",
    "Find the whole-number quotient of 53 ÷ 6",
    "Calculate 53 − 6"
   ],
   "answer": "5",
   "explanation": "Eight full boxes hold 48 muffins; 53 − 48 = 5 remain.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N4",
   "topic": "Multiplication before addition",
   "prompt": "A display already has 18 buns. A baker adds 6 trays with 7 buns on each tray. How many buns are now on the display?",
   "parts": [
    "18 buns already displayed",
    "6 trays of 7 buns added",
    "Find the new total."
   ],
   "labels": [
    "Initial quantity",
    "Grouped addition",
    "Final quantity"
   ],
   "formula": "18 + 6 × 7",
   "formulas": [
    "18 + 6 × 7",
    "18 × 6 + 7",
    "18 + 6 + 7"
   ],
   "answer": "60",
   "explanation": "The trays add 42 buns, so the total is 18 + 42 = 60.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N4",
   "topic": "Multiplication before subtraction",
   "prompt": "A customer pays with HK$100 for 9 pastries costing HK$8 each. How much change should the customer receive?",
   "parts": [
    "HK$100 paid",
    "9 pastries at HK$8 each",
    "Find the change."
   ],
   "labels": [
    "Payment",
    "Purchase cost",
    "Change"
   ],
   "formula": "100 − 9 × 8",
   "formulas": [
    "100 − 9 × 8",
    "100 − 9 − 8",
    "100 + 9 × 8"
   ],
   "answer": "HK$28",
   "explanation": "The pastries cost HK$72, leaving HK$28 change.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N4",
   "topic": "Division before addition",
   "prompt": "A chef shares 72 strawberries equally among 8 cakes. The chef then adds 15 blueberries to one of these cakes. How many berries are on that cake?",
   "parts": [
    "72 strawberries shared among 8 cakes",
    "15 blueberries added to one cake",
    "Find berries on that cake."
   ],
   "labels": [
    "Shared allocation",
    "Extra quantity",
    "Combined quantity"
   ],
   "formula": "72 ÷ 8 + 15",
   "formulas": [
    "72 ÷ 8 + 15",
    "72 − 8 + 15",
    "72 ÷ 8 × 15"
   ],
   "answer": "24",
   "explanation": "Each cake gets 9 strawberries; 9 + 15 = 24 berries.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N4",
   "topic": "Division and multiplication",
   "prompt": "A bakery places 84 buns equally on 7 trays. It sells all the buns on 3 of these trays. How many buns does it sell?",
   "parts": [
    "84 buns shared equally across 7 trays",
    "3 complete trays sold",
    "Find the buns sold."
   ],
   "labels": [
    "Equal distribution",
    "Selected groups",
    "Selected quantity"
   ],
   "formula": "84 ÷ 7 × 3",
   "formulas": [
    "84 ÷ 7 × 3",
    "84 ÷ 7 + 3",
    "84 − 7 × 3"
   ],
   "answer": "36",
   "explanation": "Each tray holds 12 buns, so 3 trays hold 36 buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N5",
   "topic": "A fraction of one whole",
   "prompt": "One cake is cut into 8 equal slices. A customer buys 3 slices. What fraction of the whole cake does the customer buy?",
   "parts": [
    "8 equal slices make one cake",
    "3 slices bought",
    "Write the fraction bought."
   ],
   "labels": [
    "Whole partition",
    "Selected parts",
    "Fraction"
   ],
   "formula": "Write selected parts over total equal parts: 3/8",
   "formulas": [
    "Write selected parts over total equal parts: 3/8",
    "Write total equal parts over selected parts: 8/3",
    "Write unselected parts over total equal parts: 5/8"
   ],
   "answer": "3/8",
   "explanation": "The customer buys 3 of the cake's 8 equal parts.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N5",
   "topic": "Meaning of the denominator",
   "prompt": "A whole pizza is cut into equal slices. One slice is 1/6 of the pizza. How many equal slices make the whole pizza?",
   "parts": [
    "One whole pizza",
    "Each slice is 1/6",
    "Find the total equal slices."
   ],
   "labels": [
    "Whole",
    "Unit fraction",
    "Denominator meaning"
   ],
   "formula": "Use the denominator of 1/6 as the number of equal parts",
   "formulas": [
    "Use the denominator of 1/6 as the number of equal parts",
    "Use the numerator of 1/6 as the number of equal parts",
    "Subtract the numerator from the denominator"
   ],
   "answer": "6",
   "explanation": "The denominator 6 means the whole is divided into 6 equal parts.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N5",
   "topic": "Meaning of the numerator",
   "prompt": "A tart is cut into 7 equal pieces. The baker decorates 4/7 of the tart with cherries. How many pieces are decorated with cherries?",
   "parts": [
    "7 equal pieces in the tart",
    "4/7 is decorated",
    "Find the decorated pieces."
   ],
   "labels": [
    "Partition count",
    "Given fraction",
    "Numerator meaning"
   ],
   "formula": "Use the numerator of 4/7 as the number of decorated pieces",
   "formulas": [
    "Use the numerator of 4/7 as the number of decorated pieces",
    "Use the denominator of 4/7 as the number of decorated pieces",
    "Subtract 4 from 7 to find the decorated pieces"
   ],
   "answer": "4",
   "explanation": "The numerator 4 counts the decorated equal pieces.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3N5",
   "topic": "Comparing fractions with equal denominators",
   "prompt": "Two identical loaves are each cut into 8 equal slices. One order uses 3/8 of a loaf, and another uses 5/8 of a loaf. Which fraction is greater?",
   "parts": [
    "Identical wholes, each in 8 equal parts",
    "Fractions: 3/8 and 5/8",
    "Choose the greater fraction."
   ],
   "labels": [
    "Equal-sized parts",
    "Fractions to compare",
    "Greater fraction"
   ],
   "formula": "With equal denominators, choose the larger numerator",
   "formulas": [
    "With equal denominators, choose the larger numerator",
    "With equal denominators, choose the smaller numerator",
    "Treat fractions with equal denominators as equal"
   ],
   "answer": "5/8",
   "explanation": "Five equal eighths are more than three equal eighths.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M1",
   "topic": "Choosing a distance unit",
   "prompt": "A bakery's delivery route across several neighbourhoods is about 3 ____. Choose the suitable unit: millimetres, centimetres or kilometres.",
   "parts": [
    "Delivery across several neighbourhoods",
    "Distance number: 3",
    "Choose the suitable unit."
   ],
   "labels": [
    "Distance context",
    "Measurement number",
    "Measurement unit"
   ],
   "formula": "Choose kilometres for a journey across neighbourhoods",
   "formulas": [
    "Choose kilometres for a journey across neighbourhoods",
    "Choose centimetres for a journey across neighbourhoods",
    "Choose millimetres for a journey across neighbourhoods"
   ],
   "answer": "kilometres",
   "explanation": "Kilometres are suitable for measuring a route across neighbourhoods.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M1",
   "topic": "Converting kilometres and metres",
   "prompt": "A flour delivery travels 2 km 300 m from a store to a bakery. How many metres is this? Use 1 km = 1000 m.",
   "parts": [
    "Whole kilometres: 2 km",
    "Additional distance: 300 m",
    "Express the distance in metres."
   ],
   "labels": [
    "Kilometre component",
    "Metre component",
    "Converted distance"
   ],
   "formula": "2 × 1000 + 300",
   "formulas": [
    "2 × 1000 + 300",
    "2 × 100 + 300",
    "2 + 300"
   ],
   "answer": "2300 m",
   "explanation": "2 km is 2000 m; adding 300 m gives 2300 m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M1",
   "topic": "Adding distances",
   "prompt": "A bread delivery worker travels 1 km from the bakery to a café, then 600 m from the café to a school. What is the total distance in metres? Use 1 km = 1000 m.",
   "parts": [
    "Bakery to café: 1 km",
    "Café to school: 600 m",
    "Find the total distance in metres."
   ],
   "labels": [
    "First journey",
    "Second journey",
    "Combined distance"
   ],
   "formula": "1000 + 600",
   "formulas": [
    "1000 + 600",
    "1000 − 600",
    "100 + 600"
   ],
   "answer": "1600 m",
   "explanation": "Convert 1 km to 1000 m, then add 600 m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M1",
   "topic": "Comparing route lengths",
   "prompt": "One route to a cake shop is 1 km 200 m long. Another route is 950 m long. How much longer is the first route, in metres? Use 1 km = 1000 m.",
   "parts": [
    "First route: 1 km 200 m",
    "Second route: 950 m",
    "Find the difference in metres."
   ],
   "labels": [
    "Longer distance",
    "Shorter distance",
    "Distance difference"
   ],
   "formula": "1200 − 950",
   "formulas": [
    "1200 − 950",
    "1200 + 950",
    "1000 − 950"
   ],
   "answer": "250 m",
   "explanation": "The first route is 1200 m; 1200 − 950 = 250 m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M2",
   "topic": "Estimated short time intervals",
   "prompt": "A chef estimates that stirring icing takes 20 seconds and pouring it takes 10 seconds. The tasks happen one after the other with no gap. What is the estimated total time?",
   "parts": [
    "Stirring estimate: 20 seconds",
    "Pouring estimate: 10 seconds",
    "Find the estimated total time."
   ],
   "labels": [
    "First time estimate",
    "Second time estimate",
    "Combined estimate"
   ],
   "formula": "20 + 10",
   "formulas": [
    "20 + 10",
    "20 − 10",
    "20 × 10"
   ],
   "answer": "30 seconds",
   "explanation": "Add the two estimated intervals: 20 + 10 = 30 seconds.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M2",
   "topic": "Finding elapsed time",
   "prompt": "Bread enters an oven at 9:10 a.m. and comes out at 9:45 a.m. on the same day. How many minutes does it bake?",
   "parts": [
    "Start: 9:10 a.m.",
    "Finish: 9:45 a.m.",
    "Find the baking interval."
   ],
   "labels": [
    "Starting time",
    "Finishing time",
    "Elapsed time"
   ],
   "formula": "45 − 10",
   "formulas": [
    "45 − 10",
    "45 + 10",
    "60 − 45"
   ],
   "answer": "35 minutes",
   "explanation": "Both times are in the same hour, so subtract the minutes: 45 − 10 = 35.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M2",
   "topic": "Finding a finishing time",
   "prompt": "A cake begins cooling at 2:20 p.m. It needs 25 minutes to cool. At what time will it finish cooling?",
   "parts": [
    "Cooling starts: 2:20 p.m.",
    "Cooling lasts: 25 minutes",
    "Find the finishing time."
   ],
   "labels": [
    "Start time",
    "Duration",
    "End time"
   ],
   "formula": "Move forward 25 minutes from 2:20 p.m.",
   "formulas": [
    "Move forward 25 minutes from 2:20 p.m.",
    "Move backward 25 minutes from 2:20 p.m.",
    "Move forward 25 hours from 2:20 p.m."
   ],
   "answer": "2:45 p.m.",
   "explanation": "Twenty-five minutes after 2:20 p.m. is 2:45 p.m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M2",
   "topic": "Finding a starting time",
   "prompt": "A baker must finish decorating a cake at 11:50 a.m. Decorating takes 30 minutes without a break. At what time should the baker start?",
   "parts": [
    "Required finish: 11:50 a.m.",
    "Decorating duration: 30 minutes",
    "Find the starting time."
   ],
   "labels": [
    "Deadline",
    "Work interval",
    "Required start"
   ],
   "formula": "Move backward 30 minutes from 11:50 a.m.",
   "formulas": [
    "Move backward 30 minutes from 11:50 a.m.",
    "Move forward 30 minutes from 11:50 a.m.",
    "Move backward 30 hours from 11:50 a.m."
   ],
   "answer": "11:20 a.m.",
   "explanation": "Thirty minutes before 11:50 a.m. is 11:20 a.m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M3",
   "topic": "Choosing a capacity unit",
   "prompt": "A large milk bottle used in a bakery holds about 2 ____. Choose the suitable capacity unit: litres or millilitres.",
   "parts": [
    "Container: a large milk bottle",
    "Capacity number: 2",
    "Choose litres or millilitres."
   ],
   "labels": [
    "Container context",
    "Measurement number",
    "Capacity unit"
   ],
   "formula": "Choose litres for a large milk bottle",
   "formulas": [
    "Choose litres for a large milk bottle",
    "Choose millilitres for a large milk bottle",
    "Use centimetres to measure the bottle's capacity"
   ],
   "answer": "litres",
   "explanation": "A large milk bottle can hold 2 litres; 2 millilitres is only a very small amount.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M3",
   "topic": "Converting capacity units",
   "prompt": "A chef prepares 3 L 250 mL of lemonade for a bakery café. How many millilitres is this? Use 1 L = 1000 mL.",
   "parts": [
    "Litres: 3 L",
    "Extra millilitres: 250 mL",
    "Express the total in millilitres."
   ],
   "labels": [
    "Litre component",
    "Millilitre component",
    "Converted capacity"
   ],
   "formula": "3 × 1000 + 250",
   "formulas": [
    "3 × 1000 + 250",
    "3 × 100 + 250",
    "3 + 250"
   ],
   "answer": "3250 mL",
   "explanation": "3 L is 3000 mL, so the total is 3250 mL.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M3",
   "topic": "Finding liquid remaining",
   "prompt": "A jug contains 900 mL of milk. A baker pours 350 mL into cake batter. How much milk remains in the jug?",
   "parts": [
    "Starting milk: 900 mL",
    "Milk poured out: 350 mL",
    "Find the milk remaining."
   ],
   "labels": [
    "Initial amount",
    "Removed amount",
    "Remaining amount"
   ],
   "formula": "900 − 350",
   "formulas": [
    "900 − 350",
    "900 + 350",
    "350 − 900"
   ],
   "answer": "550 mL",
   "explanation": "Subtract the milk used: 900 − 350 = 550 mL.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M3",
   "topic": "Measuring capacity with equal cups",
   "prompt": "A bakery has 800 mL of orange juice. Each full cup holds 200 mL. How many full cups can be filled with no juice left?",
   "parts": [
    "Juice available: 800 mL",
    "Capacity per cup: 200 mL",
    "Find the number of full cups."
   ],
   "labels": [
    "Total liquid",
    "Measuring unit",
    "Unit count"
   ],
   "formula": "Count groups of 200 mL that make 800 mL",
   "formulas": [
    "Count groups of 200 mL that make 800 mL",
    "Add 800 mL and 200 mL",
    "Subtract one 200 mL cup from 800 mL"
   ],
   "answer": "4",
   "explanation": "200 + 200 + 200 + 200 = 800, so 4 cups can be filled.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M4",
   "topic": "Volume measured with identical cubes",
   "prompt": "A solid cake-display model is built from identical wooden cubes. It has one layer containing 3 rows of 4 cubes, with no gaps or overlaps. How many cubes make the model?",
   "parts": [
    "3 rows in one layer",
    "4 cubes in each row",
    "Find the total cube count."
   ],
   "labels": [
    "Row count",
    "Cubes per row",
    "Volume-unit count"
   ],
   "formula": "3 × 4",
   "formulas": [
    "3 × 4",
    "3 + 4",
    "4 − 3"
   ],
   "answer": "12",
   "explanation": "Three rows of 4 cubes contain 12 cubes.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M4",
   "topic": "Comparing volumes",
   "prompt": "Two solid bakery-display blocks are made from the same-sized cubes, with no gaps or overlaps. Block A uses 18 cubes and Block B uses 15 cubes. Which block has the greater volume?",
   "parts": [
    "Block A: 18 cubes",
    "Block B: 15 same-sized cubes",
    "Identify the greater volume."
   ],
   "labels": [
    "First volume",
    "Second volume",
    "Volume comparison"
   ],
   "formula": "Compare counts of same-sized cubes and choose the larger count",
   "formulas": [
    "Compare counts of same-sized cubes and choose the larger count",
    "Compare counts of same-sized cubes and choose the smaller count",
    "Treat all blocks made from cubes as having equal volume"
   ],
   "answer": "Block A",
   "explanation": "18 same-sized cubes occupy more space than 15.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M4",
   "topic": "Completing a volume model",
   "prompt": "A solid model of a cake needs 20 identical cubes when complete. The baker has fitted 14 cubes into their correct positions. How many more cubes are needed?",
   "parts": [
    "Complete model: 20 cubes",
    "Already fitted: 14 cubes",
    "Find the missing cubes."
   ],
   "labels": [
    "Target volume",
    "Existing volume",
    "Additional units"
   ],
   "formula": "20 − 14",
   "formulas": [
    "20 − 14",
    "20 + 14",
    "14 − 20"
   ],
   "answer": "6",
   "explanation": "The model needs 20 − 14 = 6 more cubes.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M4",
   "topic": "Equal volumes in different arrangements",
   "prompt": "A baker makes two display models from identical cubes. Model A has 10 cubes in one row. Model B has 2 rows of 5 cubes. Neither model has gaps or overlapping cubes. How do their volumes compare?",
   "parts": [
    "Model A: 10 cubes",
    "Model B: 2 rows of 5 cubes",
    "Compare the occupied space."
   ],
   "labels": [
    "First arrangement",
    "Second arrangement",
    "Volume relationship"
   ],
   "formula": "Count identical cubes in each model; equal counts mean equal volumes",
   "formulas": [
    "Count identical cubes in each model; equal counts mean equal volumes",
    "Choose the model with more rows as having greater volume",
    "Choose the model with more cubes in one row as having greater volume"
   ],
   "answer": "Equal volume",
   "explanation": "Both models contain 10 identical cubes, so their volumes are equal.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M5",
   "topic": "Choosing a weight unit",
   "prompt": "A small sachet of yeast for bread weighs about 5 ____. Choose the suitable weight unit: grams or kilograms.",
   "parts": [
    "Object: a small yeast sachet",
    "Weight number: 5",
    "Choose grams or kilograms."
   ],
   "labels": [
    "Object context",
    "Measurement number",
    "Weight unit"
   ],
   "formula": "Choose grams for a small sachet of yeast",
   "formulas": [
    "Choose grams for a small sachet of yeast",
    "Choose kilograms for a small sachet of yeast",
    "Use litres to measure the sachet's weight"
   ],
   "answer": "grams",
   "explanation": "A small yeast sachet weighs a few grams, not several kilograms.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M5",
   "topic": "Converting weight units",
   "prompt": "A bag of flour weighs 2 kg 400 g. What is its weight in grams? Use 1 kg = 1000 g.",
   "parts": [
    "Kilograms: 2 kg",
    "Extra grams: 400 g",
    "Express the weight in grams."
   ],
   "labels": [
    "Kilogram component",
    "Gram component",
    "Converted weight"
   ],
   "formula": "2 × 1000 + 400",
   "formulas": [
    "2 × 1000 + 400",
    "2 × 100 + 400",
    "2 + 400"
   ],
   "answer": "2400 g",
   "explanation": "2 kg is 2000 g; adding 400 g gives 2400 g.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M5",
   "topic": "Adding weights",
   "prompt": "A recipe uses 350 g of flour and 275 g of sugar. What is the combined weight of these two ingredients?",
   "parts": [
    "Flour: 350 g",
    "Sugar: 275 g",
    "Find the combined weight."
   ],
   "labels": [
    "First ingredient weight",
    "Second ingredient weight",
    "Total weight"
   ],
   "formula": "350 + 275",
   "formulas": [
    "350 + 275",
    "350 − 275",
    "350 + 27"
   ],
   "answer": "625 g",
   "explanation": "350 + 275 = 625 g.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3M5",
   "topic": "Finding an additional weight",
   "prompt": "A recipe needs 1 kg of dough. A baker has already weighed 650 g. How many more grams of dough are needed? Use 1 kg = 1000 g.",
   "parts": [
    "Target weight: 1 kg",
    "Already weighed: 650 g",
    "Find the extra grams needed."
   ],
   "labels": [
    "Required weight",
    "Available weight",
    "Weight shortfall"
   ],
   "formula": "1000 − 650",
   "formulas": [
    "1000 − 650",
    "1000 + 650",
    "100 − 65"
   ],
   "answer": "350 g",
   "explanation": "1 kg is 1000 g, and 1000 − 650 = 350 g.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3S1",
   "topic": "Recognising a rectangle",
   "prompt": "A flat pastry card has four straight sides and four right angles. Its side lengths in order are 12 cm, 8 cm, 12 cm and 8 cm. What is the most specific name of its shape?",
   "parts": [
    "Four straight sides and four right angles",
    "Opposite sides equal; adjacent sides unequal",
    "Name the shape."
   ],
   "labels": [
    "Angle property",
    "Side property",
    "Quadrilateral name"
   ],
   "formula": "Identify a rectangle from four right angles and unequal adjacent sides",
   "formulas": [
    "Identify a rectangle from four right angles and unequal adjacent sides",
    "Identify a square by assuming all four sides are equal",
    "Identify a trapezium by assuming exactly one pair of opposite sides is parallel"
   ],
   "answer": "Rectangle",
   "explanation": "The card has four right angles, but its adjacent sides are unequal, so it is a rectangle rather than a square.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3S1",
   "topic": "Parallel sides of a parallelogram",
   "prompt": "A baker cuts a flat parallelogram-shaped label. It has four straight sides, and both pairs of opposite sides are parallel. How many pairs of parallel sides does it have?",
   "parts": [
    "Shape: parallelogram",
    "Both opposite-side pairs are parallel",
    "Count the parallel pairs."
   ],
   "labels": [
    "Given quadrilateral",
    "Parallel-side property",
    "Pair count"
   ],
   "formula": "Count the two pairs of opposite parallel sides",
   "formulas": [
    "Count the two pairs of opposite parallel sides",
    "Count all four individual sides as four pairs",
    "Count only one pair of opposite sides"
   ],
   "answer": "2",
   "explanation": "A parallelogram has two pairs of opposite parallel sides.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3S1",
   "topic": "Equal sides of a square",
   "prompt": "A square biscuit has one side measuring 9 cm. What is the length of the side opposite it?",
   "parts": [
    "Shape: square",
    "Known side: 9 cm",
    "Find the opposite side's length."
   ],
   "labels": [
    "Shape information",
    "Known measurement",
    "Unknown measurement"
   ],
   "formula": "Use the property that all sides of a square are equal",
   "formulas": [
    "Use the property that all sides of a square are equal",
    "Multiply the known side length by 4",
    "Divide the known side length by 3"
   ],
   "answer": "9 cm",
   "explanation": "All four sides of a square have the same length.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3S1",
   "topic": "Recognising a trapezium",
   "prompt": "A baker designs a flat four-sided cake label. The top and bottom sides are parallel. The left and right sides are not parallel. What quadrilateral has exactly this one pair of parallel sides?",
   "parts": [
    "Four straight sides",
    "Exactly one pair of opposite sides is parallel",
    "Name the quadrilateral."
   ],
   "labels": [
    "Side count",
    "Parallel-pair condition",
    "Shape classification"
   ],
   "formula": "Identify a trapezium by its exactly one pair of parallel opposite sides",
   "formulas": [
    "Identify a trapezium by its exactly one pair of parallel opposite sides",
    "Identify a parallelogram by assuming two pairs of parallel opposite sides",
    "Identify a square by assuming four equal sides and four right angles"
   ],
   "answer": "Trapezium",
   "explanation": "A quadrilateral with exactly one pair of parallel opposite sides is a trapezium.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3S2",
   "topic": "Recognising an equilateral triangle",
   "prompt": "A triangular biscuit has side lengths 6 cm, 6 cm and 6 cm. What is the most specific name of this triangle according to its sides?",
   "parts": [
    "Shape: triangle",
    "Side lengths: 6 cm, 6 cm, 6 cm",
    "Name the triangle by its sides."
   ],
   "labels": [
    "Polygon type",
    "Side measurements",
    "Triangle classification"
   ],
   "formula": "Identify an equilateral triangle because all three sides are equal",
   "formulas": [
    "Identify an equilateral triangle because all three sides are equal",
    "Identify a scalene triangle because all three sides are different",
    "Identify a triangle with exactly two equal sides"
   ],
   "answer": "Equilateral triangle",
   "explanation": "All three side lengths are equal.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3S2",
   "topic": "Equal sides of an isosceles triangle",
   "prompt": "A triangular cake decoration is isosceles with exactly two equal sides. One equal side is 7 cm long, and the unequal base is 4 cm long. How long is the other equal side?",
   "parts": [
    "Exactly two sides are equal",
    "One equal side is 7 cm; base is 4 cm",
    "Find the other equal side."
   ],
   "labels": [
    "Equality condition",
    "Known lengths",
    "Missing length"
   ],
   "formula": "Match the other equal side to the given 7 cm side",
   "formulas": [
    "Match the other equal side to the given 7 cm side",
    "Match the other equal side to the unequal 4 cm base",
    "Add the known lengths: 7 + 4"
   ],
   "answer": "7 cm",
   "explanation": "The two equal sides of this isosceles triangle both measure 7 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3S2",
   "topic": "Recognising a right angle in a triangle",
   "prompt": "A triangular sandwich has one corner that fits exactly into the square corner of a rectangular baking tray. What type of angle is that sandwich corner?",
   "parts": [
    "Object: a triangular sandwich",
    "One corner matches a rectangular tray's square corner",
    "Name that angle type."
   ],
   "labels": [
    "Triangle context",
    "Angle evidence",
    "Angle classification"
   ],
   "formula": "Recognise a corner matching a square corner as a right angle",
   "formulas": [
    "Recognise a corner matching a square corner as a right angle",
    "Classify the corner as smaller than a right angle",
    "Classify the corner as larger than a right angle"
   ],
   "answer": "Right angle",
   "explanation": "A rectangular tray's square corner is a right angle, so the matching sandwich corner is also a right angle.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3S2",
   "topic": "Recognising a scalene triangle",
   "prompt": "A triangular pastry has side lengths 4 cm, 5 cm and 6 cm. What is its name according to its side lengths?",
   "parts": [
    "Three sides form the pastry",
    "Lengths: 4 cm, 5 cm and 6 cm",
    "Classify the triangle by its sides."
   ],
   "labels": [
    "Shape structure",
    "Side-length evidence",
    "Triangle name"
   ],
   "formula": "Identify a scalene triangle because all three sides have different lengths",
   "formulas": [
    "Identify a scalene triangle because all three sides have different lengths",
    "Identify an equilateral triangle by treating all three lengths as equal",
    "Identify an isosceles triangle by treating two lengths as equal"
   ],
   "answer": "Scalene triangle",
   "explanation": "No two of the three side lengths are equal.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3D1",
   "topic": "Reading a category value",
   "prompt": "A bakery will draw a bar chart from this sales table: Item | Number sold; Buns | 24; Croissants | 18; Muffins | 15. What value should the croissant bar show?",
   "parts": [
    "Sales table: buns 24, croissants 18, muffins 15",
    "Selected category: croissants",
    "Find the bar's value."
   ],
   "labels": [
    "Data source",
    "Target category",
    "Frequency"
   ],
   "formula": "Read the number in the croissant row",
   "formulas": [
    "Read the number in the croissant row",
    "Read the number in the bun row",
    "Add the numbers for all three rows"
   ],
   "answer": "18",
   "explanation": "The table records 18 croissants sold.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3D1",
   "topic": "Finding a total from bar-chart data",
   "prompt": "A bakery's bar-chart data are listed here: Cake flavour | Number ordered; Chocolate | 12; Lemon | 9; Coconut | 7. How many cakes were ordered altogether?",
   "parts": [
    "Chocolate: 12",
    "Lemon: 9; coconut: 7",
    "Find the total across all categories."
   ],
   "labels": [
    "First category",
    "Other categories",
    "Combined frequency"
   ],
   "formula": "12 + 9 + 7",
   "formulas": [
    "12 + 9 + 7",
    "12 − 9 + 7",
    "12 + 9 − 7"
   ],
   "answer": "28",
   "explanation": "Adding all three category counts gives 28 cakes.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3D1",
   "topic": "Comparing category frequencies",
   "prompt": "A bakery uses this table for a bar chart: Bread type | Number sold; White loaves | 20; Wheat loaves | 14; Rye loaves | 8. How many more white loaves than wheat loaves were sold?",
   "parts": [
    "White loaves: 20",
    "Wheat loaves: 14",
    "Find how many more white loaves were sold."
   ],
   "labels": [
    "Larger frequency",
    "Smaller frequency",
    "Frequency difference"
   ],
   "formula": "20 − 14",
   "formulas": [
    "20 − 14",
    "20 + 14",
    "20 − 8"
   ],
   "answer": "6",
   "explanation": "20 − 14 = 6 more white loaves.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "3D1",
   "topic": "Using a bar-chart scale",
   "prompt": "A bakery will draw a bar chart from this table: Item | Number sold; Buns | 25; Tarts | 15; Rolls | 20. The number axis starts at 0, and each equal interval represents 5 items. How many intervals tall should the bun bar be?",
   "parts": [
    "Buns sold: 25",
    "Scale: 5 items per interval, starting at 0",
    "Find the bun bar's height in intervals."
   ],
   "labels": [
    "Category frequency",
    "Axis scale",
    "Bar height"
   ],
   "formula": "25 ÷ 5",
   "formulas": [
    "25 ÷ 5",
    "25 × 5",
    "25 − 5"
   ],
   "answer": "5",
   "explanation": "Five intervals represent 5 × 5 = 25 buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  }
 ],
 "P4": [
  {
   "unit": "4N1",
   "topic": "Multiplication",
   "prompt": "A bakery fills 24 trays with 18 buns on each tray. How many buns are there altogether?",
   "parts": [
    "24 trays",
    "18 buns per tray",
    "Total number of buns"
   ],
   "labels": [
    "Number of groups",
    "Amount in each group",
    "Total"
   ],
   "formula": "24 × 18",
   "formulas": [
    "24 × 18",
    "24 + 18",
    "24 × 10 + 8"
   ],
   "answer": "432",
   "explanation": "24 × 18 = 240 + 192 = 432 buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N1",
   "topic": "Multiplication",
   "prompt": "A school orders 16 cakes from a bakery. Each cake costs $125. What is the total cost in dollars?",
   "parts": [
    "$125 per cake",
    "16 cakes ordered",
    "Total cost in dollars"
   ],
   "labels": [
    "Unit price",
    "Quantity purchased",
    "Total cost"
   ],
   "formula": "125 × 16",
   "formulas": [
    "125 × 16",
    "125 + 16",
    "125 × 10 + 6"
   ],
   "answer": "2000",
   "explanation": "125 × 16 = 1250 + 750 = 2000 dollars.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N1",
   "topic": "Multiplication",
   "prompt": "A small bread batch uses 36 g of yeast. A large batch uses 12 times as much yeast. How many grams of yeast does the large batch use?",
   "parts": [
    "36 g for the small batch",
    "12 times as much",
    "Grams for the large batch"
   ],
   "labels": [
    "Starting amount",
    "Multiplier",
    "Compared amount"
   ],
   "formula": "36 × 12",
   "formulas": [
    "36 × 12",
    "36 + 12",
    "36 ÷ 12"
   ],
   "answer": "432",
   "explanation": "The large batch uses 36 × 12 = 432 g.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N1",
   "topic": "Multiplication",
   "prompt": "A bakery has 14 boxes, each containing 23 egg tarts. The baker calculates 23 × (10 + 4) by finding 230 + __. What number belongs in the blank?",
   "parts": [
    "23 tarts in each box",
    "4 boxes in the second group",
    "Missing partial product"
   ],
   "labels": [
    "Amount per box",
    "Remaining box count",
    "Partial total"
   ],
   "formula": "23 × 4",
   "formulas": [
    "23 × 4",
    "23 × 14",
    "230 + 4"
   ],
   "answer": "92",
   "explanation": "The remaining 4 boxes contain 23 × 4 = 92 tarts.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N2",
   "topic": "Division",
   "prompt": "A baker packs 864 cookies equally into 24 tins. How many cookies go into each tin?",
   "parts": [
    "864 cookies",
    "24 equal tins",
    "Cookies in each tin"
   ],
   "labels": [
    "Total amount",
    "Number of groups",
    "Group size"
   ],
   "formula": "864 ÷ 24",
   "formulas": [
    "864 ÷ 24",
    "864 × 24",
    "864 − 24"
   ],
   "answer": "36",
   "explanation": "24 × 36 = 864, so each tin contains 36 cookies.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N2",
   "topic": "Division",
   "prompt": "A bakery has 936 muffins. Each full carton holds 18 muffins. How many full cartons can be filled?",
   "parts": [
    "936 muffins available",
    "18 muffins per carton",
    "Number of full cartons"
   ],
   "labels": [
    "Available total",
    "Carton capacity",
    "Group count"
   ],
   "formula": "936 ÷ 18",
   "formulas": [
    "936 ÷ 18",
    "936 − 18",
    "936 × 18"
   ],
   "answer": "52",
   "explanation": "936 ÷ 18 = 52 cartons, with no muffins left.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N2",
   "topic": "Division with a remainder",
   "prompt": "A chef has 785 g of dough. Each roll needs 32 g. After making as many whole rolls as possible, how many grams of dough remain?",
   "parts": [
    "785 g of dough",
    "32 g for each roll",
    "Grams left over"
   ],
   "labels": [
    "Dividend",
    "Divisor",
    "Remainder"
   ],
   "formula": "Find the remainder of 785 ÷ 32",
   "formulas": [
    "Find the remainder of 785 ÷ 32",
    "Find the whole-number quotient of 785 ÷ 32",
    "Calculate 785 − 32"
   ],
   "answer": "17",
   "explanation": "32 × 24 = 768 and 785 − 768 = 17 g.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N2",
   "topic": "Division",
   "prompt": "A baker pays $672 for 28 identical bags of flour. What is the price of one bag in dollars?",
   "parts": [
    "$672 altogether",
    "28 identical bags",
    "Price of one bag"
   ],
   "labels": [
    "Total cost",
    "Number purchased",
    "Unit price"
   ],
   "formula": "672 ÷ 28",
   "formulas": [
    "672 ÷ 28",
    "672 − 28",
    "672 × 28"
   ],
   "answer": "24",
   "explanation": "672 ÷ 28 = 24 dollars per bag.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N3",
   "topic": "Multiples",
   "prompt": "Cookies are sold only in full packs of 6. List all possible numbers of cookies a customer can buy from 20 to 40 inclusive.",
   "parts": [
    "6 cookies per pack",
    "From 20 to 40 inclusive",
    "Possible cookie totals"
   ],
   "labels": [
    "Pack size",
    "Allowed interval",
    "Required multiples"
   ],
   "formula": "List the multiples of 6 from 20 to 40",
   "formulas": [
    "List the multiples of 6 from 20 to 40",
    "List the factors of 6",
    "List the multiples of 5 from 20 to 40"
   ],
   "answer": "24, 30, 36",
   "explanation": "The multiples of 6 within the interval are 24, 30 and 36.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N3",
   "topic": "Factors",
   "prompt": "A baker puts 18 tarts into equal rows with none left over. List every possible positive number of tarts in each row.",
   "parts": [
    "18 tarts altogether",
    "Equal rows with no leftovers",
    "Possible row sizes"
   ],
   "labels": [
    "Number to divide",
    "Grouping condition",
    "Required factors"
   ],
   "formula": "List all positive factors of 18",
   "formulas": [
    "List all positive factors of 18",
    "List the first six positive multiples of 18",
    "List all odd numbers below 18"
   ],
   "answer": "1, 2, 3, 6, 9, 18",
   "explanation": "Each listed number divides 18 exactly.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N3",
   "topic": "Recognising a factor",
   "prompt": "A bakery must pack 42 buns into identical full boxes with none left over. The available box capacities are 4, 6 and 8 buns. Which capacity works?",
   "parts": [
    "42 buns",
    "Capacities of 4, 6 or 8",
    "Capacity giving no remainder"
   ],
   "labels": [
    "Total to pack",
    "Candidate divisors",
    "Suitable factor"
   ],
   "formula": "Find which of 4, 6 and 8 divides 42 exactly",
   "formulas": [
    "Find which of 4, 6 and 8 divides 42 exactly",
    "Choose the largest available capacity",
    "Find which available capacity divides 40 exactly"
   ],
   "answer": "6",
   "explanation": "42 ÷ 6 = 7; division by 4 or 8 leaves a remainder.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N3",
   "topic": "Multiples",
   "prompt": "A baker numbers loaves starting at 1 and puts a special label on every ninth loaf: 9, 18, 27 and so on. What is the number of the fifth specially labelled loaf?",
   "parts": [
    "Every ninth loaf",
    "Fifth special label",
    "Loaf number"
   ],
   "labels": [
    "Multiple step",
    "Position in sequence",
    "Required multiple"
   ],
   "formula": "9 × 5",
   "formulas": [
    "9 × 5",
    "9 + 5",
    "9 × 4"
   ],
   "answer": "45",
   "explanation": "The first five positive multiples of 9 are 9, 18, 27, 36 and 45.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N4",
   "topic": "Common factors",
   "prompt": "A baker has 12 vanilla cupcakes and 18 chocolate cupcakes. Each flavour is packed separately, using the same number of cupcakes per box and leaving none over. List every possible number of cupcakes per box.",
   "parts": [
    "12 vanilla cupcakes",
    "18 chocolate cupcakes",
    "Shared box sizes with no leftovers"
   ],
   "labels": [
    "First number",
    "Second number",
    "Common factors"
   ],
   "formula": "List the factors shared by 12 and 18",
   "formulas": [
    "List the factors shared by 12 and 18",
    "List the positive multiples shared by 12 and 18 up to 72",
    "List all factors of 12 only"
   ],
   "answer": "1, 2, 3, 6",
   "explanation": "The factors common to 12 and 18 are 1, 2, 3 and 6.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N4",
   "topic": "Common multiples",
   "prompt": "A bakery wants a total number of biscuits that can be packed either in full boxes of 4 or in full boxes of 6, with none left over. List all suitable totals from 1 to 30 inclusive.",
   "parts": [
    "Boxes of 4",
    "Boxes of 6",
    "Shared totals from 1 to 30"
   ],
   "labels": [
    "First pack size",
    "Second pack size",
    "Bounded common multiples"
   ],
   "formula": "List the common multiples of 4 and 6 from 1 to 30",
   "formulas": [
    "List the common multiples of 4 and 6 from 1 to 30",
    "List the common factors of 4 and 6",
    "List all multiples of 4 from 1 to 30"
   ],
   "answer": "12, 24",
   "explanation": "12 and 24 are the only totals in the interval divisible by both 4 and 6.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N4",
   "topic": "Common multiples",
   "prompt": "Two oven timers ring together now. One rings every 6 minutes and the other every 8 minutes. After how many minutes will they next ring together?",
   "parts": [
    "First timer: every 6 minutes",
    "Second timer: every 8 minutes",
    "First shared time after now"
   ],
   "labels": [
    "First interval",
    "Second interval",
    "Next common multiple"
   ],
   "formula": "List positive multiples of 6 and 8 and find the first shared number",
   "formulas": [
    "List positive multiples of 6 and 8 and find the first shared number",
    "Add 6 and 8",
    "List the common factors of 6 and 8 and choose the largest"
   ],
   "answer": "24",
   "explanation": "The first shared positive multiple is 24 minutes.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N4",
   "topic": "Common factors",
   "prompt": "A cook cuts a 20 cm dough strip and a 30 cm dough strip into pieces of one shared length, with no waste. Of the proposed lengths 4 cm, 5 cm and 6 cm, which works for both strips?",
   "parts": [
    "Strips of 20 cm and 30 cm",
    "Choices: 4 cm, 5 cm, 6 cm",
    "Length dividing both exactly"
   ],
   "labels": [
    "Numbers being compared",
    "Candidate lengths",
    "Suitable common factor"
   ],
   "formula": "Find which proposed length is a factor of both 20 and 30",
   "formulas": [
    "Find which proposed length is a factor of both 20 and 30",
    "Choose a proposed length that divides only 20 exactly",
    "Choose the largest proposed length"
   ],
   "answer": "5 cm",
   "explanation": "20 ÷ 5 = 4 and 30 ÷ 5 = 6, so 5 cm works for both.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N5",
   "topic": "Mixed operations",
   "prompt": "A bakery has 8 trays of 24 buns. It sells 57 buns. How many buns remain?",
   "parts": [
    "8 trays of 24 buns",
    "57 buns sold",
    "Buns remaining"
   ],
   "labels": [
    "Starting product",
    "Amount removed",
    "Final quantity"
   ],
   "formula": "8 × 24 − 57",
   "formulas": [
    "8 × 24 − 57",
    "8 × (24 − 57)",
    "8 × 24 + 57"
   ],
   "answer": "135",
   "explanation": "There are 192 buns at first; 192 − 57 = 135 remain.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N5",
   "topic": "Mixed operations with brackets",
   "prompt": "A cook combines 156 g of chopped almonds and 84 g of chopped walnuts. The mixture is shared equally among 12 cakes. How many grams of mixture go on each cake?",
   "parts": [
    "156 g almonds and 84 g walnuts",
    "12 cakes",
    "Grams on each cake"
   ],
   "labels": [
    "Combined amount",
    "Number of shares",
    "Amount per share"
   ],
   "formula": "(156 + 84) ÷ 12",
   "formulas": [
    "(156 + 84) ÷ 12",
    "156 + 84 ÷ 12",
    "(156 − 84) ÷ 12"
   ],
   "answer": "20",
   "explanation": "The mixture weighs 240 g, and 240 ÷ 12 = 20 g.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N5",
   "topic": "Distributive property",
   "prompt": "Each of 15 breakfast bags contains 8 plain rolls and 2 cheese rolls. How many rolls are packed altogether?",
   "parts": [
    "15 bags",
    "8 plain and 2 cheese rolls per bag",
    "Total rolls"
   ],
   "labels": [
    "Common multiplier",
    "Sum in each group",
    "Combined product"
   ],
   "formula": "15 × (8 + 2)",
   "formulas": [
    "15 × (8 + 2)",
    "15 × 8 + 2",
    "15 + 8 + 2"
   ],
   "answer": "150",
   "explanation": "Each bag has 10 rolls, so 15 × 10 = 150.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N5",
   "topic": "Mixed operations",
   "prompt": "A baker has $500. She buys 12 bags of flour at $28 each and pays a delivery fee of $35. How many dollars remain?",
   "parts": [
    "$500 available",
    "12 × $28 plus $35 delivery",
    "Money remaining"
   ],
   "labels": [
    "Starting money",
    "Total spending",
    "Balance"
   ],
   "formula": "500 − (12 × 28 + 35)",
   "formulas": [
    "500 − (12 × 28 + 35)",
    "500 − 12 × (28 + 35)",
    "500 − 12 × 28 + 35"
   ],
   "answer": "129",
   "explanation": "The spending is 336 + 35 = 371 dollars; 500 − 371 = 129.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N6",
   "topic": "Improper fractions and mixed numbers",
   "prompt": "A baker has 11 quarter-cup scoops of flour. Express the amount in cups as a mixed number.",
   "parts": [
    "11 quarter-cup scoops",
    "4 quarters make 1 cup",
    "Amount as a mixed number"
   ],
   "labels": [
    "Number of fractional parts",
    "Parts per whole",
    "Required representation"
   ],
   "formula": "Convert 11/4 to a mixed number using 11 ÷ 4",
   "formulas": [
    "Convert 11/4 to a mixed number using 11 ÷ 4",
    "Convert 4/11 to a mixed number",
    "Calculate 11 − 4 cups"
   ],
   "answer": "2 3/4",
   "explanation": "11 quarters make 2 whole cups and 3 quarters of a cup.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N6",
   "topic": "Mixed numbers and improper fractions",
   "prompt": "A recipe needs 3 2/5 cups of milk. Express this amount as an improper fraction of a cup.",
   "parts": [
    "3 whole cups",
    "2/5 cup more",
    "Amount as an improper fraction"
   ],
   "labels": [
    "Whole-number part",
    "Fractional part",
    "Required representation"
   ],
   "formula": "(3 × 5 + 2)/5",
   "formulas": [
    "(3 × 5 + 2)/5",
    "(3 + 2)/5",
    "(3 × 2 + 5)/5"
   ],
   "answer": "17/5",
   "explanation": "3 cups equal 15/5 cup; adding 2/5 gives 17/5.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N6",
   "topic": "Comparing fractions",
   "prompt": "For two identical batches, Recipe A uses 7/4 cups of flour and Recipe B uses 1 1/2 cups. Which recipe uses more flour?",
   "parts": [
    "Recipe A: 7/4 cups",
    "Recipe B: 1 1/2 cups",
    "Recipe using more flour"
   ],
   "labels": [
    "First amount",
    "Second amount",
    "Comparison result"
   ],
   "formula": "Write both amounts in quarters and compare their numerators",
   "formulas": [
    "Write both amounts in quarters and compare their numerators",
    "Compare only the denominators 4 and 2",
    "Choose the amount written as a mixed number"
   ],
   "answer": "Recipe A",
   "explanation": "1 1/2 = 6/4, and 7/4 is greater than 6/4.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N6",
   "topic": "Fractional parts and wholes",
   "prompt": "A cook has 14 pieces of pastry, each equal to 1/3 of a pastry sheet. What is the greatest number of complete sheets these pieces can form?",
   "parts": [
    "14 one-third-sheet pieces",
    "3 pieces make a whole sheet",
    "Complete sheets only"
   ],
   "labels": [
    "Available fractional parts",
    "Parts needed per whole",
    "Whole-number part"
   ],
   "formula": "Find the whole-number quotient of 14 ÷ 3",
   "formulas": [
    "Find the whole-number quotient of 14 ÷ 3",
    "Find the remainder of 14 ÷ 3",
    "Calculate 14 × 3"
   ],
   "answer": "4",
   "explanation": "12 pieces form 4 complete sheets, with 2 pieces left.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N7",
   "topic": "Fractions as decimals",
   "prompt": "A recipe uses 7/10 litre of milk. Write this amount in litres as a decimal.",
   "parts": [
    "7 fractional parts",
    "Each part is 1/10 litre",
    "Decimal amount in litres"
   ],
   "labels": [
    "Numerator",
    "Fractional unit",
    "Decimal representation"
   ],
   "formula": "Write seven tenths as a decimal",
   "formulas": [
    "Write seven tenths as a decimal",
    "Write seven hundredths as a decimal",
    "Write seven whole litres as a decimal"
   ],
   "answer": "0.7",
   "explanation": "Seven tenths is 0.7.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N7",
   "topic": "Decimals as fractions",
   "prompt": "A cook uses 0.23 litre of oil. Write this amount as a fraction of a litre.",
   "parts": [
    "0.23 litre",
    "Two decimal places",
    "Fraction of a litre"
   ],
   "labels": [
    "Given decimal",
    "Place-value clue",
    "Fraction representation"
   ],
   "formula": "Write 23 hundredths as 23/100",
   "formulas": [
    "Write 23 hundredths as 23/100",
    "Write 23 tenths as 23/10",
    "Write 23 thousandths as 23/1000"
   ],
   "answer": "23/100",
   "explanation": "0.23 means 23 hundredths, or 23/100.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N7",
   "topic": "Decimal place value",
   "prompt": "A bag of flour has a mass of 4.36 kg. What value, in kilograms, does the digit 3 represent?",
   "parts": [
    "Mass: 4.36 kg",
    "Digit 3",
    "Value represented in kilograms"
   ],
   "labels": [
    "Given number",
    "Target digit",
    "Place value"
   ],
   "formula": "Identify 3 in the tenths place: 3/10 kg",
   "formulas": [
    "Identify 3 in the tenths place: 3/10 kg",
    "Treat 3 as three whole kilograms",
    "Treat 3 as three hundredths of a kilogram"
   ],
   "answer": "0.3",
   "explanation": "The first digit after the decimal point represents tenths.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N7",
   "topic": "Comparing decimals",
   "prompt": "Three bowls contain dough of masses 0.58 kg, 0.6 kg and 0.56 kg. What is the mass, in kilograms, of the heaviest bowl of dough?",
   "parts": [
    "0.58 kg, 0.6 kg, 0.56 kg",
    "Compare masses",
    "Greatest mass in kilograms"
   ],
   "labels": [
    "Candidate values",
    "Comparison task",
    "Maximum"
   ],
   "formula": "Write 0.6 as 0.60 and compare hundredths",
   "formulas": [
    "Write 0.6 as 0.60 and compare hundredths",
    "Compare 58, 6 and 56 without aligning place values",
    "Choose the smallest decimal"
   ],
   "answer": "0.6",
   "explanation": "60 hundredths is greater than 58 hundredths and 56 hundredths.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N8",
   "topic": "Decimal addition",
   "prompt": "A customer buys a bun for $8.50, a tart for $6.80 and a drink for $4.20. What is the total cost in dollars?",
   "parts": [
    "Bun: $8.50",
    "Tart and drink: $6.80 and $4.20",
    "Total cost"
   ],
   "labels": [
    "First addend",
    "Other addends",
    "Sum"
   ],
   "formula": "8.50 + 6.80 + 4.20",
   "formulas": [
    "8.50 + 6.80 + 4.20",
    "8.50 + 6.80 − 4.20",
    "8.50 − 6.80 + 4.20"
   ],
   "answer": "19.50",
   "explanation": "8.50 + 6.80 = 15.30; adding 4.20 gives 19.50.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N8",
   "topic": "Decimal subtraction",
   "prompt": "A cook has 5 kg of flour. She uses 1.25 kg for bread and 0.80 kg for biscuits. How many kilograms remain?",
   "parts": [
    "5 kg at first",
    "1.25 kg and 0.80 kg used",
    "Kilograms remaining"
   ],
   "labels": [
    "Starting amount",
    "Amounts removed",
    "Difference"
   ],
   "formula": "5 − 1.25 − 0.80",
   "formulas": [
    "5 − 1.25 − 0.80",
    "5 − 1.25 + 0.80",
    "5 + 1.25 + 0.80"
   ],
   "answer": "2.95",
   "explanation": "The cook uses 2.05 kg, leaving 5 − 2.05 = 2.95 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N8",
   "topic": "Finding a missing decimal amount",
   "prompt": "A chef needs 2.5 litres of soup. The pot contains 1.75 litres. How many more litres are needed?",
   "parts": [
    "Target: 2.5 litres",
    "Available: 1.75 litres",
    "Extra litres needed"
   ],
   "labels": [
    "Required total",
    "Known amount",
    "Missing amount"
   ],
   "formula": "2.50 − 1.75",
   "formulas": [
    "2.50 − 1.75",
    "2.50 + 1.75",
    "1.75 − 0.50"
   ],
   "answer": "0.75",
   "explanation": "2.50 − 1.75 = 0.75 litre.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4N8",
   "topic": "Decimal addition and subtraction",
   "prompt": "An empty mixing bowl has a mass of 0.65 kg. A chef adds 1.8 kg of dough, then removes 0.45 kg of dough. What is the mass of the bowl and remaining dough together, in kilograms?",
   "parts": [
    "Empty bowl: 0.65 kg",
    "Add 1.8 kg and remove 0.45 kg",
    "Final combined mass"
   ],
   "labels": [
    "Container mass",
    "Changes in contents",
    "Final total"
   ],
   "formula": "0.65 + 1.80 − 0.45",
   "formulas": [
    "0.65 + 1.80 − 0.45",
    "1.80 − 0.45",
    "0.65 + 1.80 + 0.45"
   ],
   "answer": "2",
   "explanation": "0.65 + 1.80 = 2.45; 2.45 − 0.45 = 2 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4M1",
   "topic": "Perimeter of a rectangle",
   "prompt": "A rectangular cake board is 32 cm long and 18 cm wide. What is its perimeter in centimetres?",
   "parts": [
    "Length: 32 cm",
    "Width: 18 cm",
    "Distance around the board"
   ],
   "labels": [
    "Length",
    "Width",
    "Perimeter"
   ],
   "formula": "(32 + 18) × 2",
   "formulas": [
    "(32 + 18) × 2",
    "32 × 18",
    "32 + 18"
   ],
   "answer": "100",
   "explanation": "The perimeter is 32 + 18 + 32 + 18 = 100 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4M1",
   "topic": "Finding a square's side",
   "prompt": "A square biscuit tin has a perimeter of 84 cm around its lid. What is the length of one side of the lid in centimetres?",
   "parts": [
    "Perimeter: 84 cm",
    "4 equal sides",
    "Length of one side"
   ],
   "labels": [
    "Total boundary length",
    "Equal side count",
    "Unknown side"
   ],
   "formula": "84 ÷ 4",
   "formulas": [
    "84 ÷ 4",
    "84 × 4",
    "84 ÷ 2"
   ],
   "answer": "21",
   "explanation": "A square has four equal sides, so each is 84 ÷ 4 = 21 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4M1",
   "topic": "Perimeter of a triangle",
   "prompt": "A triangular pastry has side lengths 13 cm, 14 cm and 15 cm. What is its perimeter in centimetres?",
   "parts": [
    "Two sides: 13 cm and 14 cm",
    "Third side: 15 cm",
    "Total boundary length"
   ],
   "labels": [
    "First two boundary lengths",
    "Remaining boundary length",
    "Perimeter"
   ],
   "formula": "13 + 14 + 15",
   "formulas": [
    "13 + 14 + 15",
    "13 × 14",
    "15 × 3"
   ],
   "answer": "42",
   "explanation": "Add all three sides: 13 + 14 + 15 = 42 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4M1",
   "topic": "Finding a rectangle's width",
   "prompt": "A rectangular baking mat has a perimeter of 90 cm and a length of 28 cm. What is its width in centimetres?",
   "parts": [
    "Perimeter: 90 cm",
    "Length: 28 cm",
    "Unknown width"
   ],
   "labels": [
    "Boundary total",
    "Known dimension",
    "Missing dimension"
   ],
   "formula": "90 ÷ 2 − 28",
   "formulas": [
    "90 ÷ 2 − 28",
    "90 − 28",
    "(90 − 28) ÷ 2"
   ],
   "answer": "17",
   "explanation": "Length plus width is 45 cm, so the width is 45 − 28 = 17 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4M2",
   "topic": "Area of a rectangle",
   "prompt": "A rectangular sheet of pastry is 24 cm long and 15 cm wide. What is its area in square centimetres?",
   "parts": [
    "Length: 24 cm",
    "Width: 15 cm",
    "Area in square centimetres"
   ],
   "labels": [
    "Length",
    "Width",
    "Area"
   ],
   "formula": "24 × 15",
   "formulas": [
    "24 × 15",
    "(24 + 15) × 2",
    "24 + 15"
   ],
   "answer": "360",
   "explanation": "The area is length × width = 24 × 15 = 360 square centimetres.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4M2",
   "topic": "Area of a square",
   "prompt": "A square cake board has sides of 18 cm. How many square centimetres of foil are needed to cover its top exactly, without overlap?",
   "parts": [
    "Square top",
    "Side length: 18 cm",
    "Foil area needed"
   ],
   "labels": [
    "Shape",
    "Dimension",
    "Surface area"
   ],
   "formula": "18 × 18",
   "formulas": [
    "18 × 18",
    "18 × 4",
    "18 + 18"
   ],
   "answer": "324",
   "explanation": "A square's area is side × side, giving 324 square centimetres.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4M2",
   "topic": "Measuring area by counting squares",
   "prompt": "A chocolate decoration consists of 4 complete rows of 6 tiles each, plus 3 extra tiles. Every tile is a square measuring 1 cm by 1 cm, and no tiles overlap. What is the decoration's area in square centimetres?",
   "parts": [
    "4 rows of 6 unit squares",
    "3 extra unit squares",
    "Total covered area"
   ],
   "labels": [
    "Main square count",
    "Additional square count",
    "Area"
   ],
   "formula": "4 × 6 + 3",
   "formulas": [
    "4 × 6 + 3",
    "4 × (6 + 3)",
    "4 + 6 + 3"
   ],
   "answer": "27",
   "explanation": "There are 24 + 3 = 27 tiles, each covering 1 square centimetre.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4M2",
   "topic": "Area units",
   "prompt": "A bakery floor is a rectangle 6 m long and 4 m wide. Which unit is suitable for stating its area: m, square metres or litres?",
   "parts": [
    "Bakery floor: 6 m by 4 m",
    "Measure the surface covered",
    "Choose the area unit"
   ],
   "labels": [
    "Measured object",
    "Quantity type",
    "Suitable unit"
   ],
   "formula": "Use square units for area measured with metre lengths",
   "formulas": [
    "Use square units for area measured with metre lengths",
    "Use metres because area is a boundary length",
    "Use litres because area is a capacity"
   ],
   "answer": "square metres",
   "explanation": "Area measures surface coverage, so metre dimensions give square metres.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S1",
   "topic": "Properties of quadrilaterals",
   "prompt": "A flat biscuit is a quadrilateral with four equal sides and four right angles. What is the most specific name of its shape?",
   "parts": [
    "Four-sided biscuit",
    "Four equal sides and four right angles",
    "Most specific shape name"
   ],
   "labels": [
    "Shape family",
    "Defining properties",
    "Classification"
   ],
   "formula": "Identify the quadrilateral with four equal sides and four right angles",
   "formulas": [
    "Identify the quadrilateral with four equal sides and four right angles",
    "Identify a quadrilateral with exactly one pair of parallel sides",
    "Identify a quadrilateral with no right angles"
   ],
   "answer": "square",
   "explanation": "A square has four equal sides and four right angles.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S1",
   "topic": "Properties of a rhombus",
   "prompt": "A pastry cutter is shaped like a non-square rhombus. One side is 7 cm long. How long is the opposite side in centimetres?",
   "parts": [
    "Non-square rhombus cutter",
    "One side: 7 cm",
    "Opposite side length"
   ],
   "labels": [
    "Named shape",
    "Known side",
    "Required side"
   ],
   "formula": "Use the property that all four sides of a rhombus are equal",
   "formulas": [
    "Use the property that all four sides of a rhombus are equal",
    "Double the known side length",
    "Divide the known side length by four"
   ],
   "answer": "7",
   "explanation": "Every side of a rhombus has the same length.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S1",
   "topic": "Recognising a trapezium",
   "prompt": "A four-sided cake label has exactly one pair of parallel sides. Which shape is it: a trapezium, a parallelogram or a rectangle?",
   "parts": [
    "Four-sided label",
    "Exactly one parallel pair",
    "Choose its shape name"
   ],
   "labels": [
    "Number of sides",
    "Parallel-side property",
    "Classification"
   ],
   "formula": "Identify the quadrilateral with exactly one pair of parallel sides",
   "formulas": [
    "Identify the quadrilateral with exactly one pair of parallel sides",
    "Identify the quadrilateral with two pairs of parallel sides",
    "Identify the quadrilateral with four right angles"
   ],
   "answer": "trapezium",
   "explanation": "A trapezium has one pair of parallel sides; the other choices have two pairs.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S1",
   "topic": "Properties of a parallelogram",
   "prompt": "A flat chocolate plaque is a parallelogram with no right angles. How many pairs of parallel opposite sides does it have?",
   "parts": [
    "Parallelogram plaque",
    "Consider opposite sides",
    "Number of parallel pairs"
   ],
   "labels": [
    "Named shape",
    "Property examined",
    "Pair count"
   ],
   "formula": "Count the two pairs of parallel opposite sides of a parallelogram",
   "formulas": [
    "Count the two pairs of parallel opposite sides of a parallelogram",
    "Count only one pair as for a trapezium",
    "Count the four sides individually as four pairs"
   ],
   "answer": "2",
   "explanation": "Both pairs of opposite sides of a parallelogram are parallel.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S2",
   "topic": "Dissecting a rectangle",
   "prompt": "A rectangular pastry sheet is cut once along a straight line joining one corner to the opposite corner. What shape is each of the two pieces?",
   "parts": [
    "Rectangular pastry sheet",
    "One corner-to-opposite-corner cut",
    "Shape of each piece"
   ],
   "labels": [
    "Original shape",
    "Dissection rule",
    "Resulting shape"
   ],
   "formula": "Trace the three sides of each piece after the diagonal cut",
   "formulas": [
    "Trace the three sides of each piece after the diagonal cut",
    "Keep the original four-sided outline for each piece",
    "Treat the cut as joining the midpoints of opposite sides"
   ],
   "answer": "triangle",
   "explanation": "Each piece has two original boundary sides and the cut edge, making three sides.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S2",
   "topic": "Dissecting a square",
   "prompt": "A square pastry sheet has sides of 12 cm. A straight cut joins the midpoint of its top side to the midpoint of its bottom side. What is the most specific shape name for each piece?",
   "parts": [
    "Square sheet: 12 cm sides",
    "Cut between top and bottom midpoints",
    "Shape of each half"
   ],
   "labels": [
    "Original shape",
    "Cut position",
    "Resulting shape"
   ],
   "formula": "Identify each four-right-angle piece with side lengths 12 cm and 6 cm",
   "formulas": [
    "Identify each four-right-angle piece with side lengths 12 cm and 6 cm",
    "Identify each piece as having three sides",
    "Assume each piece still has four equal sides"
   ],
   "answer": "rectangle",
   "explanation": "Each half is 12 cm by 6 cm with four right angles, so it is a rectangle.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S2",
   "topic": "Counting dissected pieces",
   "prompt": "A square cake is cut along both diagonals, each joining a pair of opposite corners. The pieces stay in place during cutting. How many triangular pieces result?",
   "parts": [
    "Square cake",
    "Both diagonals cut",
    "Number of triangular pieces"
   ],
   "labels": [
    "Original shape",
    "Cut arrangement",
    "Piece count"
   ],
   "formula": "Count the four regions formed by the two diagonals",
   "formulas": [
    "Count the four regions formed by the two diagonals",
    "Count only the two cutting lines",
    "Count the original square as one piece"
   ],
   "answer": "4",
   "explanation": "The diagonals meet at the centre and divide the square into four triangles.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S2",
   "topic": "Dissecting a triangle",
   "prompt": "A triangular pastry has corners A, B and C. Point M is the midpoint of side BC. A straight cut joins A to M. How many pieces are formed?",
   "parts": [
    "Triangle ABC",
    "One straight cut from A to M on BC",
    "Number of pieces"
   ],
   "labels": [
    "Original boundary",
    "Dissection segment",
    "Resulting count"
   ],
   "formula": "Count the two regions ABM and ACM",
   "formulas": [
    "Count the two regions ABM and ACM",
    "Count the three original corners as pieces",
    "Count four pieces as if both diagonals of a square were cut"
   ],
   "answer": "2",
   "explanation": "The cut divides the pastry into triangles ABM and ACM.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S3",
   "topic": "Eight compass directions",
   "prompt": "On a bakery kitchen plan, north is up and east is right. From the mixing table, the oven is 2 squares north and 2 squares east. In which compass direction is the oven from the mixing table?",
   "parts": [
    "Start at the mixing table",
    "2 squares north and 2 squares east",
    "Direction to the oven"
   ],
   "labels": [
    "Reference position",
    "Relative displacement",
    "Compass direction"
   ],
   "formula": "Combine equal northward and eastward movements",
   "formulas": [
    "Combine equal northward and eastward movements",
    "Combine northward and westward movements",
    "Reverse both movements"
   ],
   "answer": "northeast",
   "explanation": "A position equally north and east of the start is northeast.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S3",
   "topic": "Opposite directions",
   "prompt": "The bakery's flour store is northwest of its oven. In which compass direction is the oven from the flour store?",
   "parts": [
    "Flour store is northwest of oven",
    "Start at the flour store",
    "Direction back to oven"
   ],
   "labels": [
    "Given relationship",
    "New reference position",
    "Reverse direction"
   ],
   "formula": "Find the compass direction opposite northwest",
   "formulas": [
    "Find the compass direction opposite northwest",
    "Keep northwest without reversing the reference point",
    "Find the compass direction opposite northeast"
   ],
   "answer": "southeast",
   "explanation": "Reversing northwest gives southeast.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S3",
   "topic": "Directions after a turn",
   "prompt": "In a kitchen, a chef faces north. She makes a quarter-turn to her left to face the sink. In which compass direction is she now facing?",
   "parts": [
    "Initially facing north",
    "Quarter-turn left",
    "New facing direction"
   ],
   "labels": [
    "Starting direction",
    "Turn instruction",
    "Final direction"
   ],
   "formula": "Move one quarter-turn anticlockwise from north",
   "formulas": [
    "Move one quarter-turn anticlockwise from north",
    "Move one quarter-turn clockwise from north",
    "Move a half-turn from north"
   ],
   "answer": "west",
   "explanation": "A quarter-turn left from north points west.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4S3",
   "topic": "Finding a position from a direction",
   "prompt": "From the bakery counter, the bread rack is southwest, the cake fridge is southeast and the sink is northwest. Which place is southwest of the counter?",
   "parts": [
    "Reference point: counter",
    "Bread rack SW; cake fridge SE; sink NW",
    "Place to the southwest"
   ],
   "labels": [
    "Reference position",
    "Position list",
    "Required destination"
   ],
   "formula": "Match southwest to the listed place",
   "formulas": [
    "Match southwest to the listed place",
    "Match southeast to the listed place",
    "Match northwest to the listed place"
   ],
   "answer": "bread rack",
   "explanation": "The position list places the bread rack southwest of the counter.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4D1",
   "topic": "Reading a bar-chart scale",
   "prompt": "A bakery bar chart uses 5 buns per vertical grid interval. Its bar-height table is: Type | Height in grid intervals; Plain | 4; Raisin | 7; Cheese | 5. How many raisin buns does the chart represent?",
   "parts": [
    "Raisin bar: 7 grid intervals",
    "5 buns per interval",
    "Raisin bun count"
   ],
   "labels": [
    "Bar height",
    "Scale",
    "Represented frequency"
   ],
   "formula": "7 × 5",
   "formulas": [
    "7 × 5",
    "7 + 5",
    "7 × 4"
   ],
   "answer": "35",
   "explanation": "Seven intervals at 5 buns each represent 35 raisin buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4D1",
   "topic": "Comparing bars",
   "prompt": "A bakery bar chart uses 4 tarts per vertical grid interval. Its bar-height table is: Flavour | Height in grid intervals; Egg | 8; Coconut | 5; Fruit | 6. How many more egg tarts than coconut tarts are represented?",
   "parts": [
    "Egg bar: 8; coconut bar: 5",
    "4 tarts per interval",
    "Difference in tart counts"
   ],
   "labels": [
    "Compared bar heights",
    "Scale",
    "Frequency difference"
   ],
   "formula": "(8 − 5) × 4",
   "formulas": [
    "(8 − 5) × 4",
    "8 − 5",
    "(8 + 5) × 4"
   ],
   "answer": "12",
   "explanation": "The bars differ by 3 intervals, representing 3 × 4 = 12 tarts.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4D1",
   "topic": "Finding a total from bars",
   "prompt": "A cooking club's bar chart uses 10 biscuits per vertical grid interval. Its bar-height table is: Group | Height in grid intervals; A | 3; B | 5; C | 4. How many biscuits did the three groups bake altogether?",
   "parts": [
    "Bar heights: 3, 5 and 4",
    "10 biscuits per interval",
    "Total biscuits"
   ],
   "labels": [
    "Category data",
    "Scale",
    "Combined frequency"
   ],
   "formula": "(3 + 5 + 4) × 10",
   "formulas": [
    "(3 + 5 + 4) × 10",
    "3 + 5 + 4",
    "(5 − 3) × 10"
   ],
   "answer": "120",
   "explanation": "The bars total 12 intervals, representing 120 biscuits.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "4D1",
   "topic": "Constructing a bar",
   "prompt": "A bakery records muffin sales in this table: Flavour | Muffins sold; Banana | 18; Blueberry | 30; Chocolate | 24. A bar chart will use 6 muffins per vertical grid interval. How many grid intervals tall should the blueberry bar be?",
   "parts": [
    "Blueberry muffins sold: 30",
    "6 muffins per interval",
    "Required bar height"
   ],
   "labels": [
    "Frequency",
    "Chosen scale",
    "Number of grid intervals"
   ],
   "formula": "30 ÷ 6",
   "formulas": [
    "30 ÷ 6",
    "30 × 6",
    "30 − 6"
   ],
   "answer": "5",
   "explanation": "30 muffins require 30 ÷ 6 = 5 grid intervals.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  }
 ],
 "P5": [
  {
   "unit": "5N1",
   "topic": "Multi-digit numbers",
   "prompt": "A bakery warehouse has 1,250,000 paper cases. Its stock counter counts backwards by 10,000 after each delivery. What does it show after 3 deliveries?",
   "parts": [
    "The counter starts at 1,250,000.",
    "Count backwards by 10,000 three times.",
    "Find the final reading."
   ],
   "labels": [
    "Starting number",
    "Backward counting rule",
    "Final number"
   ],
   "formula": "1,250,000 − 3 × 10,000",
   "formulas": [
    "1,250,000 + 3 × 10,000",
    "1,250,000 − 3 × 10,000",
    "1,250,000 − 10,000"
   ],
   "answer": "1220000",
   "explanation": "The readings are 1,240,000, 1,230,000 and 1,220,000.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N1",
   "topic": "Multi-digit numbers",
   "prompt": "A flour supplier records these decreasing stock readings in grams: 8,640,000; 8,540,000; 8,440,000. The same amount is removed each time. What is the next reading?",
   "parts": [
    "The readings are 8,640,000; 8,540,000; 8,440,000.",
    "The decrease is the same each time.",
    "Find the next reading."
   ],
   "labels": [
    "Given sequence",
    "Pattern condition",
    "Next number"
   ],
   "formula": "8,440,000 − 100,000",
   "formulas": [
    "8,440,000 − 10,000",
    "8,440,000 + 100,000",
    "8,440,000 − 100,000"
   ],
   "answer": "8340000",
   "explanation": "Each reading decreases by 100,000, so the next is 8,340,000.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N1",
   "topic": "Multi-digit numbers",
   "prompt": "A biscuit factory's label counter starts at 6,400,000. It counts backwards by 100,000 at each step until it reaches 6,000,000. How many steps does it take?",
   "parts": [
    "Start at 6,400,000 and stop at 6,000,000.",
    "Each backward step is 100,000.",
    "Find the number of steps."
   ],
   "labels": [
    "Start and finish",
    "Step size",
    "Step count"
   ],
   "formula": "(6,400,000 − 6,000,000) ÷ 100,000",
   "formulas": [
    "(6,400,000 − 6,000,000) ÷ 100,000",
    "(6,400,000 − 6,000,000) ÷ 10,000",
    "6,400,000 ÷ 100,000"
   ],
   "answer": "4",
   "explanation": "The decrease is 400,000, which is four steps of 100,000.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N1",
   "topic": "Multi-digit numbers",
   "prompt": "A bakery's wrapping counter counts backwards by 1,000 for each bundle used. After 5 bundles, it shows 4,995,000. What was the reading before those bundles were used?",
   "parts": [
    "The final reading is 4,995,000.",
    "There were five backward steps of 1,000.",
    "Find the starting reading."
   ],
   "labels": [
    "Final reading",
    "Completed steps",
    "Starting reading"
   ],
   "formula": "4,995,000 + 5 × 1,000",
   "formulas": [
    "4,995,000 − 5 × 1,000",
    "4,995,000 + 1,000",
    "4,995,000 + 5 × 1,000"
   ],
   "answer": "5000000",
   "explanation": "Undo the five backward steps by adding 5,000.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N2",
   "topic": "Fractions (III)",
   "prompt": "For three kinds of bread, a baker uses 1/2 kg, 1/3 kg and 1/4 kg of flour. How many kilograms of flour are used altogether?",
   "parts": [
    "The first bread uses 1/2 kg.",
    "The other breads use 1/3 kg and 1/4 kg.",
    "Find the total flour used."
   ],
   "labels": [
    "First amount",
    "Other amounts",
    "Combined amount"
   ],
   "formula": "1/2 + 1/3 + 1/4",
   "formulas": [
    "1/2 + 1/3 − 1/4",
    "1/2 + 1/3 + 1/4",
    "1/2 − 1/3 + 1/4"
   ],
   "answer": "13/12",
   "explanation": "Using twelfths gives 6/12 + 4/12 + 3/12 = 13/12 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N2",
   "topic": "Fractions (III)",
   "prompt": "A bowl contains 7/8 kg of icing. A baker uses 1/4 kg on cupcakes and 1/6 kg on biscuits. How many kilograms of icing remain?",
   "parts": [
    "The bowl starts with 7/8 kg.",
    "The baker uses 1/4 kg and 1/6 kg.",
    "Find the icing remaining."
   ],
   "labels": [
    "Initial amount",
    "Amounts used",
    "Remaining amount"
   ],
   "formula": "7/8 − 1/4 − 1/6",
   "formulas": [
    "7/8 − 1/4 + 1/6",
    "7/8 + 1/4 + 1/6",
    "7/8 − 1/4 − 1/6"
   ],
   "answer": "11/24",
   "explanation": "In twenty-fourths, 21/24 − 6/24 − 4/24 = 11/24 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N2",
   "topic": "Fractions (III)",
   "prompt": "A jug contains 1/2 L of milk. A cook adds 1/3 L, then pours 1/5 L into pancake batter. How many litres remain in the jug?",
   "parts": [
    "The jug contains 1/2 L.",
    "Add 1/3 L, then remove 1/5 L.",
    "Find the final amount."
   ],
   "labels": [
    "Starting volume",
    "Volume changes",
    "Final volume"
   ],
   "formula": "1/2 + 1/3 − 1/5",
   "formulas": [
    "1/2 + 1/3 − 1/5",
    "1/2 − 1/3 − 1/5",
    "1/2 + 1/3 + 1/5"
   ],
   "answer": "19/30",
   "explanation": "15/30 + 10/30 − 6/30 = 19/30 L.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N2",
   "topic": "Fractions (III)",
   "prompt": "A bread recipe needs 1 kg of flour. Three bowls contain 1/2 kg, 1/4 kg and 1/8 kg. If all this flour is used, how many more kilograms are needed?",
   "parts": [
    "The recipe needs 1 kg.",
    "The bowls contain 1/2 kg, 1/4 kg and 1/8 kg.",
    "Find the extra flour needed."
   ],
   "labels": [
    "Required amount",
    "Available amounts",
    "Shortfall"
   ],
   "formula": "1 − (1/2 + 1/4 + 1/8)",
   "formulas": [
    "1/2 + 1/4 + 1/8",
    "1 − (1/2 + 1/4 + 1/8)",
    "1 − 1/2 + 1/4 + 1/8"
   ],
   "answer": "1/8",
   "explanation": "The bowls hold 7/8 kg altogether, leaving a shortfall of 1/8 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N3",
   "topic": "Fractions (IV)",
   "prompt": "One full batch of muffins needs 3/4 kg of flour. A baker makes 2/3 of a batch. How many kilograms of flour are needed?",
   "parts": [
    "A full batch needs 3/4 kg.",
    "The baker makes 2/3 of a batch.",
    "Find the flour needed."
   ],
   "labels": [
    "Full-batch amount",
    "Batch fraction",
    "Scaled amount"
   ],
   "formula": "3/4 × 2/3",
   "formulas": [
    "3/4 + 2/3",
    "3/4 − 2/3",
    "3/4 × 2/3"
   ],
   "answer": "1/2",
   "explanation": "3/4 × 2/3 = 6/12 = 1/2 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N3",
   "topic": "Fractions (IV)",
   "prompt": "A bag holds 1 1/2 kg of flour. A baker uses 2/3 of the bag's flour, and 3/5 of that used flour goes into rolls. How many kilograms go into rolls?",
   "parts": [
    "The bag holds 1 1/2 kg.",
    "Use 2/3 of it, then take 3/5 of that for rolls.",
    "Find the flour used for rolls."
   ],
   "labels": [
    "Whole amount",
    "Successive fractions",
    "Final portion"
   ],
   "formula": "1 1/2 × 2/3 × 3/5",
   "formulas": [
    "1 1/2 × 2/3 × 3/5",
    "1 1/2 × 2/3 + 3/5",
    "1 1/2 × 3/5"
   ],
   "answer": "3/5",
   "explanation": "3/2 × 2/3 = 1 kg is used; 3/5 of it is 3/5 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N3",
   "topic": "Fractions (IV)",
   "prompt": "A bakery makes 18 fruit tarts. It packs 5/6 of them for a school lunch. How many tarts are packed?",
   "parts": [
    "There are 18 tarts.",
    "The bakery packs 5/6 of them.",
    "Find the number packed."
   ],
   "labels": [
    "Whole group",
    "Selected fraction",
    "Selected number"
   ],
   "formula": "18 × 5/6",
   "formulas": [
    "18 ÷ 6",
    "18 × 5/6",
    "18 × 1/6"
   ],
   "answer": "15",
   "explanation": "One sixth is 3 tarts, so five sixths is 15 tarts.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N3",
   "topic": "Fractions (IV)",
   "prompt": "A baker has 3/4 of the original dough left. She uses 2/3 of this remaining dough for rolls. Half of the roll dough is for sesame rolls. What fraction of the original dough is used for sesame rolls?",
   "parts": [
    "3/4 of the original dough remains.",
    "2/3 becomes roll dough; 1/2 of that is for sesame rolls.",
    "Find the fraction of the original dough."
   ],
   "labels": [
    "Remaining fraction",
    "Further selections",
    "Original-whole fraction"
   ],
   "formula": "3/4 × 2/3 × 1/2",
   "formulas": [
    "3/4 × 2/3",
    "3/4 × 1/2",
    "3/4 × 2/3 × 1/2"
   ],
   "answer": "1/4",
   "explanation": "3/4 × 2/3 × 1/2 = 6/24 = 1/4 of the original dough.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N4",
   "topic": "Decimals (III)",
   "prompt": "Each tray of bread dough has a mass of 1.25 kg. What is the total mass of dough on 8 trays?",
   "parts": [
    "Each tray holds 1.25 kg of dough.",
    "There are 8 trays.",
    "Find the total dough mass."
   ],
   "labels": [
    "Mass per tray",
    "Number of trays",
    "Total mass"
   ],
   "formula": "1.25 × 8",
   "formulas": [
    "1.25 × 8",
    "1.25 + 8",
    "1.25 ÷ 8"
   ],
   "answer": "10",
   "explanation": "1.25 × 8 = 10 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N4",
   "topic": "Decimals (III)",
   "prompt": "A cook shares 7.2 L of soup equally among 6 containers. How many litres go into each container?",
   "parts": [
    "There are 7.2 L of soup.",
    "Use 6 equal containers.",
    "Find the volume in each."
   ],
   "labels": [
    "Total volume",
    "Number of equal shares",
    "Volume per share"
   ],
   "formula": "7.2 ÷ 6",
   "formulas": [
    "7.2 × 6",
    "7.2 ÷ 6",
    "7.2 − 6"
   ],
   "answer": "1.2",
   "explanation": "7.2 ÷ 6 = 1.2 L per container.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N4",
   "topic": "Decimals (III)",
   "prompt": "A recipe needs 0.048 kg of yeast. Given that 1 kg = 1,000 g, how many grams of yeast are needed?",
   "parts": [
    "The yeast has a mass of 0.048 kg.",
    "1 kg equals 1,000 g.",
    "Express the mass in grams."
   ],
   "labels": [
    "Given mass",
    "Conversion fact",
    "Requested unit"
   ],
   "formula": "0.048 × 1,000",
   "formulas": [
    "0.048 ÷ 1,000",
    "0.048 × 100",
    "0.048 × 1,000"
   ],
   "answer": "48",
   "explanation": "Multiply kilograms by 1,000: 0.048 × 1,000 = 48 g.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N4",
   "topic": "Decimals (III)",
   "prompt": "Ten identical piping nozzles cost HK$37.50 altogether. What is the cost of one nozzle in Hong Kong dollars?",
   "parts": [
    "The total cost is HK$37.50.",
    "There are 10 identical nozzles.",
    "Find the price of one nozzle."
   ],
   "labels": [
    "Total cost",
    "Item count",
    "Unit price"
   ],
   "formula": "37.50 ÷ 10",
   "formulas": [
    "37.50 ÷ 10",
    "37.50 × 10",
    "37.50 − 10"
   ],
   "answer": "3.75",
   "explanation": "Dividing 37.50 by 10 gives HK$3.75 per nozzle.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N5",
   "topic": "Fractions (V)",
   "prompt": "Three identical cakes are shared equally among 8 families. How much cake does each family receive? Give the answer as a fraction of one cake in simplest form.",
   "parts": [
    "There are 3 identical cakes.",
    "Share them equally among 8 families.",
    "Find each family's share as a fraction."
   ],
   "labels": [
    "Total cakes",
    "Number of recipients",
    "Fractional share"
   ],
   "formula": "Write 3 ÷ 8 as 3/8",
   "formulas": [
    "Write 8 ÷ 3 as 8/3",
    "Write 3 ÷ 8 as 3/8",
    "Write 1 ÷ 8 as 1/8"
   ],
   "answer": "3/8",
   "explanation": "Each family receives 3 ÷ 8 = 3/8 of a cake.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N5",
   "topic": "Fractions (V)",
   "prompt": "A biscuit recipe uses 0.35 kg of butter. Express this mass as a fraction of a kilogram in simplest form.",
   "parts": [
    "The butter has a mass of 0.35 kg.",
    "Use a fraction of one kilogram.",
    "Give the fraction in simplest form."
   ],
   "labels": [
    "Decimal quantity",
    "Fraction unit",
    "Required simplification"
   ],
   "formula": "Write 0.35 as 35/100, then simplify",
   "formulas": [
    "Write 0.35 as 35/10, then simplify",
    "Write 0.35 as 35/1,000, then simplify",
    "Write 0.35 as 35/100, then simplify"
   ],
   "answer": "7/20",
   "explanation": "35/100 simplifies to 7/20 by dividing both numbers by 5.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N5",
   "topic": "Fractions (V)",
   "prompt": "A custard recipe needs 7/8 L of milk. Express the required volume as an exact decimal number of litres.",
   "parts": [
    "The recipe needs 7/8 L.",
    "Use decimal notation.",
    "Find the exact decimal volume."
   ],
   "labels": [
    "Fractional volume",
    "Required notation",
    "Decimal value"
   ],
   "formula": "7 ÷ 8",
   "formulas": [
    "7 ÷ 8",
    "8 ÷ 7",
    "7 ÷ 10"
   ],
   "answer": "0.875",
   "explanation": "A fraction represents division: 7/8 = 7 ÷ 8 = 0.875.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5N5",
   "topic": "Fractions (V)",
   "prompt": "A tray holds 20 buns, of which 12 have jam filling. What fraction of the buns have jam filling? Give the answer in simplest form.",
   "parts": [
    "There are 20 buns altogether.",
    "12 buns have jam filling.",
    "Find the jam-filled fraction."
   ],
   "labels": [
    "Whole group",
    "Selected group",
    "Part-to-whole fraction"
   ],
   "formula": "12/20, simplified",
   "formulas": [
    "20/12, simplified",
    "12/20, simplified",
    "(20 − 12)/20, simplified"
   ],
   "answer": "3/5",
   "explanation": "The fraction is 12/20, which simplifies to 3/5.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5A1",
   "topic": "Elementary algebra",
   "prompt": "A bakery uses b for the number of buns on one tray. Four equally filled trays contain 4b buns. If b = 6, how many buns are on the four trays?",
   "parts": [
    "b represents buns on one tray.",
    "The total is 4b and b = 6.",
    "Find the value of 4b."
   ],
   "labels": [
    "Letter meaning",
    "Expression and substitution",
    "Expression value"
   ],
   "formula": "Substitute b = 6 into 4b: 4 × 6",
   "formulas": [
    "Substitute b = 6 using 4 + 6",
    "Substitute b = 6 using 6 ÷ 4",
    "Substitute b = 6 into 4b: 4 × 6"
   ],
   "answer": "24",
   "explanation": "4b means 4 × b, so 4 × 6 = 24 buns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5A1",
   "topic": "Elementary algebra",
   "prompt": "A baker starts with n biscuits and sells 7. The number left is n − 7. Find the number left when n = 25.",
   "parts": [
    "n is the starting number of biscuits.",
    "The remaining number is n − 7.",
    "Evaluate it when n = 25."
   ],
   "labels": [
    "Variable meaning",
    "Algebraic expression",
    "Substitution task"
   ],
   "formula": "25 − 7",
   "formulas": [
    "25 − 7",
    "25 + 7",
    "25 × 7"
   ],
   "answer": "18",
   "explanation": "Replace n with 25: 25 − 7 = 18 biscuits.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5A1",
   "topic": "Elementary algebra",
   "prompt": "A cake costs p Hong Kong dollars. A gift box adds HK$3, so the boxed cake costs p + 3 dollars. What is the boxed price when p = 12?",
   "parts": [
    "p is the cake's price.",
    "The boxed price is p + 3.",
    "Find the price when p = 12."
   ],
   "labels": [
    "Base-price variable",
    "Price expression",
    "Evaluated price"
   ],
   "formula": "12 + 3",
   "formulas": [
    "12 − 3",
    "12 + 3",
    "12 × 3"
   ],
   "answer": "15",
   "explanation": "Substitute 12 for p: 12 + 3 = HK$15.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5A1",
   "topic": "Elementary algebra",
   "prompt": "A cook shares f litres of fruit punch equally among 5 jugs. Each jug receives f ÷ 5 litres. Find this amount when f = 30.",
   "parts": [
    "f is the total volume of punch.",
    "Each jug receives f ÷ 5 litres.",
    "Evaluate the amount when f = 30."
   ],
   "labels": [
    "Total-volume variable",
    "Equal-share expression",
    "Value per jug"
   ],
   "formula": "30 ÷ 5",
   "formulas": [
    "30 × 5",
    "30 − 5",
    "30 ÷ 5"
   ],
   "answer": "6",
   "explanation": "Replace f with 30: 30 ÷ 5 = 6 L per jug.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5A2",
   "topic": "Simple equations (I)",
   "prompt": "A bakery has x bread rolls. After baking 18 more, it has 45 rolls. Solve x + 18 = 45 to find the starting number.",
   "parts": [
    "The starting number is x.",
    "Adding 18 gives 45.",
    "Solve x + 18 = 45."
   ],
   "labels": [
    "Unknown starting quantity",
    "Change and result",
    "Equation to solve"
   ],
   "formula": "x = 45 − 18",
   "formulas": [
    "x = 45 − 18",
    "x = 45 + 18",
    "x = 45 ÷ 18"
   ],
   "answer": "27",
   "explanation": "Subtract 18 from 45. Check: 27 + 18 = 45.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5A2",
   "topic": "Simple equations (I)",
   "prompt": "A baker makes x cupcakes and sells 16, leaving 29. Solve x − 16 = 29 to find how many cupcakes were made.",
   "parts": [
    "The baker makes x cupcakes.",
    "Selling 16 leaves 29.",
    "Solve x − 16 = 29."
   ],
   "labels": [
    "Unknown original quantity",
    "Removal and remainder",
    "Required equation"
   ],
   "formula": "x = 29 + 16",
   "formulas": [
    "x = 29 − 16",
    "x = 29 + 16",
    "x = 29 × 16"
   ],
   "answer": "45",
   "explanation": "Add back the 16 sold. Check: 45 − 16 = 29.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5A2",
   "topic": "Simple equations (I)",
   "prompt": "Six identical packets each contain x cookies. Altogether they contain 54 cookies. Solve 6x = 54 to find the number in each packet.",
   "parts": [
    "Each packet contains x cookies.",
    "Six packets contain 54 cookies.",
    "Solve 6x = 54."
   ],
   "labels": [
    "Unknown group size",
    "Group count and total",
    "Multiplication equation"
   ],
   "formula": "x = 54 ÷ 6",
   "formulas": [
    "x = 54 × 6",
    "x = 54 − 6",
    "x = 54 ÷ 6"
   ],
   "answer": "9",
   "explanation": "Divide 54 by 6. Check: 6 × 9 = 54.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5A2",
   "topic": "Simple equations (I)",
   "prompt": "A cook divides x strawberries equally among 4 dessert bowls. Each bowl receives 12 strawberries. Solve x ÷ 4 = 12 to find the total number of strawberries.",
   "parts": [
    "The total number is x.",
    "Four equal bowls each receive 12.",
    "Solve x ÷ 4 = 12."
   ],
   "labels": [
    "Unknown total",
    "Sharing information",
    "Division equation"
   ],
   "formula": "x = 12 × 4",
   "formulas": [
    "x = 12 × 4",
    "x = 12 ÷ 4",
    "x = 12 + 4"
   ],
   "answer": "48",
   "explanation": "Multiply 12 by 4. Check: 48 ÷ 4 = 12.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5M1",
   "topic": "Area (II)",
   "prompt": "A triangular pastry has a base of 12 cm and a perpendicular height of 7 cm. What is its area in square centimetres?",
   "parts": [
    "The triangular base is 12 cm.",
    "Its perpendicular height is 7 cm.",
    "Find the area in cm²."
   ],
   "labels": [
    "Base length",
    "Perpendicular height",
    "Required area"
   ],
   "formula": "12 × 7 ÷ 2",
   "formulas": [
    "12 × 7",
    "12 × 7 ÷ 2",
    "(12 + 7) × 2"
   ],
   "answer": "42",
   "explanation": "A triangle's area is base × perpendicular height ÷ 2, giving 42 cm².",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5M1",
   "topic": "Area (II)",
   "prompt": "A parallelogram-shaped sheet of pastry has an area of 96 cm² and a base of 12 cm. What is its perpendicular height in centimetres?",
   "parts": [
    "The area is 96 cm².",
    "The base is 12 cm.",
    "Find the perpendicular height."
   ],
   "labels": [
    "Known area",
    "Known base",
    "Unknown height"
   ],
   "formula": "96 ÷ 12",
   "formulas": [
    "96 × 12",
    "96 ÷ 12 ÷ 2",
    "96 ÷ 12"
   ],
   "answer": "8",
   "explanation": "Area = base × height, so height = 96 ÷ 12 = 8 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5M1",
   "topic": "Area (II)",
   "prompt": "A trapezium-shaped biscuit has parallel sides of 8 cm and 14 cm. The perpendicular distance between them is 5 cm. Find its area in square centimetres.",
   "parts": [
    "The parallel sides are 8 cm and 14 cm.",
    "Their perpendicular distance is 5 cm.",
    "Find the biscuit's area."
   ],
   "labels": [
    "Parallel-side lengths",
    "Trapezium height",
    "Area to calculate"
   ],
   "formula": "(8 + 14) × 5 ÷ 2",
   "formulas": [
    "(8 + 14) × 5 ÷ 2",
    "(8 + 14) × 5",
    "(14 − 8) × 5 ÷ 2"
   ],
   "answer": "55",
   "explanation": "Add the parallel sides, multiply by the height, then halve: 22 × 5 ÷ 2 = 55 cm².",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5M1",
   "topic": "Area (II)",
   "prompt": "A convex quadrilateral cake decoration is divided by an internal diagonal of length 10 cm into two triangles. The perpendicular heights from the other two vertices to this diagonal are 4 cm and 6 cm. What is the decoration's total area in square centimetres?",
   "parts": [
    "The shared diagonal is 10 cm.",
    "The two triangle heights are 4 cm and 6 cm.",
    "Find the combined area."
   ],
   "labels": [
    "Shared base",
    "Separate heights",
    "Whole quadrilateral area"
   ],
   "formula": "10 × 4 ÷ 2 + 10 × 6 ÷ 2",
   "formulas": [
    "10 × 4 + 10 × 6",
    "10 × 4 ÷ 2 + 10 × 6 ÷ 2",
    "10 × (6 − 4) ÷ 2"
   ],
   "answer": "50",
   "explanation": "The two triangle areas are 20 cm² and 30 cm², totalling 50 cm².",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5M2",
   "topic": "Volume (I)",
   "prompt": "A rectangular baking tray has an internal length of 30 cm, width of 20 cm and depth of 4 cm. Treat its inside as a cuboid. What is its internal volume in cubic centimetres?",
   "parts": [
    "The internal base is 30 cm by 20 cm.",
    "The internal depth is 4 cm.",
    "Find the internal volume."
   ],
   "labels": [
    "Base dimensions",
    "Depth",
    "Cuboid volume"
   ],
   "formula": "30 × 20 × 4",
   "formulas": [
    "30 × 20",
    "30 + 20 + 4",
    "30 × 20 × 4"
   ],
   "answer": "2400",
   "explanation": "Cuboid volume = length × width × height = 2,400 cm³.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5M2",
   "topic": "Volume (I)",
   "prompt": "A solid cube of cake has an edge length of 5 cm. All its edges are equal. What is its volume in cubic centimetres?",
   "parts": [
    "The cake is a solid cube.",
    "Every edge is 5 cm.",
    "Find its volume in cm³."
   ],
   "labels": [
    "Solid shape",
    "Edge length",
    "Required volume"
   ],
   "formula": "5 × 5 × 5",
   "formulas": [
    "5 × 5 × 5",
    "5 × 5",
    "6 × 5 × 5"
   ],
   "answer": "125",
   "explanation": "The cube's length, width and height are all 5 cm, so its volume is 125 cm³.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5M2",
   "topic": "Volume (I)",
   "prompt": "A rectangular box has internal dimensions 10 cm by 6 cm by 4 cm. It is filled completely, without gaps, with sugar cubes of edge length 2 cm, aligned with the box. How many sugar cubes fit?",
   "parts": [
    "The box measures 10 cm by 6 cm by 4 cm inside.",
    "Each sugar cube has edge length 2 cm.",
    "Find the number of cubes that fill it."
   ],
   "labels": [
    "Container dimensions",
    "Unit-cube dimensions",
    "Cube count"
   ],
   "formula": "(10 ÷ 2) × (6 ÷ 2) × (4 ÷ 2)",
   "formulas": [
    "10 × 6 × 4 ÷ 2",
    "(10 ÷ 2) × (6 ÷ 2) × (4 ÷ 2)",
    "(10 ÷ 2) + (6 ÷ 2) + (4 ÷ 2)"
   ],
   "answer": "30",
   "explanation": "There are 5 cubes along, 3 across and 2 layers: 5 × 3 × 2 = 30.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5M2",
   "topic": "Volume (I)",
   "prompt": "A cuboid block of butter has a volume of 360 cm³. Its length is 12 cm and its width is 5 cm. What is its height in centimetres?",
   "parts": [
    "The volume is 360 cm³.",
    "The base measures 12 cm by 5 cm.",
    "Find the height."
   ],
   "labels": [
    "Known volume",
    "Base measurements",
    "Missing dimension"
   ],
   "formula": "360 ÷ (12 × 5)",
   "formulas": [
    "360 ÷ 12 × 5",
    "360 ÷ (12 + 5)",
    "360 ÷ (12 × 5)"
   ],
   "answer": "6",
   "explanation": "The base area is 60 cm²; 360 ÷ 60 gives a height of 6 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5S1",
   "topic": "Circles",
   "prompt": "The circular top of a cake has a diameter of 18 cm. What is the distance from its centre to its circumference, in centimetres?",
   "parts": [
    "The cake top is circular.",
    "Its diameter is 18 cm.",
    "Find the centre-to-circumference distance."
   ],
   "labels": [
    "Shape",
    "Known diameter",
    "Required radius"
   ],
   "formula": "18 ÷ 2",
   "formulas": [
    "18 ÷ 2",
    "18 × 2",
    "Use 18 unchanged"
   ],
   "answer": "9",
   "explanation": "The centre-to-circumference distance is a radius, which is half the diameter.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5S1",
   "topic": "Circles",
   "prompt": "A circular tart has a radius of 7.5 cm. A straight cut passes through its centre from one point on the circumference to the opposite point. How long is the cut in centimetres?",
   "parts": [
    "The tart's radius is 7.5 cm.",
    "The cut joins opposite boundary points through the centre.",
    "Find the cut's length."
   ],
   "labels": [
    "Known radius",
    "Diameter description",
    "Required length"
   ],
   "formula": "7.5 × 2",
   "formulas": [
    "7.5 ÷ 2",
    "7.5 × 2",
    "Use 7.5 unchanged"
   ],
   "answer": "15",
   "explanation": "The cut is a diameter, so its length is twice the radius: 15 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5S1",
   "topic": "Circles",
   "prompt": "A circular biscuit has centre O. Points C and D both lie on its circumference. OC is 6 cm. How long is OD in centimetres?",
   "parts": [
    "O is the centre; C and D are on the circumference.",
    "OC is 6 cm.",
    "Find OD."
   ],
   "labels": [
    "Point positions",
    "Known radius length",
    "Other radius length"
   ],
   "formula": "Use equal radii of the same circle: OD = OC",
   "formulas": [
    "Treat OD as a diameter: OD = 2 × OC",
    "Halve the known radius: OD = OC ÷ 2",
    "Use equal radii of the same circle: OD = OC"
   ],
   "answer": "6",
   "explanation": "OC and OD are radii of the same circle, so both are 6 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5S1",
   "topic": "Circles",
   "prompt": "A baker pipes icing exactly along the curved outer boundary of a circular cake top. The centre is marked O. What is the mathematical name of the boundary being iced?",
   "parts": [
    "The cake top is a circle with centre O.",
    "The icing follows its curved outer boundary.",
    "Name this boundary."
   ],
   "labels": [
    "Circle description",
    "Marked feature",
    "Required circle term"
   ],
   "formula": "Name the curved boundary of a circle",
   "formulas": [
    "Name the curved boundary of a circle",
    "Name a segment from the centre to the boundary",
    "Name a segment through the centre joining opposite boundary points"
   ],
   "answer": "Circumference",
   "explanation": "The curved boundary of a circle is its circumference.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5S2",
   "topic": "3-D shapes (III)",
   "prompt": "A solid cake is a hexagonal prism with two congruent hexagonal bases. A baker slices it with a plane parallel to the bases. What shape is the cross-section?",
   "parts": [
    "The cake is a hexagonal prism.",
    "The cut is parallel to its bases.",
    "Name the cross-section's shape."
   ],
   "labels": [
    "Original solid",
    "Cut orientation",
    "Section shape"
   ],
   "formula": "Use the shape of a prism's base for a parallel cross-section",
   "formulas": [
    "Use a rectangular side face as the cross-section",
    "Use the shape of a prism's base for a parallel cross-section",
    "Use a circular cross-section for every prism"
   ],
   "answer": "Hexagon",
   "explanation": "A prism's cross-section parallel to its bases has the same shape and size as a base.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5S2",
   "topic": "3-D shapes (III)",
   "prompt": "A solid cylindrical jelly has circular bases of radius 4 cm. A cook cuts it with a plane parallel to the bases. What is the radius of the circular cross-section in centimetres?",
   "parts": [
    "The cylinder's base radius is 4 cm.",
    "The cut is parallel to the bases.",
    "Find the cross-section's radius."
   ],
   "labels": [
    "Base measurement",
    "Section orientation",
    "Corresponding section measurement"
   ],
   "formula": "Keep the base radius unchanged for a parallel cylinder cross-section",
   "formulas": [
    "Double the base radius",
    "Halve the base radius",
    "Keep the base radius unchanged for a parallel cylinder cross-section"
   ],
   "answer": "4",
   "explanation": "The parallel cross-section is the same size as a circular base, so its radius is 4 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5S2",
   "topic": "3-D shapes (III)",
   "prompt": "A loaf is a rectangular prism with a base measuring 18 cm by 8 cm and a height of 5 cm. It is sliced parallel to this base. What is the area of the cross-section in square centimetres?",
   "parts": [
    "The base is 18 cm by 8 cm; the height is 5 cm.",
    "The cut is parallel to that base.",
    "Find the cross-section's area."
   ],
   "labels": [
    "Prism dimensions",
    "Chosen cutting plane",
    "Section area"
   ],
   "formula": "Use the unchanged base dimensions: 18 × 8",
   "formulas": [
    "Use the unchanged base dimensions: 18 × 8",
    "Use a long side face: 18 × 5",
    "Use a short side face: 8 × 5"
   ],
   "answer": "144",
   "explanation": "The cross-section is an 18 cm by 8 cm rectangle, with area 144 cm².",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5S2",
   "topic": "3-D shapes (III)",
   "prompt": "A cake is a triangular prism. Each triangular base has side lengths 5 cm, 5 cm and 6 cm. A slice is cut parallel to the triangular bases. What is the longest side of the triangular cross-section in centimetres?",
   "parts": [
    "The triangular base has sides 5 cm, 5 cm and 6 cm.",
    "The cut is parallel to the triangular bases.",
    "Find the longest cross-section side."
   ],
   "labels": [
    "Base side lengths",
    "Parallel-cut condition",
    "Requested corresponding side"
   ],
   "formula": "Keep the base side lengths and choose the longest",
   "formulas": [
    "Add all three base side lengths",
    "Keep the base side lengths and choose the longest",
    "Halve the longest base side"
   ],
   "answer": "6",
   "explanation": "The section has the same side lengths as a base: 5 cm, 5 cm and 6 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5D1",
   "topic": "Bar charts (III)",
   "prompt": "A vertical compound bar chart is to show this bakery sales table. Each product has one Monday bar and one Tuesday bar.\nProduct | Monday | Tuesday\nRolls | 12 | 18\nMuffins | 10 | 14\nTarts | 8 | 12\nHow many items were sold altogether on Tuesday?",
   "parts": [
    "The Tuesday bars represent 18 rolls, 14 muffins and 12 tarts.",
    "Combine all three Tuesday categories.",
    "Find Tuesday's total sales."
   ],
   "labels": [
    "Selected data series",
    "Combining instruction",
    "Required total"
   ],
   "formula": "18 + 14 + 12",
   "formulas": [
    "12 + 10 + 8",
    "18 + 12",
    "18 + 14 + 12"
   ],
   "answer": "44",
   "explanation": "Add the three Tuesday values: 18 + 14 + 12 = 44 items.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5D1",
   "topic": "Bar charts (III)",
   "prompt": "A horizontal compound bar chart is to show the following bakery sales table, with morning and afternoon bars for each product.\nProduct | Morning | Afternoon\nBread rolls | 24 | 18\nCroissants | 16 | 25\nScones | 20 | 12\nHow many more croissants were sold in the afternoon than in the morning?",
   "parts": [
    "Morning croissant sales were 16.",
    "Afternoon croissant sales were 25.",
    "Find the afternoon increase."
   ],
   "labels": [
    "Earlier value",
    "Later value",
    "Required difference"
   ],
   "formula": "25 − 16",
   "formulas": [
    "25 − 16",
    "25 + 16",
    "24 − 18"
   ],
   "answer": "9",
   "explanation": "Compare the two croissant bars: 25 − 16 = 9 more croissants.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5D1",
   "topic": "Bar charts (III)",
   "prompt": "A vertical compound bar chart is to compare cake sales using this table.\nCake flavour | Monday | Tuesday\nVanilla | 14 | 20\nChocolate | 18 | 19\nLemon | 10 | 18\nAmong the three flavours, what was the greatest increase in the number sold from Monday to Tuesday?",
   "parts": [
    "Compare Monday and Tuesday for each flavour.",
    "The pairs are 14 and 20; 18 and 19; 10 and 18.",
    "Find the greatest increase."
   ],
   "labels": [
    "Comparison rule",
    "Paired data",
    "Maximum difference"
   ],
   "formula": "Find each Tuesday − Monday difference, then choose the greatest",
   "formulas": [
    "Choose the greatest Tuesday sales value",
    "Find each Tuesday − Monday difference, then choose the greatest",
    "Add all Tuesday sales and subtract all Monday sales"
   ],
   "answer": "8",
   "explanation": "The increases are 6, 1 and 8 cakes. The greatest increase is 8.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "5D1",
   "topic": "Bar charts (III)",
   "prompt": "A horizontal compound bar chart starts its number scale at zero, with each equal scale block representing 4 biscuits. Use this table.\nDay | Oatmeal biscuits | Chocolate biscuits\nMonday | 12 | 20\nTuesday | 16 | 24\nWednesday | 20 | 28\nHow many scale blocks long should Wednesday's chocolate-biscuit bar be?",
   "parts": [
    "Wednesday's chocolate-biscuit value is 28.",
    "Each scale block represents 4 biscuits.",
    "Find the bar length in scale blocks."
   ],
   "labels": [
    "Chosen table value",
    "Chart scale",
    "Required bar length"
   ],
   "formula": "28 ÷ 4",
   "formulas": [
    "28 × 4",
    "20 ÷ 4",
    "28 ÷ 4"
   ],
   "answer": "7",
   "explanation": "A value of 28 needs 28 ÷ 4 = 7 scale blocks from zero.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  }
 ],
 "P6": [
  {
   "unit": "6N1",
   "topic": "Decimal division",
   "prompt": "A baker has 4.8 kg of dough. Each tray needs 0.6 kg. How many full trays can the baker prepare?",
   "parts": [
    "4.8 kg of dough",
    "0.6 kg per tray",
    "Number of full trays"
   ],
   "labels": [
    "Total mass",
    "Mass per tray",
    "Unknown tray count"
   ],
   "formula": "4.8 ÷ 0.6",
   "formulas": [
    "4.8 ÷ 0.6",
    "4.8 × 0.6",
    "4.8 − 0.6"
   ],
   "answer": "8",
   "explanation": "Divide the total dough mass by the mass needed for each tray: 4.8 ÷ 0.6 = 8.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N1",
   "topic": "Decimal multiplication",
   "prompt": "Flour costs HK$7.50 per kilogram. What is the cost of 0.48 kg of flour?",
   "parts": [
    "HK$7.50 per kilogram",
    "0.48 kg of flour",
    "Cost of the flour"
   ],
   "labels": [
    "Unit price",
    "Purchased mass",
    "Unknown cost"
   ],
   "formula": "7.5 × 0.48",
   "formulas": [
    "7.5 × 0.48",
    "7.5 ÷ 0.48",
    "7.5 + 0.48"
   ],
   "answer": "HK$3.60",
   "explanation": "Cost equals unit price multiplied by mass: 7.5 × 0.48 = 3.6.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N1",
   "topic": "Mixed decimal operations",
   "prompt": "A kitchen makes 12.5 L of soup and serves 2.9 L. The remaining soup is poured into containers holding 0.8 L each. How many containers are filled?",
   "parts": [
    "12.5 L made and 2.9 L served",
    "0.8 L per container",
    "Number of filled containers"
   ],
   "labels": [
    "Available-volume information",
    "Container capacity",
    "Unknown container count"
   ],
   "formula": "(12.5 − 2.9) ÷ 0.8",
   "formulas": [
    "(12.5 − 2.9) ÷ 0.8",
    "12.5 − 2.9 ÷ 0.8",
    "(12.5 + 2.9) ÷ 0.8"
   ],
   "answer": "12",
   "explanation": "There are 9.6 L left, and 9.6 ÷ 0.8 = 12 containers.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N1",
   "topic": "Order of decimal operations",
   "prompt": "A bakery has 3.6 kg of flour. It then buys 2.4 kg of flour per day for 1.5 days of production. What is the total mass of flour available?",
   "parts": [
    "3.6 kg already available",
    "2.4 kg per day for 1.5 days",
    "Total flour mass"
   ],
   "labels": [
    "Initial mass",
    "Additional-mass information",
    "Unknown total"
   ],
   "formula": "3.6 + 2.4 × 1.5",
   "formulas": [
    "3.6 + 2.4 × 1.5",
    "(3.6 + 2.4) × 1.5",
    "3.6 + 2.4 ÷ 1.5"
   ],
   "answer": "7.2 kg",
   "explanation": "The additional flour is 2.4 × 1.5 = 3.6 kg. The total is 7.2 kg.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N2",
   "topic": "Converting fractions to decimals",
   "prompt": "A cake recipe uses 3/8 kg of butter. Express this mass in kilograms as a decimal.",
   "parts": [
    "3/8 kg of butter",
    "Decimal notation required",
    "Decimal mass in kilograms"
   ],
   "labels": [
    "Given fraction",
    "Required representation",
    "Unknown decimal"
   ],
   "formula": "3 ÷ 8",
   "formulas": [
    "3 ÷ 8",
    "8 ÷ 3",
    "3 ÷ 10"
   ],
   "answer": "0.375 kg",
   "explanation": "A fraction represents division, so 3/8 = 3 ÷ 8 = 0.375.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N2",
   "topic": "Converting decimals to fractions",
   "prompt": "A cook uses 0.45 L of cream. Express this amount in litres as a fraction in its simplest form.",
   "parts": [
    "0.45 L of cream",
    "Simplest fraction required",
    "Fractional amount in litres"
   ],
   "labels": [
    "Given decimal",
    "Simplification requirement",
    "Unknown fraction"
   ],
   "formula": "45/100 = 9/20",
   "formulas": [
    "45/100 = 9/20",
    "45/10 = 9/2",
    "45/1000 = 9/200"
   ],
   "answer": "9/20 L",
   "explanation": "Write 0.45 as 45/100, then divide the numerator and denominator by 5.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N2",
   "topic": "Adding fractions and decimals",
   "prompt": "A baker combines 1.2 kg of plain flour with 3/4 kg of wholemeal flour. What is the total mass in kilograms? Give a decimal answer.",
   "parts": [
    "1.2 kg of plain flour",
    "3/4 kg of wholemeal flour",
    "Combined mass"
   ],
   "labels": [
    "Decimal mass",
    "Fractional mass",
    "Unknown sum"
   ],
   "formula": "1.2 + 3 ÷ 4",
   "formulas": [
    "1.2 + 3 ÷ 4",
    "(1.2 + 3) ÷ 4",
    "1.2 × (3 ÷ 4)"
   ],
   "answer": "1.95 kg",
   "explanation": "Convert 3/4 to 0.75, then calculate 1.2 + 0.75 = 1.95.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N2",
   "topic": "Mixed fraction and decimal calculations",
   "prompt": "A chef has 2.5 L of sauce and uses 1/2 L. The remaining sauce is shared equally among 4 bowls. How many litres are put in each bowl?",
   "parts": [
    "2.5 L initially, with 1/2 L used",
    "4 equal bowls",
    "Sauce in each bowl"
   ],
   "labels": [
    "Remaining-volume information",
    "Number of equal shares",
    "Unknown share"
   ],
   "formula": "(2.5 − 1/2) ÷ 4",
   "formulas": [
    "(2.5 − 1/2) ÷ 4",
    "2.5 − (1/2 ÷ 4)",
    "(2.5 + 1/2) ÷ 4"
   ],
   "answer": "0.5 L",
   "explanation": "Since 1/2 = 0.5, the remaining 2 L gives 2 ÷ 4 = 0.5 L per bowl.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N3",
   "topic": "Fractions as percentages",
   "prompt": "A bakery sells 3/5 of its muffins before noon. What percentage of its muffins is sold before noon?",
   "parts": [
    "3/5 of the muffins sold",
    "All muffins represent 100%",
    "Percentage sold"
   ],
   "labels": [
    "Given fraction",
    "Whole reference",
    "Unknown percentage"
   ],
   "formula": "(3 ÷ 5) × 100%",
   "formulas": [
    "(3 ÷ 5) × 100%",
    "(5 ÷ 3) × 100%",
    "3 ÷ 100 × 5%"
   ],
   "answer": "60%",
   "explanation": "3/5 = 60/100, which is 60%.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N3",
   "topic": "Percentages as fractions",
   "prompt": "Sugar makes up 25% of a dry cake mixture by mass. What fraction of the mixture is sugar? Give the simplest fraction.",
   "parts": [
    "25% sugar",
    "Total mixture mass",
    "Simplest fraction of sugar"
   ],
   "labels": [
    "Given percentage",
    "Reference whole",
    "Unknown fraction"
   ],
   "formula": "25/100 = 1/4",
   "formulas": [
    "25/100 = 1/4",
    "25/10 = 5/2",
    "100/25 = 4"
   ],
   "answer": "1/4",
   "explanation": "Percent means out of 100, so 25% = 25/100 = 1/4.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N3",
   "topic": "Decimals as percentages",
   "prompt": "The mass of raisins is 0.35 of the total mass of a fruit filling. What percentage of the filling mass is raisins?",
   "parts": [
    "Raisin share of 0.35",
    "Total filling mass",
    "Raisin percentage"
   ],
   "labels": [
    "Decimal proportion",
    "Reference whole",
    "Unknown percentage"
   ],
   "formula": "0.35 × 100%",
   "formulas": [
    "0.35 × 100%",
    "0.35 ÷ 100%",
    "(1 − 0.35) × 100%"
   ],
   "answer": "35%",
   "explanation": "0.35 = 35/100, so raisins make up 35% of the filling mass.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N3",
   "topic": "Percentage of a collection",
   "prompt": "A tray holds 24 cupcakes. Exactly 18 have icing. What percentage of the cupcakes have icing?",
   "parts": [
    "18 iced cupcakes",
    "24 cupcakes altogether",
    "Percentage with icing"
   ],
   "labels": [
    "Selected part",
    "Total collection",
    "Unknown percentage"
   ],
   "formula": "18 ÷ 24 × 100%",
   "formulas": [
    "18 ÷ 24 × 100%",
    "24 ÷ 18 × 100%",
    "(24 − 18) ÷ 24 × 100%"
   ],
   "answer": "75%",
   "explanation": "The iced fraction is 18/24 = 3/4 = 75%.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N4",
   "topic": "Percentage discounts",
   "prompt": "A cake originally costs HK$80. The bakery gives a 15% discount. What is the sale price?",
   "parts": [
    "Original price HK$80",
    "15% discount",
    "Sale price"
   ],
   "labels": [
    "Original amount",
    "Reduction rate",
    "Unknown reduced amount"
   ],
   "formula": "80 × (1 − 15/100)",
   "formulas": [
    "80 × (1 − 15/100)",
    "80 × 15/100",
    "80 × (1 + 15/100)"
   ],
   "answer": "HK$68",
   "explanation": "The customer pays 85% of HK$80, which is HK$68.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N4",
   "topic": "Percentage increase",
   "prompt": "A bakery increases its daily bread production from 60 loaves to 75 loaves. What is the percentage increase?",
   "parts": [
    "60 loaves originally",
    "75 loaves after the increase",
    "Percentage increase"
   ],
   "labels": [
    "Original quantity",
    "New quantity",
    "Unknown change rate"
   ],
   "formula": "(75 − 60) ÷ 60 × 100%",
   "formulas": [
    "(75 − 60) ÷ 60 × 100%",
    "(75 − 60) ÷ 75 × 100%",
    "75 ÷ 60 × 100%"
   ],
   "answer": "25%",
   "explanation": "The increase is 15 loaves. Relative to the original 60, this is 15/60 = 25%.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N4",
   "topic": "Finding an original amount",
   "prompt": "After a 20% price increase, a baking tin costs HK$72. What was its original price?",
   "parts": [
    "New price HK$72",
    "20% increase",
    "Original price"
   ],
   "labels": [
    "Final amount",
    "Increase rate",
    "Unknown base amount"
   ],
   "formula": "72 ÷ (1 + 20/100)",
   "formulas": [
    "72 ÷ (1 + 20/100)",
    "72 × (1 − 20/100)",
    "72 ÷ (1 − 20/100)"
   ],
   "answer": "HK$60",
   "explanation": "HK$72 represents 120% of the original price, so 72 ÷ 1.2 = 60.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6N4",
   "topic": "Profit percentage",
   "prompt": "A bakery spends HK$48 making a cake and sells it for HK$60. What is the profit as a percentage of the cost?",
   "parts": [
    "Cost HK$48",
    "Selling price HK$60",
    "Profit percentage based on cost"
   ],
   "labels": [
    "Percentage base",
    "Sales income",
    "Unknown profit rate"
   ],
   "formula": "(60 − 48) ÷ 48 × 100%",
   "formulas": [
    "(60 − 48) ÷ 48 × 100%",
    "(60 − 48) ÷ 60 × 100%",
    "60 ÷ 48 × 100%"
   ],
   "answer": "25%",
   "explanation": "The profit is HK$12. Its percentage of the HK$48 cost is 12/48 × 100% = 25%.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6A1",
   "topic": "Equations with a fixed charge",
   "prompt": "Four identical pastry boxes cost HK$x each. A delivery fee of HK$6 brings the total to HK$38. Find x.",
   "parts": [
    "4 boxes at HK$x each",
    "HK$6 delivery fee",
    "HK$38 total"
   ],
   "labels": [
    "Variable cost",
    "Fixed charge",
    "Total payment"
   ],
   "formula": "4x + 6 = 38",
   "formulas": [
    "4x + 6 = 38",
    "4(x + 6) = 38",
    "4x − 6 = 38"
   ],
   "answer": "8",
   "explanation": "Subtract 6 from 38, then divide by 4: x = 8.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6A1",
   "topic": "Equations involving equal sharing",
   "prompt": "A baker makes x biscuits and keeps 5. The rest are shared equally among 3 plates, with 7 biscuits on each plate. Find x.",
   "parts": [
    "x biscuits made",
    "5 biscuits kept",
    "3 plates with 7 biscuits each"
   ],
   "labels": [
    "Original unknown quantity",
    "Quantity removed",
    "Equal-sharing result"
   ],
   "formula": "(x − 5) ÷ 3 = 7",
   "formulas": [
    "(x − 5) ÷ 3 = 7",
    "x ÷ 3 − 5 = 7",
    "(x + 5) ÷ 3 = 7"
   ],
   "answer": "26",
   "explanation": "The plates hold 3 × 7 = 21 biscuits. Add the 5 kept biscuits to get x = 26.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6A1",
   "topic": "Equations with unknowns on both sides",
   "prompt": "One small bag holds x rolls. Three small bags hold the same number of rolls as one small bag plus 18 loose rolls. Find x.",
   "parts": [
    "x rolls in one small bag",
    "3 small bags",
    "1 small bag plus 18 loose rolls"
   ],
   "labels": [
    "Unknown bag content",
    "Left-hand quantity",
    "Equal right-hand quantity"
   ],
   "formula": "3x = x + 18",
   "formulas": [
    "3x = x + 18",
    "3x = 18 − x",
    "3(x + 18) = x"
   ],
   "answer": "9",
   "explanation": "Subtract x from both sides to get 2x = 18, so x = 9.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6A1",
   "topic": "Equations with a fractional coefficient",
   "prompt": "A chef divides x litres of soup equally among 4 pots, then adds 2 L of water to each pot. Each pot now contains 7 L. Find x.",
   "parts": [
    "x litres shared among 4 pots",
    "2 L added to each pot",
    "7 L finally in each pot"
   ],
   "labels": [
    "Initial share",
    "Added volume",
    "Final volume per pot"
   ],
   "formula": "x ÷ 4 + 2 = 7",
   "formulas": [
    "x ÷ 4 + 2 = 7",
    "(x + 2) ÷ 4 = 7",
    "4x + 2 = 7"
   ],
   "answer": "20",
   "explanation": "Each pot originally held 7 − 2 = 5 L. Therefore x = 4 × 5 = 20.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M1",
   "topic": "Angles on a straight line",
   "prompt": "A straight icing line passes through point O on a cake. A second icing line starts at O and splits one straight angle into two adjacent angles. One is 65°. Find the other angle.",
   "parts": [
    "One straight angle",
    "One part is 65°",
    "The other adjacent angle"
   ],
   "labels": [
    "Total angle",
    "Known part",
    "Unknown part"
   ],
   "formula": "180° − 65°",
   "formulas": [
    "180° − 65°",
    "90° − 65°",
    "180° + 65°"
   ],
   "answer": "115°",
   "explanation": "Adjacent angles forming a straight angle total 180°, so the other angle is 115°.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M1",
   "topic": "Angles around a point",
   "prompt": "Three icing rays start at the centre of a round cake and divide the full angle around the centre into exactly three angles. Two angles are 90° and 130°. Find the third.",
   "parts": [
    "A full angle around the centre",
    "Known angles of 90° and 130°",
    "Third angle"
   ],
   "labels": [
    "Complete turn",
    "Known-angle total",
    "Unknown remainder"
   ],
   "formula": "360° − 90° − 130°",
   "formulas": [
    "360° − 90° − 130°",
    "180° − 90° − 130°",
    "90° + 130°"
   ],
   "answer": "140°",
   "explanation": "Angles around a point total 360°. Subtracting 220° leaves 140°.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M1",
   "topic": "Combining rotations",
   "prompt": "A baker turns a cake stand clockwise through 75°, then clockwise through another 110°. Through what total angle has the stand turned?",
   "parts": [
    "First clockwise turn of 75°",
    "Second clockwise turn of 110°",
    "Total clockwise rotation"
   ],
   "labels": [
    "First rotation",
    "Additional rotation",
    "Unknown combined angle"
   ],
   "formula": "75° + 110°",
   "formulas": [
    "75° + 110°",
    "110° − 75°",
    "360° − 75° − 110°"
   ],
   "answer": "185°",
   "explanation": "Both rotations have the same direction, so add their angles to get 185°.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M1",
   "topic": "Reflex and smaller angles",
   "prompt": "Two straight icing rays start at the centre of a cake. The reflex angle between them is 215°. What is the smaller angle between the same rays?",
   "parts": [
    "Two rays with a common starting point",
    "Reflex angle of 215°",
    "Smaller angle between the rays"
   ],
   "labels": [
    "Angle arrangement",
    "Known larger angle",
    "Unknown smaller angle"
   ],
   "formula": "360° − 215°",
   "formulas": [
    "360° − 215°",
    "215° − 180°",
    "215° ÷ 2"
   ],
   "answer": "145°",
   "explanation": "The reflex angle and smaller angle make a full turn, so the smaller angle is 145°.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M2",
   "topic": "Volume of a cuboid",
   "prompt": "A rectangular food container has internal dimensions 30 cm by 20 cm by 15 cm. What is its capacity in cubic centimetres?",
   "parts": [
    "Internal length 30 cm",
    "Internal width 20 cm and height 15 cm",
    "Capacity in cubic centimetres"
   ],
   "labels": [
    "Length",
    "Other two dimensions",
    "Unknown volume"
   ],
   "formula": "30 × 20 × 15",
   "formulas": [
    "30 × 20 × 15",
    "30 × 20",
    "(30 + 20) × 2 × 15"
   ],
   "answer": "9000 cm³",
   "explanation": "Cuboid volume is length × width × height: 30 × 20 × 15 = 9000 cm³.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M2",
   "topic": "Litres and cubic centimetres",
   "prompt": "A soup jug contains 2.4 L of stock. Express this volume in cubic centimetres.",
   "parts": [
    "2.4 L of stock",
    "1 L = 1000 cm³",
    "Volume in cubic centimetres"
   ],
   "labels": [
    "Given volume",
    "Conversion relationship",
    "Unknown converted volume"
   ],
   "formula": "2.4 × 1000",
   "formulas": [
    "2.4 × 1000",
    "2.4 ÷ 1000",
    "2.4 × 100"
   ],
   "answer": "2400 cm³",
   "explanation": "Each litre equals 1000 cm³, so 2.4 L equals 2400 cm³.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M2",
   "topic": "Volume by displacement",
   "prompt": "A rectangular kitchen tank has an internal base measuring 40 cm by 25 cm. A sealed solid cooking weight is fully submerged in its water. The water depth rises from 6 cm to 9 cm without spilling. What is the volume of the weight?",
   "parts": [
    "Base 40 cm by 25 cm",
    "Water rises from 6 cm to 9 cm",
    "Volume of the submerged weight"
   ],
   "labels": [
    "Base dimensions",
    "Depth-change information",
    "Unknown displaced volume"
   ],
   "formula": "40 × 25 × (9 − 6)",
   "formulas": [
    "40 × 25 × (9 − 6)",
    "40 × 25 × 9",
    "40 × 25 × (9 + 6)"
   ],
   "answer": "3000 cm³",
   "explanation": "The weight displaces 40 × 25 × 3 = 3000 cm³ of water.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M2",
   "topic": "Finding liquid depth",
   "prompt": "A rectangular sauce tank has an internal base measuring 25 cm by 20 cm. It contains 6 L of sauce. What is the sauce depth in centimetres?",
   "parts": [
    "6 L of sauce",
    "Base 25 cm by 20 cm",
    "Sauce depth"
   ],
   "labels": [
    "Liquid volume",
    "Base dimensions",
    "Unknown height"
   ],
   "formula": "6 × 1000 ÷ (25 × 20)",
   "formulas": [
    "6 × 1000 ÷ (25 × 20)",
    "6 ÷ (25 × 20)",
    "6 × 1000 ÷ (25 + 20)"
   ],
   "answer": "12 cm",
   "explanation": "Convert 6 L to 6000 cm³. Divide by the 500 cm² base area to obtain 12 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M3",
   "topic": "Circumference from diameter",
   "prompt": "A circular cake has a diameter of 28 cm. Find the length of ribbon needed to go around it once, with no overlap. Use π = 22/7.",
   "parts": [
    "Diameter 28 cm",
    "π = 22/7",
    "Ribbon for one complete circle"
   ],
   "labels": [
    "Given diameter",
    "Specified constant",
    "Unknown circumference"
   ],
   "formula": "(22/7) × 28",
   "formulas": [
    "(22/7) × 28",
    "2 × (22/7) × 28",
    "(22/7) × 28 × 28"
   ],
   "answer": "88 cm",
   "explanation": "Circumference equals π × diameter, giving 88 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M3",
   "topic": "Distance travelled by a wheel",
   "prompt": "A bakery trolley wheel has a diameter of 14 cm. It rolls 880 cm without slipping. How many complete turns does it make? Use π = 22/7.",
   "parts": [
    "Wheel diameter 14 cm",
    "Travel distance 880 cm; π = 22/7",
    "Number of complete turns"
   ],
   "labels": [
    "Wheel size",
    "Distance and constant",
    "Unknown rotation count"
   ],
   "formula": "880 ÷ ((22/7) × 14)",
   "formulas": [
    "880 ÷ ((22/7) × 14)",
    "880 ÷ (2 × (22/7) × 14)",
    "880 ÷ 14"
   ],
   "answer": "20",
   "explanation": "One turn covers the circumference, 44 cm. Thus 880 ÷ 44 = 20 turns.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M3",
   "topic": "Finding radius from circumference",
   "prompt": "A circular pastry ring has a circumference of 62.8 cm. Find its radius. Use π = 3.14.",
   "parts": [
    "Circumference 62.8 cm",
    "π = 3.14",
    "Radius of the ring"
   ],
   "labels": [
    "Known boundary length",
    "Specified constant",
    "Unknown radius"
   ],
   "formula": "62.8 ÷ (2 × 3.14)",
   "formulas": [
    "62.8 ÷ (2 × 3.14)",
    "62.8 ÷ 3.14",
    "62.8 × 3.14 ÷ 2"
   ],
   "answer": "10 cm",
   "explanation": "Since circumference = 2πr, the radius is 62.8 ÷ 6.28 = 10 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M3",
   "topic": "Perimeter of a semicircle",
   "prompt": "A pastry is an exact semicircle with radius 10 cm. Find its whole perimeter, including the straight edge. Use π = 3.14.",
   "parts": [
    "Radius 10 cm",
    "Curved edge and straight diameter",
    "Whole perimeter; π = 3.14"
   ],
   "labels": [
    "Given radius",
    "Boundary components",
    "Unknown perimeter and constant"
   ],
   "formula": "3.14 × 10 + 2 × 10",
   "formulas": [
    "3.14 × 10 + 2 × 10",
    "3.14 × 10",
    "2 × 3.14 × 10 + 2 × 10"
   ],
   "answer": "51.4 cm",
   "explanation": "The semicircular arc is 31.4 cm and the straight diameter is 20 cm, totalling 51.4 cm.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M4",
   "topic": "Finding speed",
   "prompt": "A bakery worker pushes a trolley 90 m in 30 s at a constant speed. Find the speed in metres per second.",
   "parts": [
    "Distance 90 m",
    "Time 30 s",
    "Speed in metres per second"
   ],
   "labels": [
    "Travel distance",
    "Elapsed time",
    "Unknown speed"
   ],
   "formula": "90 ÷ 30",
   "formulas": [
    "90 ÷ 30",
    "90 × 30",
    "30 ÷ 90"
   ],
   "answer": "3 m/s",
   "explanation": "Speed = distance ÷ time = 90 ÷ 30 = 3 m/s.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M4",
   "topic": "Finding distance",
   "prompt": "A bakery delivery bicycle travels at a constant speed of 4 m/s for 45 s. How far does it travel?",
   "parts": [
    "Speed 4 m/s",
    "Time 45 s",
    "Distance travelled"
   ],
   "labels": [
    "Travel rate",
    "Travel duration",
    "Unknown distance"
   ],
   "formula": "4 × 45",
   "formulas": [
    "4 × 45",
    "45 ÷ 4",
    "4 ÷ 45"
   ],
   "answer": "180 m",
   "explanation": "Distance = speed × time = 4 × 45 = 180 m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M4",
   "topic": "Finding time with unit conversion",
   "prompt": "A cook walks 1.2 km to a food market at a constant speed of 80 m/min. How many minutes does the walk take?",
   "parts": [
    "Distance 1.2 km",
    "Speed 80 m/min",
    "Travel time in minutes"
   ],
   "labels": [
    "Distance needing conversion",
    "Travel rate",
    "Unknown duration"
   ],
   "formula": "1.2 × 1000 ÷ 80",
   "formulas": [
    "1.2 × 1000 ÷ 80",
    "1.2 ÷ 80",
    "1.2 × 1000 × 80"
   ],
   "answer": "15 minutes",
   "explanation": "The distance is 1200 m. Time = 1200 ÷ 80 = 15 minutes.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M4",
   "topic": "Converting speed units",
   "prompt": "A bakery delivery van travels at 54 km/h. Express its speed in metres per second.",
   "parts": [
    "Speed 54 km/h",
    "1 km = 1000 m; 1 hour = 3600 s",
    "Speed in metres per second"
   ],
   "labels": [
    "Original speed",
    "Unit relationships",
    "Unknown converted speed"
   ],
   "formula": "54 × 1000 ÷ 3600",
   "formulas": [
    "54 × 1000 ÷ 3600",
    "54 × 3600 ÷ 1000",
    "54 × 1000 ÷ 60"
   ],
   "answer": "15 m/s",
   "explanation": "In 3600 seconds the van travels 54000 m, so its speed is 15 m/s.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M5",
   "topic": "Area of a circle",
   "prompt": "A circular tart has a radius of 7 cm. Find the area of its top. Use π = 22/7.",
   "parts": [
    "Radius 7 cm",
    "π = 22/7",
    "Area of the circular top"
   ],
   "labels": [
    "Given radius",
    "Specified constant",
    "Unknown area"
   ],
   "formula": "(22/7) × 7 × 7",
   "formulas": [
    "(22/7) × 7 × 7",
    "2 × (22/7) × 7",
    "(22/7) × 14 × 14"
   ],
   "answer": "154 cm²",
   "explanation": "Circle area = πr² = (22/7) × 7 × 7 = 154 cm².",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M5",
   "topic": "Area of a semicircle",
   "prompt": "A flat piece of pastry is an exact semicircle of radius 14 cm. Find its area. Use π = 22/7.",
   "parts": [
    "Radius 14 cm",
    "Half of a circle; π = 22/7",
    "Pastry area"
   ],
   "labels": [
    "Given radius",
    "Shape and constant",
    "Unknown area"
   ],
   "formula": "(22/7) × 14 × 14 ÷ 2",
   "formulas": [
    "(22/7) × 14 × 14 ÷ 2",
    "(22/7) × 14 × 14",
    "(22/7) × 14 × 14 ÷ 4"
   ],
   "answer": "308 cm²",
   "explanation": "The corresponding full circle has area 616 cm². Half is 308 cm².",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M5",
   "topic": "Area remaining after a circular cut",
   "prompt": "A rectangular sheet of dough measures 30 cm by 20 cm. One circular piece of radius 7 cm is cut from entirely inside it. Find the area of dough remaining. Use π = 22/7.",
   "parts": [
    "Rectangle 30 cm by 20 cm",
    "Removed circle of radius 7 cm; π = 22/7",
    "Remaining dough area"
   ],
   "labels": [
    "Original region",
    "Removed region",
    "Unknown difference"
   ],
   "formula": "30 × 20 − (22/7) × 7 × 7",
   "formulas": [
    "30 × 20 − (22/7) × 7 × 7",
    "30 × 20 + (22/7) × 7 × 7",
    "30 × 20 − 2 × (22/7) × 7"
   ],
   "answer": "446 cm²",
   "explanation": "Subtract the circle's 154 cm² from the rectangle's 600 cm² to get 446 cm².",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6M5",
   "topic": "Cost based on circular area",
   "prompt": "A circular cake has a diameter of 20 cm. Icing its top costs HK$0.05 per cm². Find the icing cost. Use π = 3.14.",
   "parts": [
    "Cake diameter 20 cm",
    "HK$0.05 per cm²; π = 3.14",
    "Cost of icing the top"
   ],
   "labels": [
    "Size information",
    "Rate and constant",
    "Unknown cost"
   ],
   "formula": "3.14 × (20 ÷ 2) × (20 ÷ 2) × 0.05",
   "formulas": [
    "3.14 × (20 ÷ 2) × (20 ÷ 2) × 0.05",
    "3.14 × 20 × 20 × 0.05",
    "3.14 × 20 × 0.05"
   ],
   "answer": "HK$15.70",
   "explanation": "The radius is 10 cm, so the top area is 314 cm². The cost is 314 × 0.05 = HK$15.70.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6S1",
   "topic": "Counting axes of symmetry",
   "prompt": "A plain biscuit is an exact square, with no decoration. How many axes of symmetry does its outline have?",
   "parts": [
    "Exact square biscuit",
    "No decoration",
    "Number of symmetry axes"
   ],
   "labels": [
    "Named shape",
    "Unrestricted outline",
    "Unknown axis count"
   ],
   "formula": "Count the two diagonals and the two lines through opposite side midpoints",
   "formulas": [
    "Count the two diagonals and the two lines through opposite side midpoints",
    "Count only the two diagonals",
    "Count only the two lines through opposite side midpoints"
   ],
   "answer": "4",
   "explanation": "A square has four symmetry axes: two diagonals and two lines through opposite side midpoints.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6S1",
   "topic": "Recognising a shape from symmetry",
   "prompt": "A plain flat pastry outline matches itself when reflected in every straight line through its centre. Which shape is it: a circle, a non-square rectangle, or an equilateral triangle?",
   "parts": [
    "Every line through the centre is a symmetry axis",
    "Circle, non-square rectangle, or equilateral triangle",
    "Matching pastry shape"
   ],
   "labels": [
    "Symmetry property",
    "Candidate shapes",
    "Unknown shape"
   ],
   "formula": "Choose the shape for which every diameter is an axis of symmetry",
   "formulas": [
    "Choose the shape for which every diameter is an axis of symmetry",
    "Choose the shape with exactly two axes of symmetry",
    "Choose the shape with exactly three axes of symmetry"
   ],
   "answer": "circle",
   "explanation": "Every line through a circle's centre is an axis of symmetry; the other choices have only finitely many axes.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6S1",
   "topic": "Directions of symmetry axes",
   "prompt": "A plain rectangular cake top is 8 cm wide and 4 cm high. Its longer sides are horizontal and its shorter sides are vertical. State the directions of its symmetry axes.",
   "parts": [
    "Non-square rectangle, 8 cm by 4 cm",
    "Longer sides horizontal",
    "Directions of symmetry axes"
   ],
   "labels": [
    "Shape and dimensions",
    "Orientation",
    "Unknown directions"
   ],
   "formula": "Find the horizontal and vertical lines through the rectangle's centre",
   "formulas": [
    "Find the horizontal and vertical lines through the rectangle's centre",
    "Use the two diagonals as symmetry axes",
    "Use only the horizontal line through the centre"
   ],
   "answer": "horizontal and vertical",
   "explanation": "A non-square rectangle has two symmetry axes through its centre, parallel to its sides.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6S1",
   "topic": "Testing a symmetry axis",
   "prompt": "A plain pastry is an equilateral triangle. A fold line joins one vertex to the midpoint of the opposite side. Is this line an axis of symmetry?",
   "parts": [
    "Equilateral triangular pastry",
    "Vertex-to-opposite-midpoint fold line",
    "Whether the line is a symmetry axis"
   ],
   "labels": [
    "Given shape",
    "Proposed axis",
    "Unknown judgement"
   ],
   "formula": "Check whether the two halves coincide when folded along the proposed line",
   "formulas": [
    "Check whether the two halves coincide when folded along the proposed line",
    "Accept any line that divides the triangle into equal areas",
    "Reject the line because it passes through a vertex"
   ],
   "answer": "Yes",
   "explanation": "In an equilateral triangle, this fold makes the two halves coincide exactly.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D1",
   "topic": "Calculating an average",
   "prompt": "A bakery records muffins sold: Day | Mon | Tue | Wed | Thu; Muffins | 12 | 18 | 15 | 19. What is the average number sold per day?",
   "parts": [
    "Daily sales: 12, 18, 15, 19",
    "4 recorded days",
    "Average daily sales"
   ],
   "labels": [
    "Data values",
    "Number of observations",
    "Unknown mean"
   ],
   "formula": "(12 + 18 + 15 + 19) ÷ 4",
   "formulas": [
    "(12 + 18 + 15 + 19) ÷ 4",
    "(12 + 18 + 15 + 19) ÷ 3",
    "(12 + 19) ÷ 2"
   ],
   "answer": "16",
   "explanation": "The total is 64 muffins over 4 days, so the average is 16.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D1",
   "topic": "Finding a missing value from an average",
   "prompt": "A bakery's roll-sales table is: Day | Mon | Tue | Wed | Thu; Rolls | 18 | 22 | ? | 16. The average is 20 rolls per day. How many rolls were sold on Wednesday?",
   "parts": [
    "Known sales: 18, 22, 16",
    "Average 20 over 4 days",
    "Wednesday's missing sales"
   ],
   "labels": [
    "Known observations",
    "Mean and observation count",
    "Unknown observation"
   ],
   "formula": "20 × 4 − 18 − 22 − 16",
   "formulas": [
    "20 × 4 − 18 − 22 − 16",
    "20 × 3 − 18 − 22 − 16",
    "(18 + 22 + 16) ÷ 3"
   ],
   "answer": "24",
   "explanation": "The four-day total must be 80. The known sales total 56, leaving 24 for Wednesday.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D1",
   "topic": "Finding a total from an average",
   "prompt": "A bakery production table states: Team | Number of bakers | Average rolls made per baker; Morning | 5 | 24. How many rolls did the morning team make altogether?",
   "parts": [
    "Average 24 rolls per baker",
    "5 bakers in the team",
    "Total rolls made"
   ],
   "labels": [
    "Mean output",
    "Group size",
    "Unknown total"
   ],
   "formula": "24 × 5",
   "formulas": [
    "24 × 5",
    "24 ÷ 5",
    "24 + 5"
   ],
   "answer": "120",
   "explanation": "Total output equals average output multiplied by the number of bakers: 24 × 5 = 120.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D1",
   "topic": "Updating an average",
   "prompt": "A pastry record initially contains: Batch | A | B | C; Pastries | 10 | 14 | 18. A fourth batch, D, contains 22 pastries. What is the average batch size after D is included?",
   "parts": [
    "Original batch counts: 10, 14, 18",
    "New batch count: 22",
    "Average of all 4 batches"
   ],
   "labels": [
    "Original data",
    "Additional observation",
    "Unknown updated mean"
   ],
   "formula": "(10 + 14 + 18 + 22) ÷ 4",
   "formulas": [
    "(10 + 14 + 18 + 22) ÷ 4",
    "(10 + 14 + 18 + 22) ÷ 3",
    "((10 + 14 + 18) ÷ 3 + 22) ÷ 2"
   ],
   "answer": "16",
   "explanation": "The four batches contain 64 pastries in total, so their average size is 16.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D2",
   "topic": "Highest point on a broken line graph",
   "prompt": "A broken line graph of a bakery's daily tart sales uses this table: Day | Mon | Tue | Wed | Thu | Fri | Sat; Tarts | 12 | 18 | 15 | 21 | 24 | 20. On which day is the graph's highest point?",
   "parts": [
    "Six daily sales values",
    "Highest plotted value required",
    "Day of the highest point"
   ],
   "labels": [
    "Graph data",
    "Selection rule",
    "Unknown day"
   ],
   "formula": "Find the largest sales value and read its day",
   "formulas": [
    "Find the largest sales value and read its day",
    "Find the smallest sales value and read its day",
    "Find the largest daily increase and read its ending day"
   ],
   "answer": "Friday",
   "explanation": "The largest value is 24 tarts, recorded on Friday.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D2",
   "topic": "Greatest increase on a broken line graph",
   "prompt": "A broken line graph tracks dough temperature at equal time intervals: Time | 8 a.m. | 9 a.m. | 10 a.m. | 11 a.m. | noon | 1 p.m.; Temperature (°C) | 20 | 22 | 27 | 28 | 30 | 31. Between which consecutive times is the increase greatest?",
   "parts": [
    "Temperatures: 20, 22, 27, 28, 30, 31°C",
    "Equal one-hour intervals",
    "Interval with the greatest rise"
   ],
   "labels": [
    "Plotted values",
    "Time spacing",
    "Unknown interval"
   ],
   "formula": "Subtract each temperature from the next and select the largest increase",
   "formulas": [
    "Subtract each temperature from the next and select the largest increase",
    "Select the interval ending at the highest temperature",
    "Subtract each temperature from the next and select the smallest increase"
   ],
   "answer": "9 a.m. to 10 a.m.",
   "explanation": "The increases are 2, 5, 1, 2 and 1°C. The greatest is 5°C from 9 a.m. to 10 a.m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D2",
   "topic": "Overall change on a broken line graph",
   "prompt": "A broken line graph shows soup cooling: Minutes after cooking | 0 | 5 | 10 | 15 | 20 | 25; Temperature (°C) | 90 | 82 | 75 | 69 | 64 | 60. What is the total temperature decrease over the 25 minutes?",
   "parts": [
    "Initial temperature 90°C",
    "Final temperature 60°C",
    "Total temperature decrease"
   ],
   "labels": [
    "Starting value",
    "Ending value",
    "Unknown overall fall"
   ],
   "formula": "90 − 60",
   "formulas": [
    "90 − 60",
    "90 − 82",
    "(90 − 60) ÷ 5"
   ],
   "answer": "30°C",
   "explanation": "The overall decrease is the starting temperature minus the final temperature: 30°C.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D2",
   "topic": "Describing a broken line graph trend",
   "prompt": "A broken line graph shows a bakery's hourly bread sales: Hour beginning | 8 a.m. | 9 a.m. | 10 a.m. | 11 a.m. | noon | 1 p.m.; Loaves | 10 | 15 | 20 | 18 | 14 | 9. Describe the sales trend across these hours.",
   "parts": [
    "Sales rise from 10 to 15 to 20",
    "Sales then fall to 18, 14 and 9",
    "Overall trend description"
   ],
   "labels": [
    "Earlier movement",
    "Later movement",
    "Unknown summary"
   ],
   "formula": "Read consecutive values in time order and identify rising and falling sections",
   "formulas": [
    "Read consecutive values in time order and identify rising and falling sections",
    "Sort sales values from smallest to largest before describing the trend",
    "Use only the first and last values to describe every section"
   ],
   "answer": "Rises to 10 a.m., then falls",
   "explanation": "Sales increase for the first two intervals and decrease in every interval after 10 a.m.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D3",
   "topic": "Finding a category count from a pie chart",
   "prompt": "A pie chart represents 200 cakes sold. Its data table is: Flavour | Vanilla | Chocolate | Lemon | Strawberry; Share | 50% | 25% | 15% | 10%. How many chocolate cakes were sold?",
   "parts": [
    "200 cakes altogether",
    "Chocolate share 25%",
    "Number of chocolate cakes"
   ],
   "labels": [
    "Whole quantity",
    "Selected proportion",
    "Unknown category count"
   ],
   "formula": "200 × 25/100",
   "formulas": [
    "200 × 25/100",
    "200 ÷ (25/100)",
    "200 × 75/100"
   ],
   "answer": "50",
   "explanation": "Chocolate cakes are 25% of 200, which is 50.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D3",
   "topic": "Finding a pie chart percentage",
   "prompt": "A bakery will display this sales table as a pie chart: Product | Buns | Tarts | Cookies | Cakes; Number sold | 48 | 24 | 36 | 12. What percentage of the pie chart should represent cookies?",
   "parts": [
    "36 cookies sold",
    "All counts: 48, 24, 36, 12",
    "Cookie percentage"
   ],
   "labels": [
    "Selected category count",
    "Whole-total data",
    "Unknown sector share"
   ],
   "formula": "36 ÷ (48 + 24 + 36 + 12) × 100%",
   "formulas": [
    "36 ÷ (48 + 24 + 36 + 12) × 100%",
    "36 ÷ 48 × 100%",
    "(48 + 24 + 12) ÷ (48 + 24 + 36 + 12) × 100%"
   ],
   "answer": "30%",
   "explanation": "There are 120 items altogether. Cookies represent 36/120 = 30%.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D3",
   "topic": "Finding the whole from a pie chart share",
   "prompt": "A pie chart of bakery items sold has this table: Product | Bread | Cakes | Tarts | Biscuits; Share | 40% | 30% | 20% | 10%. Bread accounts for 80 items. How many items were sold altogether?",
   "parts": [
    "Bread share 40%",
    "80 bread items sold",
    "Total number of items"
   ],
   "labels": [
    "Known proportion",
    "Corresponding part",
    "Unknown whole"
   ],
   "formula": "80 ÷ (40/100)",
   "formulas": [
    "80 ÷ (40/100)",
    "80 × 40/100",
    "80 ÷ (60/100)"
   ],
   "answer": "200",
   "explanation": "If 40% represents 80 items, the whole is 80 ÷ 0.4 = 200 items.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D3",
   "topic": "Comparing pie chart categories",
   "prompt": "A pie chart represents 160 pastry orders. Its table is: Filling | Apple | Custard | Red bean | Cheese; Share | 35% | 25% | 20% | 20%. How many more apple orders than custard orders were placed?",
   "parts": [
    "160 orders altogether",
    "Apple 35%; custard 25%",
    "Difference in order counts"
   ],
   "labels": [
    "Whole quantity",
    "Compared proportions",
    "Unknown difference"
   ],
   "formula": "160 × (35 − 25)/100",
   "formulas": [
    "160 × (35 − 25)/100",
    "160 × (35 + 25)/100",
    "160 × 35/100"
   ],
   "answer": "16",
   "explanation": "The difference is 10% of all 160 orders, which is 16 orders.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D4",
   "topic": "Choosing a chart for change over time",
   "prompt": "A baker records oven temperature: Time | 9:00 | 9:05 | 9:10 | 9:15 | 9:20 | 9:25; Temperature (°C) | 25 | 60 | 100 | 140 | 170 | 180. Which is most suitable for showing how temperature changes over time: a pictogram, a pie chart, or a broken line graph?",
   "parts": [
    "Temperature readings at six times",
    "Show change over time",
    "Most suitable chart"
   ],
   "labels": [
    "Data type",
    "Display purpose",
    "Unknown chart choice"
   ],
   "formula": "Choose a broken line graph to show changes over time",
   "formulas": [
    "Choose a broken line graph to show changes over time",
    "Choose a pie chart to show parts of a whole",
    "Choose a pictogram to show quantities with repeated symbols"
   ],
   "answer": "broken line graph",
   "explanation": "A broken line graph clearly displays how a measured quantity changes with time.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D4",
   "topic": "Choosing a chart for category comparison",
   "prompt": "A bakery records: Product | Buns | Tarts | Cakes | Cookies; Number sold | 42 | 27 | 19 | 36. It wants readers to compare the numbers sold across categories using lengths on a common numerical scale. Choose a bar chart, a pie chart, or a broken line graph.",
   "parts": [
    "Sales counts for four products",
    "Compare lengths on a common numerical scale",
    "Most suitable chart"
   ],
   "labels": [
    "Categorical data",
    "Comparison requirement",
    "Unknown chart choice"
   ],
   "formula": "Use bar lengths on a common scale to compare category counts",
   "formulas": [
    "Use bar lengths on a common scale to compare category counts",
    "Use pie sectors to show each category's share of the whole",
    "Join product counts with line segments to suggest a continuous sequence"
   ],
   "answer": "bar chart",
   "explanation": "A bar chart compares separate categories using bar lengths measured on one numerical scale.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D4",
   "topic": "Choosing a chart for parts of a whole",
   "prompt": "A bakery's spending table is: Category | Ingredients | Wages | Rent | Other; Share of total spending | 40% | 30% | 20% | 10%. Which chart most directly shows how the whole budget is divided: a pie chart, a broken line graph, or a pictogram?",
   "parts": [
    "Spending shares totalling 100%",
    "Show divisions of the whole budget",
    "Most suitable chart"
   ],
   "labels": [
    "Proportional data",
    "Display purpose",
    "Unknown chart choice"
   ],
   "formula": "Use pie sectors to represent the parts of one whole",
   "formulas": [
    "Use pie sectors to represent the parts of one whole",
    "Use a broken line graph to show changes through time",
    "Use repeated pictures to represent numerical counts"
   ],
   "answer": "pie chart",
   "explanation": "A pie chart directly represents a whole divided into percentage shares.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  },
  {
   "unit": "6D4",
   "topic": "Misleading bar chart scales",
   "prompt": "A bakery's sales table is: Day | Monday | Tuesday; Buns sold | 90 | 100. Its vertical bar chart uses an unbroken scale starting at 80, making Tuesday's bar appear twice as tall as Monday's. At what value should the vertical scale start so bar lengths fairly represent the counts?",
   "parts": [
    "Sales counts of 90 and 100",
    "Current unbroken vertical scale starts at 80",
    "Fair starting value for the scale"
   ],
   "labels": [
    "Actual data",
    "Misleading chart feature",
    "Unknown correction"
   ],
   "formula": "Start the bar chart's numerical scale at zero so lengths represent the full counts",
   "formulas": [
    "Start the bar chart's numerical scale at zero so lengths represent the full counts",
    "Start the numerical scale at the smaller sales count",
    "Keep the starting value of 80 and change only the bar colours"
   ],
   "answer": "0",
   "explanation": "Starting at zero makes the bar lengths represent 90 and 100 rather than only their differences from 80.",
   "trap": null,
   "trapAnswer": null,
   "trapChoices": []
  }
 ]
};
