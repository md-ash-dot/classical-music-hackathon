// Define an array to hold your quiz questions
const composerQuestions = [
    {
        question: "This composer wrote 'The Four Seasons'.",
        options: ["Mozart", "Bach", "Vivaldi", "Handel"],
        answer: "Vivaldi",
        hint: "This Italian Baroque composer was nicknamed 'The Red Priest'."
    },
    {
        question: "Known for his operas, this Italian composer wrote 'La Traviata' and 'Rigoletto'.",
        options: ["Puccini", "Verdi", "Rossini", "Donizetti"],
        answer: "Verdi",
        hint: "His name means 'green' in Italian, and he's considered part of the 'Italian Triumvirate' of 19th-century opera composers."
    },
    {
        question: "Known as the 'Father of the Symphony', this composer was also completely deaf in his later years.",
        options: ["Beethoven", "Haydn", "Schubert", "Mahler"],
        answer: "Beethoven",
        hint: "He composed his famous 'Ode to Joy' in his Ninth Symphony while almost entirely deaf."
    },
    {
        question: "This Baroque composer wrote the Brandenburg Concertos.",
        options: ["Handel", "Vivaldi", "Telemann", "Bach"],
        answer: "Bach",
        hint: "He was a German composer and virtuoso organist, known for his sacred music and fugues."
    },
    {
        question: "This Russian composer is famous for 'The Nutcracker' ballet.",
        options: ["Stravinsky", "Rachmaninoff", "Tchaikovsky", "Prokofiev"],
        answer: "Tchaikovsky",
        hint: "He also composed the '1812 Overture', which famously features cannon fire in its score."
    },
    {
        question: "This Austrian composer wrote over 600 songs, including the famous 'Ave Maria'.",
        options: ["Mozart", "Beethoven", "Schubert", "Brahms"],
        answer: "Schubert",
        hint: "Despite his short life of only 31 years, he was incredibly prolific and is known for his lieder (art songs)."
    },
    {
        question: "This German composer is known for his operas 'The Ring Cycle' and 'Tristan und Isolde'.",
        options: ["Wagner", "Beethoven", "Schumann", "Mendelssohn"],
        answer: "Wagner",
        hint: "He revolutionized opera through his concept of the Gesamtkunstwerk, or 'total work of art'."
    },
    {
        question: "Which composer is famous for the opera 'The Magic Flute'?",
        options: ["Mozart", "Beethoven", "Haydn", "Rossini"],
        answer: "Mozart",
        hint: "This child prodigy composed over 600 works and is considered one of the greatest classical composers of all time."
    },
    {
        question: "This Norwegian composer is famous for 'Peer Gynt' and 'In the Hall of the Mountain King'.",
        options: ["Sibelius", "Grieg", "Tchaikovsky", "Dvořák"],
        answer: "Grieg",
        hint: "He is often regarded as the leading Romantic era composer from Norway."
    },
    {
        question: "Who composed the opera 'Carmen'?",
        options: ["Bizet", "Puccini", "Verdi", "Wagner"],
        answer: "Bizet",
        hint: "This French composer's most famous work was initially considered a failure but later became one of the most popular operas ever written."
    },
    {
        question: "This composer is known for his 'Hungarian Dances' and 'Lullaby'.",
        options: ["Brahms", "Liszt", "Schumann", "Chopin"],
        answer: "Brahms",
        hint: "He was a close friend of Robert and Clara Schumann and is often grouped with Bach and Beethoven as one of the 'Three Bs' of classical music."
    },
    {
        question: "Which French composer wrote 'Boléro'?",
        options: ["Debussy", "Satie", "Ravel", "Saint-Saëns"],
        answer: "Ravel",
        hint: "This Impressionist composer is known for his orchestration skills and also wrote 'Daphnis et Chloé'."
    },
    {
        question: "This Polish composer is known for his piano works such as nocturnes and etudes.",
        options: ["Chopin", "Szymanowski", "Paderewski", "Rachmaninoff"],
        answer: "Chopin",
        hint: "He was a virtuoso pianist and wrote almost exclusively for solo piano."
    },
    {
        question: "This composer wrote the famous orchestral work 'Also sprach Zarathustra', used in the film '2001: A Space Odyssey'.",
        options: ["Strauss", "Mahler", "Wagner", "Beethoven"],
        answer: "Strauss",
        hint: "This German composer is also known for his operas 'Der Rosenkavalier' and 'Salome'."
    },
    {
        question: "Who composed the 'New World Symphony'?",
        options: ["Dvořák", "Smetana", "Brahms", "Mendelssohn"],
        answer: "Dvořák",
        hint: "This Czech composer was influenced by the folk music of Moravia and his native Bohemia."
    },
    {
        question: "This American composer is known for 'Rhapsody in Blue' and 'An American in Paris'.",
        options: ["Bernstein", "Copland", "Gershwin", "Barber"],
        answer: "Gershwin",
        hint: "He bridged the worlds of classical and popular music, also writing the opera 'Porgy and Bess'."
    },
    {
        question: "Which Russian composer wrote 'Scheherazade'?",
        options: ["Rimsky-Korsakov", "Prokofiev", "Tchaikovsky", "Shostakovich"],
        answer: "Rimsky-Korsakov",
        hint: "He was a member of 'The Five', a group of Russian composers who sought to create distinctly Russian classical music."
    },
    {
        question: "This composer is known for his innovative use of harmony and is often considered the bridge between the Classical and Romantic eras.",
        options: ["Brahms", "Schubert", "Beethoven", "Haydn"],
        answer: "Beethoven",
        hint: "His late string quartets and piano sonatas were revolutionary for their time and continue to challenge listeners today."
    },
    {
        question: "Which composer is famous for his ballets 'Swan Lake' and 'Sleeping Beauty'?",
        options: ["Tchaikovsky", "Stravinsky", "Prokofiev", "Chopin"],
        answer: "Tchaikovsky",
        hint: "This Russian composer of the Romantic era is also known for his '1812 Overture' and 'The Nutcracker'."
    },
    {
        question: "This French composer is known for his orchestral work 'La Mer' and the ballet 'Daphnis et Chloé'.",
        options: ["Debussy", "Ravel", "Saint-Saëns", "Fauré"],
        answer: "Debussy",
        hint: "He was a pioneer of Impressionist music and is known for his non-traditional scales and tonal structures."
    }
];