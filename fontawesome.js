// import de la librarie
import { library } from '@fortawesome/fontawesome-svg-core';

// import des icones des différents packages
import { 
    faArchway,
    faAddressBook,
    faSpinner,
    faCheckCircle
  } from '@fortawesome/free-solid-svg-icons';

import { 
    faAddressBook as faAddressBookRegular
  } from '@fortawesome/free-regular-svg-icons';

import {
    faGoogle,
    faFacebook,
    faTwitter,    
    faGithub
  } from '@fortawesome/free-brands-svg-icons';

  // Ajout des icones à la librairie
library.add(
    faArchway,
    faAddressBook,
    faSpinner,
    faCheckCircle,
    faGithub,
    faAddressBookRegular,
    faGoogle,
    faFacebook,
    faTwitter,
    faGithub
);