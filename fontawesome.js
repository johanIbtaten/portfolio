// import de la librarie
import { library } from '@fortawesome/fontawesome-svg-core';

// import des icones des différents packages
import { 
    faCheckCircle,
    faStar,
    faRedo
  } from '@fortawesome/free-solid-svg-icons';

import { 
    // faAddressBook as faAddressBookRegular
  } from '@fortawesome/free-regular-svg-icons';

import {
    faGithub
  } from '@fortawesome/free-brands-svg-icons';

  // Ajout des icones à la librairie
library.add(
    faCheckCircle,
    faGithub,
    faStar,
    faRedo
);