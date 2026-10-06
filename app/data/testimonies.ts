export type TestimonyImage = {
  src: string;
  alt: string;
  // Graphic photos are blurred until the visitor chooses to view them.
  sensitive?: boolean;
};

export type Testimony = {
  title: string;
  name: string;
  detail?: string;
  images: TestimonyImage[];
  telugu: string[];
  english: string[];
};

// Shown on the Testimonies page in this order. Add a new entry to publish one.
export const testimonies: Testimony[] = [
  {
    title: "Healed By The Love Of Christ",
    name: "Gowtham",
    detail: "4 years - shared by his mother",
    images: [
      {
        src: "/test1.webp",
        alt: "Gowtham sitting on a man's lap, both smiling",
      },
      {
        src: "/test2.webp",
        alt: "Gowtham's back during his illness in hospital",
        sensitive: true,
      },
    ],
    telugu: [
      "Name Gowtham, 4 years, చర్మము తినేసే వ్యాధి వచ్చి జనవరి 2026 లో వాళ్ళ తల్లిగారు విజయవాడ హాస్పిటల్ లో చేర్చారు.",
      "భర్త విడిచిపెట్టేశాడు సంపాదనలేదు తండ్రి చనిపోయాడు, తల్లి చూసేపరస్థితి కాదు, కుమారుడు పరస్థితి బాగోలేదు, ఇంక సహాయమే లేదు అనుకున్న, కనీసము కుమారుడికి మందులు కొనటానికి కూడా లేని పరస్థితి, డాక్టర్స్ 5000రు ఇంజెక్షన్లు చెయ్యాలి అన్నార, నేను కొనే స్థితిలో లేను, వైద్యులు 3 రోజుల్లో చనిపోతాడు ఇంటికి తీసుకువెళ్ళిపోండి అని చెప్పారు.",
      "అప్పుడే మా పెద్దమ్మ గారు లివింగ్ హోప్ చర్చి కి తీసుకు వెళ్దాము దేవుడే బ్రతికిస్తారు అని చెప్పారు హాస్పిటల్ నుండి నేరుగా చేర్చి కి వెళ్ళాము, నా జీవితం లో నేను ఎన్నడు చర్చికి వెళ్ళలేదు, అక్కడ హీలింగ్ సర్వీస్ జారుతుంది నేను పాస్టర్ గారిని అడిగాను నాకొడుకుని బ్రతించండి అని, పాస్టర్ గారు ప్రార్థన చేసి నీ కుమారుడు చనిపోడు బ్రతుకుతారు యేసు క్రీస్తు గొప్ప జీవితము నీ కుమారుడికి ఇస్తాడు అన్నారు.",
      "ఒక తండ్రి లాగ ఆర్థికంగా కూడా చాలా సహాయం చేశారు క్రీస్తు ప్రేమని ఆరోజు చూసాను, ఆయన అద్భుతకార్యని కళ్ళతో చూసాను ఈ రోజు నా కుమారుడు స్వస్థతపోంది సంతోషంగా ఉన్నాడు, నా కుమారుడితో మంచి జీవితని లివింగ్ హోప్ చర్చలో గడుపుతునాను దేవునికే మహిమ కలుగును గాక.",
    ],
    english: [
      "Gowtham is 4 years old. He was struck by a flesh-eating skin disease, and in January 2026 his mother admitted him to a hospital in Vijayawada.",
      "My husband had left me and I had no income. My father had died, and my mother was in no condition to care for us. My son's condition was very bad, and I thought there was no help left. I could not even afford to buy his medicines. The doctors said he needed injections costing Rs. 5,000, and I was in no position to buy them. Then the doctors told me, \"He will die within 3 days. Take him home.\"",
      "At that moment my aunt said, \"Let us take him to Living Hope Church. God Himself will make him live.\" We went straight from the hospital to the church. I had never been to a church in my life. A healing service was going on there, and I asked the pastor, \"Please save my son.\" The pastor prayed and said, \"Your son will not die; he will live. Jesus Christ will give your son a great life.\"",
      "Like a father, he also helped us a great deal financially. That day I saw the love of Christ, and I saw His miracle with my own eyes. Today my son is healed and happy. I am living a good life with my son at Living Hope Church. May all the glory be to God.",
    ],
  },
  {
    title: "No Orphans Here, Only God's Children",
    name: "Anil Yadhidya & Abhishek Yadhidya",
    detail: "6 years and 4 years - shared by their aunt",
    images: [
      {
        src: "/anil2.webp",
        alt: "Anil and Abhishek sitting together on a man's lap, smiling",
      },
      {
        src: "/anil1.webp",
        alt: "One of the boys being fed a meal at the church",
      },
    ],
    telugu: [
      "Names Anil Yadhidya 6 years, Abhishek Yadhidya 4 years, 2024, తల్లి చనిపోయారు, తండ్రి విడిచి పెట్టారు, యవ్వన కాలంలో ఉన్న తన పిన్ని గారు చేరదీసి చూసుకుంటున్నారు.",
      "అనుకోకుండా తల్లి గారికి అనారోగ్యం మెంటల్ depression, oka company lo chinna ఉద్యోగం, జీతం పిల్లలకి తల్లికి సరిపోవట్లేదు ఏడ్చుకున్న బాధపడుతున్న ఎవరి సహాయము లేదు పిల్లల్ని విడువలెను అక్క పిల్లలు ఏదన్నా అనాధసరణాలయంలో వెదాము అనుకున్న, కానీ అనాథలు అవుతారు అని వేయలేదు.",
      "అప్పుడే ఒక తల్లి గారు చెప్పారు, లివింగ్ హోప్ చర్చికి దేవుని సేవకు అప్పగించు ఆ పాస్టర్ గారు, పాస్టర్ అమ్మ, అనాధపిల్లలుగా చూడరు సొంత పిల్లలుగా చూస్తారు అని చెప్పారు.",
      "నేను లివింగ్ హోప్ చర్చికి వెళ్ళి కలిసాను అక్కడ పాస్టర్ గారు పాస్టర్ అమ్మ గారితో మాట్లాడాను, వారు ఒక్కమాట చెప్పారు ఇక్కడ దేవుని పిల్లలు తప్పా అనాద పిల్లలు లేరు మీరు అనుకోవద్దు అని చెప్పారు ఇంకా నా పిల్లలను నేను లివింగ్ హోప్ లో దేవుని సమర్పించాను దేవునికే మహిమ కలుగును గాక.",
    ],
    english: [
      "Anil Yadhidya is 6 years old and Abhishek Yadhidya is 4. In 2024 their mother died and their father left them. Their aunt, their mother's younger sister and still a young woman herself, took them in and has been caring for them.",
      "Then, unexpectedly, my mother fell ill with depression. I have a small job in a company, and the salary was not enough for the children and my mother. I wept and suffered, with no one to help. I could not abandon them; they are my sister's children. I thought of placing them in an orphanage, but I did not, because they would become orphans.",
      "Just then a lady told me, \"Entrust them to Living Hope Church, for the service of God. The pastor and his wife will not see them as orphans; they will care for them as their own children.\"",
      "I went to Living Hope Church and spoke with the pastor and his wife. They told me one thing: \"There are no orphans here, only God's children. Do not think of them that way.\" So I dedicated my children to God at Living Hope. May all the glory be to God.",
    ],
  },
  {
    title: "He Never Left Me",
    name: "Mary",
    detail: "healed of a severe skin disease",
    images: [
      {
        src: "/mary.webp",
        alt: "Mary sharing her testimony at Living Hope Church, holding a microphone and her Bible",
      },
    ],
    telugu: [
      "తల్లి మేరీ గారికి చర్మంపై భయంకరమైన వ్యాధి వచ్చింది. భరించలేనంత దుర్వాసనతో, పూర్తిగా వస్త్రాలు ధరించలేనంతగా కురుపులతో ఆమె శరీరమంతా నిండిపోయింది.",
      "ఆ పరిస్థితిలో తనను ఇక ఎవరూ చూడరని, తన జీవితం ముగించుకోవడమే మంచిదని అనుకున్నారు. ఎవరికీ కనిపించకుండా వెళ్లి, ఒక లోతైన బావిలో దూకి చనిపోవాలని నిర్ణయించుకున్నారు. “ఎవరూ చూడరు యేసయ్యా, నేను చచ్చిపోతాను” అనుకున్నారు.",
      "ఆమె బావిలోకి దూకారు. ఒకసారి మునిగారు, రెండుసార్లు మునిగారు. మూడోసారి మునిగేటప్పుడు ఎవరో తన చెయ్యి పట్టుకుని పైకి లాగుతున్నట్లు అనిపించింది.",
      "అప్పుడు ఆమె, “నన్నెందుకు రక్షించావు?” అని అడిగారు. అందుకు యేసయ్య, “నన్ను ‘అయ్యా’ అని పిలిచావు కదమ్మా! అందుకే వచ్చాను” అని చెప్పినట్లు ఆమె సాక్ష్యమిస్తున్నారు. ఆ యేసయ్యే ఆమెను రక్షించారు.",
      "ఈ లోకంలో తన పిల్లలు, తన చెల్లెలు, తన కుటుంబ సభ్యులు అందరూ ఆమెను చూసి అసహ్యించుకుని, ఆమెను విడిచిపెట్టారు. కానీ ఆ యేసయ్య మాత్రం ఆమెను ఎప్పుడూ విడిచిపెట్టలేదు.",
      "దేవుని మహా కృపవలన ఆమె Living Hope Churchకు వచ్చారు. అక్కడ పాస్టర్ M. A. Paul గారు ఆమె కోసం ప్రార్థించారు. ఈ రోజు ఆమె శరీరంపై ఒక్క మచ్చ కూడా లేదు! యేసయ్య ఆమెను సంపూర్ణంగా స్వస్థపరిచారు.",
      "ఆమె జీవితాన్ని మార్చినది దేవుని మహా కృప. ఆమెను రక్షించినది యేసయ్య ప్రేమ. ఆమెను స్వస్థపరిచినది యేసయ్య శక్తి. సర్వ మహిమ, ఘనత, స్తుతి యేసయ్యకే కలుగును గాక! ఆమెన్.",
    ],
    english: [
      "Mary was struck by a terrible skin disease. Her whole body was covered with sores, with an unbearable smell, so badly that she could not even wear her clothes properly.",
      "In that condition she thought no one would ever look at her again, and that it would be better to end her life. She decided to go where no one could see her and jump into a deep well. \"No one will look at me, Jesus. I am going to die,\" she thought.",
      "She jumped into the well. She went under once, then a second time. As she went under the third time, she felt someone take hold of her hand and pull her up.",
      "She asked, \"Why did you save me?\" She testifies that Jesus answered, \"You called out to me, my child. That is why I came.\" It was Jesus who saved her.",
      "In this world her children, her younger sister and all her family were repelled by her and abandoned her. But Jesus never left her.",
      "By the great grace of God she came to Living Hope Church, where Pastor M. A. Paul prayed for her. Today there is not a single mark on her body. Jesus has healed her completely.",
      "It was the great grace of God that changed her life, the love of Jesus that saved her, and the power of Jesus that healed her. May all glory, honour and praise be to Jesus. Amen.",
    ],
  },
  {
    title: "Caring For Widows",
    name: "Living Hope",
    detail: "sarees, blankets and groceries for widows",
    images: [
      {
        // Shown once a photo named "womentest" is added to the public folder.
        src: "/womentest.jpeg",
        alt: "Widows receiving sarees, blankets and groceries from Living Hope",
      },
    ],
    telugu: [
      "భర్తను కోల్పోయి ఒంటరిగా జీవిస్తున్న ఎంతో మంది విధవరాళ్ళు మన చుట్టూ ఉన్నారు. చాలామందికి స్థిరమైన ఆదాయం లేదు, ఆదుకునే వారు లేరు.",
      "వారిని దేవుడు మరచిపోలేదని తెలియజేయడానికి, లివింగ్ హోప్ తరఫున విధవరాళ్ళకు చీరలు, దుప్పట్లు మరియు నిత్యావసర సరుకులు పంపిణీ చేశాము.",
      "ఇది కేవలం ఒక కానుక కాదు, క్రీస్తు ప్రేమకు గుర్తు. వారి ముఖాల్లో కనిపించిన సంతోషమే మాకు గొప్ప ఆశీర్వాదం.",
      "దేవుడు విధవరాండ్రకు న్యాయకర్త అని వాక్యం చెబుతుంది (కీర్తనలు 68:5). దేవునికే మహిమ కలుగును గాక.",
    ],
    english: [
      "All around us there are many widows who have lost their husbands and now live alone. Many have no steady income and no one to support them.",
      "To let them know that God has not forgotten them, Living Hope distributed sarees, blankets and groceries to widows.",
      "It was not just a gift, but a sign of the love of Christ. The joy on their faces was a great blessing to us.",
      "Scripture says God is \"a father of the fatherless, and a judge of the widows\" (Psalm 68:5). May all the glory be to God.",
    ],
  },
];
