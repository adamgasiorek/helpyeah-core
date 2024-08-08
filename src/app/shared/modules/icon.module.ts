import { NgModule } from '@angular/core';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {
  faCodeBranch,
  faAsterisk,
  faBroom,
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faSignOutAlt,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';

import {
  faBell
} from '@fortawesome/free-regular-svg-icons';

import { faGithub, fa500px, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';


@NgModule({
  exports: [
    FontAwesomeModule,
  ]
})
export class IconModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
        faBell,
        faCogs,
        faSignOutAlt,
        faGoogle,
        faFacebook,
        faGithub,
        faAsterisk,
        faBars,
        faBroom,
        faUserCircle,
        faPowerOff,
        faCog,
        faRocket,
        faPlayCircle,
        faPlus,
        faEdit,
        faTrash,
        fa500px,
        faTimes,
        faCaretUp,
        faCaretDown,
        faExclamationTriangle,
        faFilter,
        faTasks,
        faCheck,
        faSquare,
        faLanguage,
        faPaintBrush,
        faLightbulb,
        faWindowMaximize,
        faStream,
        faBook
    );
  }

}
