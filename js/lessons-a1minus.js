const lessonsA1Minus = [
  {
    lesson: 1,
    title: "Foundations of English",
    blocks: [
      { 
        id: 1, title: "Bloque 1: El Núcleo", tip: "En todos los acentos, 'I' (Yo) siempre es mayúscula.", 
        words: [{en: "I", es: "Yo"}, {en: "You", es: "Tú"}, {en: "We", es: "Nosotros"}, {en: "They", es: "Ellos"}, {en: "Person", es: "Persona"}, {en: "Human", es: "Humano"}, {en: "Individual", es: "Individuo"}, {en: "Identity", es: "Identidad"}, {en: "Existence", es: "Existencia"}, {en: "Consciousness", es: "Conciencia"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Yo'?", o: ["You", "I", "We"], r: "I"},
            {q: "2. ¿Qué significa 'They'?", o: ["Ellos", "Nosotros", "Tú"], r: "Ellos"},
            {q: "3. Traduce 'Human':", o: ["Persona", "Humano", "Individuo"], r: "Humano"},
            {q: "4. ¿Cómo se dice 'Nosotros'?", o: ["They", "You", "We"], r: "We"},
            {q: "5. ¿Qué es 'Identity'?", o: ["Identidad", "Idea", "Identificar"], r: "Identidad"},
            {q: "6. Traduce 'You':", o: ["Yo", "Tú", "Él"], r: "Tú"},
            {q: "7. ¿Qué significa 'Person'?", o: ["Gente", "Persona", "Pueblo"], r: "Persona"},
            {q: "8. ¿Cómo se dice 'Existencia'?", o: ["Existence", "Exist", "Exiting"], r: "Existence"},
            {q: "9. Traduce 'Individual':", o: ["Único", "Individuo", "Persona"], r: "Individuo"},
            {q: "10. ¿Qué es 'Consciousness'?", o: ["Conciencia", "Ciencia", "Constancia"], r: "Conciencia"}
        ]
      },
      { 
        id: 2, title: "Bloque 2: Acciones", tip: "Work y Play pueden ser nombres o acciones.",
        words: [{en: "Body", es: "Cuerpo"}, {en: "Life", es: "Vida"}, {en: "Birth", es: "Nacimiento"}, {en: "Death", es: "Muerte"}, {en: "Action", es: "Acción"}, {en: "Work", es: "Trabajo"}, {en: "Play", es: "Juego"}, {en: "Group", es: "Grupo"}, {en: "Friend", es: "Amigo"}, {en: "Family", es: "Familia"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Familia'?", o: ["Friend", "Family", "Group"], r: "Family"},
            {q: "2. ¿Qué significa 'Life'?", o: ["Vida", "Muerte", "Cuerpo"], r: "Vida"},
            {q: "3. ¿Cómo se traduce 'Work'?", o: ["Juego", "Trabajo", "Acción"], r: "Trabajo"},
            {q: "4. ¿Qué es 'Body'?", o: ["Cuerpo", "Vida", "Humano"], r: "Cuerpo"},
            {q: "5. Traduce 'Birth':", o: ["Nacimiento", "Muerte", "Vida"], r: "Nacimiento"},
            {q: "6. ¿Cómo se dice 'Amigo'?", o: ["Family", "Friend", "Individual"], r: "Friend"},
            {q: "7. Significado de 'Action':", o: ["Acción", "Trabajo", "Juego"], r: "Acción"},
            {q: "8. ¿Cómo se dice 'Muerte'?", o: ["Birth", "Life", "Death"], r: "Death"},
            {q: "9. Significado de 'Group':", o: ["Grupo", "Familia", "Individuo"], r: "Group"},
            {q: "10. Traduce 'Play':", o: ["Juego", "Trabajo", "Acción"], r: "Play"}
        ]
      },
      { 
        id: 3, title: "Bloque 3: Tiempo", tip: "USA usa 'Month/Day', UK usa 'Day/Month'.",
        words: [{en: "Time", es: "Tiempo"}, {en: "Place", es: "Lugar"}, {en: "Moment", es: "Momento"}, {en: "Space", es: "Espacio"}, {en: "World", es: "Mundo"}, {en: "Nature", es: "Naturaleza"}, {en: "Environment", es: "Entorno"}, {en: "Point", es: "Punto"}, {en: "Beginning", es: "Inicio"}, {en: "End", es: "Fin"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Tiempo'?", o: ["Time", "Space", "Place"], r: "Time"},
            {q: "2. ¿Qué significa 'World'?", o: ["Lugar", "Mundo", "Espacio"], r: "Mundo"},
            {q: "3. Traduce 'Beginning':", o: ["Inicio", "Fin", "Punto"], r: "Inicio"},
            {q: "4. ¿Qué es 'End'?", o: ["Inicio", "Punto", "Fin"], r: "Fin"},
            {q: "5. Significado de 'Nature':", o: ["Entorno", "Naturaleza", "Mundo"], r: "Naturaleza"},
            {q: "6. ¿Cómo se dice 'Lugar'?", o: ["Place", "Point", "Space"], r: "Place"},
            {q: "7. Traduce 'Moment':", o: ["Movimiento", "Momento", "Mundo"], r: "Momento"},
            {q: "8. ¿Qué es 'Space'?", o: ["Espacio", "Lugar", "Punto"], r: "Espacio"},
            {q: "9. Significado de 'Environment':", o: ["Entorno", "Mundo", "Espacio"], r: "Entorno"},
            {q: "10. Traduce 'Point':", o: ["Punta", "Punto", "Parte"], r: "Punto"}
        ]
      },
      { 
        id: 4, title: "Bloque 4: Mente", tip: "Knowledge no tiene plural (no digas knowledges).",
        words: [{en: "Thought", es: "Pensamiento"}, {en: "Idea", es: "Idea"}, {en: "Reason", es: "Razón"}, {en: "Mind", es: "Mente"}, {en: "Spirit", es: "Espíritu"}, {en: "Feeling", es: "Sentimiento"}, {en: "Sense", es: "Sentido"}, {en: "Knowledge", es: "Conocimiento"}, {en: "Wisdom", es: "Sabiduría"}, {en: "Truth", es: "Verdad"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Pensamiento'?", o: ["Thought", "Idea", "Mind"], r: "Thought"},
            {q: "2. Significado de 'Wisdom':", o: ["Razón", "Conocimiento", "Sabiduría"], r: "Sabiduría"},
            {q: "3. Traduce 'Truth':", o: ["Verdad", "Mente", "Idea"], r: "Verdad"},
            {q: "4. ¿Qué es 'Knowledge'?", o: ["Saber", "Conocimiento", "Pensar"], r: "Conocimiento"},
            {q: "5. Significado de 'Feeling':", o: ["Sentido", "Sentimiento", "Espíritu"], r: "Sentimiento"},
            {q: "6. ¿Cómo se dice 'Mente'?", o: ["Mind", "Spirit", "Reason"], r: "Mind"},
            {q: "7. Traduce 'Idea':", o: ["Idea", "Ideal", "Idear"], r: "Idea"},
            {q: "8. ¿Qué es 'Sense'?", o: ["Sentir", "Sentido", "Sensación"], r: "Sentido"},
            {q: "9. Significado de 'Reason':", o: ["Razón", "Mente", "Verdad"], r: "Razón"},
            {q: "10. Traduce 'Spirit':", o: ["Alma", "Espíritu", "Mente"], r: "Espíritu"}
        ]
      },
      { 
        id: 5, title: "Bloque 5: Sociedad", tip: "Country significa 'País' y también 'Campo'.",
        words: [{en: "Society", es: "Sociedad"}, {en: "Community", es: "Comunidad"}, {en: "Language", es: "Idioma"}, {en: "Country", es: "País"}, {en: "City", es: "Ciudad"}, {en: "Government", es: "Gobierno"}, {en: "Law", es: "Ley"}, {en: "Power", es: "Poder"}, {en: "War", es: "Guerra"}, {en: "Peace", es: "Paz"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Sociedad'?", o: ["Social", "Society", "City"], r: "Society"},
            {q: "2. Significado de 'Law':", o: ["Ley", "Gobierno", "Poder"], r: "Ley"},
            {q: "3. Traduce 'Peace':", o: ["Guerra", "Paz", "País"], r: "Paz"},
            {q: "4. ¿Qué es 'Government'?", o: ["Gobernador", "Gobierno", "Ley"], r: "Gobierno"},
            {q: "5. Significado de 'City':", o: ["Ciudad", "País", "Comunidad"], r: "Ciudad"},
            {q: "6. ¿Cómo se dice 'Guerra'?", o: ["Power", "War", "Law"], r: "War"},
            {q: "7. Traduce 'Language':", o: ["Lengua", "Idioma", "Habla"], r: "Language"},
            {q: "8. ¿Qué es 'Power'?", o: ["Paz", "Poder", "Ley"], r: "Power"},
            {q: "9. Significado de 'Community':", o: ["Compañía", "Comunidad", "Sociedad"], r: "Comunidad"},
            {q: "10. Traduce 'Country':", o: ["País", "Ciudad", "Pueblo"], r: "Country"}
        ]
      },
      { 
        id: 6, title: "Bloque 6: Economía", tip: "Money es incontable, no tiene plural.",
        words: [{en: "Money", es: "Dinero"}, {en: "Value", es: "Valor"}, {en: "Market", es: "Mercado"}, {en: "Business", es: "Negocio"}, {en: "Price", es: "Precio"}, {en: "Cost", es: "Costo"}, {en: "Wealth", es: "Riqueza"}, {en: "Debt", es: "Deuda"}, {en: "Trade", es: "Comercio"}, {en: "Resource", es: "Recurso"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Dinero'?", o: ["Money", "Cost", "Price"], r: "Money"},
            {q: "2. Significado de 'Wealth':", o: ["Salud", "Riqueza", "Deuda"], r: "Riqueza"},
            {q: "3. Traduce 'Market':", o: ["Mercado", "Negocio", "Comercio"], r: "Mercado"},
            {q: "4. ¿Qué es 'Debt'?", o: ["Deber", "Duda", "Deuda"], r: "Deuda"},
            {q: "5. Significado de 'Price':", o: ["Costo", "Precio", "Valor"], r: "Precio"},
            {q: "6. ¿Cómo se dice 'Negocio'?", o: ["Trade", "Business", "Market"], r: "Business"},
            {q: "7. Traduce 'Value':", o: ["Valor", "Válido", "Costo"], r: "Value"},
            {q: "8. ¿Qué es 'Trade'?", o: ["Trato", "Comercio", "Trabajo"], r: "Comercio"},
            {q: "9. Significado de 'Resource':", o: ["Recurso", "Fuente", "Riqueza"], r: "Recurso"},
            {q: "10. Traduce 'Cost':", o: ["Precio", "Gasto", "Costo"], r: "Costo"}
        ]
      },
      { 
        id: 7, title: "Bloque 7: Ciencia", tip: "Data se usa para plural y singular en informática.",
        words: [{en: "Science", es: "Ciencia"}, {en: "Technology", es: "Tecnología"}, {en: "Computer", es: "Computadora"}, {en: "Machine", es: "Máquina"}, {en: "Energy", es: "Energía"}, {en: "Research", es: "Investigación"}, {en: "Data", es: "Datos"}, {en: "System", es: "Sistema"}, {en: "Discovery", es: "Descubrimiento"}, {en: "Effect", es: "Efecto"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Ciencia'?", o: ["Science", "System", "Data"], r: "Science"},
            {q: "2. Significado de 'Discovery':", o: ["Invento", "Descubrimiento", "Efecto"], r: "Descubrimiento"},
            {q: "3. Traduce 'Computer':", o: ["Máquina", "Computadora", "Sistema"], r: "Computadora"},
            {q: "4. ¿Qué es 'Research'?", o: ["Búsqueda", "Investigación", "Estudio"], r: "Investigación"},
            {q: "5. Significado de 'Data':", o: ["Datos", "Dato", "Fecha"], r: "Datos"},
            {q: "6. ¿Cómo se dice 'Máquina'?", o: ["Machine", "System", "Effect"], r: "Machine"},
            {q: "7. Traduce 'Energy':", o: ["Enérgico", "Energía", "Fuerza"], r: "Energy"},
            {q: "8. ¿Qué es 'System'?", o: ["Sistema", "Síntoma", "Símbolo"], r: "Sistema"},
            {q: "9. Significado de 'Effect':", o: ["Afecto", "Efecto", "Hecho"], r: "Efecto"},
            {q: "10. Traduce 'Technology':", o: ["Técnica", "Tecnología", "Ciencia"], r: "Technology"}
        ]
      },
      { 
        id: 8, title: "Bloque 8: Naturaleza", tip: "Earth (Tierra) siempre va en mayúscula si es el planeta.",
        words: [{en: "Nature", es: "Naturaleza"}, {en: "Environment", es: "Medio ambiente"}, {en: "Earth", es: "Tierra"}, {en: "Water", es: "Agua"}, {en: "Air", es: "Aire"}, {en: "Fire", es: "Fuego"}, {en: "Light", es: "Luz"}, {en: "Sun", es: "Sol"}, {en: "Moon", es: "Luna"}, {en: "Star", es: "Estrella"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Tierra'?", o: ["Earth", "Moon", "Sun"], r: "Earth"},
            {q: "2. Significado de 'Star':", o: ["Sol", "Luna", "Estrella"], r: "Estrella"},
            {q: "3. Traduce 'Water':", o: ["Agua", "Aire", "Fuego"], r: "Water"},
            {q: "4. ¿Qué es 'Light'?", o: ["Luz", "Fuego", "Sol"], r: "Luz"},
            {q: "5. Significado de 'Sun':", o: ["Sol", "Luz", "Luna"], r: "Sol"},
            {q: "6. ¿Cómo se dice 'Fuego'?", o: ["Fire", "Air", "Water"], r: "Fire"},
            {q: "7. Traduce 'Air':", o: ["Aire", "Agua", "Luz"], r: "Air"},
            {q: "8. ¿Qué es 'Moon'?", o: ["Sol", "Estrella", "Luna"], r: "Luna"},
            {q: "9. Significado de 'Nature':", o: ["Naturaleza", "Natural", "Entorno"], r: "Naturaleza"},
            {q: "10. Traduce 'Environment':", o: ["Ambiente", "Medio ambiente", "Tierra"], r: "Medio ambiente"}
        ]
      },
      { 
        id: 9, title: "Bloque 9: Cambio", tip: "Growth es el sustantivo de 'Grow' (Crecer).",
        words: [{en: "Change", es: "Cambio"}, {en: "Force", es: "Fuerza"}, {en: "Growth", es: "Crecimiento"}, {en: "Development", es: "Desarrollo"}, {en: "Process", es: "Proceso"}, {en: "Movement", es: "Movimiento"}, {en: "Direction", es: "Dirección"}, {en: "Action", es: "Acción"}, {en: "Control", es: "Control"}, {en: "Power", es: "Poder"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Cambio'?", o: ["Change", "Action", "Force"], r: "Change"},
            {q: "2. Significado de 'Growth':", o: ["Crecimiento", "Cambio", "Desarrollo"], r: "Crecimiento"},
            {q: "3. Traduce 'Development':", o: ["Desarrollo", "Proceso", "Movimiento"], r: "Desarrollo"},
            {q: "4. ¿Qué es 'Movement'?", o: ["Momento", "Movimiento", "Acción"], r: "Movimiento"},
            {q: "5. Significado de 'Control':", o: ["Control", "Acción", "Poder"], r: "Control"},
            {q: "6. ¿Cómo se dice 'Fuerza'?", o: ["Force", "Power", "Action"], r: "Force"},
            {q: "7. Traduce 'Process':", o: ["Proceso", "Progreso", "Pasos"], r: "Process"},
            {q: "8. ¿Qué es 'Direction'?", o: ["Dirección", "Directo", "Derecho"], r: "Dirección"},
            {q: "9. Significado de 'Action':", o: ["Acción", "Acto", "Actor"], r: "Action"},
            {q: "10. Traduce 'Power':", o: ["Fuerza", "Poder", "Control"], r: "Power"}
        ]
      },
      { 
        id: 10, title: "Bloque 10: Valores", tip: "Right significa 'Derecho', 'Correcto' y 'Derecha'.",
        words: [{en: "Justice", es: "Justicia"}, {en: "Truth", es: "Verdad"}, {en: "Right", es: "Derecho"}, {en: "Reason", es: "Razón"}, {en: "Spirit", es: "Espíritu"}, {en: "Faith", es: "Fe"}, {en: "Hope", es: "Esperanza"}, {en: "Love", es: "Amor"}, {en: "Moral", es: "Moral"}, {en: "Soul", es: "Alma"}],
        examen: [
            {q: "1. ¿Cómo se dice 'Justicia'?", o: ["Justice", "Just", "Moral"], r: "Justice"},
            {q: "2. Significado de 'Hope':", o: ["Fe", "Esperanza", "Amor"], r: "Esperanza"},
            {q: "3. Traduce 'Love':", o: ["Amor", "Alma", "Espíritu"], r: "Love"},
            {q: "4. ¿Qué es 'Soul'?", o: ["Suela", "Solo", "Alma"], r: "Alma"},
            {q: "5. Significado de 'Faith':", o: ["Fe", "Fiel", "Fuerza"], r: "Fe"},
            {q: "6. ¿Cómo se dice 'Verdad'?", o: ["Truth", "True", "Trust"], r: "Truth"},
            {q: "7. Traduce 'Moral':", o: ["Moral", "Mortal", "Moralidad"], r: "Moral"},
            {q: "8. ¿Qué es 'Right'?", o: ["Derecho", "Razón", "Justicia"], r: "Derecho"},
            {q: "9. Significado de 'Reason':", o: ["Razón", "Realidad", "Derecho"], r: "Reason"},
            {q: "10. Traduce 'Spirit':", o: ["Espíritu", "Alma", "Mente"], r: "Spirit"}
        ]
      }
    ]
  }
];