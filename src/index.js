import './styles/styles'

function render(hash) {
    switch (hash.slice(1)) {
      case 'about':
        return renderAbout();
      case 'todo':
        return renderTodolist();
      case 'calendar':
        return renderCalendar();
    }
  }
  
  nav.addEventListener('click', (e) => {
    e.preventDefault();
  
    if (e.target.tagName === 'A') {
      location.hash = e.target.id;
    }
  });
  
  window.onhashchange = () => {
    render(location.hash);
  };
  
  render(location.hash);

import { renderTodolist} from './todo.js'
import {renderCalendar} from './calendar'
import {renderAbout} from './about'


