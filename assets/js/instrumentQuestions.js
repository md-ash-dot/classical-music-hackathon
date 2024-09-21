// Define an array to hold your quiz questions
const instrumentQuestions = [
    // Add questions here
    {
        question: "How many strings does a violin have?",
        options: ["Three", "Four", "Five", "Six"],
        answer: "Four",
    },
    {
        question: "What is the name for a collection of classical instruments playing together?",
        options: ["Group", "Concerto", "Orchestra", "Team"],
        answer: "Orchestra",
    },
    {
        question: "Which of these instruments has pedals that change the pitch of its strings?",
        options: ["Harp", "Violin", "Trombone", "Timpani"],
        answer: "Harp",
    },
    {
        question: "Which voice type is the lowest in the male vocal range?",
        options: ["Baritone", "Tenor", "Bass", "Countertenor"],
        answer: "Bass",
    },
    {
        question: "What is the term for a piece of music written for a solo instrument with orchestral accompaniment?",
        options: ["Sonata", "Concerto", "Symphony", "Opera"],
        answer: "Concerto",
    },
    {
        question: "Which family of instruments produces sound by buzzing the lips into a mouthpiece?",
        options: ["Strings", "Woodwind", "Brass", "Percussion"],
        answer: "Brass",
    },
    {
        question: "In a classical music concert, who typically stands at the front of the orchestra and leads the musicians?",
        options: ["Leader", "Music Master", "Timekeeper", "Conductor"],
        answer: "Conductor",
    },
    // {
    //     question: "In which type of musical composition is a soloist featured alongside an orchestra?",
    //     options: ["Symphony", "Opera", "Concerto", "Fuego"],
    //     answer: "Concerto",
    // },
    {
        question: "What is the term for a repeated musical phrase or rhythm in classical music?",
        options: ["Repato", "Ostinato", "Arpeggio", "Legato"],
        answer: "Ostinato",
    },
    {
        question: "What is a 'movement' in classical music?",
        options: ["A group of musicians", "A distinct section of a larger musical work", "A change in the speed of the music", "A style of conducting"],
        answer: "A distinct section of a larger musical work",
    },
    {
        question: "Which of the following instruments is NOT a woodwind instrument?",
        options: ["Clarinet", "Flute", "Trumpet", "Oboe"],
        answer: "Trumpet",
    },
    {
        question: "What is the highest female singing voice called?",
        options: ["Soprano", "Tenor", "Alto", "Bass"],
        answer: "Soprano",
    },
    {
        question: "Which percussion instrument do you typically hit with mallets?",
        options: ["Snare Drum", "Xylophone", "Cajón", "Timpani"],
        answer: "Xylophone",
    },
    {
        question: "Which instrument has keys but is technically a percussion instrument?",
        options: ["Marimba", "Piano", "Harpsichord", "Accordion"],
        answer: "Piano",
    },
    {
        question: "Which string instrument is the largest in the orchestra and produces the lowest notes?",
        options: ["Violin", "Viola", "Cello", "Double Bass"],
        answer: "Double Bass",
    },
    {
        question: "Which instrument do you 'pluck' the strings to play, often associated with classical or flamenco music?",
        options: ["Cello", "Guitar", "Violin", "Harp"],
        answer: "Guitar",
    },
    {
        question: "Which instrument is famously played by bending notes using a slide?",
        options: ["Trombone", "Trumpet", "French Horn", "Clarinet"],
        answer: "Trombone",
    },
    {
        question: "Which instrument is known as a wind instrument but does not use a reed to produce sound?",
        options: ["Oboe", "Flute", "Clarinet", "Bassoon"],
        answer: "Flute",
    },
    {
        question: "Which quirky instrument do you play without touching, just by waving your hands near its antennae?",
        options: ["Theremin", "Kazoo", "Didgeridoo", "Harmonica"],
        answer: "Theremin",
    },
    {
        question: "Which instrument is traditionally associated with Spanish music and is often used in tango and flamenco?",
        options: ["Castanets", "Bongo Drums", "Ukulele", "Banjo"],
        answer: "Castanets",
    },
    {
        question: "Which instrument is nicknamed 'the fiddle' when used in folk and country music?",
        options: ["Violin", "Mandolin", "Banjo", "Viola"],
        answer: "Violin",
    },
    {
        question: "Which instrument is shaped like a giant horn and often featured in jazz, concert, and marching bands?",
        options: ["Tuba", "French Horn", "Bassoon", "Sousaphone"],
        answer: "Sousaphone",
    },
    {
        question: "Which of these instruments uses a bow to play?",
        options: ["Cello", "Banjo", "Harp", "Guitar"],
        answer: "Cello",
    },
    {
        question: "Which brass instrument is often the highest-pitched in the orchestra?",
        options: ["Trombone", "French Horn", "Trumpet", "Tuba"],
        answer: "Trumpet",
    },
    {
        question: "Which instrument is widely used in rock, pop, and jazz, and requires an amplifier?",
        options: ["Acoustic Guitar", "Synthesizer", "Bass Guitar", "Electric Guitar"],
        answer: "Electric Guitar",
    },
    {
        question: "Which instrument is known for having two large drums played with mallets, often used in orchestras?",
        options: ["Congas", "Timpani", "Snare Drums", "Bongos"],
        answer: "Timpani",
    },
    {
        question: "Which of these instruments is part of the woodwind family but made of metal?",
        options: ["Oboe", "Clarinet", "Flute", "Bassoon"],
        answer: "Flute",
    },
    {
        question: "Which quirky instrument is known for its buzzing sound and is often used in children's music?",
        options: ["Tom-Tom", "Kazoo", "Didgeridoo", "Ocarina"],
        answer: "Kazoo",
    },
    {
        question: "Which string instrument is plucked, has 21 strings, and originates from West Africa?",
        options: ["Kora", "Lute", "Sitar", "Balalaika"],
        answer: "Kora",
    },
    {
        question: "Which wind instrument, used in traditional Irish music, has holes that are covered with fingers to play?",
        options: ["Pennywhistle", "Recorder", "Flute", "Pan Flute"],
        answer: "Pennywhistle",
    },
    {
        question: "Which percussion instrument resembles a hollow block and is played by striking it with a mallet?",
        options: ["Marimba", "Wood Block", "Djembe", "Cajón"],
        answer: "Wood Block",
    },
    {
        question: "Which percussion instrument sounds like the ocean when you shake it?",
        options: ["Tambourine", "Maracas", "Rainstick", "Djembe"],
        answer: "Rainstick",
    },
    {
        question: "Which instrument is so small it can fit in your pocket but packs a powerful punch in blues music?",
        options: ["Pennywhistle", "Harmonica", "Maracas", "Kazoo"],
        answer: "Harmonica",
    },
    {
        question: "Which of these instruments is played by spinning a handle, making it look like you’re cranking up a toy?",
        options: ["Hurdy-Gurdy", "Sitar", "Didgeridoo", "Glockenspiel"],
        answer: "Hurdy-Gurdy",
    },
    {
        question: "Which instrument do you play by moving your mouth and fingers but also has a piano-like keyboard on top?",
        options: ["Melodica", "Accordion", "Harpsichord", "Keyboard"],
        answer: "Melodica",
    },
    {
        question: "Which instrument is also a favorite for Christmas caroling but might get you in trouble if you’re too loud?",
        options: ["Bell Set", "Trumpet", "Harmonica", "Tambourine"],
        answer: "Tambourine",
    }
]

